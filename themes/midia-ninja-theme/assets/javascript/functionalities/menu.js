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

document.addEventListener('DOMContentLoaded', () => {
  const dropdownParents = document.querySelectorAll('.menu-especial__links .menu-item-has-children > a');

  dropdownParents.forEach(link => {
    link.addEventListener('click', e => {
      const parent = link.parentElement;
      if (parent.classList.contains('open')) return;
      e.preventDefault();
      parent.classList.toggle('open');
      const submenu = parent.querySelector('.sub-menu');
      if (submenu) submenu.style.display = parent.classList.contains('open') ? 'block' : 'none';
    });
  });

  const menuItems = document.querySelectorAll('.menu-especial__links .menu-item-has-children');

  menuItems.forEach(item => {
    const submenu = item.querySelector('.sub-menu');
    if (!submenu) return;

    const floating = submenu.cloneNode(true);
    floating.classList.add('menu-especial-submenu');
    document.body.appendChild(floating);

    let isHovering = false;

    const showFloating = () => {
      const rect = item.getBoundingClientRect();
      floating.style.display = 'block';
      floating.style.top = rect.bottom - 10 + 'px';
      floating.style.left = rect.left + 'px';
      floating.style.minWidth = rect.width + 'px';
    };

    const hideFloating = () => {
      if (!isHovering) floating.style.display = 'none';
    };

    item.addEventListener('mouseenter', showFloating);
    item.addEventListener('mouseleave', () => {
      setTimeout(() => hideFloating(), 100);
    });

    floating.addEventListener('mouseenter', () => {
      isHovering = true;
      floating.style.display = 'block';
    });
    floating.addEventListener('mouseleave', () => {
      isHovering = false;
      floating.style.display = 'none';
    });
  });
});
