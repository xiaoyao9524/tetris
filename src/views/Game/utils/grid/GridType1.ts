import type {
  GameStatus
} from '../../types';

import type {
  GridPoint
} from './GridType';

import {
  BaseGrid
} from './GridType';

/**
 * 类型1
 *     **
 *     **
 */

class GridType1 extends BaseGrid{
  constructor (x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
  // 当前坐标
  x: number;
  y: number;

  checkNextLine (gameStatus: GameStatus): boolean {
    return true
  }

  toNextLine (): GridPoint[] {
    this.y++;

    return this.getCurrentPosition();
  }

  toLeft (): GridPoint[] {
    this.x--;

    return this.getCurrentPosition();
  }

  toRight (): GridPoint[] {
    this.x++;

    return this.getCurrentPosition();
  }

  private getCurrentPosition (): GridPoint[] {
    const {x, y} = this;
    const point1: GridPoint = {
      x,
      y
    }

    const point2: GridPoint = {
      x: x + 1,
      y
    }
    const point3: GridPoint = {
      x,
      y: y + 1
    }

    const point4: GridPoint = {
      x: x + 1,
      y: y + 1
    }

    return [point1, point2, point3, point4];
  }
}

export default GridType1;