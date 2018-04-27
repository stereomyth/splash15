'use strict';
/* globals Grid, Line, $, d3 */

class Splash {
  constructor() {
    this.height = 0;
    this.width = 0;
    this.lineNum = 16;

    // this.init();
  }

  init() {
    this.getDimensions();

    console.log('this.width: ', this.width);
    var grid = new Grid(this.width, this.height);

    this.lines = [];

    var mid = Math.round(this.width / 2) - Math.floor(this.lineNum / 4);
    var mid2 = Math.round(this.height / 2);

    for (var i = 0; i < this.lineNum / 2; i++) {
      this.lines.push(new Line(grid, { x: mid + i, y: mid2 }));
    }

    for (i = 0; i < this.lineNum / 2; i++) {
      this.lines.push(new Line(grid, { x: mid + i, y: mid2 - 1 }));
    }

    for (i = 0; i < 250; i++) {
      this.tick();
    }
    // grid.print();
    this.draw();
  }

  getDimensions() {
    const getDiag = (a, b) => Math.round(Math.sqrt(a * a + b * b));

    this.win = {
      width: $(window).width(),
      height: $(window).height(),
    };

    this.win.diag = getDiag(this.win.width, this.win.height);

    // $('.hole').css({
    // height: this.win.diag,
    // width: this.win.diag,
    // 'margin-left': -this.win.diag / 2,
    // 'margin-top': -(this.win.diag - this.win.height) / 2,
    // });

    // this.height = this.win.diag / 30;
    // this.width = this.win.diag / 30;

    this.height = this.width = 10;
  }

  tick() {
    // for (var i = 0; i < this.lines.length; i++) {
    // this.lines[i].move();
    // }
    this.lines.forEach(line => line.move());
  }

  draw() {
    var hole = {
      height: $('.hole').height(),
      width: $('.hole').width(),
      // padding: 50,
    };

    const svg = d3.select('.hole');

    const scale = {
      x: d3.scale
        .linear()
        .domain([0, this.width - 1])
        .rangeRound([0, hole.width]),
      y: d3.scale
        .linear()
        .domain([0, this.height - 1])
        .rangeRound([0, hole.height]),
    };

    var lineMath = d3.svg
      .line()
      .x(d => scale.x(d.x))
      .y(d => scale.y(d.y));

    var paths = svg
      .selectAll('path')
      .data(this.lines)
      .enter()
      .append('path')
      .attr('d', d => lineMath(d.history));

    for (var i = 0; i < paths[0].length; i++) {
      this.lines[i].pathLength = paths[0][i].getTotalLength();
    }

    // paths
    //   .attr('stroke-dasharray', d => d.pathLength + ' ' + d.pathLength)
    //   .attr('stroke-dashoffset', d => d.pathLength);

    // window.setTimeout(() => {
    // paths
    // .transition()
    // .duration(4000)
    // .delay((d, index) => index * 100)
    // .ease('linear')
    // .attr('stroke-dashoffset', 0);
    // }, 2000);
  }
}

const splash = new Splash();

splash.init();
