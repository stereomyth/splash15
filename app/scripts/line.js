'use strict';

var Line = function (parent, x, y) {
	this.pos = {x: x || 0, y: y || 0};

	this.grid = parent;
	
};
