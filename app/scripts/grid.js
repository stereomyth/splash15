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

Grid.prototype.query = function (pos) {
	var options, output = [];

	if (this.empty(pos)) {
		return true;
	} else {

		options = [
			{x: pos.x, y: pos.y - 1}, // top
			{x: pos.x + 1, y: pos.y}, // right
			{x: pos.x, y: pos.y + 1}, // bottom
			{x: pos.x - 1, y: pos.y}  // left
		];

		for (var i = 0; i < options.length; i++) {
			if (this.empty(options[i])) {
				output.push(options[i]);
			}
		}

	}

	return output;
};

Grid.prototype.empty = function (pos) {
	if (this.data[pos.y][pos.x] === '0') {
		return true;
	} else {
		return false;
	}
};

Grid.prototype.mark = function (pos, mark) {
	this.data[pos.y][pos.x] = mark;

	this.print();
};
