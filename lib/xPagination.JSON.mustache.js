/*
---
description: A javascript pagination library.

license: GNU Lesser General Public License

authors:
 - Uditha Atukorala

requires:
 - xPagination.JSON
 - Mustache
 - more/Elements.from

provides: [xPagination.JSON.mustache]

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

xPagination.JSON.mustache = new Class({

	Extends: xPagination.JSON,

	options: { /*
		onInject: function(element, data){},*/
		template: false
	},

	initialize: function( el_left, el_active, el_right, obj_json, options ) {

		// call the parent
		this.parent( el_left, el_active, el_right, obj_json, options );

		// update variables
		this.template = this.options.template;

	},

	inject: function( element, data ) {

		var template = this.template;

		if ( typeOf ( this.json_data.template ) !== 'null' ) {
			template = this.json_data.template;
		}

		// construct elements using the template
		var _elements = Mustache.render( template, data );
		var elements  = Elements.from( _elements );

		if ( elements.length === 0 ) {
			elements = new Element( 'div', { html: _elements } );
		}

		// inject / adopt the newly created elements
		element.adopt( elements );

		// fire inject event
		this.fireEvent( 'inject', [element, data]);

	}

});
