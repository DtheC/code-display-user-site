// Originally from: https://github.com/doubledherin/gatsby-p5-starter
// This instance of p5 is for using static methods, which for some reason are not available on the 'p' instance.
// If you need it, uncomment it.
// import p5 from '../p5.min';

import {countBy, flow, sampleSize} from 'lodash';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const NUM_FLOWERS = 25;
const X_MIN = 35;
const X_MAX = 1;
const Y_MIN = 60;
const Y_MAX = 1;

// const colours = ['#e3a424', '#5f8b81', '#dd520f', '#ea491d', '#b2471e', '#b7441b'];
// const colours = ['#ffc444', '#df4826', '#4aa9ab'];

const colourCombos = [
  ['#df4826', '#ffc444'], // Red yellow mid
  ['#ffc444', '#df4826'], // Yellow red mid
  ['#4aa9ab', '#ffc444'], // Blue yellow mid
];
const petalCountsStyle1 = [8];
const petalCountsStyle2 = [6, 7, 9];

// The basic idea here is that you'll need to use the `p` namespace to access
// all non-static p5 methods and variables here. Any static methods need to be accessed with the p5 namespace (imported above).
export default function sketch(p) {

  // ~~~~~~ Initialize variables ~~~~~~~~~
  // const f = new Flower(p.createVector(200, 200), p.createVector(50, 100), sampleSize(colours, 2));
  const flowerTypes = [];
  for (let i = 0; i < 5; i++) { // Style 2
    flowerTypes.push(new FlowerType(
      p.createVector(Math.random() * 1 + 30, Math.random() * 1 + 25),
      sampleSize(petalCountsStyle2, 1)[0],
      Math.random() < 0.5
    ));

    flowerTypes.push(new FlowerType( // Style 1
      p.createVector(Math.random() * X_MAX + X_MIN, Math.random() * Y_MAX + Y_MIN), // Size
      sampleSize(petalCountsStyle1, 1)[0],
      Math.random() < 0.5
    ));
  }

  

  // ~~~~~~ React lifecycle methods ~~~~~~
  p.preload = () => {

  }

  // ~~~~~~ Setup ~~~~~~
  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    // f.draw(p);
    for (let i = 0; i < NUM_FLOWERS; i++) {
      const f = new Flower(
        sampleSize(flowerTypes, 1)[0],
        p.createVector(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT), // Pos
        sampleSize(colourCombos, 1)[0],
        ); // Col
      f.draw(p);
    }
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
    p.smooth();
    p.noStroke();
    p.push();
    // p.stroke(p.color(0));
    p.fill(this.cols[0]);
    p.translate(this.position.x, this.position.y);
    p.scale(1 + (Math.random() * .2) - .1);
    for (let rot = 0; rot < this.petalCount+1; rot ++) {
      p.triangle(0, 0, -this.size.x/2, -this.size.y, this.size.x/2, -this.size.y);
      p.ellipse(0, -this.size.y, this.size.x * .99);
      // p.line(0, 0, 0, -this.size.y / 2);
      p.rotate(this.rotWedge);
    }
    p.fill(this.cols[1]);
    if (this.flowerType.bigMid) {
      p.ellipse(0, 0, this.size.x * 1.5);
    } else {
      p.ellipse(0, 0, this.size.x);
    }
    // p.rotate(this.rotation);
    // rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    // p.line(-this.size.x / 2, -this.size.y / 2, this.size.x / 2, this.size.y / 2);
    p.pop();
    p.noSmooth();
  }
}
