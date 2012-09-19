xPagination
===========

A javascript pagination library


How to use
----------

	#JS
	// initialise
	var pagination = new xPagination({
		element_left   : $('pag-content-01'),
		element_active : $('pag-content-02'),
		element_right  : $('pag-content-03')
	});

	// navigate through the pages
	pagination.next();
	pagination.previous();

