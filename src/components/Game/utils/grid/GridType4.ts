import type { GridStatus, GameStatus } from '../../types';

import type { GridPoint, ToBottomResult } from './GridType';

import { FallGrid } from './GridType';

/**
 * 类型4
 *      *
 *      *
 *      *
 *      *
 */

/**
 * 初始位置(x: 4, y: 1)：
 * 普通角度
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * * 0 * * * * *]
 * 2、[* * * * 0 * * * * *]
 * 3、[* * * * 0 * * * * *]
 * 4、[* * * * * * * * * *]
 * x y
 * 4 1
 *
 * 5 0
 * 5 1
 * 5 2
 * 5 3
 *
 * 180度(x: 4, y: 1)
 * *   0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * * * * * * *]
 * 1、[* * 0 0 0 0 * * * *]
 * 2、[* * * * * * * * * *]
 * 3、[* * * * * * * * * *]
 * x y
 * 4 1
 *
 * 2 2
 * 3 2
 * 4 2
 * 5 2
 *
 */

class GridType4 extends FallGrid {
  // 初始坐标
  x: number = 4;
  y: number = 1;

  /**
   * 当前角度
   * 0   为竖
   * 180 为横
   */
  private angle: number = 0;

  getCurrentPosition(x: number = this.x, y: number = this.y): GridPoint[] {
    const { angle } = this;

    let ret: GridPoint[] = [];

    if (angle === 0) {
      // 竖
      const point1: GridPoint = {
        x,
        y: y - 1,
      };

      const point2: GridPoint = {
        x,
        y,
      };
      const point3: GridPoint = {
        x,
        y: y + 1,
      };

      const point4: GridPoint = {
        x,
        y: y + 2,
      };

      ret = [point1, point2, point3, point4];
    } else {
      // 横
      const point1: GridPoint = {
        x: x - 2,
        y,
      };

      const point2: GridPoint = {
        x: x - 1,
        y,
      };

      const point3: GridPoint = {
        x,
        y,
      };

      const point4: GridPoint = {
        x: x + 1,
        y,
      };

      ret = [point1, point2, point3, point4];
    }

    return ret;
  }

  // 检查是否可以旋转
  checkToRotate(gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const gameWidth = gameStatus[0].length - 1;

    const isHorizontal = angle === 0;

    const isLeftmost = x <= 1;

    if (isLeftmost) {
      return false;
    }

    const isRightmost = x >= gameWidth;

    if (isRightmost) {
      return false;
    }

    let checkList = [];

    if (!isHorizontal) {
      // 横，要转成竖
      const checkPoint1 = gameStatus[y + 1][x - 2];
      const checkPoint2 = gameStatus[y + 2][x - 1];
      const checkPoint3 = gameStatus[y - 1][x];
      const checkPoint4 = gameStatus[y - 1][x + 1];
      const checkPoint5 = gameStatus[y + 1][x - 1];
      const checkPoint6 = gameStatus[y + 1][x];
      const checkPoint7 = gameStatus[y + 2][x];

      checkList = [
        checkPoint1,
        checkPoint2,
        checkPoint3,
        checkPoint4,
        checkPoint5,
        checkPoint6,
        checkPoint7,
      ];
    } else {
      // 竖，要转成横
      const checkPoint1 = gameStatus[y + 2][x - 1];
      const checkPoint2 = gameStatus[y + 1][x - 2];
      const checkPoint3 = gameStatus[y + 1][x - 1];
      const checkPoint4 = gameStatus[y][x - 1];
      const checkPoint5 = gameStatus[y][x - 2];
      const checkPoint6 = gameStatus[y - 1][x + 1];
      const checkPoint7 = gameStatus[y][x + 1];

      checkList = [
        checkPoint1,
        checkPoint2,
        checkPoint3,
        checkPoint4,
        checkPoint5,
        checkPoint6,
        checkPoint7,
      ];
    }

    return !checkList.includes(1);
  }

  rotate(gameStatus: GameStatus): GridPoint[] | null {
    if (!this.checkToRotate(gameStatus)) {
      return null;
    }

    const angle = ((this.angle / 180 + 1) % 2) * 180;

    this.angle = angle;

    return this.getCurrentPosition();
  }

  checkCreateSuccess(gameStatus: GameStatus): boolean {
    const { x, y } = this;

    const checkPoint1 = gameStatus[y - 1][x];
    const checkPoint2 = gameStatus[y][x];
    const checkPoint3 = gameStatus[y + 1][x];
    const checkPoint4 = gameStatus[y + 2][x];

    return ![checkPoint1, checkPoint2, checkPoint3, checkPoint4].includes(1);
  }

  checkToNextLine(gameStatus: GameStatus, x: number = this.x, y: number = this.y): boolean {
    const { angle } = this;

    let checkPointList: GridStatus[] = [];

    const gameHeight = gameStatus.length - 1;

    const isNormalAngle = angle === 0;

    // 检查是否到底了
    const isHeightmost = y >= gameHeight - (isNormalAngle ? 2 : 0);

    if (isHeightmost) {
      return false;
    }

    if (isNormalAngle) {
      // 竖
      const checkPoint1 = gameStatus[y + 3][x];

      checkPointList = [checkPoint1];
    } else {
      // 横
      const checkPoint1 = gameStatus[y + 1][x - 2];
      const checkPoint2 = gameStatus[y + 1][x - 1];
      const checkPoint3 = gameStatus[y + 1][x];
      const checkPoint4 = gameStatus[y + 1][x + 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3, checkPoint4];
    }

    return !checkPointList.includes(1);
  }

  toNextLine(gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToNext = this.checkToNextLine(gameStatus);

    if (!isAllowToNext) {
      return null;
    }
    this.y++;

    return this.getCurrentPosition();
  }

  checkToLeft(gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const isLeftmost = x <= (angle === 0 ? 0 : 2);

    if (isLeftmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      // 竖
      const checkPoint1 = gameStatus[y - 1][x - 1];
      const checkPoint2 = gameStatus[y][x - 1];
      const checkPoint3 = gameStatus[y + 1][x - 1];
      const checkPoint4 = gameStatus[y + 2][x - 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3, checkPoint4];
    } else {
      // 横
      const checkPoint1 = gameStatus[y][x - 3];

      checkPointList = [checkPoint1];
    }
    return !checkPointList.includes(1);
  }

  checkToRight(gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const gameWidth = gameStatus[0].length - 1;

    let isRightmost = false;

    if (angle === 0) {
      // 竖
      isRightmost = x >= gameWidth;
    } else {
      // 横
      isRightmost = x >= gameWidth - 1;
    }

    if (isRightmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      // 竖
      const checkPoint1 = gameStatus[y - 1][x + 1];
      const checkPoint2 = gameStatus[y][x + 1];
      const checkPoint3 = gameStatus[y + 1][x + 1];
      const checkPoint4 = gameStatus[y + 2][x + 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3, checkPoint4];
    } else {
      // 横
      const checkPoint1 = gameStatus[y][x + 2];

      checkPointList = [checkPoint1];
    }

    return !checkPointList.includes(1);
  }

  toLeft(gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToLeft = this.checkToLeft(gameStatus);

    if (!isAllowToLeft) {
      return null;
    }

    this.x--;

    return this.getCurrentPosition();
  }

  toRight(gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToRight = this.checkToRight(gameStatus);

    if (!isAllowToRight) {
      return null;
    }

    this.x++;

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
  getPreview() {
    return [
      [1],
      [1],
      [1],
      [1],
    ];
  }
}

export default GridType4;
