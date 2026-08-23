(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();}

  ready(function(){
    var style=document.createElement('style');
    style.textContent=`
      :root{--site-bg:#fffaf7;--site-paper:#fffdf9;--site-text:#35322f;--site-muted:#77706a;--site-line:#eee1dc;--site-rose:#d88986;--site-rose-soft:#f6e6e3;--site-deep:#47443f}
      .moran-site-nav{position:sticky!important;top:0!important;z-index:99990!important;background:rgba(255,250,247,.97)!important;backdrop-filter:blur(12px)!important;border-bottom:1px solid var(--site-line)!important;font-family:'Heebo',Arial,sans-serif!important;width:100%!important}
      .moran-site-nav .moran-nav-inner{width:min(100%,1220px)!important;margin:0 auto!important;padding:0 32px!important;min-height:96px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:32px!important}
      .moran-site-nav .moran-brand{display:inline-flex!important;align-items:center!important;text-decoration:none!important;flex:0 0 auto!important;background:transparent!important;padding:0!important;border-radius:0!important}
      .moran-site-nav .moran-brand img{display:block!important;width:205px!important;height:auto!important;max-height:82px!important;object-fit:contain!important}
      .moran-site-nav .moran-links{display:flex!important;align-items:center!important;gap:10px!important;flex-wrap:wrap!important}
      .moran-site-nav .moran-links a{display:inline-flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important;color:var(--site-text)!important;font-weight:500!important;font-size:15px!important;line-height:1.2!important;padding:10px 14px!important;border-radius:999px!important;background:transparent!important;transition:.2s!important;white-space:nowrap!important}
      .moran-site-nav .moran-links a:hover,.moran-site-nav .moran-links a.active{background:var(--site-rose-soft)!important;color:var(--site-text)!important}
      .moran-site-nav .moran-links a.active{box-shadow:inset 0 0 0 1px rgba(216,137,134,.12)!important}
      @media(max-width:780px){.moran-site-nav .moran-nav-inner{display:block!important;padding:12px 20px!important;min-height:auto!important}.moran-site-nav .moran-brand{display:flex!important;justify-content:center!important;margin-bottom:10px!important}.moran-site-nav .moran-brand img{width:175px!important;max-height:72px!important}.moran-site-nav .moran-links{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:6px!important;width:100%!important}.moran-site-nav .moran-links a{text-align:center!important;font-size:13px!important;padding:9px 7px!important;background:rgba(255,255,255,.55)!important}}
      @media(max-width:420px){.moran-site-nav .moran-nav-inner{padding-inline:16px!important}.moran-site-nav .moran-brand img{width:158px!important}.moran-site-nav .moran-links a{font-size:12px!important}}

      :focus-visible{outline:3px solid #1557b0 !important;outline-offset:3px !important}
      .skip-link{position:fixed;top:10px;right:10px;z-index:100001;background:#111;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;transform:translateY(-160%);transition:transform .2s}
      .skip-link:focus{transform:translateY(0)}
      .a11y-toggle{position:fixed;left:18px;bottom:18px;z-index:100000;width:50px;height:50px;border-radius:50%;border:2px solid rgba(62,61,52,.25);background:#eef04a;color:#2f302c;display:grid;place-items:center;box-shadow:0 5px 16px rgba(0,0,0,.18);cursor:pointer;padding:0;transition:transform .18s,box-shadow .18s}
      .a11y-toggle:hover{transform:scale(1.05);box-shadow:0 7px 20px rgba(0,0,0,.22)}
      .a11y-toggle svg{width:28px;height:28px;display:block}
      .a11y-toggle[hidden]{display:none !important}
      .a11y-panel{position:fixed;left:18px;bottom:80px;z-index:100001;width:min(330px,calc(100vw - 36px));max-height:min(620px,calc(100vh - 110px));overflow:auto;background:#fff;color:#242424;border:1px solid #d8d8d8;border-radius:18px;padding:16px;box-shadow:0 14px 38px rgba(0,0,0,.24);font-family:Arial,'Heebo',sans-serif;direction:rtl}
      .a11y-panel[hidden]{display:none !important}
      .a11y-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
      .a11y-head h2{font-size:20px;margin:0;font-family:Arial,'Heebo',sans-serif}
      .a11y-close{width:36px;height:36px;border:0 !important;border-radius:50% !important;background:#f1f1f1 !important;font-size:22px !important;line-height:1 !important;padding:0 !important;margin:0 !important;cursor:pointer}
      .a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .a11y-panel button{min-height:48px;margin:0;padding:9px 10px;border:1px solid #cfcfcf;border-radius:12px;background:#fff;color:#111;font-size:14px;line-height:1.25;cursor:pointer;font-weight:600}
      .a11y-panel button:hover{background:#f5f5f5}
      .a11y-panel button[aria-pressed="true"]{background:#2f302c;color:#fff;border-color:#2f302c}
      .a11y-wide{grid-column:1/-1}
      .a11y-hide-btn{background:#f8f8f8 !important;border-style:dashed !important}
      .a11y-note{font-size:12px;color:#666;margin:12px 2px 0;line-height:1.5}
      .a11y-hide-overlay{position:fixed;inset:0;z-index:100002;background:rgba(0,0,0,.4);display:grid;place-items:center;padding:18px}
      .a11y-hide-overlay[hidden]{display:none !important}
      .a11y-hide-dialog{width:min(430px,100%);background:#fff;color:#222;border-radius:16px;box-shadow:0 18px 60px rgba(0,0,0,.3);direction:rtl;font-family:Arial,'Heebo',sans-serif;overflow:hidden}
      .a11y-hide-dialog-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e3e3e3}
      .a11y-hide-dialog-head h3{font-size:18px;margin:0}
      .a11y-hide-dialog-close{border:0;background:transparent;font-size:24px;cursor:pointer;padding:2px 6px}
      .a11y-hide-options{padding:18px 20px}
      .a11y-hide-options label{display:flex;align-items:center;gap:10px;padding:9px 0;font-size:15px;cursor:pointer}
      .a11y-hide-actions{display:flex;gap:10px;justify-content:flex-start;padding:14px 20px 18px;border-top:1px solid #e3e3e3}
      .a11y-hide-confirm,.a11y-hide-cancel{min-height:42px;border-radius:8px;padding:8px 16px;font-weight:600;cursor:pointer}
      .a11y-hide-confirm{background:#2f63d8;color:#fff;border:1px solid #2f63d8}
      .a11y-hide-cancel{background:#fff;color:#333;border:1px solid #cfcfcf}
      html.a11y-size-1{font-size:112%}
      html.a11y-size-2{font-size:125%}
      html.a11y-size-3{font-size:140%}
      html.a11y-grayscale body{filter:grayscale(1)}
      html.a11y-contrast body{background:#000 !important;color:#fff !important}
      html.a11y-contrast body *{background-color:#000 !important;color:#fff !important;border-color:#fff !important;box-shadow:none !important;text-shadow:none !important}
      html.a11y-contrast a,html.a11y-contrast button{color:#ffef54 !important;text-decoration:underline !important}
      html.a11y-underline a{text-decoration:underline !important;text-underline-offset:4px;text-decoration-thickness:2px !important}
      html.a11y-readable body,html.a11y-readable body *{font-family:Arial,sans-serif !important;letter-spacing:.02em !important;word-spacing:.08em !important}
      html.a11y-headings h1,html.a11y-headings h2,html.a11y-headings h3,html.a11y-headings h4,html.a11y-headings h5,html.a11y-headings h6{outline:3px solid #ffcc00 !important;outline-offset:4px !important}
      html.a11y-stop-motion *,html.a11y-stop-motion *::before,html.a11y-stop-motion *::after{animation:none !important;transition:none !important;scroll-behavior:auto !important}
      @media (prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto !important;animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}}
      @media(max-width:600px){.a11y-toggle{left:12px;bottom:12px;width:48px;height:48px}.a11y-panel{left:12px;bottom:68px;width:calc(100vw - 24px);max-height:calc(100vh - 90px)}.a11y-grid{grid-template-columns:1fr 1fr}.a11y-panel button{font-size:13.5px}}
      @media(max-width:380px){.a11y-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);

    function currentFile(){var p=(location.pathname||'').split('/').filter(Boolean).pop()||'index.html';return p.toLowerCase();}
    function injectSiteNav(){
      var file=currentFile();
      var active=file==='training.html'?'training':file==='tzaharon.html'||file==='regulations.html'||file==='regulations-download.html'||file==='tzaharon-regulations.html'?'tzaharon':file==='baking.html'?'baking':file==='recommendations.html'?'recommendations':'';
      var html='<div class="moran-nav-inner"><a class="moran-brand" href="index.html" aria-label="מורן ברכה - דף הבית"><img src="assets/moran-logo.svg" alt="מורן ברכה"></a><div class="moran-links"><a '+(active==='training'?'class="active" aria-current="page" ':'')+'href="training.html">אימון אישי</a><a '+(active==='tzaharon'?'class="active" aria-current="page" ':'')+'href="tzaharon.html">צהרון</a><a '+(active==='baking'?'class="active" aria-current="page" ':'')+'href="baking.html">סדנת אפייה</a><a '+(active==='recommendations'?'class="active" aria-current="page" ':'')+'href="recommendations.html">המלצות</a></div></div>';
      var nav=document.querySelector('nav');
      if(!nav){nav=document.createElement('nav');document.body.insertBefore(nav,document.body.firstChild);}
      nav.className='moran-site-nav';
      nav.setAttribute('aria-label','ניווט ראשי');
      nav.innerHTML=html;
    }
    injectSiteNav();

    var main=document.querySelector('main');
    if(main&&!main.id)main.id='main-content';
    if(main){var skip=document.createElement('a');skip.className='skip-link';skip.href='#main-content';skip.textContent='דלג לתוכן המרכזי';document.body.insertBefore(skip,document.body.firstChild);main.setAttribute('tabindex','-1');}
    document.querySelectorAll('a[target="_blank"]').forEach(function(a){if(!a.getAttribute('aria-label'))a.setAttribute('aria-label',(a.textContent||'קישור')+' (נפתח בחלון חדש)')});
    document.querySelectorAll('img:not([alt])').forEach(function(img){img.alt=''});

    function load(){try{return JSON.parse(localStorage.getItem('moranA11y')||'{}')}catch(e){return {}}}
    function save(s){try{localStorage.setItem('moranA11y',JSON.stringify(s))}catch(e){}}
    function widgetHidden(){try{var raw=localStorage.getItem('moranA11yHiddenUntil');if(!raw)return false;if(raw==='session'){if(sessionStorage.getItem('moranA11yHiddenSession')==='1')return true;localStorage.removeItem('moranA11yHiddenUntil');return false;}var until=parseInt(raw,10);if(!isNaN(until)&&Date.now()<until)return true;localStorage.removeItem('moranA11yHiddenUntil');}catch(e){}return false;}

    var toggle=document.createElement('button');toggle.className='a11y-toggle';toggle.type='button';toggle.setAttribute('aria-label','פתיחת תפריט נגישות');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','a11y-panel');toggle.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle cx="32" cy="11" r="6" fill="currentColor"/><path d="M18 22c0-3 2-5 5-5h18c3 0 5 2 5 5 0 2-2 4-4 5l-6 2v8l9 13c2 3 1 7-2 8-3 2-6 1-8-2l-3-5-3 5c-2 3-5 4-8 2-3-1-4-5-2-8l9-13v-8l-6-2c-2-1-4-3-4-5z" fill="currentColor"/></svg>';
    var panel=document.createElement('div');panel.id='a11y-panel';panel.className='a11y-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-label','אפשרויות נגישות');panel.innerHTML='\
      <div class="a11y-head"><h2>אפשרויות נגישות</h2><button type="button" class="a11y-close" aria-label="סגירת תפריט נגישות">×</button></div>\
      <div class="a11y-grid">\
        <button type="button" data-a11y="font-up">A+ הגדלת טקסט</button>\
        <button type="button" data-a11y="font-down">A− הקטנת טקסט</button>\
        <button type="button" data-a11y="contrast">ניגודיות גבוהה</button>\
        <button type="button" data-a11y="grayscale">גווני אפור</button>\
        <button type="button" data-a11y="underline">הדגשת קישורים</button>\
        <button type="button" data-a11y="readable">פונט קריא</button>\
        <button type="button" data-a11y="headings">הדגשת כותרות</button>\
        <button type="button" data-a11y="motion">עצירת אנימציות</button>\
        <button type="button" class="a11y-wide a11y-hide-btn" data-a11y="hide-widget">◉ הסתרת וידג׳ט הנגישות</button>\
        <button type="button" class="a11y-wide" data-a11y="reset">איפוס כל ההגדרות</button>\
      </div>\
      <p class="a11y-note">ההגדרות נשמרות גם במעבר בין עמודי האתר.</p>';
    var overlay=document.createElement('div');overlay.className='a11y-hide-overlay';overlay.hidden=true;overlay.innerHTML='\
      <div class="a11y-hide-dialog" role="dialog" aria-modal="true" aria-labelledby="a11y-hide-title">\
        <div class="a11y-hide-dialog-head"><h3 id="a11y-hide-title">הסתרת וידג׳ט נגישות</h3><button type="button" class="a11y-hide-dialog-close" aria-label="סגירה">×</button></div>\
        <div class="a11y-hide-options"><label><input type="radio" name="a11y-hide-period" value="session" checked> רק עבור ההפעלה הנוכחית</label><label><input type="radio" name="a11y-hide-period" value="24h"> 24 שעות</label><label><input type="radio" name="a11y-hide-period" value="week"> שבוע אחד</label></div>\
        <div class="a11y-hide-actions"><button type="button" class="a11y-hide-confirm">הסתר את הווידג׳ט</button><button type="button" class="a11y-hide-cancel">ביטול</button></div>\
      </div>';
    function press(key,on){var b=panel.querySelector('[data-a11y="'+key+'"]');if(b)b.setAttribute('aria-pressed',String(!!on));}
    function apply(s){['a11y-size-1','a11y-size-2','a11y-size-3'].forEach(function(c){document.documentElement.classList.remove(c)});if(s.size>0)document.documentElement.classList.add('a11y-size-'+Math.min(3,s.size));document.documentElement.classList.toggle('a11y-contrast',!!s.contrast);document.documentElement.classList.toggle('a11y-grayscale',!!s.grayscale);document.documentElement.classList.toggle('a11y-underline',!!s.underline);document.documentElement.classList.toggle('a11y-readable',!!s.readable);document.documentElement.classList.toggle('a11y-headings',!!s.headings);document.documentElement.classList.toggle('a11y-stop-motion',!!s.motion);press('contrast',s.contrast);press('grayscale',s.grayscale);press('underline',s.underline);press('readable',s.readable);press('headings',s.headings);press('motion',s.motion);}
    var state=load();apply(state);
    function openPanel(){panel.hidden=false;toggle.setAttribute('aria-expanded','true');var b=panel.querySelector('button');if(b)b.focus();}
    function closePanel(returnFocus){panel.hidden=true;toggle.setAttribute('aria-expanded','false');if(returnFocus!==false&&!toggle.hidden)toggle.focus();}
    function openHideDialog(){overlay.hidden=false;var r=overlay.querySelector('input:checked');if(r)r.focus();}
    function closeHideDialog(returnFocus){overlay.hidden=true;if(returnFocus!==false){var b=panel.querySelector('[data-a11y="hide-widget"]');if(b&&!panel.hidden)b.focus();}}
    function hideWidget(){var selected=overlay.querySelector('input[name="a11y-hide-period"]:checked');var period=selected?selected.value:'session';try{if(period==='session'){localStorage.setItem('moranA11yHiddenUntil','session');sessionStorage.setItem('moranA11yHiddenSession','1');}else if(period==='24h'){localStorage.setItem('moranA11yHiddenUntil',String(Date.now()+24*60*60*1000));sessionStorage.removeItem('moranA11yHiddenSession');}else{localStorage.setItem('moranA11yHiddenUntil',String(Date.now()+7*24*60*60*1000));sessionStorage.removeItem('moranA11yHiddenSession');}}catch(e){}closeHideDialog(false);closePanel(false);toggle.hidden=true;}
    toggle.addEventListener('click',function(){panel.hidden?openPanel():closePanel();});panel.querySelector('.a11y-close').addEventListener('click',function(){closePanel();});
    panel.addEventListener('click',function(e){var key=e.target&&e.target.getAttribute('data-a11y');if(!key)return;if(key==='hide-widget'){openHideDialog();return;}if(key==='font-up')state.size=Math.min(3,(state.size||0)+1);if(key==='font-down')state.size=Math.max(0,(state.size||0)-1);if(key==='contrast')state.contrast=!state.contrast;if(key==='grayscale')state.grayscale=!state.grayscale;if(key==='underline')state.underline=!state.underline;if(key==='readable')state.readable=!state.readable;if(key==='headings')state.headings=!state.headings;if(key==='motion')state.motion=!state.motion;if(key==='reset')state={};save(state);apply(state);});
    overlay.querySelector('.a11y-hide-dialog-close').addEventListener('click',function(){closeHideDialog();});overlay.querySelector('.a11y-hide-cancel').addEventListener('click',function(){closeHideDialog();});overlay.querySelector('.a11y-hide-confirm').addEventListener('click',hideWidget);overlay.addEventListener('click',function(e){if(e.target===overlay)closeHideDialog();});
    document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;if(!overlay.hidden){closeHideDialog();return;}if(!panel.hidden)closePanel();});
    document.addEventListener('click',function(e){if(!overlay.hidden)return;if(!panel.hidden&&!panel.contains(e.target)&&!toggle.contains(e.target)){panel.hidden=true;toggle.setAttribute('aria-expanded','false');}});
    document.body.appendChild(toggle);document.body.appendChild(panel);document.body.appendChild(overlay);if(widgetHidden())toggle.hidden=true;
  });
})();