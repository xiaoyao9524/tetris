import type {
  GameStatus
} from '../../types';

import type {
  GridPoint,
  ToBottomResult
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
 * 初始位置(4, 0)：
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 0 * * * *]
 * 1、[* * * * 0 0 * * * *]
 * 2、[* * * * * * * * * *]
 * 3、[* * * * * * * * * *]
 */

class GridType1 extends FallGrid{
  // 当前坐标
  x: number = 4;
  y: number = 0;

  /**旋转 */
  rotate (): GridPoint[] {
    // 本类型的方块，旋转可以视为无效果
    return this.getCurrentPosition();
  }

  // 获取当前各点坐标
  getCurrentPosition (x: number = this.x, y: number = this.y): GridPoint[] {
    // const {x, y} = this;

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

  /** 检查是否生成成功 */
  checkCreateSuccess (gameStatus: GameStatus): boolean {
    const { x, y } = this;

    const checkPoint1 = gameStatus[y][x];
    const checkPoint2 = gameStatus[y][x + 1];
    const checkPoint3 = gameStatus[y + 1][x];
    const checkPoint4 = gameStatus[y + 1][x + 1];

    return ![checkPoint1, checkPoint2, checkPoint3, checkPoint4].includes(1);
  }

  /** 向下 */
  checkToNextLine (gameStatus: GameStatus, x: number = this.x, y: number = this.y): boolean {
    // 检查是否可以下落
    // const { x, y } = this;

    // 检查是否已到最后一行
    const isLastRow = y + 1 >= gameStatus.length - 1;

    if (isLastRow) {
      return false;
    }

    const checkPoint1 = gameStatus[y + 2][x];
    const checkPoint2 = gameStatus[y + 2][x + 1];

    return ![checkPoint1, checkPoint2].includes(1);
  }

  toNextLine (gameStatus: GameStatus): GridPoint[] | null {
    if (this.checkToNextLine(gameStatus)) {
      this.y++;

      return this.getCurrentPosition();
    }

    return null;
  }
  
  /** 向左移动 */
  //  检查左右其实也不能这么简单，还需要判断当前块左右是否有其他块挡着
  checkToLeft (gameStatus: GameStatus): boolean {
    const { x, y } = this;
    // 首先检查是否已经在最左边了
    const isLeftmost = x === 0;
    if (isLeftmost) {
      return false;
    }
    
    // 检查左边有无物体
    const checkPoint1 = gameStatus[y][x - 1];
    const checkPoint2 = gameStatus[y + 1][x - 1];

    return ![checkPoint1, checkPoint2].includes(1);
  }

  toLeft (gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToLeft = this.checkToLeft(gameStatus);
    if (!isAllowToLeft) {
      return null;
    }
    
    this.x--;

    return this.getCurrentPosition();
  }

  /** 向右移动 */
  checkToRight (gameStatus: GameStatus): boolean {
    const { x, y } = this;
    // 首先检查是否已经在最右侧了
    const gameWidth = gameStatus[0].length;

    const isRightmost = x >= gameWidth - 2;

    if (isRightmost) {
      return false;
    }

    // 检查右侧是否有物体
    const checkPoint1 = gameStatus[y][x + 2];
    const checkPoint2 = gameStatus[y + 1][x + 2];

    return ![checkPoint1, checkPoint2].includes(1);
  }

  toRight (gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToRight = this.checkToRight(gameStatus);

    if (!isAllowToRight) {
      return null;
    }
    this.x++;

    return this.getCurrentPosition();
  }

  /** 去最底部 */
  toBottom (gameStatus: GameStatus): ToBottomResult {
    let { x, y } = this;
    let currentPoints = this.getCurrentPosition(x, y);

    let allowToNextLine = this.checkToNextLine(gameStatus, x, y);

    while (allowToNextLine) {
      y++;
      currentPoints = this.getCurrentPosition(x, y);
      allowToNextLine = this.checkToNextLine(gameStatus, x, y)
    }

    const ret = {
      points: currentPoints,
      x,
      y
    }

    this.x = x;
    this.y = y;

    console.log(ret);

    return ret;
  }
  
  /** 获取预览数据 */
  getPreview () {
    return [
      [0, 1, 1, 0],
      [0, 1, 1, 0]
    ]
  }
}

export default GridType1;