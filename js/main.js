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

document.querySelector('.fls__announcement-banner-close').addEventListener('click', () => {
	announcementBannerEl.classList.add('animate__slideOutDown');
});