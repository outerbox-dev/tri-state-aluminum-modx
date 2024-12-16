// call jRespond and add breakpoints
var jRes = jRespond([
    {
        label: 'mobile',
        enter: 0,
        exit: 767
    },{
        label: 'tablet',
        enter: 768,
        exit: 1199
    },{
        label: 'desktop',
        enter: 1200,
        exit: 10000
    }
]);

$(document).ready(function(){    

	// Desktop
	jRes.addFunc({
	    breakpoint: ['desktop'],
	    enter: function() {
			// Desktop Primary Navigation Dropdowns
			$('#primary-nav > li').hoverIntent(primaryNavConfig);
	    },
	    exit: function() {
			$('#primary-nav > li').hoverIntent();
	    }
	});
	
	// Tablet & Mobile
	jRes.addFunc({
	    breakpoint: ['tablet','mobile'],
	    enter: function() {
		    $('.nav-tabs').click(function(){
            	$(this).toggleClass("open");
        	});
	    },
	    exit: function() {
			$("#primary-nav > li").hoverIntent(primaryNavConfig);
	    }
	});
	
	// Mobile Navigation
	$("#primary-toggle").click(function(){
		$(this).toggleClass("active");
		$('#mobile-nav').toggleClass('active');
		$(".primary-nav ul").removeClass("active");
		$("html").toggleClass("noscroll");
		$("#overlay").toggle();
	});
	$("#overlay").click(function(){
		$(this).toggle();
		$('#mobile-nav').removeClass('active');
		$('#primary-toggle').removeClass('active');
		$("html").toggleClass("noscroll");
	});
	$("#mobile-nav .menu-close").click(function(){
		$('#mobile-nav').removeClass('active');
		$('#primary-toggle').removeClass('active');
		$("html").toggleClass("noscroll");
		$("#overlay").toggle();
	});
	$(".primary-nav li > .fa-plus").click(function(){
		var parent = $(this).parent('.parent');
		var sibling = $(this).next('ul');	
		$(parent).toggleClass('open');
		$(sibling).toggleClass('active');
	});
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
	  $('.selectpicker').selectpicker('mobile');
	}
	
	if($(window).scrollTop() > 35){
		$("#header").addClass("scrolling");
	}
	$(window).scroll(function (){
		// Header
		if($(this).scrollTop() > 35){
			$("#header").addClass("scrolling");
		}else {
			$("#header").removeClass("scrolling");
		}
	});
	
	//Slick Carousel
	if($.isFunction($.fn.slick)){

		var numSlick = 0;
		var dots = {};
		var arrows = {};
		var countD = {};
		var countT = {};
		var countM = {};
		var fade = {};
		var thumbNav = {};
		var thumbMain = {};

		// Iterate through every carousel and check each setting
		$('.gallery.carousel').each(function(){
			numSlick++;
			
			if($(this).hasClass("has-pager")){
				 dots[numSlick] = true;
			 }else{
				 dots[numSlick] = false;
			 }
			 if($(this).hasClass("has-arrows")){
				 arrows[numSlick] = true;
			 }else{
				 arrows[numSlick] = false;
			 }
			 if($(this).hasClass("has-thumbs")){
				 var thumbs = $(this).next();
				 var slider = $(this);
				 $(this).find('.thumb').appendTo(thumbs);
				 thumbNav[numSlick] = thumbs;
				 thumbMain[numSlick] = slider;
			 }else{
				 thumbNav[numSlick] = false;
				 thumbMain[numSlick] = false;
			 }
			countD[numSlick] = parseInt($(this).attr('data-count'));
			
			if(countD[numSlick] == 4){
				countT[numSlick] = 3;
			}else if(countD[numSlick] == 3){
				countT[numSlick] = 2;
			}else if(countD[numSlick] == 2){
				countT[numSlick] = 2;
			}else if(countD[numSlick] == 1){
				countT[numSlick] = 1;
				fade[numSlick] = true;
			}else{
				fade[numSlick] = false;
			}
				
			$(this).slick({
			    infinite:false,
				slidesToShow: countD[numSlick],
				slidesToScroll: countD[numSlick],
				dots: dots[numSlick],
				arrows: arrows[numSlick],
				fade: fade[numSlick],
				asNavFor: thumbNav[numSlick],
				cssEase: 'linear',
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: countT[numSlick],
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			});
			if($(this).hasClass("has-thumbs")){
				$(this).next().slick({
					slidesToShow: 5,
					slidesToScroll: 1,
					dots: false,
					arrows: false,
					asNavFor: thumbMain[numSlick],
					cssEase: 'linear',
					focusOnSelect: true,
					variableWidth: true,
					responsive: [{
						breakpoint: 1199,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1
						}
					}]
				});
			}
		});		
		
		// Home Banner
		if($("#home-banner .slide").length > 1){
		    $("#home-banner").slick({
    			slidesToShow: 1,
    			slidesToScroll: 1,
    			dots: true,
    			arrows: true,
    			infinite: true,
    			speed: 800,
                fade: true,
                cssEase: 'linear'
    		});	
		}	
		
		// Content Slider
		if($(".gallery.content").length){
		    $(".gallery.content").slick({
    			slidesToShow: 1,
    			slidesToScroll: 1,
    			dots: false,
    			arrows: true,
    			infinite: false
    		});
		}

		// Testimonials
    	if($(".testimonials .item").length > 1){
    	    $(".testimonials  .slider").slick({
    			slidesToShow: 1,
    			slidesToScroll: 1,
    			dots: true,
    			arrows: false,
    			infinite: true,
    			speed: 800,
                cssEase: 'linear',
                fade: true
    		});	
    	}	
			
	}
	
	// Mixitup with Filters & Pagination (for use with Content Blocks Resource Library)
	if($('.mixit').length){
	    
    	var mixer = mixitup('.mixit', {
    	    pagination: {
    	        limit: 4
    	        
    	    }
    	});
 	
    	if($('.mixit .item').length < 5){
        	$('.mixitup-page-list-container').hide();
    	}
    	
    	$('.mixit-controls .controls').click(function(){
    	    $(this).toggleClass("open");
    	});
    	
	}
	
		
	// Content Blocks Tabbed Content
	if($('.tabbed-content').length){
		$('.tab-pane').each(function(){
			var title = $(this).attr('data-title');
			var href = $(this).attr('id');
			$(this).closest('.tabbed-content').find('.nav-tabs').append('<li><a data-toggle="tab" href="#'+href+'">'+title+'</a></li>');
		});
		$('.tabbed-content').each(function(){
			$(this).find('.nav-tabs li:first').addClass("active");
		});
	}
	
	//Shifty Form Labels
	/*$('form .input-group input, form .input-group select, form .input-group textarea').focusin(function(){
		$(this).parents('.input-group').find('label').removeClass('hidden').addClass('focus');
	}).focusout(function(){
		$('form .input-group input, form .input-group select, form .input-group textarea').each(function(){
			if($(this).val() === '') {
				$(this).parents('.input-group').find('label').removeClass('focus');			
			} else {
				$(this).parents('.input-group').find('label').addClass('hidden');			
			}
		});
	}).blur();
	$('form .input-group label').click(function(){
		$(this).parents('.input-group').find('input,select,textarea').focus();
	});	*/
	
	// Faux Links
    $('.fauxlink').click(function(){
        var href = $(this).find('a').attr('href');
        if(href.charAt(0) !== '/'){
            href = '/' + href;
        }
		if ($(this).find('a').attr('target') != '_blank'){
			window.location.href = href;
		} else {
			window.open(href,'_blank');	
		}
	});
	
	// Stack tables
	$('.no-more-table').each(function(){
		var dataAttribute = [];
		$('.no-more-table table thead tr td').each(function(){
			dataAttribute.push($(this).text());
		});
		
		for (i = 0; i < dataAttribute.length + 1; i++){
			$('.no-more-table table tbody tr td:nth-child('+i+')').attr("data-title", dataAttribute[i-1]);
		}
	});
		
	// Anchor Link Animations
	
	// Back to Top
    $("#back-top").click(function (){
        $("body,html").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // General anchor link
    $('a.anchor').click(function(e){
        e.preventDefault();
        var target = $(this).attr("href");
        var targetObject = $(target);
        if(target.length){
	        $('html,body').animate({
              scrollTop: targetObject.offset().top - 152
            }, 500);
	    }
        return false;
    });
    	
	//Fancybox for Gallery and Video
	if($.isFunction($.fn.fancybox)){
		$(".fancybox").fancybox({
			infobar: true,
			loop: true,
			beforeShow: function(instance){
			    instance.$refs.caption.empty();
			},
			afterShow: function( instance, current ) {
			    var text = $('.fancybox-inner > .fancybox-caption-wrap .fancybox-caption').text();
			    if(!$('.fancybox-slide--current .fancybox-image-wrap .custom-caption').length){
		            $('.fancybox-slide--current .fancybox-image-wrap').append("<div class='custom-caption'>"+text+"</div>");
		        }
		        if(!$('.fancybox-slide--current .fancybox-image-wrap .fancybox-infobar').length){
		            $('.fancybox-infobar').appendTo('.fancybox-slide--current .fancybox-image-wrap');
		        }
		        if(!$('.fancybox-slide--current .fancybox-image-wrap .fancybox-button--close').length){
		            $('.fancybox-button--close').prependTo('.fancybox-slide--current .fancybox-image-wrap');
		        }
		        if($('.local-video').length){
			        $('.fancybox-stage').find('.local-video')[0].play();
			    }
	        },
	        afterClose: function( instance, current ) {
        	    if($('.local-video').length){
			        $('.local-video')[0].pause();
			    }
        	}
		});
	}
	
	//Charts & Graphs
    /* To animate: <script src="//cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"></script> <script src="/js/jquery.counterup.min.js"></script>*/
	
	if($.isFunction($.fn.counterUp)){	
		$(".percent .number,.statistic .number").counterUp({
	        delay: 10,
	        time: 700
	    });
	}

	$(".percent .caption").each(function() {
		var text = $(this);
	    var words = $(this).text().split(" ");
	    
	    if (words.length >= 6) {
			$(this).addClass("long");
	    }
	});	 

	// Accessible Form Validation
	$('.forms .submit').click(function (e) {
		$('span.errorMessage').remove('.errorMessage');
		$(this).closest('.forms').addClass("currentForm");
		
		$('.forms.currentForm').find('input.required,textarea.required,select.required').not("input#token").each(function () {
			var placeholder = $(this).attr("placeholder");
			var label = $(this).parent().find("label").text().replace('*', '');
			
			$(this).removeAttr('style');
	
			if (!this.value || $(this).val() == placeholder) {
				e.preventDefault();
					
				$(this).after('<span class="errorMessage">Enter '+label+'<\/span>');
				$(this).attr('style','border-bottom:1px solid red;');
			} else {
				$(this).removeAttr("aria-invalid");
			};
		});
		
		if($(this).closest("form.currentForm").find('.required #file-uploader-image').length){
			var ajaxupload = $(this).closest("form").find('.required #file-uploader-image');
			if(!ajaxupload.find('.file-wrap').length){
			   e.preventDefault();
			   $('<span class="errorMessage">Please upload a file.</span>').insertAfter(ajaxupload);
			}
		}
	});
	
	$("form.forms").submit(function() {
		$(this).closest('.forms').addClass("currentForm");
		var submitBtn  = $("form.forms.currentForm input[type=submit]");
		var sending = $("form.forms.currentForm .sending");
		$(submitBtn).prop("disabled", true);
		$(submitBtn).val("Submitting...");
		$(sending).show();
	});
    
	if($('.sidebar').length){
		$('.sidebar li i').click(function(){
			$(this).next('ul').toggle();
			$(this).parent().toggleClass('active');
		});
		$('.sidebar h3 i').click(function(){
			$(this).closest('.sidebar').toggleClass('active');
		});
	}
	
	 // Cookie Policy popup for users on IE 8/9
    if($("html").hasClass("oldie")) {
		if(!(Cookies.get('browserIE'))){
			console.log("Cookie set");
			$("#update-browser").show();
			Cookies.set('browserIE', 'visited', { expires: 7 });
		}
		else {
			$("#update-browser").hide();
			console.log("Cookie removed");
		}	
		$(".update-browser-close").click(function(){
			$("#update-browser").slideUp();
		});
	}
    // End Default Scripts
});

//primaryNav Hover Intent Configuration
var primaryNavConfig = {
    sensitivity: 10,
    interval: 100,
    over: primaryOver,
    out: primaryOut,
    timeout: 250
};

function primaryOver(){
    $(this).find(">ul").slideDown('fast'); 
    $(this).addClass("hover");
    $(this).find('> a[aria-haspopup="true"]').attr("aria-expanded","true");
}
function primaryOut(){
    $(this).find(">ul").slideUp('fast'); 
    $(this).removeClass("hover"); 
    $(this).find('> a[aria-haspopup="true"]').attr("aria-expanded","false");
}
