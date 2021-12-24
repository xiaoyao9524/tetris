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
 * 类型1
 *     **
 *     **
 */

/**
 * 初始位置：
 * [* * * * 0 0 * * * *]
 * [* * * * 0 0 * * * *]
 */

class GridType1 extends FallGrid{
  constructor () {
    super();
  }
  // 当前坐标
  x: number = 4;
  y: number = 0;

  checkToNextLine (gameStatus: GameStatus): boolean {
    // 检查下方有无阻挡
    const { x, y } = this;

    const checkPoint1 = gameStatus[x][y + 2];
    const checkPoint2 = gameStatus[x + 1][y + 2];

    return ![checkPoint1, checkPoint2].includes(1);
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

  toNextLine (): GridPoint[] | null {
    if (this.checkToNextLine()) {
      this.y++;

      return this.getCurrentPosition();
    }

    return null;
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