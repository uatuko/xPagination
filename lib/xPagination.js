/*
---
description: A javascript pagination library.

license: GNU Lesser General Public License

authors:
 - Uditha Atukorala

requires:
 - core/1.4.5

provides: [xPagination]

...
 *
 * xPagination
 * Version 0.1
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

	Implements: Options,

	options: {
		pages : 3,
		element_left   : {},
		element_active : {},
		element_right  : {}
	},

	initialize: function ( options ) {

		this.setOptions( options );

		if ( ( typeOf ( this.options.element_left ) === 'element' ) &&
				( typeOf ( this.options.element_active ) === 'element' ) &&
				( typeOf ( this.options.element_right ) === 'element' ) ) {

			this._coordinates.left   = this.options.element_left.getPosition( this.options.element_left.getOffsetParent() );
			this._coordinates.active = this.options.element_active.getPosition( this.options.element_active.getOffsetParent() );
			this._coordinates.right  = this.options.element_right.getPosition( this.options.element_right.getOffsetParent() );

			this._initialised = true;

		}

	},

	_initialised: false,
	_page: 0,
	_coordinates: {
		left: {x: 0, y: 0},
		active: {x: 0, y: 0},
		right: {x: 0, y: 0},
	},

	next: function() {

		if ( this._initialised && this._page < this.options.pages ) {

			this.options.element_active.morph( Object.merge( {}, {left: this._coordinates.left.x, top: this._coordinates.left.y} ) );
			this.options.element_right.morph(  Object.merge( {}, {left: this._coordinates.active.x, top: this._coordinates.active.y} ) );

			// move left
			this.options.element_left.setPosition( this._coordinates.right );

			// update references
			var _active = this.options.element_active;
			this.options.element_active = this.options.element_right;
			this.options.element_right  = this.options.element_left;
			this.options.element_left   = _active;

			// update page
			this._page++;

		}

	},

	previous: function() {

		if ( this._initialised && this._page > 0 ) {

			// morph
			this.options.element_active.morph( Object.merge( {}, {left: this._coordinates.right.x, top: this._coordinates.right.y} ) );
			this.options.element_left.morph(   Object.merge( {}, {left: this._coordinates.active.x, top: this._coordinates.active.y} ) );

			// move left
			this.options.element_right.setPosition( this._coordinates.left );

			// update references
			var _active = this.options.element_active;
			this.options.element_active = this.options.element_left;
			this.options.element_left   = this.options.element_right;
			this.options.element_right  = _active;

			// update page
			this._page--;

		}
	}

});
