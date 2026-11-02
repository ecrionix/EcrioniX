---
trigger: always_on
description: Always add Google AdSense, EthicalAds, and GA4 to every HTML page created or edited
---

# EcrioniX Mandatory Advertising and Analytics Rules

Whenever creating or editing ANY page in EcrioniX (courses, lessons, tools, labs, articles, calculators, visualizers):

## 1. Google AdSense (Publisher: ca-pub-6672302762343789)
Place in `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6672302762343789" crossorigin="anonymous"></script>
```

## 2. EthicalAds (Publisher: ecrionixorg)
Place client script in `<head>`:
```html
<script async src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>
```

Place stickybox unit immediately after `<body>`:
```html
<div id="ea-content" data-ea-publisher="ecrionixorg" data-ea-type="image" data-ea-style="stickybox" class="raised adaptive-css" data-ea-keywords="vlsi|semiconductor|electronics|engineering|rtl|asic"></div>
```

Place in-content unit in a safe container before the footer or between major sections:
```html
<div class="ad-safe-container" style="margin:2.5rem 0; display:flex; justify-content:center;">
  <div id="page-content-ad" data-ea-publisher="ecrionixorg" data-ea-type="image" class="raised adaptive-css" data-ea-keywords="vlsi|semiconductor|electronics|engineering|rtl|asic"></div>
</div>
```

## 3. Google Analytics (GA4: G-XXZS8C1FLY)
Place in `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXZS8C1FLY"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXZS8C1FLY');</script>
```

## 4. Verification
Before completing any task that adds or edits an HTML page:
- Check that `ca-pub-6672302762343789` is in `<head>`.
- Check that `ethicalads.min.js` and `ecrionixorg` are present.
- Check that `G-XXZS8C1FLY` is in `<head>`.
