document.addEventListener("DOMContentLoaded", function () {
	const mainMenu = document.querySelector('.main-header #main-menu');
	if (!mainMenu) return;

	const mq = window.matchMedia("(min-width: 768px)");
	let pidCounter = 0;

	function promoteSubmenus() {
		const parents = mainMenu.querySelectorAll(':scope > li.menu-item-has-children');
		parents.forEach(parent => {
			if (!parent.dataset.pid) parent.dataset.pid = (++pidCounter).toString();
			const submenu = parent.querySelector(':scope > .sub-menu');
			if (!submenu) return;

			const children = Array.from(submenu.children);
			children.forEach(child => {
				if (child.dataset.promoted === '1') return;
				child.dataset.promoted = '1';
				child.dataset.parentPid = parent.dataset.pid;
				child.classList.add('promoted-subitem');
				parent.after(child);
			});
			submenu.style.display = 'none';
			parent.classList.remove('active');
		});
	}

	function restoreSubmenus() {
		const promoted = Array.from(mainMenu.querySelectorAll(':scope > li.promoted-subitem[data-promoted="1"]'));
		promoted.forEach(item => {
			const pid = item.dataset.parentPid;
			const parent = mainMenu.querySelector(':scope > li.menu-item-has-children[data-pid="'+pid+'"]');
			if (!parent) return;
			const submenu = parent.querySelector(':scope > .sub-menu');
			if (!submenu) return;
			submenu.appendChild(item);
			item.classList.remove('promoted-subitem');
			delete item.dataset.promoted;
			delete item.dataset.parentPid;
		});
		const submenus = mainMenu.querySelectorAll(':scope > li.menu-item-has-children > .sub-menu');
		submenus.forEach(sm => { sm.style.display = ''; });
	}

	function handleLayout() {
		if (mq.matches) {
			restoreSubmenus();
		} else {
			promoteSubmenus();
		}
	}

	mainMenu.addEventListener('mouseenter', (e) => {
		if (!mq.matches) return;
		const li = e.target.closest('li.menu-item-has-children');
		if (li && li.parentElement === mainMenu) li.classList.add('active');
	}, true);

	mainMenu.addEventListener('mouseleave', (e) => {
		if (!mq.matches) return;
		const li = e.target.closest('li.menu-item-has-children');
		if (li && li.parentElement === mainMenu) li.classList.remove('active');
	}, true);

	handleLayout();
	mq.addEventListener('change', handleLayout);

	const menuItens = document.querySelector(".menu-items");
	const menuButton = document.querySelector("#burguer-checkbox");
	const buttonMais = document.querySelector(".mais");
	const searchMenu = document.querySelector(".search-menu");
	const hamburgerLines = document.querySelector(".hamburger-lines");
	const hamburgerLinesMobile = document.querySelector(".hamburger-lines--mobile");
	const closeMenu = document.querySelector(".close-menu");

	hamburgerLines.addEventListener('click', function (ev) {
		ev.preventDefault();
		if (menuItens.classList.contains('open')) {
			menuItens.classList.remove('open');
		} else {
			menuItens.classList.add('open');
			searchFieldFocus('#searchform .search-field');
		}
	});

	hamburgerLinesMobile.addEventListener('click', function (ev) {
		ev.preventDefault();
		if (menuItens.classList.contains('open')) {
			menuItens.classList.remove('open');
		} else {
			menuItens.classList.add('open');
			searchFieldFocus('#searchform .search-field');
		}
	});

	closeMenu.addEventListener('click', function (ev) {
		ev.preventDefault();
		menuItens.classList.remove('open');
	});

	searchMenu.addEventListener("click", function () {
		if (menuItens.classList.contains("open")) {
			menuItens.classList.remove("open");
		} else {
			menuItens.classList.add("open");
			searchFieldFocus('#searchform .search-field');
		}
	});

	buttonMais.addEventListener("click", function (ev) {
		ev.preventDefault();
		if (menuItens.classList.contains('open')) {
			menuItens.classList.remove('open');
		} else {
			menuItens.classList.add('open');
			searchFieldFocus('#searchform .search-field');
		}
	});

	const burguerMenu = document.querySelector('.hamburguer #menu-hamburguer');
	const burguerWithChild = burguerMenu ? burguerMenu.querySelectorAll('#menu-hamburguer li.menu-item-has-children') : [];

	burguerWithChild.forEach(item => {
		if (item.parentElement.classList.contains('sub-menu')) return;
		item.querySelector('a').addEventListener('click', function (e) {
			e.preventDefault();
			item.classList.toggle('active');
		});
	});

	document.addEventListener('click', function (e) {
		if (e.target.closest('.primary-menu') === null) {
			let allItens = mainMenu.querySelectorAll('.active');
			allItens.forEach(function (item) { item.classList.remove('active'); });
		}
	});

	function throttle(func, delay) {
		let lastFunc;
		let lastRan;
		return function () {
			const context = this;
			const args = arguments;
			if (!lastRan) {
				func.apply(context, args);
				lastRan = Date.now();
			} else {
				clearTimeout(lastFunc);
				lastFunc = setTimeout(function () {
					if ((Date.now() - lastRan) >= delay) {
						func.apply(context, args);
						lastRan = Date.now();
					}
				}, delay - (Date.now() - lastRan));
			}
		}
	}

	const header = document.querySelector(".main-header");
	let isScrolled = false;

	const detectScroll = throttle(function () {
		const scroll = window.scrollY || document.documentElement.scrollTop;
		const threshold = 100;
		const returnPoint = 50;
		if (scroll > threshold && !isScrolled) {
			header.classList.add("scrolado");
			isScrolled = true;
		} else if (scroll < returnPoint && isScrolled) {
			header.classList.remove("scrolado");
			isScrolled = false;
		}
		closeSubmenus();
	}, 200);

	document.addEventListener('wheel', detectScroll, { passive: true });
	document.addEventListener('touchmove', detectScroll, { passive: true });
	document.addEventListener('scroll', detectScroll, { passive: true });

	function searchFieldFocus(element) {
		let searchField = document.querySelector(element);
		if (searchField) {
			setTimeout(function () { searchField.focus(); }, 100);
		}
	}

	function closeSubmenus() {
		const itensWithChild = mainMenu.querySelectorAll('#main-menu li.menu-item-has-children');
		itensWithChild.forEach(item => {
			if (item.parentElement.classList.contains('sub-menu')) return;
			item.classList.remove('active');
		});
	}

	const scrollContainer = document.querySelector('.menu-especial__links ul');
	const scrollLeftBtn = document.querySelector('.menu-especial__scroll-btn--left');
	const scrollRightBtn = document.querySelector('.menu-especial__scroll-btn--right');

	if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
		const scrollAmount = 150;
		scrollContainer.style.overflowX = 'hidden';
		scrollLeftBtn.addEventListener('click', function () {
			scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
		});
		scrollRightBtn.addEventListener('click', function () {
			scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		});
	}
});


document.addEventListener('DOMContentLoaded',function(){
  const root=document.querySelector('.menu-especial__links'); if(!root) return;
  const isMobile=()=>!window.matchMedia('(min-width:769px)').matches;
  const overlay=document.createElement('div'); overlay.className='menu-especial__overlay'; document.body.appendChild(overlay);
  const pop=document.createElement('div'); pop.className='menu-especial__popover'; document.body.appendChild(pop);

  let openOwner=null, openHref=null;

  const close=()=>{pop.style.display='none';overlay.style.display='none';pop.replaceChildren();openOwner=null;openHref=null};
  overlay.addEventListener('click',close);
  window.addEventListener('scroll',()=>{if(pop.style.display==='block'&&openOwner) positionPopover(openOwner)}, {passive:true});
  window.addEventListener('resize',()=>{if(!isMobile()) close()});

  function copyTheme(from){
    const host=from.closest('.menu-especial')||document.documentElement;
    const cs=getComputedStyle(host);
    const bg=cs.getPropertyValue('--menu-especial-bg').trim()||'#fff';
    const link=cs.getPropertyValue('--menu-especial-link').trim()||'#111';
    pop.style.background=bg;
    pop.querySelectorAll('a').forEach(a=>{a.style.color=link});
  }

  function positionPopover(owner){
    const r=owner.getBoundingClientRect();
    const top=r.bottom+6;
    const left=Math.max(8, Math.min(r.left, window.innerWidth-8- Math.max(r.width, 240)));
    pop.style.top=top+'px';
  	pop.style.left = '207px';
  }

  root.querySelectorAll('.menu-item-has-children > a').forEach(link=>{
    link.addEventListener('click',e=>{
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button===1) return;
      const li=link.parentElement;
      const submenu=li.querySelector('.sub-menu');
      const href=link.getAttribute('href')||'#';

      if(!isMobile()) return;
      e.preventDefault(); e.stopPropagation();

      if(openOwner===li){ window.location.href=openHref||href; return; }

      close();
      if(!submenu) { window.location.href=href; return; }

      const clone=submenu.cloneNode(true);
      clone.style.display='block';
      pop.replaceChildren(clone);
      copyTheme(li);
      positionPopover(li);
      overlay.style.display='block';
      pop.style.display='block';
      openOwner=li; openHref=href;

      pop.addEventListener('click',ev=>{
        const a=ev.target.closest('a'); if(!a) return;
        ev.stopPropagation();
        const go=a.getAttribute('href'); if(go) window.location.href=go;
      }, {once:true});
    }, {passive:false});
  });

  document.addEventListener('click',e=>{
    if(isMobile() && !e.target.closest('.menu-especial__popover')) close();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  const getNavEl = (wrap) =>
    wrap.querySelector('.tabs-titles') ||
    wrap.querySelector('[role="tablist"]') ||
    wrap.querySelector('.atbs-tabs__nav') ||
    wrap.querySelector('ul');

  const getTabs = (nav) => {
    const sel = '[role="tab"], .tab-title, .tab-title > a, .tab-title > button, li > a, li > button';
    const found = Array.from(nav.querySelectorAll(sel));
    return found.length ? found : Array.from(nav.children);
  };

  const parsePX = (v) => (v ? parseFloat(v) || 0 : 0);

  const centerTabInView = (nav, tab) => {
    const item = tab.closest('li') || tab;
    const cs = getComputedStyle(nav);
    const padL = parsePX(cs.paddingLeft);
    const padR = parsePX(cs.paddingRight);
    const max = Math.max(0, nav.scrollWidth - nav.clientWidth);
    const target = (item.offsetLeft - padL) - (nav.clientWidth - item.offsetWidth) / 2;
    const clamped = Math.min(Math.max(target, 0), max);
    nav.scrollTo({ left: clamped, behavior: 'smooth' });
  };

  const getActiveIndex = (wrap, tabs) => {
    let i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    if (i > -1) return i;
    i = tabs.findIndex(t => t.classList.contains('is-active') || t.classList.contains('active'));
    if (i > -1) return i;
    if (wrap.dataset.atbsActive) return Math.max(0, Math.min(tabs.length - 1, Number(wrap.dataset.atbsActive) || 0));
    return 0;
  };

  const activateTab = (wrap, nav, tabs, index) => {
    if (index < 0 || index >= tabs.length) return;
    wrap.dataset.atbsActive = String(index);
    const keepY = window.scrollY;
    tabs[index].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    requestAnimationFrame(() => {
      window.scrollTo(window.scrollX, keepY);
      centerTabInView(nav, tabs[index]);
    });
  };

  const updateArrows = (nav, leftBtn, rightBtn) => {
    const max = Math.max(0, nav.scrollWidth - nav.clientWidth);
    leftBtn.disabled = nav.scrollLeft <= 1;
    rightBtn.disabled = nav.scrollLeft >= max - 1;
  };

  const placeArrows = (wrap, nav, leftBtn, rightBtn) => {
    const wRect = wrap.getBoundingClientRect();
    const nRect = nav.getBoundingClientRect();
    const top = (nRect.top - wRect.top) + nRect.height / 2 - leftBtn.offsetHeight / 2;
    leftBtn.style.top = `${top}px`;
    rightBtn.style.top = `${top}px`;
  };

  const initCarousel = (wrap) => {
    if (!isMobile() || wrap.dataset.atbsCarouselInit === '1') return;

    const nav = getNavEl(wrap);
    if (!nav) return;

    const tabs = getTabs(nav);
    if (!tabs.length) return;

    // garante “respiro” final/inicial via JS (sem depender do CSS)
    const cs = getComputedStyle(nav);
    const endPadDefault = 56;
    const startPadDefault = 14;
    const padL = parsePX(cs.paddingLeft);
    const padR = parsePX(cs.paddingRight);
    if (padL < startPadDefault) nav.style.paddingLeft = startPadDefault + 'px';
    if (padR < endPadDefault) nav.style.paddingRight = endPadDefault + 'px';

    const leftBtn = document.createElement('button');
    leftBtn.type = 'button';
    leftBtn.className = 'atbs-tabs__scroll-btn atbs-tabs__scroll-btn--left';
    leftBtn.setAttribute('aria-label', 'Anterior');
    leftBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';

    const rightBtn = document.createElement('button');
    rightBtn.type = 'button';
    rightBtn.className = 'atbs-tabs__scroll-btn atbs-tabs__scroll-btn--right';
    rightBtn.setAttribute('aria-label', 'Próximo');
    rightBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>';

    wrap.appendChild(leftBtn);
    wrap.appendChild(rightBtn);

    tabs.forEach((t, i) => t.addEventListener('click', () => { wrap.dataset.atbsActive = String(i); }));

    leftBtn.addEventListener('click', () => {
      const i = getActiveIndex(wrap, tabs);
      activateTab(wrap, nav, tabs, Math.max(0, i - 1));
    });

    rightBtn.addEventListener('click', () => {
      const i = getActiveIndex(wrap, tabs);
      activateTab(wrap, nav, tabs, Math.min(tabs.length - 1, i + 1));
    });

    nav.addEventListener('scroll', () => updateArrows(nav, leftBtn, rightBtn), { passive: true });

    const ro = new ResizeObserver(() => {
      placeArrows(wrap, nav, leftBtn, rightBtn);
      updateArrows(nav, leftBtn, rightBtn);
    });
    ro.observe(nav);
    ro.observe(wrap);

    placeArrows(wrap, nav, leftBtn, rightBtn);
    updateArrows(nav, leftBtn, rightBtn);

    const initIdx = getActiveIndex(wrap, tabs);
    centerTabInView(nav, tabs[initIdx]);

    wrap.dataset.atbsCarouselInit = '1';
  };

  const teardownCarousel = (wrap) => {
    wrap.querySelectorAll('.atbs-tabs__scroll-btn').forEach(b => b.remove());
    wrap.removeAttribute('data-atbs-carousel-init');
  };

  const refreshAll = () => {
    document.querySelectorAll('.wp-block-atbs-tabs').forEach(wrap => {
      if (isMobile()) initCarousel(wrap); else teardownCarousel(wrap);
    });
  };

  refreshAll();
  window.addEventListener('resize', refreshAll, { passive: true });

  const mo = new MutationObserver(refreshAll);
  mo.observe(document.body, { childList: true, subtree: true });
});
