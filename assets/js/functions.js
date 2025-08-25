/* *** ***

Name: 			functions.js
Written by: 	LayoutDrop 
Theme Version:	1.0.0

*** ****/

(function($) {
	'use strict';
	
	var ThemeBuilder = function(){
		
		var windowSize = $( window ).width();
		
		var checkSelectorExistence = function(selectorName) {
			if(jQuery(selectorName).length > 0){return true;}else{return false;}
		};
		
		/* To Get Search Bar*/
		var searchBar = function() {
			jQuery("#quik-search-btn").on('click',function() {jQuery('.nav-search-bar').fadeIn(500).addClass('On');});
			jQuery("#search-remove").on('click',function() {jQuery('.nav-search-bar').fadeOut(500).removeClass('On');});	
		}
		
		/* Set Header Height (Call On Resize Event Also) */
		var setHeaderHeight = function(){
			if(!checkSelectorExistence('.header')){return;}
			var getActualHeaderRecentHeight = $('.header').height();
			var getActualHeaderFullHeight = $('.header').css({'max-height': 'auto', 'height': 'auto'}).height();
			$('.header').css({ 'height': getActualHeaderRecentHeight }).animate({ 'height': getActualHeaderFullHeight }, 200);
		}
		
		/* Magnific Popup ============ */
		var magnificPopupImageView = function(){
			/* magnificPopup function */
			if(checkSelectorExistence('.magnific-image')) {
				jQuery('.magnific-image').magnificPopup({ 
					delegate: '.magnific-anchor', 
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'magnific-img-mobile', 
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.attr('title') + '<small></small>';
						}
					}
				});
			}
			/* magnificPopup function end */
			
			/* magnificPopup for video function */
			if(checkSelectorExistence('.video')) {
				jQuery('.video').magnificPopup({ 
					type: 'iframe',
					iframe: {
						markup: '<div class="mfp-iframe-scaler">'+
								 '<div class="mfp-close"></div>'+
								 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
								 '<div class="mfp-title">Some caption</div>'+
								 '</div>'
					},
					callbacks: {
						markupParse: function(template, values, item) {
							values.title = item.el.attr('title');
						}
					}
				});
			}
			
			/* magnificPopup for paly video function end*/
			if(checkSelectorExistence('.popup-youtube')) {
				$('.popup-youtube').magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: true
				});
			}
		}
		
		/* Page Scroll To Top ============ */
		var pageScrollToTop = function (){
			/* page scroll top on click function */	
			jQuery("button.back-to-top").on('click',function() { 
				jQuery('html').animate({ scrollTop: 0 }, 500);
				return false;
			})

			jQuery(window).on("scroll", function() {
				var scrollWindowHeight = jQuery(window).scrollTop();
				if (scrollWindowHeight > 900) {
					jQuery("button.back-to-top").slideDown(1000).fadeIn(1000);
				} else {
					jQuery("button.back-to-top").slideUp(1000).fadeOut(1000);
				}
			});
			/* page scroll top on click function end*/
		}
		
		/* Set Sticky Header */
		var setStickyheader = function(){
			jQuery(window).on('scroll', function () {
				if(!checkSelectorExistence('.sticky-header')){return;}
				var header = jQuery('.sticky-header');
				if ($(window).scrollTop() > header.offset().top) {
					header.addClass('is-fixed'); /*change is-fixed to fixed*/
				} else {
					header.removeClass('is-fixed');
				}
			});
		}
		
		/* Set Masonry Layout */
		var masonryLayout = function(){
			if(!checkSelectorExistence('#masonry')){return;}
			var self = $("#masonry");
			
			if(jQuery('.action-card').length){
				self.imagesLoaded(function () {
					self.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".action-card"
					});
				});
			}
			
			if(!checkSelectorExistence('.filters')){return;}
			jQuery(".filters").on('click','li',function(e) {
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				
				jQuery('.filters li').removeClass('active');
				jQuery(this).addClass('active');
				
				self.masonryFilter({
					filter: function () {
						if (!filter) return true;
						return $(this).hasClass(filter);
					}
				});
			});
		}
		
		/* Set Counter Up Function */
		var setCounterUp = function(){
			if(!checkSelectorExistence('.counter')){return;}
			 jQuery('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		}
		
		/* set Countdown */
		var setCountDown = function(){
			if(!checkSelectorExistence('.countdown')){return;}
			var currentDate = new Date();
			var months = ["January", "February", 
							  "March", "April", 
							  "May", "June", 
							  "July", "August", 
							  "September", "October", 
							  "November", "December"];
			currentDate.setDate(currentDate.getDate() + 10);
			currentDate =  currentDate.getDate() + " " + months[currentDate.getMonth()] + " " + currentDate.getFullYear(); 
			/*You can use this format : 25 Narch 2025 */
			$('.countdown').countdown({date: currentDate+' 23:5'});
		}
		
		/* Stylish Scroll */
		var setStylishScroll = function(){
			if(!checkSelectorExistence('.content-scroll')){return;}
			$(".content-scroll").mCustomScrollbar({
				setWidth:false,
				setHeight:false,
				axis:"y"
			});	
		}
		
		/* WOW ANIMATION */
		var wowAnimation = function(){
			if(!checkSelectorExistence('.wow')){return;}
			var wow = new WOW({
				boxClass:     'wow',     
				offset:       30,
				mobile:       false,       
				live:         true
			});
			wow.init();	
		}
		
		/* Left Side Menu */
		var manageLeftSideMenu = function(){
			jQuery('.menuicon').unbind().on('click',function(){
				$(this).toggleClass('open');
			});
			
			if(windowSize <= 991 ){
				jQuery('.navbar-nav > li > a, .sub-menu > li > a').unbind().on('click', function(){
					if(jQuery(this).parent().hasClass('open')){
						jQuery(this).parent().removeClass('open');
					}
					else{
						jQuery(this).parent().parent().find('li').removeClass('open');
						jQuery(this).parent().addClass('open');
					}
				});
			}
			
			jQuery('.contact-sidebtn').on('click',function(){
				jQuery('.contact-sidebar').toggleClass('open');
			});
			
			$(".navbar-toggler-sticky").on('click',function(){
				$(this).toggleClass("active");
				$('.menu-sticky').toggleClass("show");
			});
		}
		
		
		var managePlaceholderStyle = function()
		{
			if(!checkSelectorExistence('.placeani')){return;}
			$('.placeani input, .placeani textarea').focus(function(){
			  $(this).parents('.form-group').addClass('focused');
			});
			
			$('.placeani input, .placeani textarea').blur(function(){
			  var inputValue = $(this).val();
			  if ( inputValue == "" ) {
				$(this).removeClass('filled');
				$(this).parents('.form-group').removeClass('focused');  
			  } else {
				$(this).addClass('filled');
			  }
			});
		}
		
		var manageLoader = function() {
			setTimeout(function(){
				jQuery('#loading-icon-bx').remove();
			}, 0);
		}
		
		var isScrolledIntoView = function (elem){
			var $elem = $(elem);
			var $window = $(window);

			var docViewTop = $window.scrollTop();
			var docViewBottom = docViewTop + $window.height();

			var elemTop = $elem.offset().top;
			var elemBottom = elemTop + $elem.height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		}
		
		var splitImageAnimation = function (){
			
			$(window).on('scroll',function(){
				$('.split-box').each(function(){
					if(isScrolledIntoView($(this))){
						$(this).addClass('split-active');
					}
				});
			});
		}
		
		var cartButton = function(){
			$(".item-close").on('click',function(){
				$(this).closest(".cart-item").hide('500');
			});
			$('.cart-btn').unbind().on('click',function(){
				$(".cart-list").slideToggle('slow');
			})
			
		}  
		
		var manageSkillBars = function(){
			if(jQuery('.skillbar').length > 0)
			{
				$('.skillbar').appear();
				$('.skillbar').skillBars({
					from: 0,
					speed: 4000,
					interval: 100,
					decimals: 0
				});
				jQuery(document.body).on('appear', '.skillbar', function () {
					if (!$(this).hasClass('appear')) {
						$(this).addClass('appear');
						$(this).find('.skillbar-bar').css("width", "0%");
						$(this).skillBars({
							from: 0,
							speed: 4000,
							interval: 100,
							decimals: 0
						});
					}
				});
			}
			
		}
		
		var mobileFilter = function(){
			$(".filter-btn").on('click',function(){
				$('.filter-left').toggleClass("filter-on").toggleClass("filter-off");
			});
		}
		
		var initNiceSelect = function(){
			if(jQuery('.nice-select').length > 0){
				$(".nice-select").niceSelect();
			}
		}
		
		var initTooltip = function(){
			if(jQuery('[data-bs-toggle="tooltip"]').length > 0){
				$('[data-bs-toggle="tooltip"]').tooltip();
			}
		}
		
		var initSplitWord = function(){			
			if(!checkSelectorExistence('.split-word')){return;}
			
			var splitWord = document.querySelectorAll('.split-word');
			
			splitWord.forEach((data) => {
				var rotateText = data.textContent.split('');
				const step = 360 / rotateText.length;
				
				var circleText = data.closest('.circle-text-wrapper');
				
				rotateText.forEach((el, i) => {
					const span = document.createElement('span');
					span.className = 'circle-letter';
					span.style.setProperty('--letter', (i * step) + 'deg');
					span.textContent = el;
					circleText.appendChild(span);
				})
				data.remove();
			});
		}
		
		var initTeamMembers = function(){
			if(!checkSelectorExistence('.get-member-info')){return;}
			
			jQuery('.get-member-info').on('click',function(){
				jQuery('.team-members-section .team-section').removeClass('active');
				jQuery('[data-info='+$(this).attr('data-id')+']').addClass('active');
				
			});
			jQuery('.close-team').on('click',function(){
				jQuery('.team-members-section .team-section').removeClass('active');
			});
		}
		
		var initOnlyNumber = function(){			
			if(!checkSelectorExistence('[type="number"]')){return;}	
			$(document).on('input', '[type="number"]', function () {
				var inputVal = $(this).val() || "";
				var numericVal = inputVal.replace(/\D/g, '');

				if (numericVal.length > 10) {
					$(this).val(numericVal.slice(0, 10));
				} else {
					$(this).val(numericVal);
				}
			});
		}
		
		/* Function ============ */
		return {
			initialHelper:function(){
				wowAnimation();
				setHeaderHeight();
				searchBar();
				magnificPopupImageView();
				pageScrollToTop();
				managePlaceholderStyle();
				setStickyheader();
				setCountDown();
				setStylishScroll();
				manageLeftSideMenu();
				cartButton();
				splitImageAnimation();
				manageSkillBars();
				mobileFilter();
				initNiceSelect();
				initTooltip();
				initSplitWord();
				initTeamMembers();
				initOnlyNumber();
			},
			
			afterLoadThePage:function(){
				setCounterUp();
				masonryLayout();
				manageLoader();
			},
			
			changeTheScreen:function(){
				manageLeftSideMenu();
				setHeaderHeight();
				mobileFilter();
			}
		}
		
	}(jQuery);

	/* jQuery ready  */	
	jQuery(document).ready(function() {ThemeBuilder.initialHelper();});
	
	/* jQuery Window Load */
	jQuery(window).on("load", function () {ThemeBuilder.afterLoadThePage();});
	
	/* Screen Resize */
	jQuery(window).on('resize',function(){ThemeBuilder.changeTheScreen();});
	
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".touch-count").forEach(function (counter) {
		let input = counter.querySelector(".touch-input");
		let plusBtn = counter.querySelector(".plus");
		let minusBtn = counter.querySelector(".minus");

		// Disable manual typing
		input.setAttribute("readonly", true);

		function getValue() {
			return input.value.trim() === "" ? 0 : parseInt(input.value);
		}

		// Increment function
		plusBtn.addEventListener("click", function () {
			input.value = getValue() + 1;
		});

		// Decrement function
		minusBtn.addEventListener("click", function () {
			let currentValue = getValue();
			if (currentValue > 0) {
				input.value = currentValue - 1;
			}
		});
	});
});

document.querySelectorAll('[data-ld-toggle="collapse"]').forEach(function (button) {
    button.addEventListener('click', function () {
        var targetSelector = button.getAttribute('data-ld-target');
        if (!targetSelector) return;

        var target = document.querySelector(targetSelector);
        if (!target) return;

        var isShown = target.classList.contains('show');

        target.classList.toggle('show');
        button.setAttribute('aria-expanded', !isShown);
    });
});

document.querySelectorAll('[data-ld-close]').forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {
        var targetSelector = closeButton.getAttribute('data-ld-close');
        if (!targetSelector) return;

        var target = document.querySelector(targetSelector);
        if (!target) return;

        target.classList.remove('show');

        document.querySelectorAll('[data-ld-toggle="collapse"]').forEach(function (toggleBtn) {
            if (toggleBtn.getAttribute('data-ld-target') === targetSelector) {
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
});