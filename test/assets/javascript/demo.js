
var data = {
	total: 75,
	template: 'template string',
	data: [
		{name: "John Smith", age: 26},
		{name: "Johny Smith", age: 23},
		{name: "John Smithy", age: 24},
		{name: "Johny Smithy", age: 25},
		{name: "Jo Smith", age: 27}
	]
};

var pagination = {};

window.addEvent('domready', function(){

	pagination = new xPagination.JSON(
		$('pag-content-01'),
		$('pag-content-02'),
		$('pag-content-03'),
		data,
		{
			records_per_page: 2,
			onPagechange: function( element, page ) {
				console.log('[options]: load "' + element.id +  '" with page ' + page );
			}
		}
	);

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

	pagination.addEvent( 'exhausted', function() {
		console.log( 'exhausted' );
	});

});
