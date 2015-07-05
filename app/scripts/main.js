'use strict';
/* globals Grid, Line */

var Splash = function () {

  this.height = 20;
  this.width = 20;

  this.lineNum = 16;

  this.init();

};

Splash.prototype.init = function(first_argument) {
  var grid = new Grid(this.width,this.height);

  this.lines = [];

  // this.lines.push(new Line(grid, {x: 5, y: 5}));

  var mid = Math.round(this.width / 2) - Math.floor(this.lineNum / 4);
  var mid2 = Math.round(this.height / 2);

  for (var i = 0; i < this.lineNum / 2; i++) {
    this.lines.push(new Line(grid, {x: mid + i, y: mid2}));
  }

  for (i = 0; i < this.lineNum / 2; i++) {
    this.lines.push(new Line(grid, {x: mid + i, y: mid2 -1}));
  }


  for (i = 0; i < 150; i++) {
    this.tick();
  }

  grid.print();
  this.draw();
  
};

Splash.prototype.tick = function () {

  for (var i = 0; i < this.lines.length; i++) {
    this.lines[i].move();
  }

};

Splash.prototype.draw = function () {

  var svg = d3.select('.hole').append('svg')
    .attr('height', '500')
    .attr('width', '500')
    .append('g')
      .attr('transform', 'translate(50,50)')
  ;

  var lineMath = d3.svg.line()
      .x(function(d) { return scale.x(d.x); })
      .y(function(d) { return scale.y(d.y); })
  ;

  var scale = {

    x: d3.scale.linear()
      .domain([0, this.width - 1])
      .rangeRound([0,400]),

    y: d3.scale.linear()
      .domain([0, this.height - 1])
      .rangeRound([0,400])

  };

  svg.selectAll('path').data(this.lines)
    .enter()
      .append('path')
        .attr('stroke-linecap', 'square')
        .attr('d', function (d) { return lineMath(d.history); })

  ;
};

var splash = new Splash();