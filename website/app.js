(() => {
  const configs = {
    capture: { duration:6400 },
    sync: { duration:7000 },
    reuse: { duration:6000 }
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-demo]').forEach(el => {
    const config=configs[el.dataset.demo];
    let origin=performance.now();
    const update=()=>{
      const step=reduced.matches ? 3 : Math.min(3,Math.floor(((performance.now()-origin)%config.duration)/config.duration*4));
      if(el.dataset.step!==String(step)){
        el.dataset.step=String(step);
      }
    };
    update();
    setInterval(update,100);
  });
  let toastTimer;
  document.querySelectorAll('[data-copy]').forEach(button=>{
    button.addEventListener('click',async()=>{
      const toast=document.querySelector('.toast');
      try{
        await navigator.clipboard.writeText(button.dataset.copy);
        toast.textContent='地址已复制，请粘贴到浏览器地址栏打开';
      }catch{
        toast.textContent='请在地址栏输入：'+button.dataset.copy;
      }
      toast.classList.add('visible');
      clearTimeout(toastTimer);
      toastTimer=setTimeout(()=>toast.classList.remove('visible'),4000);
    });
  });
})();
