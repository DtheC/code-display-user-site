// ░▒▒▓▓▓▓░▒▒▓▓▓▓░▒▒▓▓▓▓░▒▒▓▓▓▓
import * as React from 'react';
import {line} from './design-line.module.css';

const DesignLine = () => {
  const designElems = ['░', '▒', '▓', '░░', '▒▒', '▓▓'];
  const getLine = () => {
    let s = '';
    for (let i = 0; i < 500; i++) {
      s += designElems[Math.floor(Math.random() * designElems.length)];
    }
    return s;
  }
  return (
    <div className={line}>
      {getLine()}
    </div>
  )
}

export {DesignLine};
