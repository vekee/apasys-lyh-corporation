(function($) {
	
	'use strict';
	
	var FormFunction = function(){
		
		var checkSelectorExistence = function(selectorName) {
			if(jQuery(selectorName).length > 0){return true;}else{return false;}
		};
		
		/* Email Form Input */
		var validateEmail = function(email)	{
			var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if(emailReg.test(email)) {
				return true;
			} else {
				return false;
			}
		}
		
		/* URL Form Input */
		var validateURL = function(textval) {
			var urlregex = new RegExp(
			   "^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
			return urlregex.test(textval);
		}
		
		/* Integer Number Form Input */
		var validateInteger = function(){
			if(!checkSelectorExistence('.int-value')){return;}
			$(".int-value").on('keydown', function (e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					 // Allow: Ctrl+A, Command+A
					(e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
					 // Allow: home, end, left, right, down, up
					(e.keyCode >= 35 && e.keyCode <= 40)) {
						 // let it happen, don't do anything
						 return;
				}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			});
		}
		
		/* Integer Number Form Input */
		var validateCharacter  = function(){
			if(!checkSelectorExistence('.valid-character')){return;}
			$('.valid-character').keyup(function() {
				if (this.value.match(/[^a-zA-Z ]/g)) {
					this.value = this.value.replace(/[^a-zA-Z ]/g, '');
				}
			});
		}
		
		var contactForm = function() {
			if (!checkSelectorExistence('.ajax-form')) { return; }

			// Set reCAPTCHA callbacks
			// jQuery('form').on('submit', function(e) {
			$('#contact-form').on('submit', function(e) {
				e.preventDefault();

				var $form = jQuery(this);
				var response = '<div class="alert alert-warning alert-dismissable">送信中...</div>';
				$form.find(".ajax-message").html(response).show('slow');

				var mailContent = "お名前: " + $('#name').val() + "\n";
				mailContent += "メールアドレス: " + $('#email').val() + "\n";
				mailContent += "電話番号: " + $('#phone').val() + "\n";
				mailContent += "件名: " + $('#subject').val() + "\n";
				mailContent += "メッセージ:\n" + $('#message').val() + "\n";
		
				var toList = ["info@spark-hair.co.jp"];
				var data = { 
					title: "【重要】ウェブサイトからの問い合わせを早急にご確認ください。",
					content: mailContent,
					toList: toList,
					formsendbox_id: "b309590d3bb80e140873d729be7c8d6d",
					formsendbox_key: "2b2731af96cc3d862395993a7ba1188d"
				};
			
				//	var formAction = $form.attr('action');
				$.ajax({
					type: 'POST',
					url: 'https://formsendbox.com/sendSimpleMail',
					data: JSON.stringify(data),
					dataType: 'text',
					contentType: 'application/json',
					success: function(data) {
						var response;
						response = '<div class="gen alert alert-success">お問い合わせいただきありがとうございます。</div>';
						$form.find(".ajax-message").html(response).delay(5000).fadeOut('slow');
						$form[0].reset();
					},
					error: function(xhr, status, error) {
						var errorMessage = '<div class="alert alert-danger">メール送信中にエラーが発生しました。しばらくしてから再度お試しください。</div>';
						$form.find(".ajax-message").html(errorMessage).show('slow');
						console.error('AJAX Error:', status, error);
					}
				});
			});
		}

		var subscriptionForm = function() {
			if (!checkSelectorExistence('.subscribe-form1, .subscribe-form')) { return; }

			// jQuery('.subscribe-form1, .subscribe-form').on('submit', function(event) {
			$('#subscribe-form').on('submit', function(event) {
				event.preventDefault();

				var $form = jQuery(this);
				var email = $form.find('input[name="email"]').val().trim();

				if (!email) {
					var response = '<div class="alert alert-danger">有効なメールアドレスを入力してください。</div>';
					$form.find(".ajax-message").html(response).show('slow');
					return;
				}

				var response = '<div class="alert alert-warning alert-dismissable">送信中...</div>';
				$form.find(".ajax-message").html(response).show('slow');

				var mailContent = "メールアドレス: " + email + "\n";
		
				var toList = ["info@spark-hair.co.jp"];
				var data = { 
					title: "【重要】ウェブサイトからの新しい購読希望が来ました。",
					content: mailContent,
					toList: toList,
					formsendbox_id: "b309590d3bb80e140873d729be7c8d6d",
					formsendbox_key: "2b2731af96cc3d862395993a7ba1188d"
				};
				jQuery.ajax({
					type: 'POST',
					url: 'https://formsendbox.com/sendSimpleMail',
					data: JSON.stringify(data),
					dataType: 'text',
					contentType: 'application/json',
					success: function(data) {
						var response;
						response = '<div class="gen alert alert-success">購読登録が完了しました。</div>';
						$form.find(".ajax-message").html(response).delay(5000).fadeOut('slow');
						$form[0].reset();
					},
					error: function(xhr, status, error) {
						var response = '<div class="alert alert-danger">購読登録に失敗しました。時間をおいて再度お試しください。</div>';
						$form.find(".ajax-message").html(response).show('slow');
						console.error("Ajax error:", error);
					}
				});
			});
		};
		
		/* Functions Calling */
		return {
			afterLoadThePage:function(){
				
				contactForm();
				subscriptionForm();
				// validateInteger();
				// validateCharacter();
			},
		}
		
	}(jQuery);
	
	/* jQuery Window Load */
	jQuery(window).on("load", function (e) {
		FormFunction.afterLoadThePage();
	});
	
})(jQuery);	