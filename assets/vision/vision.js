/* Joseph Martin — Vision 001: shared behaviour (menu, motion preference). */
(function(){
  var root=document.documentElement;
  root.classList.remove('no-js');
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    // The drawing's strokes don't scale (vector-effect), so their dashes are measured in screen pixels.
    // Give each line its true on-screen length, so the hat draws over the same 2.2 s at every screen size.
    document.querySelectorAll('.drawing').forEach(function(svg){
      var m=svg.getScreenCTM(), k=m?Math.hypot(m.a,m.b):1;
      svg.querySelectorAll('.ln').forEach(function(p){
        if(p.getTotalLength) p.style.setProperty('--len',Math.ceil(p.getTotalLength()*k+2));
      });
    });
    root.classList.add('motion');
  }
  var btn=document.querySelector('.menu-btn'), nav=document.getElementById('nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open);
      btn.textContent=open?'Close':'Menu';
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&nav.classList.contains('open')){btn.click();btn.focus()}
    });
  }
})();
