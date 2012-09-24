
var data = {
	total: 75,
	template: 'id: {{id}}, name: {{name}}, age: {{age}}',
	data: [
		{id:  1, name: "John Smith", age: 26},
		{id:  2, name: "Johny Smith", age: 23},
		{id:  3, name: "John Smithy", age: 24},
		{id:  4, name: "Johny Smithy", age: 25},
		{id:  5, name: "Jo Smith", age: 27}
	]
};

var pagination = {};

window.addEvent('domready', function(){

	pagination = new xPagination.JSON.mustache(
		$('container-left'),
		$('container-active'),
		$('container-right'),
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
