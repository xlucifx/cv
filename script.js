(function(){
	const toggle = document.getElementById('langToggle');
	if(!toggle) return;
	const nodes = Array.from(document.querySelectorAll('[data-en]'));
	const DURATION = 220;

	function applyTexts(en){
		nodes.forEach(el=>{
			const tag = el.tagName.toLowerCase();
			const text = en ? el.getAttribute('data-en') : el.getAttribute('data-pl');
			if(text==null) return;
			if(tag === 'input' || tag === 'textarea') el.value = text;
			else el.innerHTML = text;
		});
	}

	function setLang(en, animated = true){
		if(!animated){
			applyTexts(en);
			toggle.textContent = en ? 'PL' : 'Eng';
			toggle.setAttribute('aria-pressed', en ? 'true':'false');
			localStorage.setItem('cv-lang', en ? 'en' : 'pl');
			return;
		}

		nodes.forEach(el=>{ el.style.transition = `opacity ${DURATION}ms ease`; el.style.opacity = '0'; });
		setTimeout(()=>{
			applyTexts(en);
			nodes.forEach(el=>{ el.style.opacity = '1'; });
			toggle.textContent = en ? 'PL' : 'Eng';
			toggle.setAttribute('aria-pressed', en ? 'true':'false');
			localStorage.setItem('cv-lang', en ? 'en' : 'pl');
		}, DURATION);
	}

	const saved = localStorage.getItem('cv-lang');
	if(saved === 'en') setLang(true, false);

	toggle.addEventListener('click', ()=>{
		const nowEn = localStorage.getItem('cv-lang') === 'en';
		setLang(!nowEn, true);
	});
})();