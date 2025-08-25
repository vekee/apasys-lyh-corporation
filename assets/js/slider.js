/*
***
***
Name: 			slider.js
Written by: 	LayoutDrop 
Theme Version:	1.0.0
***
***
*/

'use strict';

document.addEventListener("DOMContentLoaded", function() {
	
	function checkSelectorExistence(selectorName) {
        return document.querySelector(selectorName) !== null;
    }
	
	var heroSwiper1 = function() {
		if(!checkSelectorExistence('.hero-swiper1')){return;}
		var swiper = new Swiper(".hero-swiper1", {
			slidesPerView: 1,
			spaceBetween: 0,
			effect: "fade",
			speed: 1500,
			autoplay: {
				delay: 3000,
			},
		});
	}
	
	var heroSwiper2 = function() {
		if(!checkSelectorExistence('.hero-swiper2')){return;}
		
		const progressCircle = document.querySelector(".autoplay-progress svg");
		const progressContent = document.querySelector(".autoplay-progress span");
		
		var heroSwiper2 = new Swiper(".hero-swiper2", {
			slidesPerView: 1,
			spaceBetween: 0,
			effect: "fade",
			speed: 1500,
			watchSlidesProgress: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			on: {
				autoplayTimeLeft(s, time, progress) {
					progressCircle.style.setProperty("--progress", 1 - progress);
					progressContent.textContent = `${Math.ceil(time / 1000)}s`;
				}
			}
		});
		var swiper2 = new Swiper(".hero-swiper2-thumb", {
			spaceBetween: 10,
			centeredSlides: true,
			slideToClickedSlide: true,
			speed: 1500,
			effect: "fade",
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			thumbs: {
				swiper: heroSwiper2,
			},
		});
		
		function heroSwiperPagination(){
			var swipertotalSlide = $('.hero-swiper2 .swiper-slide').length;			
			var fragment = document.querySelector('.slide-active');
			var fragment2 = document.querySelector('.slide-items');
			var current = heroSwiper2.realIndex + 1;
			if (current > swipertotalSlide)
			current = 1;
			var idx = current < 10 ? ("0" + current) : current;
			var tdx = swipertotalSlide < 10 ? ("0" + swipertotalSlide) : swipertotalSlide;
			fragment2.innerHTML = (tdx);
			fragment.innerHTML = (idx);
		}
		heroSwiperPagination();
		heroSwiper2.on('slideChange', function() {
			heroSwiperPagination();
		});
	}
	
	var heroSwiper5 = function() {
		if(!checkSelectorExistence('.hero-swiper5')){return;}
		
		const progressCircle = document.querySelector(".autoplay-progress svg");
		const progressContent = document.querySelector(".autoplay-progress span");
		
		var swiper = new Swiper(".hero-swiper5", {
			slidesPerView: 1,
			spaceBetween: 0,
			effect: "fade",
			speed: 1500,
			watchSlidesProgress: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			on: {
				autoplayTimeLeft(s, time, progress) {
					if (progressCircle && progressContent) {
						progressCircle.style.setProperty("--progress", 1 - progress);
						progressContent.textContent = `${Math.ceil(time / 1000)}s`;
					}
				}
			}
		});
		
		function heroSwiperPagination() {
			var swipertotalSlide = $('.hero-swiper5 .swiper-slide').length;
			var fragment = document.querySelector('.slide-active');
			var fragment2 = document.querySelector('.slide-items');
			var current = swiper.realIndex + 1;
			if (current > swipertotalSlide) current = 1;
			var idx = current < 10 ? ("0" + current) : current;
			var tdx = swipertotalSlide < 10 ? ("0" + swipertotalSlide) : swipertotalSlide;

			if (fragment2) fragment2.innerHTML = tdx;
			if (fragment) fragment.innerHTML = idx;
		}
		heroSwiperPagination();
		swiper.on('slideChange', function() {
			heroSwiperPagination();
		});
	}
	
	var heroSwiper6 = function() {
		if(!checkSelectorExistence('.hero-swiper6')){return;}
		
		const progressCircle = document.querySelector(".autoplay-progress svg");
		const progressContent = document.querySelector(".autoplay-progress span");
		
		var swiper = new Swiper(".hero-swiper6", {
			slidesPerView: 1,
			spaceBetween: 0,
			effect: "fade",
			speed: 1500,
			watchSlidesProgress: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			on: {
				autoplayTimeLeft(s, time, progress) {
					if (progressCircle && progressContent) {
						progressCircle.style.setProperty("--progress", 1 - progress);
						progressContent.textContent = `${Math.ceil(time / 1000)}s`;
					}
				}
			}
		});
		
		function heroSwiperPagination() {
			var swipertotalSlide = $('.hero-swiper6 .swiper-slide').length;
			var fragment = document.querySelector('.slide-active');
			var fragment2 = document.querySelector('.slide-items');
			var current = swiper.realIndex + 1;
			if (current > swipertotalSlide) current = 1;
			var idx = current < 10 ? ("0" + current) : current;
			var tdx = swipertotalSlide < 10 ? ("0" + swipertotalSlide) : swipertotalSlide;

			if (fragment2) fragment2.innerHTML = tdx;
			if (fragment) fragment.innerHTML = idx;
		}
		heroSwiperPagination();
		swiper.on('slideChange', function() {
			heroSwiperPagination();
		});
	}
	
	var feedbackSwiper1 = function() {
		if(!checkSelectorExistence('.feedback-swiper1')){return;}
		var swiper = new Swiper(".feedback-swiper-thumbs1", {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			freeMode: true,
			effect: "fade",
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			watchSlidesProgress: true,
		});
		var swiper2 = new Swiper(".feedback-swiper1", {
			loop: true,
			spaceBetween: 0,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".feedback-btn-next1",
				prevEl: ".feedback-btn-prev1",
			},
			thumbs: {
				swiper: swiper,
			},
		});
	}
	
	var feedbackSwiper2 = function() {
		if(!checkSelectorExistence('.feedback-swiper2')){return;}
		var swiper = new Swiper(".feedback-swiper2", {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: ".swiper-pagination",
			},
		});
	}
	
	var feedbackSwiper3 = function() {
		if(!checkSelectorExistence('.feedback-swiper3')){return;}
		var swiper = new Swiper(".feedback-swiper3", {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".feedback-btn-next3",
				prevEl: ".feedback-btn-prev3",
			},
		});
	}
	
	var feedbackSwiper4 = function() {
		if(!checkSelectorExistence('.feedback-swiper4')){return;}
		var swiper = new Swiper(".feedback-swiper4", {
			loop: true,
			spaceBetween: 30,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints:{
				767: {
					slidesPerView: 2,
				},
				1191: {
					slidesPerView: 3,
				},
			},
		});
	}
	
	var instaSwiper = function() {
		if(!checkSelectorExistence('.insta-swiper')){return;}
		
		var swiper = new Swiper(".insta-swiper", {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 1500,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				591: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 4,
				},
				1191: {
					slidesPerView: 5,
				},
				1480: {
					slidesPerView: 6,
				},
			},
		});
	}
	
	var clientLogo = function() {
		if(!checkSelectorExistence('.client-logo-swiper')){return;}
		var swiper = new Swiper(".client-logo-swiper", {
			loop: true,
			freemode: true,
			spaceBetween: 30,
			slidesPerView: 'auto',
			centeredSlides: true,
			allowTouchMove: false,
			speed: 5000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			}
		});
	}
	
	var productSwiper = function() {
		if(!checkSelectorExistence('.product-swiper')){return;}
		var swiper = new Swiper(".product-swiper", {
			loop: true,
			spaceBetween: 20,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints:{
				591: {
					slidesPerView: 2,
				},
				767: {
					slidesPerView: 3,
				},
				1191: {
					slidesPerView: 4,
				},
			},
		});
	}
	
	var portfolioSwiper = function() {
		if(!checkSelectorExistence('.portfolio-swiper1')){return;}
		var swiper = new Swiper(".portfolio-swiper1", {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			breakpoints:{
				591: {
					slidesPerView: 2,
				},
				767: {
					slidesPerView: 3,
				},
				1191: {
					slidesPerView: 4,
				},
			},
		});
	}
	
	var portfolioSwiper2 = function() {
		if(!checkSelectorExistence('.portfolio-swiper2')){return;}
		var swiper = new Swiper(".portfolio-swiper2", {
			loop: true,
			spaceBetween: 15,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			breakpoints:{
				591: {
					slidesPerView: 2,
				},
				767: {
					slidesPerView: 3,
				},
				1191: {
					slidesPerView: 4,
				},
			},
		});
	}
	
	var portfolioSwiper3 = function() {
		if(!checkSelectorExistence('.portfolio-swiper3')){return;}
		var swiper = new Swiper(".portfolio-swiper3", {
			loop: true,
			spaceBetween: 4,
			slidesPerView: 1,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			breakpoints:{
				591: {
					slidesPerView: 2,
				},
				991: {
					slidesPerView: 3,
				},
				1191: {
					slidesPerView: 4,
				},
			},
		});
	}
	
	var portfolioSwiper4 = function() {
		if(!checkSelectorExistence('.portfolio-swiper4')){return;}
		var swiper = new Swiper(".portfolio-swiper4", {
			loop: true,
			spaceBetween: 15,
			slidesPerView: 3,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
		});
	}
	
	var shopProductSwiper = function() {
		if(!checkSelectorExistence('.shopProductSwiper')){return;}
		
		var swiper = new Swiper(".shopProductThumbsSwiper", {
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});
		var swiper2 = new Swiper(".shopProductSwiper", {
			spaceBetween: 10,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			thumbs: {
				swiper: swiper,
			},
		});
	}
	
	var tabSwiper = function() {			
		if(!checkSelectorExistence('.tabSwiper')){return;}
		
		const swiper = new Swiper('.tabSwiper', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			navigation: {
				nextEl: ".swiper-tabs-next",
				prevEl: ".swiper-tabs-prev",
			},
		});
		
	}
	
	var initGalleryTop = function() {
		if(!checkSelectorExistence('.gallery-top')){return;}
		
		var galleryThumbs = new Swiper('.gallery-thumbs', {
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
		});
		var galleryTop = new Swiper('.gallery-top', {
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: galleryThumbs
			}
		});
	}

	// Initialize all Swipers
	heroSwiper1();
	heroSwiper2();
	heroSwiper5();
	heroSwiper6();
	feedbackSwiper1();
	feedbackSwiper2();
	feedbackSwiper3();
	feedbackSwiper4();
	instaSwiper();
	clientLogo();
	productSwiper();
	portfolioSwiper();
	portfolioSwiper2();
	portfolioSwiper3();
	portfolioSwiper4();
	shopProductSwiper();
	tabSwiper();
	initGalleryTop();
	
});