'use strict';
/* globals Grid, Line */

var splash = {

  init: function () {

    var grid = new Grid();

    var lines = [];

    lines.push(new Line(grid));
    lines.push(new Line(grid, {x: 5, y: 5}));

    grid.print();

    var svg = d3.select('.hole').append('svg')
      .attr('height', '500')
      .attr('width', '500')
      // .style('margin', '50px')
      .append('g')
        .attr('transform', 'translate(50,50)')
    ;

    var lineMath = d3.svg.line()
        .x(function(d) { return scale(d.x); })
        .y(function(d) { return scale(d.y); })
    ;

    var scale = d3.scale.linear()
      .domain([0,9])
      .range([0,400])
    ;

    svg.selectAll('path').data(lines)
    // svg.selectAll('path').data(lines, function (d, i) { console.log(d);return d.history;})
      .enter()
        .append('path')
          .attr('stroke-linecap', 'square')
          .attr('d', function (d) { return lineMath(d.history); })

    ;
  }

};

splash.init();
