/*
***
***
Name: 			functions.js
Written by: 	LayoutDrop 
Theme Version:	1.0.0
***
***
*/

(function($) {
	
	'use strict';
	
	var gsapFunction = function(){
		
		var checkSelectorExistence = function(selectorName) {
		  if(jQuery(selectorName).length > 0){return true;}else{return false;}
		};
		
		const lenis = new Lenis({
			autoRaf: true,
			duration: 1.2,
			smooth: true,
		});
		
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		
		requestAnimationFrame(raf);
		gsap.registerPlugin(ScrollTrigger);
		
		var initParallax = function(){
			if(!checkSelectorExistence('.parallax')){return;}
			document.querySelectorAll('.parallax').forEach((section) => {
				gsap.to(section, {
					backgroundPosition: "center 50%",
					ease: "none",
					scrollTrigger: {
						trigger: section,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				});
			});
		}
		
		var initBannerParallax = function(){
			if(!checkSelectorExistence('.banner-parallax')){return;}
			
			document.querySelectorAll('.banner-parallax').forEach((bannerParallax) => {
				gsap.to(bannerParallax, {
					backgroundPosition: "center 45%",
					ease: "none",
					scrollTrigger: {
						trigger: bannerParallax,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				});
			});
		}
		
		var initGsapMarquee = function(){
			if(!checkSelectorExistence('.gsap-marquee')){return;}
			
			document.querySelectorAll('.gsap-marquee').forEach((el) => {
				el.innerHTML += el.innerHTML;

				const totalWidth = el.offsetWidth / 2;

				const pixelsPerSecond = 100;
				const duration = totalWidth / pixelsPerSecond;

				gsap.to(el, {
					x: `-=${totalWidth}`,
					duration: duration,
					ease: "linear",
					repeat: -1,
					modifiers: {
						x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
					}
				});
			});
		}
		
		var initGsapScrollMarquee = function(){
			if(!checkSelectorExistence('.gsap-scroll-marquee')){return;}
			
			document.querySelectorAll('.gsap-scroll-marquee').forEach((el) => {
				// Step 1: Duplicate content dynamically
				el.innerHTML += el.innerHTML;

				// Step 2: Animate after layout is calculated
				requestAnimationFrame(() => {
					const totalWidth = el.scrollWidth / 3; // Only the original width
					const speed = 100; // pixels per second
					const duration = totalWidth / speed;

					// Step 3: Animate using GSAP with wrap
					gsap.to(el, {
						x: `-=${totalWidth}`,
						duration: duration,
						ease: "linear",
						repeat: -1,
						modifiers: {
							// Wrap the animation to prevent jump or blank space
							x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
						}
					});
				});
			});
		}
		
		var initDataTP = function(){
			if(!checkSelectorExistence('[data-bottom-top]')){return;}
			
			document.querySelectorAll('[data-bottom-top]').forEach(el => {
				const fromMatch = el.getAttribute('data-bottom-top').match(/translateY\((-?\d+\.?\d*)px\)/);
				const toMatch = el.getAttribute('data-top-bottom').match(/translateY\((-?\d+\.?\d*)px\)/);

				if (fromMatch && toMatch) {
					const fromY = parseFloat(fromMatch[1]);
					const toY = parseFloat(toMatch[1]);

					gsap.fromTo(el,
						{
							y: fromY
						},
						{
							y: toY,
							ease: "none",
							scrollTrigger: {
								trigger: el,
								start: "top bottom",
								end: "bottom top",
								scrub: true
							}
						}
					);
				}
			});
		}
		
		function initStickyCard() {
			if (!checkSelectorExistence('.gsap-sticky-card-wrapper')) return;

			if (window.innerWidth >= 991) {
				const cardsWrappers = gsap.utils.toArray(".gsap-sticky-card");

				cardsWrappers.forEach((card, i) => {
					let scale = 1, rotation = 0, opacity = 1;

					if (i !== cardsWrappers.length - 1) {
						scale = 0.9 + 0.025 * i;
						rotation = -10;
						opacity = 0.5 + 0.05 * i;
					}

					gsap.to(card, {
						scale,
						rotationX: rotation,
						opacity,
						transformOrigin: "top center",
						ease: "none",
						scrollTrigger: {
							trigger: card,
							start: "top " + (100 + 10 * i),
							end: "bottom 400",
							endTrigger: ".gsap-sticky-card-wrapper",
							scrub: true,
							pin: card,
							pinSpacing: false,
							markers: false,
							id: i + 1
						}
					});
				});
			}
		}
		
		function initStickyCardPrice() {
			if (!checkSelectorExistence('.gsap-sticky-price-wrapper')) return;

			const priceCardsWrappers = gsap.utils.toArray(".gsap-sticky-price-card");

			priceCardsWrappers.forEach((card, i) => {
				let scale = 1, rotation = 0, opacity = 1;

				if (i !== priceCardsWrappers.length - 1) {
					scale = 0.9 + 0.025 * i;
					rotation = -10;
					opacity = 0.5 + 0.05 * i;
				}

				gsap.to(card, {
					scale,
					rotationX: rotation,
					opacity,
					transformOrigin: "top center",
					ease: "none",
					scrollTrigger: {
						trigger: card,
						start: "top " + (100 + 10 * i),
						end: "bottom 450",
						endTrigger: ".gsap-sticky-price-wrapper",
						scrub: true,
						pin: card,
						pinSpacing: false,
						markers: false,
						id: i + 1
					}
				});
			});
		}
		
		var initBlogScroll = function(){
			if(!checkSelectorExistence('.gspa-blog-scroll')){return;}
			
			if (window.innerWidth >= 1200) {
				const scrollWrapper = document.querySelector(".horizontal-scroll-wrapper");
				const lastPanel = document.querySelector(".panel:last-child");

				const totalScroll = lastPanel.offsetLeft + lastPanel.offsetWidth - window.innerWidth + 20;

				gsap.to(scrollWrapper, {
					x: -totalScroll,
					ease: "none",
					scrollTrigger: {
						trigger: ".gspa-blog-scroll",
						pin: true,
						scrub: 1,
						end: () => "+=" + totalScroll
					}
				});

				ScrollTrigger.create({
					trigger: ".gspa-blog-scroll",
					start: "top top",
					end: () => "+=" + totalScroll,
					scrub: true,
					onUpdate: self => {
						document.querySelector(".gsap-progress-indicator").textContent =
						Math.round(self.progress * 100) + "%";
					}
				});
			}
		}
		
		var initBlogScroll2 = function(){
			if(!checkSelectorExistence('.luxury-spa-blog-scroll')){return;}
			
			if (window.innerWidth >= 1200) {
				const scrollWrapper = document.querySelector(".horizontal-scroll-wrapper");
				const lastPanel = document.querySelector(".panel:last-child");

				const totalScroll = lastPanel.offsetLeft + lastPanel.offsetWidth - window.innerWidth + 20;

				gsap.to(scrollWrapper, {
					x: -totalScroll,
					ease: "none",
					scrollTrigger: {
						trigger: ".luxury-spa-blog-scroll",
						pin: true,
						scrub: 1,
						end: () => "+=" + totalScroll
					}
				});
			}
		}
		
		var initPortfolioScroll = function(){
			if(!checkSelectorExistence('.gspa-portfolio-scroll')){return;}
			
			if (window.innerWidth >=591) {
				const portfolioScrollWrapper = document.querySelector(".horizontal-scroll-wrapper");
				const lastPanel = document.querySelector(".panel:last-child");

				const totalScroll = lastPanel.offsetLeft + lastPanel.offsetWidth - window.innerWidth + 50;

				gsap.to(portfolioScrollWrapper, {
					x: -totalScroll,
					ease: "none",
					scrollTrigger: {
						trigger: ".gspa-portfolio-scroll",
						pin: true,
						scrub: 1,
						end: () => "+=" + totalScroll
					}
				});

				ScrollTrigger.create({
					trigger: ".gspa-portfolio-scroll",
					start: "top top",
					end: () => "+=" + totalScroll,
					scrub: true,
					onUpdate: self => {
						document.querySelector(".gsap-progress-indicator").textContent = Math.round(self.progress * 100);
						document.querySelector(".gsap-progress").style.width = Math.round(self.progress * 100) + "%";
					}
				});
			}
		}
		
		var initParallaxItem = function(){
			if ($(window).scrollTop() >= 1191) {
				gsap.utils.toArray(".parallax-item").forEach(layer => {
					const speed = parseFloat(layer.dataset.speed);

					gsap.to(layer, {
						y: () => -(window.innerHeight * speed),
						ease: "none",
						scrollTrigger: {
							trigger: layer,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						}
					});
				});
			}
		}
		
		var initGSAPGallery = function(){
			if(!checkSelectorExistence('.gsap-gallery-area')){return;}
			
			const panels = gsap.utils.toArray(".panel");
			const counter = document.getElementById("panelCounter");
			const mediaCounter = document.querySelector(".media-counter");

			// Overlay stacking
			panels.forEach((panel, i) => {
				gsap.set(panel, { zIndex: i + 1 }); // 1, 2, 3, 4...

				if (window.innerWidth >= 768) {
					ScrollTrigger.create({
						trigger: panel,
						start: "top top",
						end: "bottom top",
						pin: true,
						pinSpacing: i === panels.length - 1,
						scrub: true,
						onEnter: () => {
						  counter.innerText = i + 1;
						},
						onEnterBack: () => {
						  counter.innerText = i + 1;
						},
						onToggle: (self) => {
							if (self.isActive) {
								mediaCounter.classList.add("active");
							} else {
								mediaCounter.classList.remove("active");
							}
						}
					});
				}
		
				const lastPanel = panels[panels.length - 1];
				
				ScrollTrigger.create({
				  trigger: lastPanel,
				  start: "bottom bottom-=10", // 🔥 bottom is 10px above viewport bottom
				  end: "bottom top", // till the bottom scrolls past the top
				  onEnter: () => {
					mediaCounter.classList.add("active-fixed");
				  },
				  onLeaveBack: () => {
					mediaCounter.classList.remove("active-fixed");
				  },
				  onLeave: () => {
					mediaCounter.classList.remove("active-fixed");
				  },
				  onEnterBack: () => {
					mediaCounter.classList.add("active-fixed");
				  }
				});
				
			});

			// Circular progress logic
			$(document).on("scroll", function () {
				const gallery = document.querySelector(".gsap-gallery-area");
				const rect = gallery.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				const scrollTop = window.scrollY;

				const start = gallery.offsetTop;
				const end = start + gallery.offsetHeight - windowHeight;

				if (scrollTop >= start && scrollTop <= end) {
					const progress = ((scrollTop - start) / (end - start)) * 100;

					const totalLength = 307;
					const offset = totalLength - (progress / 100 * totalLength);
					$(".panelProgress").css("stroke-dashoffset", offset);
				}
				
			});
		}
	
		return {
			initialHelper:function(){
				initParallax();
				initBannerParallax();
				initGsapMarquee();
				initGsapScrollMarquee();
				initDataTP();
				initStickyCard();
				initStickyCardPrice();
				initBlogScroll();
				initBlogScroll2();
				initPortfolioScroll();
				initParallaxItem();
				initGSAPGallery();
			}
		}
		
	}(jQuery);
	
	/* jQuery ready  */	
	jQuery(document).ready(function() {gsapFunction.initialHelper();});
	
})(jQuery);