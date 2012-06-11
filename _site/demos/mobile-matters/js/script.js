(function(){
	var flexOpts = {
		'animation':'slide',
		'controlNav':true,
		'directionNav':false,
		'slideshow':false,
		'controlsContainer':'.flexcontrols'
	};

	$(document).ready(function(){
		$('.slide').each(function(){
			var self = $(this);
			self.children().wrapAll('<div class="slide-inner" />');
			self.addClass('has-inner');
		});
		$('section::not(:eq(0))').hide();
		$('.slide:visible::not(:eq(0))').hide();
		var anchors = $('nav a');
		anchors.on('click',function(){
			var self = $(this),
				id = self.attr('href'),
				current = $('section:visible');
			current.hide();
			$(id).show();
			anchors.each(function(){
				var self = $(this);
				if ( self.hasClass('active') ) {
					self.removeClass('active');
				}
			});
			self.addClass('active');
			return false;
		});
	});

	$(window).load(function(){
		var sections = $('section');
		sections.flexslider(flexOpts);
	});
})();




