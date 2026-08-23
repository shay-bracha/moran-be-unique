(function(){
  function ensureHomeLink(){
    var links=document.querySelector('.moran-site-nav .moran-links');
    if(!links)return;
    if(!links.querySelector('a[href="index.html"]')){
      var a=document.createElement('a');
      a.href='index.html';
      a.textContent='ראשי';
      links.insertBefore(a,links.firstChild);
    }
  }
  ensureHomeLink();
  var s=document.createElement('script');
  s.src='assets/accessibility-original.js';
  s.defer=true;
  document.head.appendChild(s);
})();