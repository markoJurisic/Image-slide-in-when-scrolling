// Debounce helps us choose interval for checkslide update. It would execute way more often than needed and slow down the page.
function debounce(func, wait = 16, immediate = true) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const sliderImages = document.querySelectorAll('.slide-in');


function checkSlide() {
	sliderImages.forEach(image => {
		// half way of the image
		const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
		// bottom of the image
		const imageBottom = image.offsetTop + image.height;
		const isHalfShown = slideInAt > image.offsetTop;
		const isNotScrolledPast = window.scrollY < imageBottom;

		// Slides in when half of the picture is revealed, slides out when whole image is away.
		if (isHalfShown && isNotScrolledPast) {
			image.classList.add('active');
		} else {
			image.classList.remove('active');
		}
	});
}

window.addEventListener('scroll', debounce(checkSlide));