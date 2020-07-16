const navbarEl = document.querySelector('.navbar'),
	colorChangePoint = navbarEl.offsetTop;

window.addEventListener('scroll', () => {
	if (window.pageYOffset > colorChangePoint) {
		navbarEl.classList.add('navbar--scrolled');
	} else {
		navbarEl.classList.remove('navbar--scrolled');
	}
});

const announcementBannerEl = document.querySelector('.fls__announcement-banner');

if (announcementBannerEl) {
	document.querySelector('.fls__announcement-banner-close').addEventListener('click', () => {
		announcementBannerEl.classList.add('animate__slideOutDown');
	});
}

const dropdownEl = document.querySelector('.fls__navbar-dropdown');

document.querySelectorAll('.navbar--fls .tabs li').forEach(navbarItemEl => {
	navbarItemEl.addEventListener('mouseenter', e => {
		const leftPos = e.target.getBoundingClientRect().x,
			topOffset = -10,
			topPos = e.target.getBoundingClientRect().height + topOffset;

		dropdownEl.setAttribute('style', `top:${topPos}px;left:${leftPos}px`);
		dropdownEl.classList.add('fls--opaque');
	})

	navbarItemEl.addEventListener('mouseleave', () => dropdownEl.classList.remove('fls--opaque'));
});