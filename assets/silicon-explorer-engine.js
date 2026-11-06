/**
 * EcrioniX Silicon Explorer — 3D WebGL Visualization Engine
 * Interactive Three.js engineering model of the Apple iPhone 6s, Logic Board, and A9 Silicon Die.
 * (c) 2026 EcrioniX. Open educational hardware reference.
 */
(function (global) {
  'use strict';

  class SiliconExplorerEngine {
    constructor(canvasId, data) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) throw new Error(`Canvas #${canvasId} not found`);
      this.data = data || global.EcrioniXSiliconData;

      // State
      this.mode = 'physical'; // 'physical', 'motherboard', 'architecture'
      this.currentBoardSide = 'front'; // 'front' | 'back'
      this.explodeFactor = 0; // 0.0 to 1.0
      this.targetExplode = 0;
      this.selectedItem = null;
      this.hoveredItem = null;
      this.isIsolated = false;
      this.isWireframe = false;
      this.isAutoRotate = false;
      this.labelsVisible = true;

      // Three.js instances
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2(-999, -999);

      // Groups
      this.rootGroup = new THREE.Group();
      this.physicalGroup = new THREE.Group();
      this.motherboardGroup = new THREE.Group();
      this.architectureGroup = new THREE.Group();
      this.particlesGroup = new THREE.Group();

      // Object registries
      this.physicalMeshes = new Map();
      this.chipMeshes = new Map();
      this.archMeshes = new Map();
      this.clickableObjects = [];

      // Materials cache
      this.materials = {};
      this.clock = new THREE.Clock();

      // Camera animation
      this.camTargetPos = new THREE.Vector3(0, 0, 22);
      this.camTargetLookAt = new THREE.Vector3(0, 0, 0);

      // Callbacks
      this.onSelectCallback = null;
      this.onHoverCallback = null;

      this.isMacBook = (this.data && this.data.PRODUCT_META && this.data.PRODUCT_META.id === 'apple-macbook-air-m1');
      this.lidAngle = this.isMacBook ? 105 : 0;
      this.targetLidAngle = this.isMacBook ? 105 : 0;
      this.displayAssemblyGroup = null;

      this.init();
    }

    init() {
      this.setupRenderer();
      this.setupScene();
      this.setupLights();
      this.setupMaterials();

      // Build 3D environments
      if (this.isMacBook) {
        this.buildPhysicalMacBook();
        this.buildMotherboardMacBook();
        this.buildArchitectureDieM1();
      } else {
        this.buildPhysicalPhone();
        this.buildMotherboard();
        this.buildArchitectureDie();
      }
      this.buildDataFlowParticles();

      this.setupControls();
      this.setupEvents();

      this.setMode('physical');
      this.animate();
    }

    setupRenderer() {
      const width = this.canvas.clientWidth || window.innerWidth;
      const height = this.canvas.clientHeight || window.innerHeight;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
      this.camera.position.set(0, -2, 24);
    }

    setupScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x020617);
      this.scene.fog = new THREE.FogExp2(0x020617, 0.012);

      this.scene.add(this.rootGroup);
      this.rootGroup.add(this.physicalGroup);
      this.rootGroup.add(this.motherboardGroup);
      this.rootGroup.add(this.architectureGroup);
      this.rootGroup.add(this.particlesGroup);
    }

    setupLights() {
      // Ambient base
      const ambLight = new THREE.AmbientLight(0x1e293b, 1.2);
      this.scene.add(ambLight);

      // Main overhead directional light
      const dirKey = new THREE.DirectionalLight(0xffffff, 2.0);
      dirKey.position.set(15, 25, 25);
      dirKey.castShadow = true;
      dirKey.shadow.mapSize.width = 2048;
      dirKey.shadow.mapSize.height = 2048;
      dirKey.shadow.bias = -0.0001;
      this.scene.add(dirKey);

      // Cool blue rim light
      const dirRim = new THREE.DirectionalLight(0x38bdf8, 1.4);
      dirRim.position.set(-18, -10, 15);
      this.scene.add(dirRim);

      // Warm purple backlight
      const dirBack = new THREE.DirectionalLight(0xa78bfa, 0.9);
      dirBack.position.set(0, -20, -20);
      this.scene.add(dirBack);

      // Floating inspection point light
      this.inspectorLight = new THREE.PointLight(0x2dd4bf, 1.5, 30);
      this.inspectorLight.position.set(0, 0, 8);
      this.scene.add(this.inspectorLight);
    }

    setupMaterials() {
      // 1. 7000-Series Space Gray Anodized Aluminum
      this.materials.aluminum = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.88,
        roughness: 0.32
      });

      // 2. Shiny Chamfered Metal Edge
      this.materials.chamfer = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.98,
        roughness: 0.12
      });

      // 3. Antenna Isolation Plastic Strips
      this.materials.antennaStrip = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.1,
        roughness: 0.85
      });

      // 4. Glossy Ion-X Glass Screen
      this.materials.glass = new THREE.MeshPhysicalMaterial({
        color: 0x050811,
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.75,
        transparent: true,
        opacity: 0.92,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05
      });

      // 5. Active Retina LCD Display Surface
      this.materials.lcdScreen = new THREE.MeshStandardMaterial({
        color: 0x0a1428,
        emissive: 0x0f274a,
        emissiveIntensity: 0.45,
        roughness: 0.2,
        metalness: 0.1
      });

      // 6. Stainless Steel (Touch ID ring, Taptic chassis, Shield Cans)
      this.materials.steel = new THREE.MeshStandardMaterial({
        color: 0xcfd8dc,
        metalness: 0.95,
        roughness: 0.22
      });

      // 7. Dark Green HDI PCB Substrate
      this.materials.pcb = new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        roughness: 0.45,
        metalness: 0.15
      });

      // 8. Gold Plated Test Pads & Contacts (ENIG)
      this.materials.gold = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.92,
        roughness: 0.18
      });

      // 9. Black Epoxy Chip Encapsulation (IC Body)
      this.materials.chipBlack = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.38,
        metalness: 0.25
      });

      // 10. Bare Silicon Substrate Surface (Sleek dark finish, non-glare high contrast)
      this.materials.siliconDie = new THREE.MeshStandardMaterial({
        color: 0x050a14,
        roughness: 0.38,
        metalness: 0.82
      });

      // 11. Matte Black Battery Pouch
      this.materials.battery = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.72,
        metalness: 0.08
      });

      // 12. Copper Coils / Traces
      this.materials.copper = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.25,
        metalness: 0.88
      });

      // 13. Camera Sapphire Lens Element
      this.materials.lens = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        metalness: 0.2,
        roughness: 0.05,
        transmission: 0.85,
        transparent: true,
        opacity: 0.95,
        reflectivity: 0.98
      });

      // Selection & Highlight helper materials
      this.materials.highlight = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.5
      });

      this.materials.wireframe = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });

      // 14. Keycap Material (matte dark slate)
      this.materials.keycap = new THREE.MeshStandardMaterial({
        color: 0x181e28,
        roughness: 0.72,
        metalness: 0.15
      });

      // 15. Mirror Chrome Apple Logo
      this.materials.appleLogoChrome = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.98,
        roughness: 0.08
      });

      // 16. Retina IPS Display Panel (macOS Big Sur glow)
      this.materials.retinaBigSur = new THREE.MeshStandardMaterial({
        color: 0x07111e,
        emissive: 0x1e3a5f,
        emissiveIntensity: 0.55,
        roughness: 0.25,
        metalness: 0.1
      });

      // 17. Battery Pouch Mylar Wrap
      this.materials.batteryMylar = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.45,
        metalness: 0.3
      });

      // 18. Fanless Aluminum Heatsink
      this.materials.heatsinkAluminum = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        metalness: 0.92,
        roughness: 0.28
      });
    }

    createRoundedBox(w, h, d, r, material) {
      const shape = new THREE.Shape();
      const x = -w / 2, y = -h / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);

      const extrudeSettings = {
        depth: d,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: r * 0.4,
        bevelThickness: r * 0.4
      };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      const mesh = new THREE.Mesh(geom, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    }

    // ==========================================
    // 1. BUILD PHYSICAL SMARTPHONE (MODE A)
    // ==========================================
    buildPhysicalPhone() {
      const comps = this.data.PHYSICAL_COMPONENTS;
      const compMap = new Map();
      comps.forEach(c => compMap.set(c.id, c));

      // --- 1. Aluminum Unibody Housing ---
      const unibodyData = compMap.get('aluminum_unibody');
      const unibody = this.createRoundedBox(6.7, 13.8, 0.45, 0.55, this.materials.aluminum);
      unibody.position.set(0, 0, -0.2);
      
      // Add antenna bands
      const bandTop = new THREE.Mesh(new THREE.BoxGeometry(6.65, 0.08, 0.46), this.materials.antennaStrip);
      bandTop.position.set(0, 4.8, 0);
      unibody.add(bandTop);
      const bandBot = new THREE.Mesh(new THREE.BoxGeometry(6.65, 0.08, 0.46), this.materials.antennaStrip);
      bandBot.position.set(0, -4.8, 0);
      unibody.add(bandBot);

      // Camera ring bump
      const camBump = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.58, 0.2, 32), this.materials.chamfer);
      camBump.rotation.x = Math.PI / 2;
      camBump.position.set(2.35, 5.65, -0.32);
      unibody.add(camBump);

      // Apple logo engraving on back
      const logo = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.02, 32), this.materials.chamfer);
      logo.rotation.x = Math.PI / 2;
      logo.position.set(0, 1.8, -0.24);
      unibody.add(logo);

      this.registerComponentMesh(unibody, unibodyData, this.physicalGroup);

      // --- 2. Lightning & Headphone Flex ---
      const ioFlexData = compMap.get('lightning_audio_flex');
      const ioFlexGroup = new THREE.Group();
      const ioBar = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.6, 0.25), this.materials.chipBlack);
      const hpJack = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.8, 24), this.materials.gold);
      hpJack.rotation.x = Math.PI / 2;
      hpJack.position.set(-2.2, -0.1, 0);
      const ltPort = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.25, 0.5), this.materials.steel);
      ltPort.position.set(0, -0.2, 0);
      ioFlexGroup.add(ioBar, hpJack, ltPort);
      ioFlexGroup.position.set(0, -6.1, 0.1);
      this.registerComponentMesh(ioFlexGroup, ioFlexData, this.physicalGroup);

      // --- 3. Loudspeaker Chamber ---
      const speakerData = compMap.get('loudspeaker_chamber');
      const speaker = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.2, 0.35), this.materials.chipBlack);
      speaker.position.set(1.5, -5.2, 0.2);
      this.registerComponentMesh(speaker, speakerData, this.physicalGroup);

      // --- 4. Taptic Engine ---
      const tapticData = compMap.get('taptic_engine');
      const tapticGroup = new THREE.Group();
      const tapticCase = this.createRoundedBox(2.8, 1.1, 0.32, 0.1, this.materials.steel);
      const tapticCoil = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.2), this.materials.copper);
      tapticCoil.position.set(0, 0, 0.12);
      tapticGroup.add(tapticCase, tapticCoil);
      tapticGroup.position.set(-1.4, -5.2, 0.2);
      this.registerComponentMesh(tapticGroup, tapticData, this.physicalGroup);

      // --- 5. 1715 mAh Battery Pack ---
      const batteryData = compMap.get('battery_pack');
      const battery = this.createRoundedBox(3.4, 9.2, 0.32, 0.15, this.materials.battery);
      battery.position.set(-1.25, -0.4, 0.2);
      // Battery flex connector tab
      const battTab = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.1), this.materials.gold);
      battTab.position.set(1.7, 3.8, 0.1);
      battery.add(battTab);
      this.registerComponentMesh(battery, batteryData, this.physicalGroup);

      // --- 6. 12MP iSight Camera ---
      const camData = compMap.get('rear_isight_camera');
      const camGroup = new THREE.Group();
      const camHousing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.5), this.materials.steel);
      const camLens = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.52, 32), this.materials.lens);
      camLens.rotation.x = Math.PI / 2;
      camGroup.add(camHousing, camLens);
      camGroup.position.set(2.35, 5.65, 0.2);
      this.registerComponentMesh(camGroup, camData, this.physicalGroup);

      // --- 7. L-Shaped Motherboard ---
      const mbData = compMap.get('motherboard');
      const mbGroup = new THREE.Group();
      // Main vertical spine
      const mbSpine = new THREE.Mesh(new THREE.BoxGeometry(1.8, 8.8, 0.18), this.materials.pcb);
      mbSpine.position.set(0, 0, 0);
      // Top horizontal branch
      const mbTopBranch = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 0.18), this.materials.pcb);
      mbTopBranch.position.set(-0.7, 3.3, 0);
      mbGroup.add(mbSpine, mbTopBranch);

      // Shield cans on Motherboard
      const shieldCanFront = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.4, 0.12), this.materials.steel);
      shieldCanFront.position.set(0, -0.4, 0.12);
      mbGroup.add(shieldCanFront);

      mbGroup.position.set(2.1, 0.8, 0.2);
      this.registerComponentMesh(mbGroup, mbData, this.physicalGroup);

      // --- 8. Display Backplate & Shield Plate ---
      const plateData = compMap.get('display_shield_plate');
      const shieldPlate = new THREE.Mesh(new THREE.BoxGeometry(6.3, 12.8, 0.08), this.materials.steel);
      shieldPlate.position.set(0, 0, 0.5);
      this.registerComponentMesh(shieldPlate, plateData, this.physicalGroup);

      // --- 9. Front Camera & Sensor Flex ---
      const frontCamData = compMap.get('front_camera_sensor_flex');
      const frontCamGroup = new THREE.Group();
      const fCamCube = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.2), this.materials.lens);
      const earpiece = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 0.15), this.materials.gold);
      earpiece.position.set(0, 0.4, 0);
      frontCamGroup.add(fCamCube, earpiece);
      frontCamGroup.position.set(0, 5.8, 0.65);
      this.registerComponentMesh(frontCamGroup, frontCamData, this.physicalGroup);

      // --- 10. Home Button / Touch ID ---
      const homeData = compMap.get('home_touch_id');
      const homeGroup = new THREE.Group();
      const touchRing = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.08, 32), this.materials.steel);
      touchRing.rotation.x = Math.PI / 2;
      const homeLens = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.09, 32), this.materials.chipBlack);
      homeLens.rotation.x = Math.PI / 2;
      homeGroup.add(touchRing, homeLens);
      homeGroup.position.set(0, -5.6, 0.65);
      this.registerComponentMesh(homeGroup, homeData, this.physicalGroup);

      // --- 11. Retina Display & 3D Touch Glass ---
      const dispData = compMap.get('display_assembly');
      const dispGroup = new THREE.Group();
      const glass = this.createRoundedBox(6.65, 13.75, 0.2, 0.5, this.materials.glass);
      const activeLcd = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 10.4), this.materials.lcdScreen);
      activeLcd.position.set(0, 0.1, 0.11);
      dispGroup.add(glass, activeLcd);
      dispGroup.position.set(0, 0, 0.85);
      this.registerComponentMesh(dispGroup, dispData, this.physicalGroup);
    }

    // ==========================================
    // 2. BUILD MOTHERBOARD & CHIPS (MODE B)
    // ==========================================
    buildMotherboard() {
      // Create high-detail isolated PCB board for Mode B
      this.mbBoardMesh = new THREE.Group();

      // Dual-sided PCB geometry
      const pcbMat = this.materials.pcb.clone();
      const pcbSpine = new THREE.Mesh(new THREE.BoxGeometry(3.6, 14.2, 0.22), pcbMat);
      const pcbTopBranch = new THREE.Mesh(new THREE.BoxGeometry(6.4, 3.8, 0.22), pcbMat);
      pcbTopBranch.position.set(-1.4, 5.2, 0);
      this.mbBoardMesh.add(pcbSpine, pcbTopBranch);

      // Gold edge test pads
      for (let i = 0; i < 28; i++) {
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.23), this.materials.gold);
        pad.position.set(1.7, -6 + i * 0.45, 0);
        this.mbBoardMesh.add(pad);
      }

      this.motherboardGroup.add(this.mbBoardMesh);

      // Place all verified teardown ICs
      const chips = this.data.CHIPS_DATA;
      chips.forEach(chip => {
        const chipMesh = this.createChipMesh(chip);
        this.chipMeshes.set(chip.id, chipMesh);
        this.mbBoardMesh.add(chipMesh);
        this.clickableObjects.push(chipMesh);
      });

      this.motherboardGroup.visible = false;
    }

    createChipMesh(chip) {
      const g = new THREE.Group();
      g.userData = {
        type: 'chip',
        data: chip,
        id: chip.id
      };

      let w = 1.0, h = 1.0, d = 0.2;
      let pos = { x: 0, y: 0, z: 0.18 };
      let col = 0x1e293b;

      // Coordinate placement on L-shaped logic board
      switch (chip.id) {
        case 'chip_a9_soc':
          w = 2.4; h = 2.4; d = 0.24;
          pos = { x: 0.1, y: 2.2, z: 0.22 };
          col = 0x0f172a;
          break;
        case 'chip_lpddr4_ram':
          w = 2.4; h = 2.4; d = 0.18;
          pos = { x: 0.1, y: 2.2, z: 0.40 };
          col = 0x1e1b4b;
          break;
        case 'chip_nand_flash':
          w = 2.2; h = 1.8; d = 0.22;
          pos = { x: 0.1, y: -0.8, z: 0.22 };
          col = 0x18181b;
          break;
        case 'chip_main_pmic':
          w = 1.6; h = 1.4; d = 0.18;
          pos = { x: 0.1, y: 4.8, z: 0.2 };
          col = 0x27272a;
          break;
        case 'chip_wifi_bt':
          w = 2.0; h = 1.6; d = 0.22;
          pos = { x: -2.6, y: 5.6, z: 0.2 };
          col = 0x09090b;
          break;
        case 'chip_nfc':
          w = 1.0; h = 0.9; d = 0.16;
          pos = { x: -3.8, y: 4.2, z: 0.18 };
          col = 0x1c1917;
          break;
        case 'chip_touch_ti':
          w = 1.2; h = 1.1; d = 0.16;
          pos = { x: -1.0, y: 4.2, z: 0.18 };
          col = 0x1f2937;
          break;
        case 'chip_audio_codec':
          w = 1.1; h = 1.0; d = 0.16;
          pos = { x: 0.1, y: -2.8, z: 0.18 };
          col = 0x1e293b;
          break;
        case 'chip_audio_amp':
          w = 0.8; h = 0.8; d = 0.14;
          pos = { x: 0.8, y: -4.2, z: 0.18 };
          col = 0x1e293b;
          break;
        case 'chip_tristar':
          w = 0.7; h = 0.7; d = 0.14;
          pos = { x: -0.6, y: -4.2, z: 0.18 };
          col = 0x1e293b;
          break;

        // Side B (Back of board - negative Z)
        case 'chip_lte_modem':
          w = 2.0; h = 2.0; d = 0.2;
          pos = { x: 0.1, y: 1.5, z: -0.22 };
          col = 0x0284c7;
          break;
        case 'chip_rf_transceiver':
          w = 1.4; h = 1.3; d = 0.16;
          pos = { x: 0.1, y: 3.6, z: -0.2 };
          col = 0x0369a1;
          break;
        case 'chip_rf_fem':
          w = 1.8; h = 1.4; d = 0.22;
          pos = { x: 0.1, y: 5.4, z: -0.22 };
          col = 0x075985;
          break;
        case 'chip_imu':
          w = 0.8; h = 0.8; d = 0.14;
          pos = { x: -1.2, y: 4.8, z: -0.18 };
          col = 0x475569;
          break;
        case 'chip_barometer':
          w = 0.6; h = 0.5; d = 0.14;
          pos = { x: -2.4, y: 4.8, z: -0.18 };
          col = 0x64748b;
          break;
        default:
          pos = { x: 0, y: -5.5, z: 0.18 };
      }

      // Molded black epoxy package
      const chipMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.35,
        metalness: 0.3
      });
      const chipBody = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), chipMat);
      g.add(chipBody);

      // Pin 1 dot marker
      const pin1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), this.materials.gold);
      pin1.rotation.x = Math.PI / 2;
      pin1.position.set(-w / 2 + 0.2, h / 2 - 0.2, d / 2 + 0.01);
      g.add(pin1);

      // Gold solder ball array underneath
      const balls = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, h * 0.9, 0.06), this.materials.gold);
      balls.position.set(0, 0, -d / 2 - 0.02);
      g.add(balls);

      g.position.set(pos.x, pos.y, pos.z);
      g.userData.basePos = g.position.clone();
      g.userData.side = chip.boardSide;

      return g;
    }

    // ==========================================
    // 3. BUILD APPLE A9 SILICON DIE (MODE C)
    // ==========================================
    buildArchitectureDie() {
      // 1. Bare Silicon Die Base Substrate (10mm x 10mm normalized to 10 x 10 units)
      const dieBase = new THREE.Mesh(
        new THREE.BoxGeometry(10.4, 10.4, 0.45),
        this.materials.siliconDie
      );
      dieBase.position.set(0, 0, 0);
      this.architectureGroup.add(dieBase);

      // Microscopic interconnect grid texture lines (M1-M11 copper metallization)
      const gridHelper = new THREE.GridHelper(10.2, 24, 0x0284c7, 0x0f172a);
      gridHelper.rotation.x = Math.PI / 2;
      gridHelper.position.set(0, 0, 0.24);
      this.architectureGroup.add(gridHelper);

      // Die border guard ring (TSMC/Samsung seal ring)
      const guardRing = new THREE.Mesh(
        new THREE.RingGeometry(4.9, 5.15, 4),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 })
      );
      guardRing.rotation.z = Math.PI / 4;
      guardRing.position.set(0, 0, 0.26);
      this.architectureGroup.add(guardRing);

      // High-speed on-die bus lines (Crossbar & Fabric Interconnect traces)
      const createBus = (p1, p2, col) => {
        const mat = new THREE.LineBasicMaterial({ color: col || 0x38bdf8, linewidth: 2, transparent: true, opacity: 0.85 });
        const geom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(p1[0], p1[1], 0.28),
          new THREE.Vector3(p2[0], p2[1], 0.28)
        ]);
        const line = new THREE.Line(geom, mat);
        this.architectureGroup.add(line);
      };

      // CPU Cores to L2 Cache
      createBus([-2.3, 0.5], [-2.3, -0.3], 0x38bdf8);
      createBus([0.1, 0.5], [0.1, -0.3], 0x38bdf8);
      // L2 to SLC
      createBus([-1.1, -0.9], [-1.1, -1.05], 0x2dd4bf);
      // GPU to SLC
      createBus([1.5, -0.3], [1.2, -1.8], 0xa855f7);
      // SLC to Interconnect NoC
      createBus([-1.1, -2.55], [-1.1, -3.1], 0xfbbf24);
      // Interconnect to LPDDR4 PHY
      createBus([0.0, -3.35], [0.0, -3.75], 0x3b82f6);
      createBus([-3.0, -3.35], [-3.0, -3.75], 0x3b82f6);
      createBus([3.0, -3.35], [3.0, -3.75], 0x3b82f6);
      // PCIe NVMe to Interconnect
      createBus([2.0, -2.8], [2.0, -3.1], 0x06b6d4);
      // Apple ISP to Interconnect
      createBus([-3.8, -1.3], [-3.8, -3.1], 0xf43f5e);

      // 2. Microarchitecture IP Functional Blocks
      const blocks = this.data.A9_DIE_BLOCKS || [];
      const blockLayouts = {
        'twister_core_0': { w: 2.2, h: 3.2, x: -2.3, y: 2.1, color: 0x38bdf8, label: 'CPU CORE 0\nTWISTER' },
        'twister_core_1': { w: 2.2, h: 3.2, x: 0.1, y: 2.1, color: 0x38bdf8, label: 'CPU CORE 1\nTWISTER' },
        'shared_l2_cache': { w: 4.6, h: 1.2, x: -1.1, y: -0.3, color: 0x2dd4bf, label: '3MB L2 CACHE' },
        'powervr_gt7600_gpu': { w: 4.2, h: 3.6, x: 2.6, y: 0.8, color: 0xa855f7, label: 'PowerVR GT7600\n6× GPU CLUSTERS' },
        'system_level_cache': { w: 4.6, h: 1.5, x: -1.1, y: -1.8, color: 0xfbbf24, label: '8MB SLC (SYSTEM CACHE)' },
        'lpddr4_mem_ctrl': { w: 9.6, h: 0.9, x: 0.0, y: -4.2, color: 0x3b82f6, label: 'LPDDR4-3200 DUAL PHY' },
        'apple_isp': { w: 1.8, h: 1.8, x: -3.8, y: -0.4, color: 0xf43f5e, label: 'APPLE ISP' },
        'secure_enclave': { w: 1.5, h: 1.5, x: 3.8, y: -2.4, color: 0xeab308, label: 'SECURE ENCLAVE' },
        'm9_motion_hub': { w: 1.4, h: 1.4, x: -3.8, y: 2.8, color: 0xf97316, label: 'M9 MOTION' },
        'pcie_nvme_ctrl': { w: 1.8, h: 1.2, x: 2.0, y: -2.4, color: 0x06b6d4, label: 'PCIe NVMe' },
        'system_interconnect': { w: 9.6, h: 0.5, x: 0.0, y: -3.1, color: 0x64748b, label: 'CROSSBAR NoC' }
      };

      blocks.forEach(b => {
        const layout = blockLayouts[b.id] || { w: 1.5, h: 1.5, x: 0, y: 0, color: 0x94a3b8, label: b.name };
        const blockMesh = this.createArchBlockMesh(b, layout);
        this.archMeshes.set(b.id, blockMesh);
        this.architectureGroup.add(blockMesh);
        this.clickableObjects.push(blockMesh);
      });

      this.architectureGroup.visible = false;
    }

    createArchBlockMesh(blockData, layout) {
      const g = new THREE.Group();
      g.userData = {
        type: 'arch_block',
        data: blockData,
        id: blockData.id
      };

      // Base solid block with subtle emissive tint
      const mat = new THREE.MeshStandardMaterial({
        color: 0x091122,
        emissive: layout.color,
        emissiveIntensity: 0.12,
        roughness: 0.28,
        metalness: 0.65
      });

      const body = new THREE.Mesh(new THREE.BoxGeometry(layout.w, layout.h, 0.26), mat);
      g.add(body);

      // Razor-sharp glowing neon outline
      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(layout.w, layout.h, 0.27)),
        new THREE.LineBasicMaterial({ color: layout.color, linewidth: 2 })
      );
      g.add(wire);

      // High-resolution Canvas Texture for crisp vector-like text
      const cw = Math.max(768, Math.round(layout.w * 240));
      const ch = Math.max(384, Math.round(layout.h * 240));
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = cw;
      labelCanvas.height = ch;
      const ctx = labelCanvas.getContext('2d');

      // Crisp background
      ctx.fillStyle = '#060c18';
      ctx.fillRect(0, 0, cw, ch);

      // Top colored accent banner
      const bannerH = Math.max(28, Math.round(ch * 0.18));
      const hex = typeof layout.color === 'number' ? '#' + layout.color.toString(16).padStart(6, '0') : layout.color;
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, cw, bannerH);

      // Outer accent border
      ctx.strokeStyle = hex;
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, cw - 8, ch - 8);

      // Subsystem Tag inside banner
      ctx.fillStyle = '#020617';
      const catText = (blockData.category || 'SILICON IP').toUpperCase();
      ctx.font = `bold ${Math.max(16, Math.round(bannerH * 0.58))}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(catText, cw / 2, bannerH / 2);

      // Parse multi-line title or layout.label
      const rawLines = (layout.label || blockData.name).split('\n');
      const titleLine = rawLines[0] || blockData.name;
      const subLine = rawLines[1] || (blockData.clock ? `${blockData.clock}` : (blockData.capacity ? `${blockData.capacity}` : ''));

      // Primary Title
      ctx.fillStyle = '#ffffff';
      const titleSize = Math.max(22, Math.min(Math.round(cw * 0.08), Math.round(ch * 0.22)));
      ctx.font = `bold ${titleSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const titleY = subLine ? bannerH + (ch - bannerH) * 0.38 : bannerH + (ch - bannerH) * 0.5;
      ctx.fillText(titleLine, cw / 2, titleY);

      // Secondary subtitle / spec
      if (subLine) {
        ctx.fillStyle = hex;
        const subSize = Math.max(18, Math.min(Math.round(cw * 0.065), Math.round(ch * 0.18)));
        ctx.font = `600 ${subSize}px "Outfit", sans-serif`;
        const subY = bannerH + (ch - bannerH) * 0.72;
        ctx.fillText(subLine, cw / 2, subY);
      }

      const textTex = new THREE.CanvasTexture(labelCanvas);
      textTex.generateMipmaps = true;
      textTex.minFilter = THREE.LinearMipmapLinearFilter;
      textTex.magFilter = THREE.LinearFilter;
      if (this.renderer && this.renderer.capabilities) {
        textTex.anisotropy = Math.min(this.renderer.capabilities.getMaxAnisotropy(), 8);
      }
      textTex.needsUpdate = true;

      const textPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(layout.w * 0.96, layout.h * 0.94),
        new THREE.MeshBasicMaterial({ map: textTex, transparent: false })
      );
      textPlane.position.set(0, 0, 0.145);
      textPlane.userData = { isLabel: true };
      g.add(textPlane);

      g.position.set(layout.x, layout.y, 0.4);
      g.userData.basePos = g.position.clone();

      return g;
    }

    // ==========================================
    // 4. ANIMATED DATA FLOW PARTICLES
    // ==========================================
    buildDataFlowParticles() {
      const particleCount = 120;
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 8.0;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
        positions[i * 3 + 2] = 0.55 + Math.random() * 0.4;

        colors[i * 3 + 0] = 0.22; // #38bdf8
        colors[i * 3 + 1] = 0.74;
        colors[i * 3 + 2] = 0.97;
      }

      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });

      this.dataPoints = new THREE.Points(geom, mat);
      this.particlesGroup.add(this.dataPoints);
      this.particlesGroup.visible = false;
    }

    registerComponentMesh(mesh, data, parentGroup) {
      mesh.userData = {
        type: 'physical',
        data: data,
        id: data.id,
        layerIndex: data.layerIndex,
        basePos: mesh.position.clone(),
        explodeOffset: new THREE.Vector3(
          data.explodeOffset.x || 0,
          data.explodeOffset.y || 0,
          data.explodeOffset.z || 0
        )
      };

      this.physicalMeshes.set(data.id, mesh);
      parentGroup.add(mesh);
      this.clickableObjects.push(mesh);
    }

    // ==========================================
    // 5. INTERACTION & CONTROLS
    // ==========================================
    setupControls() {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.minDistance = 4.0;
      this.controls.maxDistance = 50.0;
      this.controls.maxPolarAngle = Math.PI * 0.92;
    }

    setupEvents() {
      window.addEventListener('resize', () => this.onWindowResize());

      this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
      this.canvas.addEventListener('click', (e) => this.onClick(e));
      this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    }

    onWindowResize() {
      if (!this.canvas) return;
      const width = this.canvas.clientWidth || window.innerWidth;
      const height = this.canvas.clientHeight || window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    onMouseMove(e) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    onTouchStart(e) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        this.handleClickRaycast();
      }
    }

    onClick() {
      this.handleClickRaycast();
    }

    handleClickRaycast() {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const activeObjects = this.getActiveClickables();
      const intersects = this.raycaster.intersectObjects(activeObjects, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit && !hit.userData.type && hit.parent) {
          hit = hit.parent;
        }
        if (hit && hit.userData.type) {
          this.selectItem(hit);
          return;
        }
      }

      // Clicked in empty space -> unselect
      this.selectItem(null);
    }

    getActiveClickables() {
      if (this.mode === 'physical') {
        return Array.from(this.physicalMeshes.values());
      } else if (this.mode === 'motherboard') {
        return Array.from(this.chipMeshes.values());
      } else if (this.mode === 'architecture') {
        return Array.from(this.archMeshes.values());
      }
      return [];
    }

    selectItem(item) {
      this.selectedItem = item;

      // Reset scales / highlights
      this.clickableObjects.forEach(obj => {
        if (obj.userData.type === 'chip' || obj.userData.type === 'arch_block') {
          obj.scale.set(1.0, 1.0, 1.0);
        }
      });

      if (item) {
        // Subtle pop animation
        item.scale.set(1.08, 1.08, 1.08);

        // Move inspector light near selected object
        const worldPos = new THREE.Vector3();
        item.getWorldPosition(worldPos);
        this.inspectorLight.position.set(worldPos.x, worldPos.y, worldPos.z + 4);

        if (this.onSelectCallback) {
          this.onSelectCallback(item.userData);
        }
      } else {
        if (this.onSelectCallback) {
          this.onSelectCallback(null);
        }
      }
    }

    selectItemById(id) {
      let target = this.physicalMeshes.get(id) || this.chipMeshes.get(id) || this.archMeshes.get(id);
      if (target) {
        this.selectItem(target);
      }
    }

    setMode(newMode) {
      this.mode = newMode;
      this.selectItem(null);

      if (newMode === 'physical') {
        this.scene.fog = new THREE.FogExp2(0x020617, 0.008);
        this.physicalGroup.visible = true;
        this.motherboardGroup.visible = false;
        this.architectureGroup.visible = false;
        this.particlesGroup.visible = false;

        if (this.isMacBook) {
          this.camTargetPos.set(0, -14, 20);
        } else {
          this.camTargetPos.set(0, -2, 22);
        }
        this.camTargetLookAt.set(0, 0, 0);
      } else if (newMode === 'motherboard') {
        this.scene.fog = null; // Crisp view for logic board ICs
        this.physicalGroup.visible = false;
        this.motherboardGroup.visible = true;
        this.architectureGroup.visible = false;
        this.particlesGroup.visible = false;

        this.setMotherboardSide(this.currentBoardSide);
        this.camTargetPos.set(0, 0, 15);
        this.camTargetLookAt.set(0, 0, 0);
      } else if (newMode === 'architecture') {
        this.scene.fog = null; // ELIMINATE ALL FOG BLUR - crystal clear silicon die view
        this.physicalGroup.visible = false;
        this.motherboardGroup.visible = false;
        this.architectureGroup.visible = true;
        this.particlesGroup.visible = true;

        this.camTargetPos.set(0, 0, 15);
        this.camTargetLookAt.set(0, 0, 0);
      }
    }

    setMotherboardSide(side) {
      this.currentBoardSide = side;
      if (side === 'front') {
        this.mbBoardMesh.rotation.y = 0;
      } else {
        this.mbBoardMesh.rotation.y = Math.PI;
      }
    }

    flipMotherboard() {
      const nextSide = this.currentBoardSide === 'front' ? 'back' : 'front';
      this.setMotherboardSide(nextSide);
      return nextSide;
    }

    setLidAngle(deg) {
      this.targetLidAngle = Math.max(0, Math.min(135, deg));
    }

    setExplode(val) {
      this.targetExplode = Math.max(0, Math.min(1.0, val));
    }

    setIsolate(isolated) {
      this.isIsolated = isolated;
      if (this.mode === 'physical') {
        this.physicalMeshes.forEach(mesh => {
          if (isolated && this.selectedItem) {
            mesh.visible = (mesh === this.selectedItem);
          } else {
            mesh.visible = true;
          }
        });
      }
    }

    setWireframe(wireframe) {
      this.isWireframe = wireframe;
      const applyWf = (obj) => {
        obj.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.wireframe = wireframe;
          }
        });
      };
      applyWf(this.physicalGroup);
      applyWf(this.motherboardGroup);
      applyWf(this.architectureGroup);
    }

    resetCamera() {
      if (this.mode === 'physical') {
        this.camera.position.set(0, -2, 22);
      } else if (this.mode === 'motherboard') {
        this.camera.position.set(0, 0, 15);
      } else if (this.mode === 'architecture') {
        this.camera.position.set(0, 0, 15);
      }
      this.controls.target.set(0, 0, 0);
      this.controls.update();
      this.setExplode(0);
    }

    setCameraPreset(preset) {
      switch (preset) {
        case 'isometric':
          this.camera.position.set(12, -14, 16);
          this.controls.target.set(0, 0, 0);
          break;
        case 'front':
          this.camera.position.set(0, 0, 20);
          this.controls.target.set(0, 0, 0);
          break;
        case 'back':
          this.camera.position.set(0, 0, -20);
          this.controls.target.set(0, 0, 0);
          break;
        case 'top':
          this.camera.position.set(0, 20, 2);
          this.controls.target.set(0, 0, 0);
          break;
      }
      this.controls.update();
    }

    zoomIn(step = 0.82) {
      if (!this.camera || !this.controls) return;
      const target = this.controls.target;
      const offset = this.camera.position.clone().sub(target);
      const minD = this.controls.minDistance || 3.5;
      if (offset.length() * step >= minD) {
        offset.multiplyScalar(step);
        this.camera.position.copy(target).add(offset);
        this.controls.update();
      }
    }

    zoomOut(step = 1.22) {
      if (!this.camera || !this.controls) return;
      const target = this.controls.target;
      const offset = this.camera.position.clone().sub(target);
      const maxD = this.controls.maxDistance || 60;
      if (offset.length() * step <= maxD) {
        offset.multiplyScalar(step);
        this.camera.position.copy(target).add(offset);
        this.controls.update();
      }
    }

    toggleLabels() {
      this.labelsVisible = !this.labelsVisible;
      const toggle = (obj) => {
        obj.traverse(child => {
          if (child.userData && child.userData.isLabel) {
            child.visible = this.labelsVisible;
          }
        });
      };
      toggle(this.physicalGroup);
      toggle(this.motherboardGroup);
      toggle(this.architectureGroup);
      return this.labelsVisible;
    }

    // ==========================================
    // 6. MAIN RENDER & ANIMATION LOOP
    // ==========================================
    animate() {
      requestAnimationFrame(() => this.animate());

      const dt = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // Smooth Explode view interpolation
      this.explodeFactor += (this.targetExplode - this.explodeFactor) * 0.1;

      // Smooth Lid Angle interpolation for MacBook
      if (this.isMacBook && this.displayAssemblyGroup) {
        this.lidAngle += (this.targetLidAngle - this.lidAngle) * 0.08;
        this.displayAssemblyGroup.rotation.x = -((this.lidAngle * Math.PI) / 180);
      }

      if (this.mode === 'physical') {
        this.physicalMeshes.forEach(mesh => {
          const u = mesh.userData;
          if (u.basePos && u.explodeOffset) {
            mesh.position.x = u.basePos.x + u.explodeOffset.x * this.explodeFactor;
            mesh.position.y = u.basePos.y + u.explodeOffset.y * this.explodeFactor;
            mesh.position.z = u.basePos.z + u.explodeOffset.z * this.explodeFactor;
          }
        });
      }

      // Animate data flow particles in Architecture mode
      if (this.mode === 'architecture' && this.dataPoints) {
        const positions = this.dataPoints.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time * 3.0 + i) * 0.015;
          positions[i + 0] += Math.cos(time * 2.0 + i) * 0.01;
          if (positions[i + 1] > 4.5) positions[i + 1] = -4.5;
          if (positions[i + 0] > 4.8) positions[i + 0] = -4.8;
        }
        this.dataPoints.geometry.attributes.position.needsUpdate = true;
      }

      // Auto-rotation
      if (this.isAutoRotate) {
        this.rootGroup.rotation.y += 0.005;
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    // ==========================================
    // 7. MACBOOK AIR M1 ENVIRONMENT IMPLEMENTATIONS
    // ==========================================
    buildPhysicalMacBook() {
      const comps = this.data.PHYSICAL_COMPONENTS || [];
      const compMap = new Map();
      comps.forEach(c => compMap.set(c.id, c));

      // 1. Lower Wedge Aluminum Case
      const caseData = compMap.get('aluminum_wedge_case');
      const wedge = this.createRoundedBox(13.2, 9.2, 0.45, 0.4, this.materials.aluminum);
      wedge.position.set(0, 0, -0.25);
      this.registerComponentMesh(wedge, caseData, this.physicalGroup);

      // 2. Battery pack
      const battData = compMap.get('three_cell_battery');
      const battGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const cell = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.4, 0.22), this.materials.batteryMylar || this.materials.battery);
        cell.position.set(-3.8 + i * 3.8, -2.2, 0.1);
        battGroup.add(cell);
      }
      this.registerComponentMesh(battGroup, battData, this.physicalGroup);

      // 3. Trackpad
      const tpData = compMap.get('force_touch_trackpad');
      const tp = new THREE.Mesh(new THREE.BoxGeometry(4.8, 3.2, 0.1), this.materials.chamfer);
      tp.position.set(0, -2.4, 0.18);
      this.registerComponentMesh(tp, tpData, this.physicalGroup);

      // 4. Keyboard Deck
      const kbData = compMap.get('scissor_switch_keyboard');
      const kbGroup = new THREE.Group();
      const kbWell = new THREE.Mesh(new THREE.BoxGeometry(11.2, 4.4, 0.05), this.materials.aluminum);
      kbWell.position.set(0, 1.8, 0.12);
      kbGroup.add(kbWell);
      // Keycaps grid
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 14; c++) {
          const key = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.08), this.materials.keycap);
          key.position.set(-4.8 + c * 0.74, 0.4 + r * 0.74, 0.18);
          kbGroup.add(key);
        }
      }
      this.registerComponentMesh(kbGroup, kbData, this.physicalGroup);

      // 5. Fanless Aluminum Heatsink
      const hsData = compMap.get('fanless_aluminum_heatsink');
      const hs = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.0, 0.16), this.materials.heatsinkAluminum || this.materials.aluminum);
      hs.position.set(2.2, 1.6, 0.22);
      this.registerComponentMesh(hs, hsData, this.physicalGroup);

      // 6. Display Assembly (Hinged Lid)
      const dispData = compMap.get('retina_display_assembly');
      this.displayAssemblyGroup = new THREE.Group();
      this.displayAssemblyGroup.position.set(0, 4.6, 0.1); // Hinge line

      const lid = this.createRoundedBox(13.2, 9.2, 0.28, 0.35, this.materials.aluminum);
      lid.position.set(0, 4.6, 0); // Offset from hinge

      const screen = new THREE.Mesh(new THREE.PlaneGeometry(12.0, 7.8), this.materials.retinaBigSur || this.materials.lcdScreen);
      screen.position.set(0, 4.6, 0.16);

      const appleLogo = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.02, 32), this.materials.appleLogoChrome || this.materials.chamfer);
      appleLogo.rotation.x = Math.PI / 2;
      appleLogo.position.set(0, 4.6, -0.16);

      this.displayAssemblyGroup.add(lid, screen, appleLogo);
      this.displayAssemblyGroup.rotation.x = -((this.lidAngle * Math.PI) / 180);
      this.registerComponentMesh(this.displayAssemblyGroup, dispData, this.physicalGroup);
    }

    buildMotherboardMacBook() {
      // Main compact L-shaped PCB
      const pcbMat = this.materials.pcb.clone();
      this.mbBoardMesh = new THREE.Mesh(new THREE.BoxGeometry(10.5, 4.5, 0.2), pcbMat);
      this.mbBoardMesh.position.set(0, 0, 0);
      this.motherboardGroup.add(this.mbBoardMesh);

      // Add verified IC chips
      const chips = this.data.CHIPS_DATA || [];
      const chipPositions = {
        'apple_m1_soc_unified_memory': { x: 0, y: 0.2, z: 0.16, w: 3.4, h: 3.0, d: 0.18, color: 0x111827 },
        'apple_m1_silicon_die': { x: -0.6, y: 0.2, z: 0.28, w: 1.8, h: 1.9, d: 0.1, color: 0x1e1b4b },
        'skhynix_lpddr4x_sdram_8gb': { x: 1.0, y: 0.2, z: 0.28, w: 1.2, h: 2.2, d: 0.1, color: 0x182235 },
        'kioxia_nand_flash_storage': { x: -3.6, y: -0.4, z: 0.16, w: 1.6, h: 1.8, d: 0.14, color: 0x1e293b },
        'apple_t2_pmic_343s00420': { x: 2.8, y: -0.8, z: 0.16, w: 1.2, h: 1.2, d: 0.12, color: 0x1f2937 },
        'intel_jhl8040r_thunderbolt4_retimer': { x: -3.8, y: 1.2, z: 0.16, w: 1.0, h: 1.0, d: 0.12, color: 0x111827 },
        'murata_apple_wifi6_bluetooth5_module': { x: 3.6, y: 1.1, z: 0.16, w: 1.4, h: 1.3, d: 0.15, color: 0xc0c8d4 },
        'intersil_isl9240_buck_boost_charger': { x: 2.6, y: 0.8, z: 0.16, w: 0.9, h: 0.9, d: 0.1, color: 0x111827 },
        'texas_instruments_cd3217b12_usb_pd': { x: -4.5, y: 0.3, z: 0.16, w: 0.8, h: 0.8, d: 0.09, color: 0x111827 },
        'cirrus_logic_cs42l83a_audio_codec': { x: 4.2, y: -0.8, z: 0.16, w: 0.8, h: 0.8, d: 0.09, color: 0x111827 }
      };

      chips.forEach(chip => {
        const pos = chipPositions[chip.id] || { x: (Math.random() - 0.5) * 7, y: (Math.random() - 0.5) * 3, z: 0.15, w: 1.0, h: 1.0, d: 0.12, color: 0x111827 };
        const chipMesh = this.createChipMesh(chip, pos);
        this.chipMeshes.set(chip.id, chipMesh);
        this.mbBoardMesh.add(chipMesh);
        this.clickableObjects.push(chipMesh);
      });

      this.motherboardGroup.visible = false;
    }

    buildArchitectureDieM1() {
      // 1. Bare TSMC 5nm Silicon Die Base Substrate (12 x 12 normalized units)
      const dieBase = new THREE.Mesh(
        new THREE.BoxGeometry(12.4, 12.4, 0.45),
        this.materials.siliconDie
      );
      dieBase.position.set(0, 0, 0);
      this.architectureGroup.add(dieBase);

      // Microscopic interconnect grid texture
      const gridHelper = new THREE.GridHelper(12.0, 26, 0x0284c7, 0x0f172a);
      gridHelper.rotation.x = Math.PI / 2;
      gridHelper.position.set(0, 0, 0.24);
      this.architectureGroup.add(gridHelper);

      // Guard ring
      const guardRing = new THREE.Mesh(
        new THREE.RingGeometry(5.8, 6.1, 4),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 })
      );
      guardRing.rotation.z = Math.PI / 4;
      guardRing.position.set(0, 0, 0.26);
      this.architectureGroup.add(guardRing);

      // High-speed Apple Fabric & UMA bus lines
      const createBus = (p1, p2, col) => {
        const mat = new THREE.LineBasicMaterial({ color: col || 0x38bdf8, linewidth: 2, transparent: true, opacity: 0.85 });
        const geom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(p1[0], p1[1], 0.28),
          new THREE.Vector3(p2[0], p2[1], 0.28)
        ]);
        const line = new THREE.Line(geom, mat);
        this.architectureGroup.add(line);
      };

      createBus([-2.8, 2.0], [-2.8, 0.0], 0x38bdf8); // Firestorm to Fabric
      createBus([-2.8, -2.0], [-2.8, 0.0], 0x2dd4bf); // Icestorm to Fabric
      createBus([2.6, 1.2], [0.0, 0.0], 0xa855f7); // GPU to Fabric
      createBus([2.6, -2.4], [0.0, -1.5], 0xf43f5e); // NPU to Fabric
      createBus([0.0, 0.0], [5.0, 0.0], 0x3b82f6); // Fabric to Memory PHY

      // 2. M1 Silicon Blocks
      const blocks = this.data.M1_DIE_BLOCKS || [];
      const m1Layouts = {
        'firestorm_cpu_cluster': { w: 4.8, h: 3.4, x: -2.8, y: 3.6, color: 0x38bdf8, label: '4× FIRESTORM CPU\\n+ 12MB L2 CACHE' },
        'icestorm_cpu_cluster': { w: 4.8, h: 2.2, x: -2.8, y: 0.6, color: 0x2dd4bf, label: '4× ICESTORM CPU\\n+ 4MB L2 CACHE' },
        'apple_8core_gpu': { w: 5.4, h: 4.2, x: 2.8, y: 2.8, color: 0xa855f7, label: 'APPLE 8-CORE GPU\\n128 EUs · 1024 ALUs' },
        'neural_engine_16core': { w: 3.2, h: 2.4, x: 3.2, y: -1.2, color: 0xf43f5e, label: '16-CORE ANE\\n11 TOPS COMPUTE' },
        'system_level_cache_slc': { w: 4.8, h: 1.2, x: -2.8, y: -1.3, color: 0xfbbf24, label: '16MB SYSTEM CACHE\\n(SLC)' },
        'fabric_interconnect': { w: 10.8, h: 0.8, x: 0.0, y: -2.5, color: 0x64748b, label: 'APPLE FABRIC INTERCONNECT\\nCROSSBAR NoC' },
        'unified_memory_controller': { w: 10.8, h: 1.2, x: 0.0, y: -4.0, color: 0x3b82f6, label: '128-BIT UNIFIED MEMORY CONTROLLER\\nLPDDR4X-4266 DUAL-CHANNEL' },
        'secure_enclave_m1': { w: 2.0, h: 1.8, x: -4.8, y: -1.3, color: 0xeab308, label: 'SECURE ENCLAVE\\nGEN 2 CRYPTO' },
        'media_engine_isp': { w: 2.6, h: 2.0, x: -4.8, y: 1.8, color: 0x06b6d4, label: 'MEDIA ENGINE\\nPRORES & ISP' },
        'pcie_thunderbolt_controller': { w: 3.2, h: 1.8, x: 3.2, y: -3.8, color: 0x10b981, label: 'THUNDERBOLT 3 / USB4\\nPCIE 4.0 CONTROLLER' }
      };

      blocks.forEach(b => {
        const layout = m1Layouts[b.id] || { w: 2.0, h: 2.0, x: 0, y: 0, color: 0x94a3b8, label: b.name };
        const blockMesh = this.createArchBlockMesh(b, layout);
        this.archMeshes.set(b.id, blockMesh);
        this.architectureGroup.add(blockMesh);
        this.clickableObjects.push(blockMesh);
      });

      this.architectureGroup.visible = false;
    }

  }

  // Expose globally
  global.EcrioniXSiliconEngine = SiliconExplorerEngine;

})(typeof window !== 'undefined' ? window : globalThis);
