// 'use strict';
// /* exported Line */

// class Line {
//   constructor(parent, pos) {
//     this.pos = pos || { x: 0, y: 0 };
//     this.pos.dir = 'origin';
//     this.grid = parent;
//     this.history = [];
//     this.mobile = false;
//     this.place();
//   }

//   place() {
//     if (this.grid.query(this.pos) === true) {
//       this.grid.mark(this.pos);
//       this.history.push(this.pos);
//       this.mobile = true;
//     } else {
//       console.log('not placed');
//     }
//   }

//   move() {
//     var spots = this.grid.query(this.pos);
//     if (spots.length > 0) {
//       var destination = spots[this.rand(spots.length)];
//       this.pos = destination;
//       this.grid.mark(destination);
//       this.history.push(destination);
//     } else {
//       // console.log('no where to go');
//       this.mobile = false;
//       var last = this.history[this.history.length - 1];
//       last.dir = 'terminate';
//       this.grid.mark(last);
//     }
//   }

//   rand(max, min) {
//     // min (inclusive) and max (exclusive)
//     // probably need better random function;
//     min = min || 0;
//     return Math.floor(Math.random() * (max - min)) + min;
//   }
// }
