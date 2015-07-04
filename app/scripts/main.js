'use strict';
/* globals Grid, Line */

var splash = {

  init: function () {

    var grid = new Grid();

    var line = new Line(grid);
    var line2 = new Line(grid, {x: 5, y: 5});

    grid.print();

  }

};

splash.init();
