xPagination
===========

A javascript pagination library.

This plugin makes it easier to implement pagination using three (3) DOM
elements as page containers (e.g. divs). "onPagechange" event can be used
to update the contents of the outdated container making sure that we
always have content available for the immediate pages while keeping the
memory usage to a minimum.


How to use
----------

The idea behind this library is to keep the memory usage to a minimum at
the cost of CPU power. So, we use three container divs to navigate through
the pages while updating their content dynamically.

First implement your pagination containers and style them accordingly so
you have one active div shown and two hidden, one on the left (or top)
and one on the right (or bottom). Then initialise a xPagination object and
use the next() / previous() methods to navigate through pages.

	#JS
	// initialise
	var pagination = new xPagination(
		$('pag-content-01'),
		$('pag-content-02'),
		$('pag-content-03')
	);

	// handle the pagechange event
	pagination.addEvent( 'pagechange', function( element, page ){
		// refresh outdated page content
	});

	// navigate through the pages
	pagination.next();
	pagination.previous();



Class: xPagination
------------------

### Syntax:

	#JS
	var pagination = new xPagination([el_left, el_active, el_right[, options]]);


### Arguments:

1. el_left: (*element*) Left (or top) container element
2. el_active: (*element*) Active container element
3. el_right: (*element*) Right (or bottom) container element
4. options: (*object*, optional) The options object


### Options:

- pages: (*integer*, defaults to 3) Number of pages to paginate


### Events:

#### pagechange:

Fired upon a page change


#### Signature:

	#JS
	onPagechange(element, page)


#### Arguments

1. element - (*element*) Element which is out of date after a page change
2. page - (*integer*) The page number for the outdated page


### Example:

	#JS
	var pagination = new xPagination(
		$('pag-content-01'),
		$('pag-content-02'),
		$('pag-content-03'),
		{
			onPagechange: function( element, page ) {
				// load content into the outdated page
			}
		}
	);


xPagination method: attach
--------------------------

Attach container elements to an instance.

### Syntax:

	pagination.attach(el_left, el_active, el_right);


### Arguments:

1. el_left: (*element*) Left (or top) container element
2. el_active: (*element*) Active container element
3. el_right: (*element*) Right (or bottom) container element


### Returns:

- boolean



