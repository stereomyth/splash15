'use strict';
/* globals Grid, Line, $, d3 */

var Splash = function () {

  this.height = 0;
  this.width = 0;

  this.lineNum = 16;

  // this.init();

};

Splash.prototype.init = function () {

  this.getDimensions();

  var grid = new Grid(this.width, this.height);

  this.lines = [];

  var mid = Math.round(this.width / 2) - Math.floor(this.lineNum / 4);
  var mid2 = Math.round(this.height / 2);

  for (var i = 0; i < this.lineNum / 2; i++) {
    this.lines.push(new Line(grid, {x: mid + i, y: mid2}));
  }

  for (i = 0; i < this.lineNum / 2; i++) {
    this.lines.push(new Line(grid, {x: mid + i, y: mid2 - 1}));
  }


  for (i = 0; i < 250; i++) {
    this.tick();
  }

  // grid.print();
  this.draw();

};

Splash.prototype.getDimensions = function () {

  var getDiag = function (a, b) {
    return Math.round(Math.sqrt(a * a + b * b));
  };

  this.win = {
    width: $(window).width(),
    height: $(window).height()
  };

  this.win.diag = getDiag(this.win.width, this.win.height);

  $('.hole').css({
    'height': this.win.diag,
    'width': this.win.diag,
    'margin-left': -this.win.diag / 2,
    'margin-top': -(this.win.diag - this.win.height) / 2
  });

  this.height = this.win.diag / 30;
  this.width = this.win.diag / 30;

};

Splash.prototype.tick = function () {

  for (var i = 0; i < this.lines.length; i++) {
    this.lines[i].move();
  }

};

Splash.prototype.timer = function () {

  window.setInterval(function () {

  }, 100);

};

Splash.prototype.draw = function () {

  var hole = {
    height: $('.hole').height(),
    width: $('.hole').width(),
    padding: 50
  };

  var svg = d3.select('.hole').append('svg')
    .attr('height', hole.height)
    .attr('width', hole.width)
    .append('g')
      .attr('transform', 'translate(50,50)')
  ;

  var scale = {

    x: d3.scale.linear()
      .domain([0, this.width - 1])
      .rangeRound([0, hole.width - hole.padding * 2]),

    y: d3.scale.linear()
      .domain([0, this.height - 1])
      .rangeRound([0, hole.height - hole.padding * 2])

  };

  var lineMath = d3.svg.line()
    .x(function(d) { return scale.x(d.x); })
    .y(function(d) { return scale.y(d.y); })
  ;

  var paths = svg.selectAll('path').data(this.lines)
    .enter()
      .append('path')
        .attr('stroke-linecap', 'square')
        .attr('stroke-width', 12)
        .attr('d', function (d) { return lineMath(d.history); })
  ;

  for (var i = 0; i < paths[0].length; i++) {
    this.lines[i].pathLength = paths[0][i].getTotalLength() + 10;
  }

  paths
    .attr('stroke-dasharray', function (d) { return d.pathLength + ' ' + d.pathLength; })
    .attr('stroke-dashoffset', function (d) { return d.pathLength; });

  window.setTimeout(function () {
    paths
      .transition()
        .duration(4000)
        .delay(function(d, index) { return index * 100; })
        .ease('linear')
        .attr('stroke-dashoffset', 0);
  }, 2000);

};

var splash = new Splash();

splash.init();
