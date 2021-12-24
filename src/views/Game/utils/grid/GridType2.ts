import type {
  GameStatus
} from '../../types';

import type {
  GridPoint
} from './GridType';

import {
  FallGrid
} from './GridType';

/**
 * 类型2
 *     **
 *      **
 */

/**
 * 初始位置：
 * [* * * 0 0 * * * * *]
 * [* * * * 0 0 * * * *]
 */

class GridType1 extends FallGrid{
  constructor () {
    super();
  }
  // 当前坐标
  x: number = 3;
  y: number = 0;

  checkToNextLine (gameStatus: GameStatus): boolean {

    
    return true
  }
  
  /**
   * 检查左右其实也不能这么简单，还需要判断当前块左右是否有其他块挡着
   */
  checkToLeft (): boolean {
    return this.x > 0;
  }

  checkToRight (gameStatus: GameStatus): boolean {
    const gameWidth = gameStatus[0].length;

    return this.x < gameWidth;
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

  getCurrentPosition (): GridPoint[] {
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