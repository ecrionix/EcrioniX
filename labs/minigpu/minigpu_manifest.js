// =============================================================================
// Project: EcrioniX MiniGPU - Central Architecture Manifest
// Complete Hardware Specification, Block Port List & Signal Topology
// =============================================================================

window.MINIGPU_MANIFEST = {
  "project": "EcrioniX MiniGPU",
  "version": "1.0.0",
  "resolution": {
    "width": 160,
    "height": 120,
    "pixels": 19200,
    "bpp": 24
  },
  "blocks": [
    {
      "id": "cmd_interface",
      "name": "Host Command Interface",
      "module": "cmd_interface.v",
      "category": "command",
      "description": "Receives host drawing commands with ready/valid handshaking, packs parameters into 86-bit packets, and protects against FIFO backpressure.",
      "inputs": [
        {
          "name": "clk",
          "width": 1,
          "desc": "Global simulation clock"
        },
        {
          "name": "rst_n",
          "width": 1,
          "desc": "Active-low synchronous reset"
        },
        {
          "name": "cmd_valid_in",
          "width": 1,
          "desc": "Host drawing command valid"
        },
        {
          "name": "cmd_type_in",
          "width": 2,
          "desc": "Shape opcode (00=Rect, 01=Circ, 10=Tri, 11=Clear)"
        },
        {
          "name": "param_x0_in",
          "width": 8,
          "desc": "X0 coordinate (0..159)"
        },
        {
          "name": "param_y0_in",
          "width": 7,
          "desc": "Y0 coordinate (0..119)"
        },
        {
          "name": "param_x1_in",
          "width": 8,
          "desc": "X1 / Width / Radius"
        },
        {
          "name": "param_y1_in",
          "width": 7,
          "desc": "Y1 / Height"
        },
        {
          "name": "param_x2_in",
          "width": 8,
          "desc": "X2 (Triangle vertex 2)"
        },
        {
          "name": "param_y2_in",
          "width": 7,
          "desc": "Y2 (Triangle vertex 2)"
        },
        {
          "name": "param_color_in",
          "width": 24,
          "desc": "24-bit RGB888 color"
        },
        {
          "name": "fifo_full",
          "width": 1,
          "desc": "Backpressure signal from Command FIFO"
        }
      ],
      "outputs": [
        {
          "name": "cmd_ready_out",
          "width": 1,
          "desc": "Ready to accept host command (!fifo_full)"
        },
        {
          "name": "fifo_wr_en",
          "width": 1,
          "desc": "Enqueue pulse to Command FIFO"
        },
        {
          "name": "fifo_wr_data",
          "width": 86,
          "desc": "Packed 86-bit command packet"
        }
      ],
      "registers": [
        "None (Pure combinational packet framing)"
      ],
      "fsm": [
        "Stateless handshake"
      ]
    },
    {
      "id": "command_fifo",
      "name": "Command FIFO Buffer",
      "module": "command_fifo.v",
      "category": "command",
      "description": "16-deep x 86-bit circular FIFO buffer decoupling host command dispatch from rasterizer execution pipeline.",
      "inputs": [
        {
          "name": "clk",
          "width": 1,
          "desc": "Clock"
        },
        {
          "name": "rst_n",
          "width": 1,
          "desc": "Reset"
        },
        {
          "name": "wr_en",
          "width": 1,
          "desc": "Write enable from Interface"
        },
        {
          "name": "wr_data",
          "width": 86,
          "desc": "Packet data from Interface"
        },
        {
          "name": "rd_en",
          "width": 1,
          "desc": "Read enable from Decoder"
        }
      ],
      "outputs": [
        {
          "name": "rd_data",
          "width": 86,
          "desc": "Command packet at head of queue"
        },
        {
          "name": "empty",
          "width": 1,
          "desc": "Queue empty flag"
        },
        {
          "name": "full",
          "width": 1,
          "desc": "Queue full flag"
        },
        {
          "name": "count",
          "width": 5,
          "desc": "Active queued command count (0..16)"
        }
      ],
      "registers": [
        "mem[16][86]",
        "wr_ptr[3:0]",
        "rd_ptr[3:0]",
        "count[4:0]"
      ],
      "fsm": [
        "Circular Pointer Progression"
      ]
    },
    {
      "id": "command_decoder",
      "name": "Command Decoder & Validator",
      "module": "command_decoder.v",
      "category": "command",
      "description": "Unpacks 86-bit command packets, calculates clipped bounding boxes [min_x..max_x] x [min_y..max_y], and triggers rasterizer traversal.",
      "inputs": [
        {
          "name": "clk",
          "width": 1,
          "desc": "Clock"
        },
        {
          "name": "rst_n",
          "width": 1,
          "desc": "Reset"
        },
        {
          "name": "fifo_empty",
          "width": 1,
          "desc": "FIFO empty status"
        },
        {
          "name": "fifo_data",
          "width": 86,
          "desc": "Head packet from FIFO"
        },
        {
          "name": "raster_idle",
          "width": 1,
          "desc": "Rasterizer readiness flag"
        },
        {
          "name": "cmd_done",
          "width": 1,
          "desc": "Completion pulse from Rasterizer"
        }
      ],
      "outputs": [
        {
          "name": "fifo_rd_en",
          "width": 1,
          "desc": "FIFO pop pulse"
        },
        {
          "name": "cmd_valid_out",
          "width": 1,
          "desc": "Command valid to Rasterizer"
        },
        {
          "name": "cmd_type_out",
          "width": 2,
          "desc": "Decoded shape type"
        },
        {
          "name": "shape_x0",
          "width": 8,
          "desc": "Unpacked X0"
        },
        {
          "name": "shape_y0",
          "width": 7,
          "desc": "Unpacked Y0"
        },
        {
          "name": "shape_x1",
          "width": 8,
          "desc": "Unpacked X1"
        },
        {
          "name": "shape_y1",
          "width": 7,
          "desc": "Unpacked Y1"
        },
        {
          "name": "shape_x2",
          "width": 8,
          "desc": "Unpacked X2"
        },
        {
          "name": "shape_y2",
          "width": 7,
          "desc": "Unpacked Y2"
        },
        {
          "name": "shape_color",
          "width": 24,
          "desc": "RGB888 draw color"
        },
        {
          "name": "bbox_min_x",
          "width": 8,
          "desc": "Clipped bounding box left"
        },
        {
          "name": "bbox_max_x",
          "width": 8,
          "desc": "Clipped bounding box right"
        },
        {
          "name": "bbox_min_y",
          "width": 7,
          "desc": "Clipped bounding box top"
        },
        {
          "name": "bbox_max_y",
          "width": 7,
          "desc": "Clipped bounding box bottom"
        }
      ],
      "registers": [
        "dec_state[1:0]",
        "shape_x0..2",
        "shape_y0..2",
        "bbox_min/max"
      ],
      "fsm": [
        "DEC_IDLE (00)",
        "DEC_WAIT (01)",
        "DEC_POP (10)"
      ]
    },
    {
      "id": "rasterizer_controller",
      "name": "Rasterization Controller",
      "module": "rasterizer_controller.v",
      "category": "pixel",
      "description": "5-state hardware FSM executing 2D bounding-box raster traversal, coordinate generation, and framebuffer write qualification.",
      "inputs": [
        {
          "name": "clk",
          "width": 1,
          "desc": "Clock"
        },
        {
          "name": "rst_n",
          "width": 1,
          "desc": "Reset"
        },
        {
          "name": "cmd_valid",
          "width": 1,
          "desc": "Command valid from Decoder"
        },
        {
          "name": "cmd_type",
          "width": 2,
          "desc": "Command opcode"
        },
        {
          "name": "bbox_min_x",
          "width": 8,
          "desc": "Bounding box start X"
        },
        {
          "name": "bbox_max_x",
          "width": 8,
          "desc": "Bounding box end X"
        },
        {
          "name": "bbox_min_y",
          "width": 7,
          "desc": "Bounding box start Y"
        },
        {
          "name": "bbox_max_y",
          "width": 7,
          "desc": "Bounding box end Y"
        },
        {
          "name": "shape_color",
          "width": 24,
          "desc": "Shape RGB color"
        },
        {
          "name": "shape_hit",
          "width": 1,
          "desc": "Coverage test hit from active shape engine"
        },
        {
          "name": "pixel_valid",
          "width": 1,
          "desc": "Qualified pixel valid signal"
        },
        {
          "name": "fb_ready",
          "width": 1,
          "desc": "Framebuffer ready flag"
        }
      ],
      "outputs": [
        {
          "name": "cmd_done",
          "width": 1,
          "desc": "Command finished pulse"
        },
        {
          "name": "eval_enable",
          "width": 1,
          "desc": "Enables shape rasterizer evaluation"
        },
        {
          "name": "cur_pixel_x",
          "width": 8,
          "desc": "Current traversal X (0..159)"
        },
        {
          "name": "cur_pixel_y",
          "width": 7,
          "desc": "Current traversal Y (0..119)"
        },
        {
          "name": "fb_we",
          "width": 1,
          "desc": "Framebuffer write enable"
        },
        {
          "name": "fb_addr",
          "width": 15,
          "desc": "Framebuffer write address (y*160+x)"
        },
        {
          "name": "fb_data",
          "width": 24,
          "desc": "Framebuffer write RGB data"
        },
        {
          "name": "raster_idle",
          "width": 1,
          "desc": "Rasterizer idle status"
        },
        {
          "name": "raster_state",
          "width": 3,
          "desc": "Current FSM state"
        },
        {
          "name": "total_pixels_rendered",
          "width": 32,
          "desc": "Telemetry rendered pixel counter"
        },
        {
          "name": "total_commands_done",
          "width": 16,
          "desc": "Telemetry command counter"
        }
      ],
      "registers": [
        "raster_state[2:0]",
        "cur_pixel_x[7:0]",
        "cur_pixel_y[6:0]",
        "latched_bbox",
        "total_pixels_rendered[31:0]"
      ],
      "fsm": [
        "STATE_IDLE (000)",
        "STATE_SETUP (001)",
        "STATE_RASTERIZE (010)",
        "STATE_WRITE (011)",
        "STATE_COMPLETE (100)"
      ]
    },
    {
      "id": "rectangle_rasterizer",
      "name": "Rectangle Rasterizer",
      "module": "rectangle_rasterizer.v",
      "category": "pixel",
      "description": "Combinational bounding-box coverage and boundary-clipping evaluation engine for rectangles.",
      "inputs": [
        {
          "name": "enable",
          "width": 1,
          "desc": "Unit active enable"
        },
        {
          "name": "cur_x",
          "width": 8,
          "desc": "Current traversal X"
        },
        {
          "name": "cur_y",
          "width": 7,
          "desc": "Current traversal Y"
        },
        {
          "name": "rect_x",
          "width": 8,
          "desc": "Rectangle origin X"
        },
        {
          "name": "rect_y",
          "width": 6,
          "desc": "Rectangle origin Y"
        },
        {
          "name": "rect_w",
          "width": 8,
          "desc": "Rectangle width"
        },
        {
          "name": "rect_h",
          "width": 6,
          "desc": "Rectangle height"
        }
      ],
      "outputs": [
        {
          "name": "hit",
          "width": 1,
          "desc": "High if cur_x/cur_y is covered by rectangle"
        }
      ],
      "registers": [
        "None (Pure combinational coverage engine)"
      ],
      "fsm": [
        "Combinational logic: (cur_x >= rect_x) && (cur_x < rect_x + rect_w) && (cur_y >= rect_y) && (cur_y < rect_y + rect_h)"
      ]
    },
    {
      "id": "circle_rasterizer",
      "name": "Circle Rasterizer",
      "module": "circle_rasterizer.v",
      "category": "pixel",
      "description": "Calculates squared-distance arithmetic: dx^2 + dy^2 <= r^2 with 20-bit overflow prevention.",
      "inputs": [
        {
          "name": "enable",
          "width": 1,
          "desc": "Unit active enable"
        },
        {
          "name": "cur_x",
          "width": 8,
          "desc": "Current traversal X"
        },
        {
          "name": "cur_y",
          "width": 7,
          "desc": "Current traversal Y"
        },
        {
          "name": "circ_cx",
          "width": 8,
          "desc": "Circle center X"
        },
        {
          "name": "circ_cy",
          "width": 6,
          "desc": "Circle center Y"
        },
        {
          "name": "circ_r",
          "width": 8,
          "desc": "Circle radius R"
        }
      ],
      "outputs": [
        {
          "name": "hit",
          "width": 1,
          "desc": "High if cur_x/cur_y is covered by circle"
        }
      ],
      "registers": [
        "None (Pure combinational DSP pipeline)"
      ],
      "fsm": [
        "Combinational logic: (x - cx)^2 + (y - cy)^2 <= r^2"
      ]
    },
    {
      "id": "triangle_rasterizer",
      "name": "Triangle Rasterizer",
      "module": "triangle_rasterizer.v",
      "category": "pixel",
      "description": "Pineda edge-function arithmetic engine evaluating 3 cross-product half-planes with winding independence (CW & CCW).",
      "inputs": [
        {
          "name": "enable",
          "width": 1,
          "desc": "Unit active enable"
        },
        {
          "name": "cur_x",
          "width": 8,
          "desc": "Current traversal X"
        },
        {
          "name": "cur_y",
          "width": 7,
          "desc": "Current traversal Y"
        },
        {
          "name": "v0_x",
          "width": 8,
          "desc": "Vertex 0 X"
        },
        {
          "name": "v0_y",
          "width": 6,
          "desc": "Vertex 0 Y"
        },
        {
          "name": "v1_x",
          "width": 8,
          "desc": "Vertex 1 X"
        },
        {
          "name": "v1_y",
          "width": 6,
          "desc": "Vertex 1 Y"
        },
        {
          "name": "v2_x",
          "width": 8,
          "desc": "Vertex 2 X"
        },
        {
          "name": "v2_y",
          "width": 6,
          "desc": "Vertex 2 Y"
        }
      ],
      "outputs": [
        {
          "name": "hit",
          "width": 1,
          "desc": "High if cur_x/cur_y is covered by triangle"
        }
      ],
      "registers": [
        "None (Pure combinational signed edge arithmetic)"
      ],
      "fsm": [
        "Signed cross-product evaluation: E01, E12, E20 (all >= 0 || all <= 0)"
      ]
    },
    {
      "id": "pixel_color_generator",
      "name": "Pixel Color Generator",
      "module": "pixel_color_generator.v",
      "category": "pixel",
      "description": "Qualifies coverage results and formats 24-bit RGB pixel data for framebuffer write.",
      "inputs": [
        {
          "name": "cmd_type",
          "width": 2,
          "desc": "Command opcode"
        },
        {
          "name": "shape_color",
          "width": 24,
          "desc": "Input shape color"
        },
        {
          "name": "shape_hit",
          "width": 1,
          "desc": "Hit signal from active rasterizer"
        }
      ],
      "outputs": [
        {
          "name": "pixel_valid",
          "width": 1,
          "desc": "Qualified write enable"
        },
        {
          "name": "pixel_color",
          "width": 24,
          "desc": "24-bit RGB pixel color"
        }
      ],
      "registers": [
        "None"
      ],
      "fsm": [
        "Pass-through & clear qualification"
      ]
    },
    {
      "id": "framebuffer",
      "name": "Framebuffer Memory (Dual-Port SRAM)",
      "module": "framebuffer.v",
      "category": "memory",
      "description": "True dual-port synchronous video RAM storing 19,200 RGB888 pixels (160x120). Port A renders; Port B displays.",
      "inputs": [
        {
          "name": "clk",
          "width": 1,
          "desc": "Clock"
        },
        {
          "name": "rst_n",
          "width": 1,
          "desc": "Reset"
        },
        {
          "name": "we_a",
          "width": 1,
          "desc": "Port A Render write enable"
        },
        {
          "name": "addr_a",
          "width": 15,
          "desc": "Port A Render write address"
        },
        {
          "name": "din_a",
          "width": 24,
          "desc": "Port A Render write RGB data"
        },
        {
          "name": "re_b",
          "width": 1,
          "desc": "Port B Display read enable"
        },
        {
          "name": "addr_b",
          "width": 15,
          "desc": "Port B Display read address"
        }
      ],
      "outputs": [
        {
          "name": "dout_b",
          "width": 24,
          "desc": "Port B Display read RGB data (1-cycle latency)"
        }
      ],
      "registers": [
        "mem[19200][24]",
        "dout_b[23:0]"
      ],
      "fsm": [
        "Synchronous dual-port RAM timing"
      ]
    },
    {
      "id": "display_controller",
      "name": "Display Controller & Raster Scanner",
      "module": "display_controller.v",
      "category": "display",
      "description": "Generates 160x120 virtual raster scanning timing (HSYNC, VSYNC, DE), scans Framebuffer Port B with pre-fetch latency alignment.",
      "inputs": [
        {
          "name": "clk",
          "width": 1,
          "desc": "Clock"
        },
        {
          "name": "rst_n",
          "width": 1,
          "desc": "Reset"
        },
        {
          "name": "fb_read_data",
          "width": 24,
          "desc": "RGB data from Framebuffer Port B"
        }
      ],
      "outputs": [
        {
          "name": "fb_read_addr",
          "width": 15,
          "desc": "Pre-fetch read address to Port B"
        },
        {
          "name": "fb_read_en",
          "width": 1,
          "desc": "Read enable to Port B"
        },
        {
          "name": "disp_x",
          "width": 8,
          "desc": "Display horizontal coordinate (0..159)"
        },
        {
          "name": "disp_y",
          "width": 7,
          "desc": "Display vertical coordinate (0..119)"
        },
        {
          "name": "rgb_out",
          "width": 24,
          "desc": "Active video RGB stream"
        },
        {
          "name": "hsync",
          "width": 1,
          "desc": "Horizontal synchronization pulse"
        },
        {
          "name": "vsync",
          "width": 1,
          "desc": "Vertical synchronization pulse"
        },
        {
          "name": "display_enable",
          "width": 1,
          "desc": "Active visible video interval"
        },
        {
          "name": "frame_tick",
          "width": 1,
          "desc": "Frame boundary strobe"
        }
      ],
      "registers": [
        "h_count[7:0]",
        "v_count[7:0]",
        "disp_x[7:0]",
        "disp_y[6:0]",
        "rgb_out[23:0]",
        "hsync",
        "vsync",
        "display_enable"
      ],
      "fsm": [
        "Raster scan counter (200 clocks/line x 130 lines/frame)"
      ]
    },
    {
      "id": "graphics_output",
      "name": "Graphics Video Output",
      "module": "minigpu_top.v",
      "category": "display",
      "description": "Physical/virtual display output interface carrying RGB888 pixel stream, synchronization pulses, and frame strobes.",
      "inputs": [
        {
          "name": "disp_hsync",
          "width": 1,
          "desc": "HSYNC"
        },
        {
          "name": "disp_vsync",
          "width": 1,
          "desc": "VSYNC"
        },
        {
          "name": "disp_de",
          "width": 1,
          "desc": "Display Enable"
        },
        {
          "name": "disp_rgb",
          "width": 24,
          "desc": "RGB888 Pixel"
        },
        {
          "name": "disp_x",
          "width": 8,
          "desc": "Screen X"
        },
        {
          "name": "disp_y",
          "width": 7,
          "desc": "Screen Y"
        }
      ],
      "outputs": [
        {
          "name": "screen_pixel",
          "width": 24,
          "desc": "RGB888 Output to Framebuffer Canvas"
        }
      ],
      "registers": [
        "None"
      ],
      "fsm": [
        "Video Stream Sink"
      ]
    }
  ],
  "connections": [
    {
      "from": "cmd_interface",
      "port": "fifo_wr_data",
      "to": "command_fifo",
      "targetPort": "wr_data",
      "width": 86,
      "type": "command"
    },
    {
      "from": "cmd_interface",
      "port": "fifo_wr_en",
      "to": "command_fifo",
      "targetPort": "wr_en",
      "width": 1,
      "type": "command"
    },
    {
      "from": "command_fifo",
      "port": "full",
      "to": "cmd_interface",
      "targetPort": "fifo_full",
      "width": 1,
      "type": "command"
    },
    {
      "from": "command_fifo",
      "port": "rd_data",
      "to": "command_decoder",
      "targetPort": "fifo_data",
      "width": 86,
      "type": "command"
    },
    {
      "from": "command_fifo",
      "port": "empty",
      "to": "command_decoder",
      "targetPort": "fifo_empty",
      "width": 1,
      "type": "command"
    },
    {
      "from": "command_decoder",
      "port": "fifo_rd_en",
      "to": "command_fifo",
      "targetPort": "rd_en",
      "width": 1,
      "type": "command"
    },
    {
      "from": "command_decoder",
      "port": "cmd_valid_out",
      "to": "rasterizer_controller",
      "targetPort": "cmd_valid",
      "width": 1,
      "type": "command"
    },
    {
      "from": "rasterizer_controller",
      "port": "cmd_done",
      "to": "command_decoder",
      "targetPort": "cmd_done",
      "width": 1,
      "type": "command"
    },
    {
      "from": "rasterizer_controller",
      "port": "raster_idle",
      "to": "command_decoder",
      "targetPort": "raster_idle",
      "width": 1,
      "type": "command"
    },
    {
      "from": "rasterizer_controller",
      "port": "cur_pixel_x",
      "to": "rectangle_rasterizer",
      "targetPort": "cur_x",
      "width": 8,
      "type": "pixel"
    },
    {
      "from": "rasterizer_controller",
      "port": "cur_pixel_y",
      "to": "rectangle_rasterizer",
      "targetPort": "cur_y",
      "width": 7,
      "type": "pixel"
    },
    {
      "from": "rasterizer_controller",
      "port": "cur_pixel_x",
      "to": "circle_rasterizer",
      "targetPort": "cur_x",
      "width": 8,
      "type": "pixel"
    },
    {
      "from": "rasterizer_controller",
      "port": "cur_pixel_y",
      "to": "circle_rasterizer",
      "targetPort": "cur_y",
      "width": 7,
      "type": "pixel"
    },
    {
      "from": "rasterizer_controller",
      "port": "cur_pixel_x",
      "to": "triangle_rasterizer",
      "targetPort": "cur_x",
      "width": 8,
      "type": "pixel"
    },
    {
      "from": "rasterizer_controller",
      "port": "cur_pixel_y",
      "to": "triangle_rasterizer",
      "targetPort": "cur_y",
      "width": 7,
      "type": "pixel"
    },
    {
      "from": "rectangle_rasterizer",
      "port": "hit",
      "to": "pixel_color_generator",
      "targetPort": "shape_hit",
      "width": 1,
      "type": "pixel"
    },
    {
      "from": "circle_rasterizer",
      "port": "hit",
      "to": "pixel_color_generator",
      "targetPort": "shape_hit",
      "width": 1,
      "type": "pixel"
    },
    {
      "from": "triangle_rasterizer",
      "port": "hit",
      "to": "pixel_color_generator",
      "targetPort": "shape_hit",
      "width": 1,
      "type": "pixel"
    },
    {
      "from": "pixel_color_generator",
      "port": "pixel_valid",
      "to": "rasterizer_controller",
      "targetPort": "pixel_valid",
      "width": 1,
      "type": "pixel"
    },
    {
      "from": "rasterizer_controller",
      "port": "fb_we",
      "to": "framebuffer",
      "targetPort": "we_a",
      "width": 1,
      "type": "memory"
    },
    {
      "from": "rasterizer_controller",
      "port": "fb_addr",
      "to": "framebuffer",
      "targetPort": "addr_a",
      "width": 15,
      "type": "memory"
    },
    {
      "from": "rasterizer_controller",
      "port": "fb_data",
      "to": "framebuffer",
      "targetPort": "din_a",
      "width": 24,
      "type": "memory"
    },
    {
      "from": "display_controller",
      "port": "fb_read_addr",
      "to": "framebuffer",
      "targetPort": "addr_b",
      "width": 15,
      "type": "memory"
    },
    {
      "from": "display_controller",
      "port": "fb_read_en",
      "to": "framebuffer",
      "targetPort": "re_b",
      "width": 1,
      "type": "memory"
    },
    {
      "from": "framebuffer",
      "port": "dout_b",
      "to": "display_controller",
      "targetPort": "fb_read_data",
      "width": 24,
      "type": "memory"
    },
    {
      "from": "display_controller",
      "port": "rgb_out",
      "to": "graphics_output",
      "targetPort": "disp_rgb",
      "width": 24,
      "type": "display"
    },
    {
      "from": "display_controller",
      "port": "hsync",
      "to": "graphics_output",
      "targetPort": "disp_hsync",
      "width": 1,
      "type": "display"
    },
    {
      "from": "display_controller",
      "port": "vsync",
      "to": "graphics_output",
      "targetPort": "disp_vsync",
      "width": 1,
      "type": "display"
    },
    {
      "from": "display_controller",
      "port": "display_enable",
      "to": "graphics_output",
      "targetPort": "disp_de",
      "width": 1,
      "type": "display"
    }
  ]
};
