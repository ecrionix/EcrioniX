(function(){
  if(localStorage.getItem('cc_ecrionix')) return;
  var bar=document.createElement('div');
  bar.id='cc-bar';
  bar.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:99999;background:rgba(2,6,23,.97);border-top:1px solid rgba(255,255,255,.08);padding:1rem 1.5rem;font-family:Outfit,sans-serif;box-shadow:0 -4px 24px rgba(0,0,0,.4)';
  bar.innerHTML='<div style="max-width:960px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap"><p style="margin:0;font-size:.84rem;color:#94a3b8;line-height:1.6">We use cookies (including Google AdSense) to personalise content and ads and to analyse site traffic. <a href="/legal/privacy.html" style="color:#fbbf24;text-decoration:none;font-weight:600">Privacy Policy</a></p><div style="display:flex;gap:.6rem;flex-shrink:0"><button id="cc-decline" style="padding:.45rem 1rem;border-radius:7px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#64748b;font-family:Outfit,sans-serif;font-size:.8rem;font-weight:600;cursor:pointer">Decline</button><button id="cc-accept" style="padding:.45rem 1.1rem;border-radius:7px;border:none;background:#fbbf24;color:#020617;font-family:Outfit,sans-serif;font-size:.8rem;font-weight:700;cursor:pointer">Accept</button></div></div>';
  document.body.appendChild(bar);
  document.getElementById('cc-accept').onclick=function(){localStorage.setItem('cc_ecrionix','1');bar.remove();};
  document.getElementById('cc-decline').onclick=function(){localStorage.setItem('cc_ecrionix','0');bar.remove();};
})();
