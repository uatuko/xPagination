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
		onExhausted: function(){},*/
		records_per_page: 10
	},

	initialize: function( el_left, el_active, el_right, obj_json, options ) {

		// call the parent
		this.parent( el_left, el_active, el_right, options );

		// we haven't completed initialising yet
		this._initialised = false;

		// update / validate json data
		this.json_data = obj_json;
		this._initialised = this._validate_json_data();

	},


	_validate_json_data: function() {

		var valid = false;

		if ( ( typeOf( this.json_data.total ) === 'number' ) &&
				( typeOf( this.json_data.data ) === 'array' ) &&
				( typeOf( this.json_data.template ) != 'null' ) ) {

			if ( ( this.json_data.total % this.options.records_per_page ) > 0 ) {
				this.pages = (this.json_data.total / this.options.records_per_page).toInt() + 1;
			} else {
				this.pages = (this.json_data.total / this.options.records_per_page).toInt();
			}

			valid = true;
		}

		return valid;

	},

	pagechange: function( element, page ) {

		// read data from json for <page>
		// update the expired <element>
		// if no more data, fire exhausted event and free pagination
		// until more data is available

		this.fireEvent( 'pagechange', [element, page]);
	},

	exhausted: function() {
		this.fireEvent( 'exhausted' );
	}

});
