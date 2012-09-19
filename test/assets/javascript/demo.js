
window.addEvent('domready', function(){

	var pagination = new xPagination({
		element_left   : $('pag-content-01'),
		element_active : $('pag-content-02'),
		element_right  : $('pag-content-03')
	});

	$$('.previous').addEvent('click', function( e ) {
		e.stop();
		pagination.previous();
	});

	$$('.next').addEvent('click', function( e ) {
		e.stop();
		pagination.next();
	});

});
