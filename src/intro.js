/* Short cinematic reveal controller. Camera/cover choreography lives in app.js. */
(function(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(window.location.search);
  const skip = params.has('skipIntro') || params.get('intro') === '0';
  let fallbackTimer = 0;

  function shouldRun(){
    return !reduceMotion && !skip;
  }
  function start(){
    if(!shouldRun()) return;
    document.body.classList.add('intro-active');
    document.body.classList.remove('intro-done');
    clearTimeout(fallbackTimer);
    fallbackTimer = setTimeout(finish, 5200);
  }
  function finish(){
    clearTimeout(fallbackTimer);
    document.body.classList.remove('intro-active');
    document.body.classList.add('intro-done');
  }

  window.InteractiveDiplomaIntro = { shouldRun, start, finish };
})();
