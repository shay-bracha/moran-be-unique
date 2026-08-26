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
  function setupHealthForm(){
    var form=document.querySelector('form[name="health-declaration"]');
    if(!form)return;
    var steps=[].slice.call(form.querySelectorAll('.step'));
    var bars=[].slice.call(document.querySelectorAll('#progress i'));
    var current=steps.findIndex(function(s){return s.classList.contains('active')});
    if(current<0)current=0;
    var error=document.getElementById('error');

    function syncConditional(){
      form.querySelectorAll('.q').forEach(function(q){
        var yes=q.querySelector('input[type="radio"][value="כן"]');
        var details=q.querySelector('.details');
        if(!details)return;
        var active=!!(yes&&yes.checked);
        q.classList.toggle('yes',active);
        details.querySelectorAll('input,textarea,select').forEach(function(el){
          if(el.type!=='file')el.required=active;
        });
      });
      var file=form.querySelector('input[name="medical_document"]');
      if(file)file.required=false;
    }

    function show(n){
      current=n;
      steps.forEach(function(s,i){s.classList.toggle('active',i===current)});
      bars.forEach(function(b,i){b.classList.toggle('on',i<=current)});
      if(error)error.classList.remove('show');
      initSignature();
      window.scrollTo({top:100,behavior:'smooth'});
    }

    function validateCurrent(){
      syncConditional();
      var controls=[].slice.call(steps[current].querySelectorAll('input,textarea,select'));
      for(var i=0;i<controls.length;i++){
        var el=controls[i];
        if(el.type==='hidden'||el.type==='file')continue;
        var details=el.closest('.details');
        if(details&&getComputedStyle(details).display==='none')continue;
        if(!el.checkValidity()){
          if(error)error.classList.add('show');
          el.reportValidity();
          return false;
        }
      }
      if(error)error.classList.remove('show');
      return true;
    }

    form.querySelectorAll('input,textarea,select').forEach(function(el){
      if(el.type==='hidden'||el.type==='file'||el.type==='button'||el.type==='submit')return;
      if(el.closest('.details'))return;
      el.required=true;
    });
    syncConditional();
    form.addEventListener('change',syncConditional);

    document.querySelectorAll('.next').forEach(function(btn){
      btn.onclick=function(){if(validateCurrent())show(Math.min(steps.length-1,current+1));};
    });
    document.querySelectorAll('.prev').forEach(function(btn){
      if(btn.id!=='clear')btn.onclick=function(){show(Math.max(0,current-1));};
    });

    var canvas=document.getElementById('sig');
    var ctx=null,draw=false,hasSig=false;
    function initSignature(){
      if(!canvas||!canvas.offsetParent)return;
      var r=canvas.getBoundingClientRect();
      var ratio=window.devicePixelRatio||1;
      canvas.width=Math.max(1,Math.round(r.width*ratio));
      canvas.height=Math.max(1,Math.round(r.height*ratio));
      ctx=canvas.getContext('2d');
      ctx.setTransform(ratio,0,0,ratio,0,0);
      ctx.lineWidth=2;ctx.lineCap='round';ctx.strokeStyle='#35322f';
    }
    function point(e){var r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];}
    if(canvas){
      canvas.onpointerdown=function(e){initSignature();draw=true;hasSig=true;canvas.setPointerCapture(e.pointerId);ctx.beginPath();var p=point(e);ctx.moveTo(p[0],p[1]);var w=canvas.closest('.signature-wrap');if(w)w.classList.add('signed');e.preventDefault();};
      canvas.onpointermove=function(e){if(!draw)return;var p=point(e);ctx.lineTo(p[0],p[1]);ctx.stroke();e.preventDefault();};
      canvas.onpointerup=canvas.onpointercancel=function(){draw=false;};
      var clear=document.getElementById('clear');
      if(clear)clear.onclick=function(){initSignature();ctx.clearRect(0,0,canvas.width,canvas.height);hasSig=false;var w=canvas.closest('.signature-wrap');if(w)w.classList.remove('signed');};
    }

    form.addEventListener('submit',function(e){
      if(!validateCurrent()){e.preventDefault();return;}
      if(canvas&&!hasSig){e.preventDefault();alert('יש לחתום בכתב יד לפני שליחת ההצהרה');return;}
      var sig=document.getElementById('signature');if(sig&&canvas)sig.value=canvas.toDataURL('image/png');
      var signedAt=document.getElementById('signedAt');if(signedAt)signedAt.value=new Date().toLocaleString('he-IL');
    },true);
    initSignature();
  }
  ensureHomeLink();
  setupHealthForm();
  var s=document.createElement('script');
  s.src='assets/accessibility-original.js';
  s.defer=true;
  document.head.appendChild(s);
})();