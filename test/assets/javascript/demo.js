
window.addEvent('domready', function(){

	var pagination = new xPagination({
		element_left   : $('pag-content-01'),
		element_active : $('pag-content-02'),
		element_right  : $('pag-content-03'),
		onPagechange: function( element, page ) {
			console.log('[options]: load "' + element.id +  '" with page ' + page );
		}
	});

	$$('.previous').addEvent('click', function( e ) {
		e.stop();
		pagination.previous();
	});

	$$('.next').addEvent('click', function( e ) {
		e.stop();
		pagination.next();
	});

	pagination.addEvent( 'pagechange', function( element, page ){
		console.log('[event handler]: load "' + element.id +  '" with page ' + page );
	});

});
