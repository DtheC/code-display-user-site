// This instance of p5 is for using static methods, which for some reason are not available on the 'p' instance.
// If you need it, uncomment it.
// import p5 from 'p5';

import { Cell } from '../cell';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const ITERATIONS = 3;

export default function sketch(p) {
  let cells = [];

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    cells.push(new Cell(p, p.createVector(0, 0, 0), p.createVector(CANVAS_WIDTH, CANVAS_HEIGHT, 0)));
    for (let index = 0; index < ITERATIONS; index++) {
      const oldCells = cells.slice(0);
      cells = [];
      oldCells.forEach((elem) => {
        const newCells = iterate(elem);
        newCells.forEach(newElem => cells.push(newElem));
      });
    }
    p.noStroke();
    cells.forEach(element => {
      element.draw(p);
    });
  }

  function iterate(cellToIterate) {
    const cells = [];
    const split = (Math.round(Math.random() * 5)) * 2; // Even numbers only
    const newCellWidth = cellToIterate.size.x / split;
    const newCellHeight = cellToIterate.size.y / split;
    const newCellSize = p.createVector(newCellWidth, newCellHeight, 0);
    for (let y = 0; y < split; y++) {
      for (let x = 0; x < split; x++) {
        const loc = p.createVector(cellToIterate.position.x + (x * newCellWidth), cellToIterate.position.y + (y * newCellHeight), 0);
        cells.push(new Cell(p, loc, newCellSize));
      }
    }
    if (cells.length == 0) cells.push(cellToIterate);
    return cells;
  }
}
