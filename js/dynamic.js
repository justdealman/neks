function slider() {
	$('.slider .container').empty();
	$('.slider .prev, .slider .next, .slider .pagination').remove();
	$('.slider .container').html($('.slider .temp').html());
	$('.slider, .slider .container, .slider .container > div').width($('.wrapper').width()-$('.slider').offset().left);
	$('.slider').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'fade',
		fadeSpeed: 500,
		play: 10000,
		pause: 2500,
		crossfade: true
	});
	$('.slider').css({
		'opacity': '1'
	});
}
function rcBreadcrumbs() {
	$('.rc .breadcrumbs').width($('.main').width()-$('.rc').offset().left+28)
}
$(document).ready(function() {
	if ( $('.nav-c').length > 0 ) {
		$('.nav-c > li > ul').each(function() {
			if ( $(this).children('li').length <= 5 ) {
				$(this).siblings('h5').hide();
			}
		});
		$('.nav-c > li > h5 span').bind('click', function(e) {
			e.preventDefault();
			var t = $(this).parents('li');
			if ( t.hasClass('opened') ) {
				$(this).find('em').text('Смотреть все');
			} else {
				$(this).find('em').text('Свернуть');
			}
			t.toggleClass('opened');
		});
	}
	$('.cat-b em.minus, .quantity-e em.minus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
	});
	$('.cat-b em.plus, .quantity-e em.plus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	$('.benefits-b > div > ul li a').bind('click', function(e) {
		e.preventDefault();
		$(this).parents('ul').siblings('div[data-tab="'+$(this).attr('href')+'"]').show().siblings('div').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	$(function() {
		var f = $('footer').height();
		var n = $('footer').height()+$('footer .map').height();
		var isOpen = false;
		$('footer .open-map').bind('click', function(e) {
			e.preventDefault();
			if ( !isOpen ) {
				$('footer').stop().animate({
					'height': n+'px',
					'margin-top': -n+'px'
				}, 500);
				$('.clear').stop().animate({
					'height': n+'px'
				}, 500);
				$('html, body').animate({
					scrollTop: $(document).scrollTop()+$('footer .map').height()+'px'
				}, 500);
				$(this).find('span').text('Свернуть');
				isOpen = true;
			} else {
				$('footer').stop().animate({
					'height': f+'px',
					'margin-top': -f+'px'
				}, 500);
				$('.clear').stop().animate({
					'height': f+'px'
				}, 500);
				isOpen = false;
				$(this).find('span').text('Карта');
			}
		});
	});
	$('header .lk-open').bind('click', function(e) {
		e.preventDefault();
		$(this).siblings('.lk').stop().slideToggle(250);
	});
	$('html').click(function() {
		$('header .lk').stop().slideUp(250);
	});
	$('header .lk, header .lk-open').click(function(event) {
		event.stopPropagation();
	});
	$('.modal').append('<span class="close"></span>');
	$('form.standart input, form.standart textarea').each(function() {
		if ( $(this).val().length > 0 ) {
			$(this).parent().addClass('complete').removeClass('focus');
		}
		$(this).focusin(function() {
			$(this).parent().addClass('focus');
		});
		$(this).focusout(function() {
			if ( $(this).val().length > 0 ) {
				$(this).parent().addClass('complete').removeClass('focus');
			}
			else {
				$(this).parent().removeClass('focus complete');
			}
		});
	});
	$('form.standart p span').bind('click', function(e) {
		e.preventDefault();
		$(this).siblings('input, textarea').focus();
	});
	$('[data-open]').bind('click', function(e) {
		e.preventDefault();
		$('header .lk').stop().slideUp(250);
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(500);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(500);
	});
	$('.fade, .modal .close').bind('click', function(event) {
		event.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(500);
	});
	if ( $('.slider').length > 0 ) {
		slider();
		$('.slider').bind('swipeleft', function() {
			$('.slider .next').trigger('click');
		});
		$('.slider').bind('swiperight', function() {
			$('.slider .prev').trigger('click');
		});
	}
	$('nav > div > ul > li > div').parent().hover(
		function() {
			$(this).children('div').stop(true,true).delay(300).fadeIn(300);
		},
		function() {
			$(this).children('div').stop(true,true).delay(300).fadeOut(300);
		}
	);
	$('.nav-c > li > ul > li > ul').parent().hover(
		function() {
			$(this).children('ul').stop(true,true).delay(200).fadeIn(200);
		},
		function() {
			$(this).children('ul').stop(true,true).delay(300).fadeOut(200);
		}
	);
	if ( $('nav > div > ul > li > div .core > ul > li').length > 0 ) {
		$('nav > div > ul > li > div .core > ul > li').each(function() {
			var p = $(this);
			if ( p.children('ul').size() > 1 ) {
				p.append('<span class="span-v"></span>');
			}
			if ( p.children('ul').size() > 2 ) {
				var v = Math.floor((p.children('ul').size()-1)/2);
				for ( var i = 1; i <= v; i++ ) {
					p.append('<span class="span-h num'+i+'"></span>');
				}
			}
		});
		$('nav .sub ul li').bind('mouseover', function() {
			var p = $('nav .core > ul:nth-child('+eval($(this).index()+1)+')');
			$(this).addClass('opened').siblings().removeClass();
			p.show().siblings().hide();
			if ( p.children('li').children('ul').size() > 1 ) {
				p.find('.span-v').css({
					'left': p.children('li').children('ul:nth-child(2)').position().left-1+'px',
					'height': p.outerHeight()-61+'px'
				});
			}
			if ( p.children('li').children('ul').size() > 2 ) {
				var v = Math.floor((p.children('li').children('ul').size()-1)/2);
				for ( var i = 1; i <= v; i++ ) {
					p.find('.span-h.num'+i+'').css({
						'top': p.children('li').children('ul:nth-child('+eval(i*2+1)+')').position().top-1+'px'
					});
				}
			}
		});
	}
	$('.school-b .grid li').hover(
		function() {
			$(this).find('p').stop().slideDown(200);
		},
		function() {
			$(this).find('p').stop().slideUp(200);
		}
	);
	if ( $('.rc .breadcrumbs').length > 0 ) {
		rcBreadcrumbs();
	}
	$('.filter-b ul li span').bind('click', function(e) {
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	if ( $('input[type="radio"]').length > 0 ) {
		$('input[type="radio"]').uniform();
	}
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	$('.product-i .tabs > ul li a').bind('click', function(e) {
		e.preventDefault();
		$(this).parents('ul').siblings('[data-desc="'+$(this).attr('href')+'"]').show().siblings('[data-desc]').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	if ( $('.catalog-l').length > 0 ) {
		$('.catalog-l h2 span img').each(function() {
			$(this).css({
				'margin-top': (42-$(this).attr('height'))/2+'px',
				'opacity': '1'
			});
		});
	}
});
$(window).resize(function() {
	if ( $('.slider').length > 0 ) {
		slider();
	}
	if ( $('.rc .breadcrumbs').length > 0 ) {
		rcBreadcrumbs();
	}
});
$(window).load(function() {
	if ( $('.school-b').length > 0 ) {
		$('.school-b .grid li h5 em').each(function() {
			if ( $(this).height() > 20 ) {
				$(this).css({
					'margin-top': -$(this).height()/2-3+'px'
				});
			}
		});
		$('.school-b .grid li h5').css({
			'opacity': '1'
		});
	}
	if ( $('.catalog-l > ul').length > 0 ) {
		$('.catalog-l > ul').each(function() {
			var p = $(this);
			var v = p.children('li').size();
			if ( v > 3 ) {
				v = 3;
			}
			for ( var i = 1; i <= v; i++ ) {
				p.append('<span class="span-v num'+i+'"></span>');
				var li = p.children('li:nth-child('+i+')');
				p.find('.span-v.num'+i).css({
					'left': li.position().left+li.outerWidth()+'px',
					'height': p.outerHeight()-52+'px'
				});
			}
			if ( p.children('li').size() > 4 ) {
				var h = Math.floor((p.children('li').size()-1)/4);
				for ( var i = 1; i <= h; i++ ) {
					p.append('<span class="span-h num'+i+'"></span>');
					var li = p.children('li:nth-child('+eval(i*4+1)+')');
					p.find('.span-h.num'+i+'').css({
						'top': li.position().top+'px'
					});
				}
			}
		});
		$('.catalog-l > ul .span-v, .catalog-l > ul .span-h').css({
			'opacity': '1'
		});
	}
});