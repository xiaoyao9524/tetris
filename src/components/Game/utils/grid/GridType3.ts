import type {
  GridStatus,
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
 * 类型3
 *      **
 *     **
 */

/**
 * 初始位置(x: 4, y: 1)：
 * 普通角度
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 0 * * * *]
 * 1、[* * * 0 0 * * * * *]
 * 2、[* * * * * * * * * *]
 * 3、[* * * * * * * * * *]
 * 
 * 180度
 * *   0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * * 0 0 * * * *]
 * 2、[* * * * * 0 * * * *]
 * 3、[* * * * * * * * * *]
 */

class GridType3 extends FallGrid{
  // 当前坐标
  x: number = 4;
  y: number = 1;

  /**
   * 当前角度
   * 0   为普通
   * 180 为竖起来
   */
  private angle: number = 0;

  getCurrentPosition (x: number = this.x, y: number = this.y): GridPoint[] {
    const { angle } = this;

    let ret: GridPoint[] = [];

    if (angle === 0) {
      // 普通
      const point1: GridPoint = {
        x,
        y: y - 1
      }
  
      const point2: GridPoint = {
        x: x + 1,
        y: y - 1
      }
      const point3: GridPoint = {
        x: x - 1,
        y
      }
  
      const point4: GridPoint = {
        x,
        y
      }

      ret = [point1, point2, point3, point4];
    } else {
      // 竖起来
      const point1: GridPoint = {
        x,
        y: y - 1
      }
  
      const point2: GridPoint = {
        x,
        y
      }

      const point3: GridPoint = {
        x: x + 1,
        y
      }

      const point4: GridPoint = {
        x: x + 1,
        y: y + 1
      }

      ret = [point1, point2, point3, point4];
    }

    return ret;
  }

  checkCreateSuccess (gameStatus: GameStatus): boolean {
    const { x, y } = this;

    const checkPoint1 = gameStatus[y - 1][x];
    const checkPoint2 = gameStatus[y - 1][x + 1];
    const checkPoint3 = gameStatus[y][x - 1];
    const checkPoint4 = gameStatus[y][x];

    return ![checkPoint1, checkPoint2, checkPoint3, checkPoint4].includes(1);
  }

  checkToNextLine (gameStatus: GameStatus, x: number = this.x, y: number = this.y): boolean {
    const { angle } = this;

    let checkPointList: GridStatus[] = [];

    const gameHeight = gameStatus.length - 1;

    const isNormalAngle = angle === 0;

    // 检查是否到底了
    const isHeightmost = y >= gameHeight - (isNormalAngle ? 0 : 1);

    if (isHeightmost) {
      return false;
    }

    if (isNormalAngle) {
      // 普通
      const checkPoint1 = gameStatus[y + 1][x - 1];
      const checkPoint2 = gameStatus[y + 1][x];
      const checkPoint3 = gameStatus[y][x + 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3];
    } else {
      // 竖版
      const checkPoint1 = gameStatus[y + 1][x];
      const checkPoint2 = gameStatus[y + 2][x + 1];

      checkPointList = [checkPoint1, checkPoint2];
    }

    return !checkPointList.includes(1);
  }

  toNextLine (gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToNext = this.checkToNextLine(gameStatus);

    if (!isAllowToNext) {
      return null;
    }
    this.y++;

    return this.getCurrentPosition();
  }

  checkToLeft (gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const isLeftmost = x <= (angle === 0 ? 1 : 0);

    if (isLeftmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      // 普通
      const checkPoint1 = gameStatus[y - 1][x - 1];
      const checkPoint2 = gameStatus[y][x - 2];

      checkPointList = [checkPoint1, checkPoint2];
    } else {
      // 竖着
      const checkPoint1 = gameStatus[y - 1][x - 1];
      const checkPoint2 = gameStatus[y][x - 1];
      const checkPoint3 = gameStatus[y + 1][x];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3];
    }
    return !checkPointList.includes(1);
  }

  toLeft (gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToLeft = this.checkToLeft(gameStatus);

    if (!isAllowToLeft) {
      return null;
    }

    this.x--;

    return this.getCurrentPosition();
  }

  checkToRight (gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const gameWidth = gameStatus[0].length - 1;

    let isRightmost = false;

    isRightmost = x >= gameWidth - 1;

    if (isRightmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      const checkPoint1 = gameStatus[y - 1][x + 2];
      const checkPoint2 = gameStatus[y][x + 1];

      checkPointList = [checkPoint1, checkPoint2];
    } else {
      const checkPoint1 = gameStatus[y - 1][x + 1];
      const checkPoint2 = gameStatus[y][x + 2];
      const checkPoint3 = gameStatus[y + 1][x + 2];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3];
    }

    return !checkPointList.includes(1);
  }

  toRight (gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToRight = this.checkToRight(gameStatus);
    
    if (!isAllowToRight) {
      return null;
    }

    this.x++;

    return this.getCurrentPosition();
  }

  checkAllowRotate (gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const isNormalAngle = angle === 0;

    const gameHeight = gameStatus.length - 1;

    // 是否已经落到最下方
    const isDown = y >= gameHeight - (isNormalAngle ? 0 : 1)

    // 如果竖着并且在最左侧，那么无法旋转
    if (x <= 0 && !isNormalAngle) {
      return false
    }

    // 如果横着并且到底，那么无法旋转
    if (isNormalAngle && isDown) {
      return false;
    }

    let checkList: GridStatus[] = [];

    if (isNormalAngle) {
      // 普通转竖
      const checkPoint1 = gameStatus[y - 1][x - 1];
      const checkPoint2 = gameStatus[y][x + 1];
      const checkPoint3 = gameStatus[y + 1][x + 1];

      checkList = [checkPoint1, checkPoint2, checkPoint3];
    } else {
      // 竖转普通
      const checkPoint1 = gameStatus[y - 1][x - 1];
      const checkPoint2 = gameStatus[y][x - 1];
      const checkPoint3 = gameStatus[y - 1][x + 1];
      
      checkList = [checkPoint1, checkPoint2, checkPoint3];
    }

    return !checkList.includes(1);
  }

  rotate(gameStatus: GameStatus): GridPoint[] | null {
    const isAllowRotate = this.checkAllowRotate(gameStatus);

    if (!isAllowRotate) {
      return null
    }
    const angle = ((this.angle / 180 + 1) % 2) * 180;

    this.angle = angle;

    return this.getCurrentPosition();
  }

  /** 去最底部 */
  toBottom(gameStatus: GameStatus): ToBottomResult {
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

    return ret;
  }

  /** 获取预览数据 */
  getPreview () {
    return [
      [0, 1, 1],
      [1, 1, 0]
    ]
  }
}

export default GridType3;