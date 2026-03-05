(function(){
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const socialsToggleBtn = document.getElementById('socialsToggleBtn');
    const socialsModal = document.getElementById('socialsModal');
    const socialsModalClose = document.getElementById('socialsModalClose');

    function openMenu(){
        sidebar.classList.add('open');
        sidebar.setAttribute('aria-hidden','false');
        overlay.hidden = false;
        requestAnimationFrame(()=> overlay.classList.add('visible'));
    }
    function closeMenu(){
        sidebar.classList.remove('open');
        sidebar.setAttribute('aria-hidden','true');
        overlay.classList.remove('visible');
        overlay.addEventListener('transitionend', function h(){ overlay.hidden = true; overlay.removeEventListener('transitionend', h); });
    }

    hamburger.addEventListener('click', ()=>{
        if(sidebar.classList.contains('open')) closeMenu(); else openMenu();
    });
    hamburger.addEventListener('keydown', (e)=>{ if(e.key=== 'Enter' || e.key===' ') { e.preventDefault(); hamburger.click(); } });
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keyup', (e)=>{ if(e.key === 'Escape') closeMenu(); });

    // Socials Modal Toggle (visible on all screens)
    if(socialsToggleBtn) {
        socialsToggleBtn.addEventListener('click', ()=>{
            socialsModal.classList.add('active');
        });
    }
    if(socialsModalClose) {
        socialsModalClose.addEventListener('click', ()=>{
            socialsModal.classList.remove('active');
        });
    }
    if(socialsModal) {
        socialsModal.addEventListener('click', (e)=>{
            if(e.target === socialsModal) {
                socialsModal.classList.remove('active');
            }
        });
    }
    // Contact button click handler for mobile
    const contactDiv = document.querySelector('.contact');
    if(contactDiv) {
        contactDiv.addEventListener('click', (e)=>{
            // Only toggle on mobile (max-width: 768px)
            if(window.innerWidth <= 768) {
                // Don't toggle if the click is on a link
                if(e.target.tagName !== 'A') {
                    e.preventDefault();
                    contactDiv.classList.toggle('active');
                }
            }
        });
    }})();

