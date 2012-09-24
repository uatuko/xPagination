/*
---
description: A javascript pagination library.

license: GNU Lesser General Public License

authors:
 - Uditha Atukorala

requires:
 - xPagination

provides: [xPagination.JSON]

...
 *
 * xPagination
 * Version 2.0
 * Copyright (c) 2012 Uditha Atukorala
 *
 * This file is part of xPagination javascript library.
 *
 * xPagination is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * xPagination is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

xPagination.JSON = new Class({

	Extends: xPagination,

	options: { /*
		onPageload: function(element, page){},
		onInject: function(element, data){},
		onExhausted: function(){},*/
		records_per_page: 10
	},

	initialize: function( el_left, el_active, el_right, obj_json, options ) {

		// call the parent
		this.parent( el_left, el_active, el_right, options );

		// we haven't completed initialising yet
		this._initialised = false;

		// update variables
		this.records_per_page = this.options.records_per_page;

		// update / validate json data
		this.json_data = obj_json;
		this._initialised = this._validate_json_data();

		// load page data
		if ( this._initialised ) {
			this.pageload( this.elements.active, this.current_page );
			this.pageload( this.elements.right, ( this.current_page + 1 ) );
			this.pageload( this.elements.left, ( this.current_page - 1 ) );
		}

	},


	_validate_json_data: function() {

		var valid = false;

		if ( ( typeOf( this.json_data.total ) === 'number' ) &&
				( typeOf( this.json_data.data ) === 'array' ) &&
				( typeOf( this.json_data.template ) != 'null' ) ) {

			if ( ( this.json_data.total % this.records_per_page ) > 0 ) {
				this.pages = (this.json_data.total / this.records_per_page).toInt() + 1;
			} else {
				this.pages = (this.json_data.total / this.records_per_page).toInt();
			}

			valid = true;
		}

		return valid;

	},

	inject: function( element, data ) {
		/*
		 * This is a placeholder method to inject JSON data into a
		 * container element. Should be overridden by extending classes.
		 */

		// fire inject event
		this.fireEvent( 'inject', [element, data]);
	},

	pageload: function( element, page ) {

		// clear container content
		element.empty();

		// we don't care about negative page indexes or out of bound indexes
		if ( ( page >= 0 ) && ( page < this.pages ) ) {

			var data = this.json_data.data ;

			if ( ( this.records_per_page * page ) <= data.length ) {

				var idx_start = ( this.records_per_page * page );
				var idx_end   = ( ( this.records_per_page * ( page + 1 ) ) - 1 );

				if ( idx_end >= data.length ) {
					idx_end = ( data.length - 1);

					// we have exhausted our data source
					this.exhausted();
				}

				for( var i = idx_start; i <= idx_end; i++ ) {
					this.inject( element, data[i] );
				}

			} else {
				if ( data.length < this.json_data.total ) {
					this.exhausted();
				}
			}

		}

		// fire pageload event
		this.fireEvent( 'pageload', [element, page]);

	},

	pagechange: function( element, page ) {

		// load / refresh the expired page content
		this.pageload( element, page );

		// fire pagechange event
		this.fireEvent( 'pagechange', [element, page]);

	},

	exhausted: function() {
		// fire exhausted event
		this.fireEvent( 'exhausted' );
	}

});
