/* High-quality canvas export for the Interactive Diploma viewer. */
(function(){
  function nextFrame(){ return new Promise(resolve=>requestAnimationFrame(()=>resolve())); }
  function downloadBlob(blob, filename){
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'interactive-diploma-view.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 1200);
  }

  window.InteractiveDiplomaCapture = {
    install({button, canvas, renderer, scene, camera, setHint, filename}){
      if(!button || !canvas || !renderer || !scene || !camera) return;
      let busy = false;
      button.addEventListener('click', async ()=>{
        if(busy) return;
        busy = true;
        button.disabled = true;
        button.classList.add('is-saving');
        const previousLabel = button.getAttribute('aria-label') || 'Export screenshot';
        button.setAttribute('aria-label', 'Saving screenshot');
        if(setHint) setHint('Saving image', true);

        const oldPixelRatio = renderer.getPixelRatio();
        const oldSize = renderer.getSize(new THREE.Vector2());
        const oldToneExposure = renderer.toneMappingExposure;
        const exportPixelRatio = Math.min(3, Math.max(oldPixelRatio, window.devicePixelRatio || 1, 2));

        try{
          document.body.classList.add('is-capturing');
          await nextFrame();
          renderer.setPixelRatio(exportPixelRatio);
          renderer.setSize(oldSize.x, oldSize.y, false);
          renderer.toneMappingExposure = oldToneExposure + 0.015;
          renderer.render(scene, camera);
          await nextFrame();

          const blob = await new Promise(resolve=>canvas.toBlob(resolve, 'image/png'));
          if(blob){
            downloadBlob(blob, filename || 'interactive-diploma-view.png');
            if(setHint) setHint('Image saved', true);
          }else{
            throw new Error('Canvas export returned no image.');
          }
        }catch(error){
          console.warn('[interactive-diploma] Screenshot export failed:', error);
          if(setHint) setHint('Export failed', true);
        }finally{
          renderer.setPixelRatio(oldPixelRatio);
          renderer.setSize(oldSize.x, oldSize.y, false);
          renderer.toneMappingExposure = oldToneExposure;
          renderer.render(scene, camera);
          document.body.classList.remove('is-capturing');
          button.disabled = false;
          button.classList.remove('is-saving');
          button.setAttribute('aria-label', previousLabel);
          busy = false;
        }
      });
    }
  };
})();
