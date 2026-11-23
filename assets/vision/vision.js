/* Joseph Martin — Vision 001: shared behaviour (menu, motion preference). */
(function(){
  var root=document.documentElement;
  root.classList.remove('no-js');
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) root.classList.add('motion');
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
