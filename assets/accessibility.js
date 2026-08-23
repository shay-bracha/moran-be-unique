(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();}
  ready(function(){
    var style=document.createElement('style');
    style.textContent=`
      :focus-visible{outline:3px solid #1557b0 !important;outline-offset:3px !important}
      .skip-link{position:fixed;top:10px;right:10px;z-index:100001;background:#111;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;transform:translateY(-160%);transition:transform .2s}
      .skip-link:focus{transform:translateY(0)}

      .a11y-toggle{position:fixed;left:18px;bottom:18px;z-index:100000;width:50px;height:50px;border-radius:50%;border:2px solid rgba(62,61,52,.25);background:#eef04a;color:#2f302c;display:grid;place-items:center;box-shadow:0 5px 16px rgba(0,0,0,.18);cursor:pointer;padding:0;transition:transform .18s,box-shadow .18s}
      .a11y-toggle:hover{transform:scale(1.05);box-shadow:0 7px 20px rgba(0,0,0,.22)}
      .a11y-toggle svg{width:28px;height:28px;display:block}

      .a11y-panel{position:fixed;left:18px;bottom:80px;z-index:100001;width:min(330px,calc(100vw - 36px));max-height:min(620px,calc(100vh - 110px));overflow:auto;background:#fff;color:#242424;border:1px solid #d8d8d8;border-radius:18px;padding:16px;box-shadow:0 14px 38px rgba(0,0,0,.24);font-family:Arial,'Heebo',sans-serif;direction:rtl}
      .a11y-panel[hidden],.a11y-hide-dialog[hidden]{display:none}
      .a11y-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
      .a11y-head h2{font-size:20px;margin:0;font-family:Arial,'Heebo',sans-serif}
      .a11y-close{width:36px;height:36px;border:0 !important;border-radius:50% !important;background:#f1f1f1 !important;font-size:22px !important;line-height:1 !important;padding:0 !important;margin:0 !important}
      .a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .a11y-panel button{min-height:48px;margin:0;padding:9px 10px;border:1px solid #cfcfcf;border-radius:12px;background:#fff;color:#111;font-size:14px;line-height:1.25;cursor:pointer;font-weight:600}
      .a11y-panel button:hover{background:#f5f5f5}
      .a11y-panel button[aria-pressed="true"]{background:#2f302c;color:#fff;border-color:#2f302c}
      .a11y-wide{grid-column:1/-1}
      .a11y-hide-btn{background:#f8f8f8 !important;border-style:dashed !important}
      .a11y-note{font-size:12px;color:#666;margin:12px 2px 0;line-height:1.5}

      .a11y-hide-overlay{position:fixed;inset:0;z-index:100002;background:rgba(0,0,0,.4);display:grid;place-items:center;padding:18px}
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

    var main=document.querySelector('main');
    if(main&&!main.id) main.id='main-content';
    if(main){
      var skip=document.createElement('a');
      skip.className='skip-link';
      skip.href='#main-content';
      skip.textContent='דלג לתוכן המרכזי';
      document.body.insertBefore(skip,document.body.firstChild);
      main.setAttribute('tabindex','-1');
    }

    var nav=document.querySelector('nav');
    if(nav&&!nav.getAttribute('aria-label')) nav.setAttribute('aria-label','ניווט ראשי');
    document.querySelectorAll('nav a.active').forEach(function(a){a.setAttribute('aria-current','page')});
    document.querySelectorAll('a[target="_blank"]').forEach(function(a){
      if(!a.getAttribute('aria-label')) a.setAttribute('aria-label',(a.textContent||'קישור')+' (נפתח בחלון חדש)');
    });
    document.querySelectorAll('img:not([alt])').forEach(function(img){img.alt=''});

    function widgetHidden(){
      try{
        var raw=localStorage.getItem('moranA11yHiddenUntil');
        if(!raw)return false;
        if(raw==='session')return sessionStorage.getItem('moranA11yHiddenSession')==='1';
        var until=parseInt(raw,10);
        if(!isNaN(until)&&Date.now()<until)return true;
        localStorage.removeItem('moranA11yHiddenUntil');
      }catch(e){}
      return false;
    }

    var toggle=document.createElement('button');
    toggle.className='a11y-toggle';
    toggle.type='button';
    toggle.setAttribute('aria-label','פתיחת תפריט נגישות');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls','a11y-panel');
    toggle.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle cx="32" cy="11" r="6" fill="currentColor"/><path d="M18 22c0-3 2-5 5-5h18c3 0 5 2 5 5 0 2-2 4-4 5l-6 2v8l9 13c2 3 1 7-2 8-3 2-6 1-8-2l-3-5-3 5c-2 3-5 4-8 2-3-1-4-5-2-8l9-13v-8l-6-2c-2-1-4-3-4-5z" fill="currentColor"/></svg>';

    var panel=document.createElement('div');
    panel.id='a11y-panel';
    panel.className='a11y-panel';
    panel.hidden=true;
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','false');
    panel.setAttribute('aria-label','אפשרויות נגישות');
    panel.innerHTML='\
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

    var overlay=document.createElement('div');
    overlay.className='a11y-hide-overlay';
    overlay.hidden=true;
    overlay.innerHTML='\
      <div class="a11y-hide-dialog" role="dialog" aria-modal="true" aria-labelledby="a11y-hide-title">\
        <div class="a11y-hide-dialog-head"><h3 id="a11y-hide-title">הסתרת וידג׳ט נגישות</h3><button type="button" class="a11y-hide-dialog-close" aria-label="סגירה">×</button></div>\
        <div class="a11y-hide-options">\
          <label><input type="radio" name="a11y-hide-period" value="session" checked> רק עבור ההפעלה הנוכחית</label>\
          <label><input type="radio" name="a11y-hide-period" value="24h"> 24 שעות</label>\
          <label><input type="radio" name="a11y-hide-period" value="week"> שבוע אחד</label>\
        </div>\
        <div class="a11y-hide-actions"><button type="button" class="a11y-hide-confirm">הסתר את הווידג׳ט</button><button type="button" class="a11y-hide-cancel">ביטול</button></div>\
      </div>';

    function load(){try{return JSON.parse(localStorage.getItem('moranA11y')||'{}')}catch(e){return {}}}
    function save(s){try{localStorage.setItem('moranA11y',JSON.stringify(s))}catch(e){}}
    function press(key,on){var b=panel.querySelector('[data-a11y="'+key+'"]');if(b)b.setAttribute('aria-pressed',String(!!on));}
    function apply(s){
      ['a11y-size-1','a11y-size-2','a11y-size-3'].forEach(function(c){document.documentElement.classList.remove(c)});
      if(s.size>0)document.documentElement.classList.add('a11y-size-'+Math.min(3,s.size));
      document.documentElement.classList.toggle('a11y-contrast',!!s.contrast);
      document.documentElement.classList.toggle('a11y-grayscale',!!s.grayscale);
      document.documentElement.classList.toggle('a11y-underline',!!s.underline);
      document.documentElement.classList.toggle('a11y-readable',!!s.readable);
      document.documentElement.classList.toggle('a11y-headings',!!s.headings);
      document.documentElement.classList.toggle('a11y-stop-motion',!!s.motion);
      press('contrast',s.contrast);press('grayscale',s.grayscale);press('underline',s.underline);press('readable',s.readable);press('headings',s.headings);press('motion',s.motion);
    }
    var state=load();apply(state);

    function openPanel(){panel.hidden=false;toggle.setAttribute('aria-expanded','true');var b=panel.querySelector('button');if(b)b.focus();}
    function closePanel(){panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}
    function openHideDialog(){overlay.hidden=false;var r=overlay.querySelector('input:checked');if(r)r.focus();}
    function closeHideDialog(){overlay.hidden=true;var b=panel.querySelector('[data-a11y="hide-widget"]');if(b)b.focus();}
    function hideWidget(){
      var selected=overlay.querySelector('input[name="a11y-hide-period"]:checked');
      var period=selected?selected.value:'session';
      try{
        if(period==='session'){
          localStorage.setItem('moranA11yHiddenUntil','session');
          sessionStorage.setItem('moranA11yHiddenSession','1');
        }else if(period==='24h'){
          localStorage.setItem('moranA11yHiddenUntil',String(Date.now()+24*60*60*1000));
        }else if(period==='week'){
          localStorage.setItem('moranA11yHiddenUntil',String(Date.now()+7*24*60*60*1000));
        }
      }catch(e){}
      overlay.hidden=true;
      panel.hidden=true;
      toggle.hidden=true;
      toggle.setAttribute('aria-expanded','false');
    }

    toggle.addEventListener('click',function(){panel.hidden?openPanel():closePanel()});
    panel.querySelector('.a11y-close').addEventListener('click',closePanel);
    overlay.querySelector('.a11y-hide-dialog-close').addEventListener('click',closeHideDialog);
    overlay.querySelector('.a11y-hide-cancel').addEventListener('click',closeHideDialog);
    overlay.querySelector('.a11y-hide-confirm').addEventListener('click',hideWidget);

    panel.addEventListener('click',function(e){
      var key=e.target&&e.target.getAttribute('data-a11y');if(!key)return;
      if(key==='font-up')state.size=Math.min(3,(state.size||0)+1);
      if(key==='font-down')state.size=Math.max(0,(state.size||0)-1);
      if(key==='contrast')state.contrast=!state.contrast;
      if(key==='grayscale')state.grayscale=!state.grayscale;
      if(key==='underline')state.underline=!state.underline;
      if(key==='readable')state.readable=!state.readable;
      if(key==='headings')state.headings=!state.headings;
      if(key==='motion')state.motion=!state.motion;
      if(key==='hide-widget'){openHideDialog();return;}
      if(key==='reset')state={};
      save(state);apply(state);
    });

    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&!overlay.hidden){closeHideDialog();return;}
      if(e.key==='Escape'&&!panel.hidden)closePanel();
    });
    document.addEventListener('click',function(e){
      if(!panel.hidden&&!panel.contains(e.target)&&!toggle.contains(e.target)&&overlay.hidden){panel.hidden=true;toggle.setAttribute('aria-expanded','false');}
    });

    document.body.appendChild(toggle);
    document.body.appendChild(panel);
    document.body.appendChild(overlay);

    if(widgetHidden())toggle.hidden=true;
  });
})();