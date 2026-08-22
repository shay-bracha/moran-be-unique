(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();}
  ready(function(){
    var style=document.createElement('style');
    style.textContent=`
      :focus-visible{outline:3px solid #1f5fae !important;outline-offset:3px !important}
      .skip-link{position:fixed;top:10px;right:10px;z-index:99999;background:#111;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;transform:translateY(-150%);transition:transform .2s}
      .skip-link:focus{transform:translateY(0)}
      .a11y-toggle{position:fixed;left:18px;bottom:18px;z-index:9998;width:52px;height:52px;border-radius:50%;border:2px solid #fff;background:#2f302c;color:#fff;font:700 24px/1 Arial,sans-serif;box-shadow:0 4px 18px rgba(0,0,0,.2);cursor:pointer}
      .a11y-panel{position:fixed;left:18px;bottom:80px;z-index:9999;width:min(300px,calc(100vw - 36px));background:#fff;color:#222;border:1px solid #cfcfcf;border-radius:16px;padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.22);font-family:Arial,sans-serif;direction:rtl}
      .a11y-panel[hidden]{display:none}.a11y-panel h2{font-size:18px;margin:0 0 10px;font-family:Arial,sans-serif}
      .a11y-panel button{width:100%;margin:4px 0;padding:10px 12px;border:1px solid #777;border-radius:10px;background:#fff;color:#111;font-size:15px;cursor:pointer}
      .a11y-panel button:hover{background:#f2f2f2}
      html.a11y-large{font-size:118%}html.a11y-larger{font-size:132%}
      html.a11y-contrast body{background:#000 !important;color:#fff !important}
      html.a11y-contrast body *{background-color:#000 !important;color:#fff !important;border-color:#fff !important;box-shadow:none !important}
      html.a11y-contrast a,html.a11y-contrast button{color:#ffeb3b !important;text-decoration:underline !important}
      html.a11y-underline a{text-decoration:underline !important;text-underline-offset:3px}
      html.a11y-readable body,html.a11y-readable body *{font-family:Arial,sans-serif !important;letter-spacing:.02em !important;word-spacing:.06em !important}
      @media (prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto !important;animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}}
      @media(max-width:600px){.a11y-toggle{left:12px;bottom:12px;width:48px;height:48px}.a11y-panel{left:12px;bottom:68px;width:calc(100vw - 24px)}}
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

    var toggle=document.createElement('button');
    toggle.className='a11y-toggle';
    toggle.type='button';
    toggle.setAttribute('aria-label','פתיחת תפריט נגישות');
    toggle.setAttribute('aria-expanded','false');
    toggle.textContent='♿';

    var panel=document.createElement('div');
    panel.className='a11y-panel';
    panel.hidden=true;
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-label','אפשרויות נגישות');
    panel.innerHTML='<h2>אפשרויות נגישות</h2><button type="button" data-a11y="large">הגדלת טקסט</button><button type="button" data-a11y="contrast">ניגודיות גבוהה</button><button type="button" data-a11y="underline">הדגשת קישורים</button><button type="button" data-a11y="readable">פונט קריא</button><button type="button" data-a11y="reset">איפוס הגדרות</button>';

    function load(){try{return JSON.parse(localStorage.getItem('moranA11y')||'{}')}catch(e){return {}}}
    function save(s){try{localStorage.setItem('moranA11y',JSON.stringify(s))}catch(e){}}
    function apply(s){
      document.documentElement.classList.toggle('a11y-large',s.size===1);
      document.documentElement.classList.toggle('a11y-larger',s.size===2);
      document.documentElement.classList.toggle('a11y-contrast',!!s.contrast);
      document.documentElement.classList.toggle('a11y-underline',!!s.underline);
      document.documentElement.classList.toggle('a11y-readable',!!s.readable);
    }
    var state=load();apply(state);

    toggle.addEventListener('click',function(){
      panel.hidden=!panel.hidden;
      toggle.setAttribute('aria-expanded',String(!panel.hidden));
      if(!panel.hidden){var b=panel.querySelector('button');if(b)b.focus();}
    });
    panel.addEventListener('click',function(e){
      var key=e.target&&e.target.getAttribute('data-a11y');if(!key)return;
      if(key==='large'){state.size=((state.size||0)+1)%3}
      if(key==='contrast')state.contrast=!state.contrast;
      if(key==='underline')state.underline=!state.underline;
      if(key==='readable')state.readable=!state.readable;
      if(key==='reset')state={};
      save(state);apply(state);
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}});
    document.body.appendChild(toggle);document.body.appendChild(panel);
  });
})();