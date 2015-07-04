'use strict';

var Grid = function (width, height) {

	this.width = width || 10;
	this.height = height || 10;

	this.data = [];

	this.build();
	this.print();

};

Grid.prototype.build = function() {
	for (var y = 0; y < this.height; y++) {
		this.data.push([]);

		for (var x = 0; x < this.width; x++) {
			this.data[y].push('0');
		}
	}
};

Grid.prototype.print = function() {
	var line, output = '';

	for (var y = 0; y < this.height; y++) {
		line = '';

		for (var x = 0; x < this.width; x++) {
			line += '[' + this.data[y][x] + ']';
		}

		output += line + '\n';
	}

	console.log(output);
};
