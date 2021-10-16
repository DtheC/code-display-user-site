// Originally from: https://github.com/doubledherin/gatsby-p5-starter
// This instance of p5 is for using static methods, which for some reason are not available on the 'p' instance.
// If you need it, uncomment it.
// import p5 from 'p5';

import {countBy, flow, sampleSize} from 'lodash';

const CANVAS_WIDTH = 1240;
const CANVAS_HEIGHT = 1748;

const NUM_FLOWERS = 100;
const BORDER_X = 10;
const BORDER_Y = 10;

const SCALE_SCALAR = 3;

const colourCombos = [
  ['#df4826', '#ffc444'], // Red yellow mid
  ['#ffc444', '#df4826'], // Yellow red mid
  ['#4aa9ab', '#ffc444'], // Blue yellow mid
];

const peaceColours = [
  '#479269', // Green
  '#df4826', // Red
  '#ffc444' // Yellow
];
const petalCountsStyle1 = [8];
const petalCountsStyle2 = [6, 7, 9];

let peaceImage;

// The basic idea here is that you'll need to use the `p` namespace to access
// all non-static p5 methods and variables here. Any static methods need to be accessed with the p5 namespace (imported above).
export default function sketch(p) {

  // ~~~~~~ Initialize variables ~~~~~~~~~
  const flowerTypes = [];
  for (let i = 0; i < 5; i++) { // Style 2
    flowerTypes.push(new FlowerType(
      p.createVector(Math.random() * 1 + 30, Math.random() * 1 + 25),
      sampleSize(petalCountsStyle2, 1)[0],
      Math.random() < 0.5
    ));

    flowerTypes.push(new FlowerType( // Style 1
      p.createVector(Math.random() * 1 + 35, Math.random() * 1 + 60), // Size
      sampleSize(petalCountsStyle1, 1)[0],
      Math.random() < 0.5
    ));
  }

  // ~~~~~~ React lifecycle methods ~~~~~~
  p.preload = () => {
    peaceImage = p.loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDMgNzkuMTY0NTI3LCAyMDIwLzEwLzE1LTE3OjQ4OjMyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTEwLTE2VDE2OjAwOjQwKzExOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0xMC0xNlQxODowODozNSsxMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMC0xNlQxODowODozNSsxMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MWRlZGVjMC0xZDMxLTJhNDQtYTM0Yi00MTE5YTA5YWVjNWQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiZjVmYWZhZC0zOTdiLTNlNDYtYWM4Ni03MmFmOTU2YjBmMjkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNTVkMTI0OS1mMDhhLWQ3NGUtYjhhMS1jZDExNzVlODEzMDEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE1NWQxMjQ5LWYwOGEtZDc0ZS1iOGExLWNkMTE3NWU4MTMwMSIgc3RFdnQ6d2hlbj0iMjAyMS0xMC0xNlQxNjowMDo0MCsxMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MWRlZGVjMC0xZDMxLTJhNDQtYTM0Yi00MTE5YTA5YWVjNWQiIHN0RXZ0OndoZW49IjIwMjEtMTAtMTZUMTg6MDg6MzUrMTE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4xIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6XDWRvAAAHk0lEQVR42u2dT2gXRxTHNwdrmkMahIpiAx4spR5KodhGIxUN5KQiDVQ8SLRq9JaC9YceewmmntKmscU/rdSD4K0XCxYspiAYERR7sYLFFKEoRhs1JjX59PB7W8OvP3dmdmdmZ5N98EDM7syb993329n3byIgKjkcLpVQAlLyXACkCWgF2oAuYB9wEOgDBoEh4UH5v4NyTZfc0wq8WgKSnhcB7UAvcBL4FRgFxjGncbl3GDghY7bLHCUgCfwGsBU4BlwHJnFHkzLHMZlzWQlIlRcC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');
  }

  // ~~~~~~ Setup ~~~~~~
  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    p.smooth();
    p.noStroke();
    for (let i = 0; i < NUM_FLOWERS; i++) {
        let pos = getPos();
        const f = new Flower(
          sampleSize(flowerTypes, 1)[0],
          pos,
          sampleSize(colourCombos, 1)[0],
          );
        f.draw(p);
    }
    // p.saveCanvas(p.canvas, 'myCanvas', 'png');
  }

  // ~~~~~~ Draw ~~~~~~
  p.draw = () => {

  }

  // ~~~~~~ Other commonly used p5 methods
  p.mousePressed = () => {

  }

  p.mouseReleased = () => {

  }

  p.keyPressed = () => {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(Date.now().toString(), 'png')
  }

  p.keyReleased = () => {

  }

  // ~~~~~~ Helper functions ~~~~~~~~~

  function getPos() {
    let isGood = false;
    // get an x and y point at random
    let point;
    while (!isGood) {
      // console.log('while~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      point = p.createVector(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT);
      // get dist to closest edge
      const edgeXDist = point.x < CANVAS_WIDTH / 2 ? point.x : CANVAS_WIDTH - point.x;
      const edgeYDist = point.y < CANVAS_HEIGHT / 2 ? point.y : CANVAS_HEIGHT - point.y;
      if (edgeXDist < edgeYDist && edgeXDist < CANVAS_WIDTH / BORDER_X) {
        isGood = true;
      } else if (edgeYDist < CANVAS_HEIGHT / BORDER_Y) isGood = true;
    }
    // console.log(point);
    return point;
  }

  function stampPeace(p, peaceImage) {
    p.scale((.5 + (Math.random() * .2) - .1)* SCALE_SCALAR);
    p.tint(sampleSize(peaceColours, 1)[0]);
    p.image(peaceImage, 0, 0);
  }

  // ~~~~~~ Classes ~~~~~~~~~~~~

  function FlowerType(size, petalCount, bigMid) {
    this.size = size;
    this.petalCount = petalCount;
    this.bigMid = bigMid;
  }

  function Flower(flowerType, position, cols) {
    this.flowerType = flowerType;
    this.position = position;
    this.size = this.flowerType.size;
    this.rotWedge = Math.PI * 2 / this.flowerType.petalCount;
    this.cols = cols;
    this.petalCount = this.flowerType.petalCount;
  }

  Flower.prototype.draw = function(p) {
    p.push();
    p.translate(this.position.x, this.position.y);
    if (Math.random() < .25) {
      stampPeace(p, peaceImage);
    } else {
      p.fill(this.cols[0]);
      p.scale((.5 + (Math.random() * .2) - .1)*SCALE_SCALAR);
      for (let rot = 0; rot < this.petalCount+1; rot ++) {
        p.triangle(0, 0, -this.size.x/2, -this.size.y, this.size.x/2, -this.size.y);
        p.ellipse(0, -this.size.y, this.size.x * .99);
        p.rotate(this.rotWedge);
      }
      p.fill(this.cols[1]);
      if (this.flowerType.bigMid) {
        p.ellipse(0, 0, this.size.x * 1.5);
      } else {
        p.ellipse(0, 0, this.size.x);
      }
    }
    p.pop();
  }
}
