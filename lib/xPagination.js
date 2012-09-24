/*
---
description: A javascript pagination library.

license: GNU Lesser General Public License

authors:
 - Uditha Atukorala

requires:
 - core/Element.Dimensions
 - core/Fx.Morph

provides: [xPagination]

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

var xPagination = new Class({

	Implements: [Events, Options],

	options: { /*
		onPagechange: function(element, page){}, */
		pages : 3
	},

	initialize: function( el_left, el_active, el_right, options ) {
		this.setOptions( options );
		this.attach( el_left, el_active, el_right );
		this.pages = this.options.pages;
	},

	_initialised: false,
	current_page: 0,

	attach: function( el_left, el_active, el_right ) {

		if ( ( typeOf ( el_left ) === 'element' ) &&
				( typeOf ( el_active ) === 'element' ) &&
				( typeOf ( el_right ) === 'element' ) ) {

			// update element references
			this.elements = this.elements || {};
			this.elements.left   = el_left;
			this.elements.active = el_active;
			this.elements.right  = el_right;

			// update coordinates
			this.coordinates = this.coordinates || {};
			this.coordinates.left   = this.elements.left.getPosition( this.elements.left.getOffsetParent() );
			this.coordinates.active = this.elements.active.getPosition( this.elements.active.getOffsetParent() );
			this.coordinates.right  = this.elements.right.getPosition( this.elements.right.getOffsetParent() );

			this._initialised = true;
		}

		return this._initialised;
	},

	next: function() {
		if ( this._initialised && this.current_page < ( this.pages - 1 ) ) {

			this.elements.active.morph( Object.merge( {}, {left: this.coordinates.left.x, top: this.coordinates.left.y} ) );
			this.elements.right.morph( Object.merge( {}, {left: this.coordinates.active.x, top: this.coordinates.active.y} ) );

			// move left
			this.elements.left.setPosition( this.coordinates.right );

			// update references
			var _active = this.elements.active;
			this.elements.active = this.elements.right;
			this.elements.right  = this.elements.left;
			this.elements.left   = _active;

			// update page
			this.current_page++;

			this.pagechange( this.elements.right, ( this.current_page + 1 ) );
		}
	},

	previous: function() {
		if ( this._initialised && this.current_page > 0 ) {

			// morph
			this.elements.active.morph( Object.merge( {}, {left: this.coordinates.right.x, top: this.coordinates.right.y} ) );
			this.elements.left.morph( Object.merge( {}, {left: this.coordinates.active.x, top: this.coordinates.active.y} ) );

			// move left
			this.elements.right.setPosition( this.coordinates.left );

			// update references
			var _active = this.elements.active;
			this.elements.active = this.elements.left;
			this.elements.left   = this.elements.right;
			this.elements.right  = _active;

			// update page
			this.current_page--;

			this.pagechange( this.elements.left, ( this.current_page - 1 ) );

		}
	},

	pagechange: function( element, page ) {
		this.fireEvent( 'pagechange', [element, page]);
	}

});
