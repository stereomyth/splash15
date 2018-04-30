'use strict';

class Grid {
  constructor(conf) {
    this.conf = conf;
    this.rotate = conf.rotate;

    const rotatedCell = this.rotateWidth(conf.cell);

    this.cell = this.rotate
      ? { w: rotatedCell, h: rotatedCell / 2 }
      : { w: conf.cell, h: conf.cell };

    this.cell.square = conf.cell;

    this.init();
  }

  init() {
    const cell = this.cell;

    const hole = {
      w: $('.hole').width(),
      h: $('.hole').height(),
    };

    let grid = {
      w: Math.floor(hole.w / cell.w),
      h: Math.floor(hole.h / cell.h),
      excess: {
        w: hole.w % cell.w,
        h: hole.h % cell.h,
      },
    };

    grid.h = this.rotate ? grid.h - 1 : grid.h;

    this.data = this.build(grid, cell);
    this.draw(grid, cell);
  }

  rotateWidth(width) {
    const rads = 45 * Math.PI / 180;
    const abs = Math.abs(width * Math.sin(rads) + width * Math.cos(rads));

    return Math.round(abs);
  }

  build(grid, cell) {
    let layout = [];

    for (var y = 0; y < grid.h; y++) {
      layout.push([]);

      for (var x = 0; x < grid.w; x++) {
        const width = x * cell.w;

        layout[y].push({
          x: this.rotate && y % 2 ? width + cell.w / 2 : width,
          y: y * cell.h,
        });

        if (this.rotate && y % 2 && x === grid.w - 1) {
          layout[y].pop();
        }
      }
    }

    return layout;
  }

  draw(grid, cell) {
    const push = {
      x: Math.round(grid.excess.w / 2),
      y: Math.round(grid.excess.h / 2),
    };

    const hole = d3.select('.hole');

    const offset = hole
      .append('g')
      .attr('class', 'offset')
      .attr('transform', `translate(${push.x}, ${push.y})`);

    const rows = offset
      .selectAll('.row')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'row');

    const cells = rows.selectAll('.cell').data(d => d);

    cells
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('width', d => cell.square)
      .attr('height', d => cell.square)
      .attr('y', d => d.y + (cell.w - cell.square) / 2)
      .attr('x', d => d.x + (cell.w - cell.square) / 2);

    cells
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, index) => index * 200)
      .ease('linear')
      .style('opacity', 1);

    cells
      .exit()
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, index) => index * 200)
      .ease('linear')
      .style('opacity', 1);

    // cells
    //   .exit()
    //   .style('opacity', 1)
    //   .transition()
    //   .duration(1000)
    //   .delay((d, index) => index * 200)
    //   .ease('linear')
    //   .style('opacity', 0);

    if (this.rotate) {
      cells.attr(
        'transform',
        d => `rotate(45 ${d.x + cell.w / 2}, ${d.y + cell.w / 2})`
      );
    }
  }

  refresh() {
    d3
      .select('.hole')
      .selectAll('.row')
      .remove();

    // this.data = [];

    this.init();
  }

  // query(pos) {
  //   var options,
  //     output = [];
  //   if (this.empty(pos)) {
  //     return true;
  //   } else {
  //     options = [
  //       { x: pos.x, y: pos.y - 1, dir: 'north' },
  //       { x: pos.x + 1, y: pos.y, dir: 'east' },
  //       { x: pos.x, y: pos.y + 1, dir: 'south' },
  //       { x: pos.x - 1, y: pos.y, dir: 'west' },
  //     ];
  //     for (var i = 0; i < options.length; i++) {
  //       if (this.empty(options[i])) {
  //         output.push(options[i]);
  //       }
  //     }
  //   }
  //   return output;
  // }

  // empty(pos) {
  //   if (
  //     pos.x < this.width &&
  //     pos.x >= 0 &&
  //     pos.y < this.height &&
  //     pos.y >= 0 &&
  //     this.data[pos.y][pos.x] === ' '
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // mark(pos) {
  //   var mark;
  //   switch (pos.dir) {
  //     case 'origin':
  //       mark = 'x';
  //       break;
  //     case 'terminate':
  //       mark = 'o';
  //       break;
  //     case 'north':
  //       mark = '^';
  //       break;
  //     case 'south':
  //       mark = 'v';
  //       break;
  //     case 'east':
  //       mark = '>';
  //       break;
  //     case 'west':
  //       mark = '<';
  //       break;
  //     default:
  //   }
  //   this.data[pos.y][pos.x] = mark;
  // }
}
