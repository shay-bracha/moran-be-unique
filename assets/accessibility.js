(function(){
  function currentFile(){
    var p=(location.pathname||'').split('/').filter(Boolean).pop()||'index.html';
    return p.toLowerCase();
  }
  function ensureHomeLink(){
    var links=document.querySelector('.moran-site-nav .moran-links');
    if(!links)return;
    var existing=links.querySelector('a[href="index.html"]');
    if(currentFile()==='index.html'){
      if(existing)existing.remove();
      return;
    }
    if(!existing){
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