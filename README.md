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
		$('container-left'),
		$('container-active'),
		$('container-right'),
	);

	// handle the pagechange event
	pagination.addEvent( 'pagechange', function( element, page ){
		// refresh outdated page content
	});

	// navigate through the pages
	pagination.next();
	pagination.previous();


Maybe a more useful example is to use the xPagination.JSON.mustache class
which will load the outdated pages with JSON data and use Mustache template
parser to convert each JSON data record into a DOM record.

	#JS
	pagination = new xPagination.JSON.mustache(
		$('container-left'),
		$('container-active'),
		$('container-right'),
		data,
		{
			records_per_page: 2
		}
	);


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


##### Signature:

	#JS
	onPagechange(element, page)


##### Arguments:

1. element - (*element*) Element which is out of date after a page change
2. page - (*integer*) The page number for the outdated page


### Example:

	#JS
	var pagination = new xPagination(
		$('container-left'),
		$('container-active'),
		$('container-right'),
		{
			onPagechange: function( element, page ) {
				// load content into the outdated page
			}
		}
	);



### Methods:

#### attach()

Attach container elements to an instance.

##### Syntax:

	pagination.attach(el_left, el_active, el_right);


##### Arguments:

1. el_left: (*element*) Left (or top) container element
2. el_active: (*element*) Active container element
3. el_right: (*element*) Right (or bottom) container element


##### Returns:

- boolean



Class: xPagination.JSON
-----------------------

### Syntax:

	#JS
	var pagination = new xPagination.JSON(el_left, el_active, el_right, obj_json[, options]);


### Arguments:

1. el_left: (*element*) Left (or top) container element
2. el_active: (*element*) Active container element
3. el_right: (*element*) Right (or bottom) container element
4. obj_json: (*object*) JSON data object
5. options: (*object*, optional) The options object


### Options:
- records_per_page: (*integer*, defaults to 10) Number of records per page


### Events:

#### pageload:

Fired when a page is loaded (or request to be loaded)

##### Signature:

	#JS
	onPageload(element, page)

##### Arguments:

1. element - (*element*) Element which is loaded with the page content
2. page - (*integer*) The page number for the loaded page


#### exhausted:

Fired when the data source is exhausted and there is no more data to be loaded into pages.

##### Signature:

	#JS
	onExhausted()


### Example:

	#JS
	var pagination = new xPagination.JSON(
		$('container-left'),
		$('container-active'),
		$('container-right'),
		data,
		{
			records_per_page: 2,
			onPagechange: function( element, page ) {
				// load content into the outdated page
			}
		}
	);



Class: xPagination.JSON.mustache
--------------------------------

xPagination.JSON.mustache updates the page content using JSON data and
mustache templates.

### Syntax:

	#JS
	var pagination = new xPagination.JSON.mustache(el_left, el_active, el_right, obj_json[, options]);

### Arguments:

1. el_left: (*element*) Left (or top) container element
2. el_active: (*element*) Active container element
3. el_right: (*element*) Right (or bottom) container element
4. obj_json: (*object*) JSON data object
5. options: (*object*, optional) The options object

### Options:
- template: (*string*) Mustache template


### Events:

#### inject:

Fired when a page is appended with a record

##### Signature:

	#JS
	onInject(element, data);

##### Arguments:

1. element - (*element*) Element which is injected withe the record
2. data - (*object*) JSON data object which is used to create the record

### Example:

	#JS
	var pagination = new xPagination.JSON.mustache(
		$('container-left'),
		$('container-active'),
		$('container-right'),
		data,
		{
			records_per_page: 2
		}
	);

