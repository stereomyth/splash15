'use strict';
/* globals Grid, Line */

var Splash = function () {

  this.height = 20;
  this.width = 20;

  this.lineNum = 16;

  this.init();

};

Splash.prototype.init = function(first_argument) {

  this.getDimensions();

  var grid = new Grid(this.width,this.height);

  this.lines = [];

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

  // grid.print();
  this.draw();
  
};

Splash.prototype.getDimensions = function () {

  var getDiag = function (a, b) {
    return Math.round(Math.sqrt(a*a + b*b));
  };

  var win = {
    width: $(window).width(),
    height: $(window).height(),
  };

  win.diag = getDiag(win.width, win.height);

  $('.hole').css({
    'height': win.diag, 
    'width': win.diag, 
    'margin-left': - win.diag / 2,
    'margin-top': - (win.diag - win.height) / 2
  });

};

Splash.prototype.tick = function () {

  for (var i = 0; i < this.lines.length; i++) {
    this.lines[i].move();
  }

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

  var lineMath = d3.svg.line()
      .x(function(d) { return scale.x(d.x); })
      .y(function(d) { return scale.y(d.y); })
  ;

  var scale = {

    x: d3.scale.linear()
      .domain([0, this.width - 1])
      .rangeRound([0, hole.width - hole.padding * 2]),

    y: d3.scale.linear()
      .domain([0, this.height - 1])
      .rangeRound([0, hole.height - hole.padding * 2])

  };
  
  var paths = svg.selectAll('path').data(this.lines)
    .enter()
      .append('path')
        .attr('stroke-linecap', 'square')
        .attr('d', function (d) { return lineMath(d.history); })
  ;

  for (var i = 0; i < paths[0].length; i++) {
    this.lines[i].pathLength = paths[0][i].getTotalLength() + 10;
  }

  paths
    .attr("stroke-dasharray", function (d) {return d.pathLength + " " + d.pathLength; })
    .attr("stroke-dashoffset", function (d) {return d.pathLength;});

  window.setTimeout(function () {
    paths
      .transition()
        .duration(4000)
        // .ease("linear")
        .attr("stroke-dashoffset", 0);
  }, 2000);

};

var splash = new Splash();
