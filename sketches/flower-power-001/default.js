// Originally from: https://github.com/doubledherin/gatsby-p5-starter
// This instance of p5 is for using static methods, which for some reason are not available on the 'p' instance.
// If you need it, uncomment it.
// import p5 from '../p5.min';

import {sampleSize} from 'lodash';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const NUM_FLOWERS = 5;
const X_MIN = 20;
const X_MAX = 50;
const Y_MIN = 50;
const Y_MAX = 100;

const colours = ['#e3a424', '#5f8b81', '#dd520f', '#ea491d', '#b2471e', '#b7441b'];

// The basic idea here is that you'll need to use the `p` namespace to access
// all non-static p5 methods and variables here. Any static methods need to be accessed with the p5 namespace (imported above).
export default function sketch(p) {

  // ~~~~~~ Initialize variables ~~~~~~~~~
  // const f = new Flower(p.createVector(200, 200), p.createVector(50, 100), sampleSize(colours, 2));

  // ~~~~~~ React lifecycle methods ~~~~~~
  p.preload = () => {

  }

  // ~~~~~~ Setup ~~~~~~
  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    // f.draw(p);
    for (let i = 0; i < NUM_FLOWERS; i++) {
      const f = new Flower(p.createVector(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT), p.createVector(Math.random() * X_MAX + X_MIN, Math.random() * Y_MAX + Y_MIN), sampleSize(colours, 2));
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
  function Flower(position, size, cols) {
    this.position = position;
    this.size = size;
    this.rotWedge = Math.PI * 2 / 9;
    this.cols = cols;
  }

  Flower.prototype.draw = function(p) {
    p.smooth();
    p.noStroke();
    p.push();
    // p.stroke(p.color(0));
    p.fill(this.cols[0]);
    p.translate(this.position.x, this.position.y);
    for (let rot = 0; rot < 10; rot ++) {
      p.triangle(0, 0, -this.size.x/2, -this.size.y, this.size.x/2, -this.size.y);
      p.ellipse(0, -this.size.y, this.size.x * .99);
      // p.line(0, 0, 0, -this.size.y / 2);
      p.rotate(this.rotWedge);
    }
    p.fill(this.cols[1]);
    p.ellipse(0, 0, this.size.x);
    // p.rotate(this.rotation);
    // rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    // p.line(-this.size.x / 2, -this.size.y / 2, this.size.x / 2, this.size.y / 2);
    p.pop();
    p.noSmooth();
  }
}
