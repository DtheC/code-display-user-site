import p5 from 'p5';

export class Cell {
  constructor(p, coordinates, size, colour) {
    this.position = coordinates;
    this.size = size;
    this.colour = colour ? colour : p.color(Math.random() * 255);
    this.initVariables();
  }

  initVariables() {
    // Nothing
  }

  draw(p) {
    p.fill(this.colour);
    p.rect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}

export class CellRound extends Cell {
  draw(p) {
    p.fill(this.colour);
    p.ellipse(this.position.x + (this.size.x / 2), this.position.y + (this.size.y / 2), this.size.x, this.size.y);
  }
}

export class CellOutline extends Cell {
  initVariables() {
    this.rotation = 0;
  }

  draw(p) {
    // console.log(this.rotation);
    if (this.size.x > 4) {
      p.fill(0, 0);
      p.stroke(this.colour);
      let strokeSize = this.size.x / 10;
      if (strokeSize < 1) strokeSize = 1;
      p.strokeWeight(strokeSize);
      p.push();
      p.translate(this.position.x + (this.size.x / 2), this.position.y + (this.size.y / 2));
      p.rotate(this.rotation);
      p.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
      p.line(-this.size.x / 2, -this.size.y / 2, this.size.x / 2, this.size.y / 2);
      p.pop();
    }
  }
}

export class CellStrikeThrough extends Cell {
  initVariables() {
    this.rotation = 0;
  }

  draw(p) {
    p.strokeCap(p.SQUARE);
    // console.log(this.rotation);
    if (this.size.x > 4) {
      p.fill(0, 0);
      p.stroke(this.colour);
      let strokeSize = this.size.x / 5;
      if (strokeSize < 1) strokeSize = 1;
      p.strokeWeight(strokeSize);
      p.push();
      p.translate(this.position.x + (this.size.x / 2), this.position.y + (this.size.y / 2));
      p.rotate(this.rotation);
      // rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
      p.line(-this.size.x / 2, -this.size.y / 2, this.size.x / 2, this.size.y / 2);
      p.pop();
    }
  }
}

export class Cell3D extends Cell {
  draw(p) {
    // this.colour.setAlpha(255);
    p.fill(this.colour);
    p.stroke(this.colour);
    p.strokeWeight(10);
    p.line(this.position.x, this.position.y, this.position.z, this.position.x + this.size.x, this.position.y + this.size.y, this.position.z + this.size.z);
  }
}

export class CellBox3D extends Cell {
  draw(p) {
    // this.colour.setAlpha(200);
    p.fill(this.colour);
    // noStroke();
    p.push();
    p.translate(this.position.x, this.position.y, this.position.z);
    p.box(this.size.x, this.size.y, this.size.z);
    p.pop();
  }
}

export class CellSphere3D extends Cell {
  draw(p) {
    // this.colour.setAlpha(200);
    p.fill(this.colour);
    // noStroke();
    p.push();
    p.translate(this.position.x, this.position.y, this.position.z);
    p.sphere(this.size.x);
    p.pop();
  }
}

export class CellCone3D extends Cell {
  draw(p) {
    // this.colour.setAlpha(200);
    p.fill(this.colour);
    // noStroke();
    p.push();
    p.translate(this.position.x, this.position.y, this.position.z);
    p.cone(this.size.x, this.size.y);
    p.pop();
  }
}

export class CellSplitTone extends Cell {
  initVariables(colour1, colour2, split1, split2, rotation) {
    this.colour = colour1;
    this.colourBase = colour2;
    this.split1 = this.size.x * split1;
    this.split2 = this.size.x * split2;
    this.rotation = rotation;
  }

  draw(p) {
    p.push();
    p.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2, this.position.x);
    p.rotate(this.rotation);
    p.fill(this.colourBase);
    p.rect(-this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
    p.fill(this.colour);
    p.beginShape();
    p.vertex((-this.size.x / 2) + this.split1, -this.size.y / 2);
    p.vertex(this.size.x / 2, -this.size.y / 2);
    p.vertex(this.size.x / 2, this.size.y / 2);
    p.vertex((-this.size.x /2) + this.split2, this.size.y / 2);
    p.endShape();
    p.pop();
  }
}

export class CellSplitToneFade extends Cell {
  initVariables(colours, split1, split2, rotation) {
    this.colours = colours;
    this.split1 = this.size.x * split1;
    this.split2 = this.size.x * split2;
    this.rotation = rotation;
    // if (this.colourBase) this.colourBase.setAlpha(20);
    // if (this.colour) this.colour.setAlpha(20);
  }

  draw(p) {
    p.push();
    p.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
    p.rotate(this.rotation);
    // fill(this.colours[0]);
    // fill(random(0, 255));
    // rect(-this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
    p.fill(this.colours[1]);
    this.drawWithOffset(p5, 0);
    p.fill(this.colours[2]);
    this.drawWithOffset(p5, 4);
    p.fill(this.colours[3]);
    this.drawWithOffset(p5, 8);
    p.fill(this.colours[4]);
    this.drawWithOffset(p5, 12);
    p.pop();
  }

  drawWithOffset(p, offset) {
    p.beginShape();
    p.vertex((-this.size.x / 2) + this.split1 + offset, -this.size.y / 2);
    p.vertex(this.size.x / 2, -this.size.y / 2);
    p.vertex(this.size.x / 2, this.size.y / 2);
    p.vertex((-this.size.x /2) + this.split2 + offset, this.size.y / 2);
    p.endShape();
  }
}