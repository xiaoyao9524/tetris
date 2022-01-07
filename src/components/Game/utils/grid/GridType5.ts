import type {
  GridStatus,
  GameStatus
} from '../../types';

import type {
  GridPoint
} from './GridType';

import {
  FallGrid
} from './GridType';

/**
 * 类型5
 *      *
 *     ***
 * 以中心点为基准
 */

/**
 * 普通角度(x: 4, y: 1)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * 0 0 0 * * * *]
 * 2、[* * * * * * * * * *]
 * x y
 * 4 1
 * 3 2 p1
 * 4 2 p2
 * 5 2 p3
 * 
 * 90度(x: 4, y: 1)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * * 0 0 * * * *]
 * 2、[* * * * 0 * * * * *]
 * 3、[* * * * * * * * * *]
 * 
 * 180度(x: 4, y: 1)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * * * * * * *]
 * 1、[* * * 0 0 0 * * * *]
 * 2、[* * * * 0 * * * * *]
 * 3、[* * * * * * * * * *]
 *
 * 270度(x: 4, y: 1)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * 0 0 * * * * *]
 * 2、[* * * * 0 * * * * *]
 * 3、[* * * * * * * * * *]
 * x y
 * 4 1
 * 3 2 p1
 * 4 3 p2
 */

/**
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * * * * * * *]
 * 1、[* * * * 0 * * * * *]
 * 2、[* * * 0 0 0 * * * *]
 * 3、[* * * * * * * * * *]
 * 
 * 
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * * * * * * *]
 * 1、[* * * * 0 * * * * *]
 * 2、[* * * * 0 0 * * * *]
 * 3、[* * * * 0 * * * * *]
 */

class GridType4 extends FallGrid {
  // 初始坐标(以中心点为初始坐标)
  x: number = 4;
  y: number = 1;

  /**
   * 当前角度
   * 0、90、180、270
   */
  private angle: number = 0;

  // 检查是否可以旋转
  checkToRotate(gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const gameHeight = gameStatus.length - 1;

    // 如果中心点已经到了最后一行，那么不允许旋转
    if (y >= gameHeight) {
      return false;
    }

    // 如果中心点在最左侧或最右侧也不允许旋转
    if (x <= 0 || x >= gameStatus[0].length - 1) {
      return false;
    }

    let checkList: GridStatus[] = [];

    switch (angle) {
      case 0: {
        const checkPoint1 = gameStatus[y + 1][x];

        checkList = [checkPoint1];
        break;
      }
      case 90: {
        const checkPoint1 = gameStatus[y][x - 1];

        checkList = [checkPoint1];
        break;
      }
      case 180: {
        const checkPoint1 = gameStatus[y][x - 1];

        checkList = [checkPoint1];
        break;
      }
      case 270: {
        const checkPoint1 = gameStatus[y][x + 1];

        checkList = [checkPoint1];
        break;
      }
    }

    return !checkList.includes(1);
  }

  rotate(gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToRotate = this.checkToRotate(gameStatus);

    if (!isAllowToRotate) {
      return null;
    }

    const { angle } = this;

    const newAngle = ((((angle + 90) / 90) % 4) * 90);

    this.angle = newAngle;

    return this.getCurrentPosition();
  }

  getCurrentPosition(): GridPoint[] {
    const { x, y, angle } = this;

    let ret: GridPoint[] = [];

    switch (angle) {
      case 0: {
        const point1 = {
          x,
          y: y - 1
        };
        const point2 = {
          x: x - 1,
          y
        };
        const point3 = {
          x,
          y
        };
        const point4 = {
          x: x + 1,
          y
        };
        ret = [point1, point2, point3, point4];
        break;
      }
      case 90: {
        const point1 = {
          x,
          y: y - 1
        };
        const point2 = {
          x,
          y
        };
        const point3 = {
          x: x + 1,
          y
        };
        const point4 = {
          x,
          y: y + 1
        };
        ret = [point1, point2, point3, point4];
        break;
      }
      case 180: {
        const point1 = {
          x: x - 1,
          y
        };
        const point2 = {
          x,
          y
        };
        const point3 = {
          x: x + 1,
          y
        };
        const point4 = {
          x,
          y: y + 1
        };
        ret = [point1, point2, point3, point4];
        break;
      }
      case 270: {
        const point1 = {
          x,
          y: y - 1
        };
        const point2 = {
          x: x - 1,
          y
        };
        const point3 = {
          x,
          y
        };
        const point4 = {
          x,
          y: y + 1
        };
        ret = [point1, point2, point3, point4];
        break;
      }
    }

    return ret;
  }

  checkCreateSuccess(gameStatus: GameStatus): boolean {
    const { x, y } = this;

    const checkPoint1 = gameStatus[y - 1][x];
    const checkPoint2 = gameStatus[y][x - 1];
    const checkPoint3 = gameStatus[y][x];
    const checkPoint4 = gameStatus[y][x + 1];

    return ![checkPoint1, checkPoint2, checkPoint3, checkPoint4].includes(1);
  }

  checkToNextLine(gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const gameHeight = gameStatus.length - 1;

    // 检查是否到底了
    const isHeightmost = y >= gameHeight - (angle === 0 ? 0 : 1);

    if (isHeightmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    switch (angle) {
      case 0: {
        const checkPoint1 = gameStatus[y + 1][x - 1];
        const checkPoint2 = gameStatus[y + 1][x];
        const checkPoint3 = gameStatus[y + 1][x + 1];

        checkPointList = [checkPoint1, checkPoint2, checkPoint3];
        break
      }
      case 90: {
        const checkPoint1 = gameStatus[y + 2][x];
        const checkPoint2 = gameStatus[y + 1][x + 1];

        checkPointList = [checkPoint1, checkPoint2];
        break
      }
      case 180: {
        const checkPoint1 = gameStatus[y + 1][x - 1];
        const checkPoint2 = gameStatus[y + 2][x];
        const checkPoint3 = gameStatus[y + 1][x + 1];

        checkPointList = [checkPoint1, checkPoint2, checkPoint3];
        break
      }
      case 270: {
        const checkPoint1 = gameStatus[y + 1][x - 1];
        const checkPoint2 = gameStatus[y + 2][x];

        checkPointList = [checkPoint1, checkPoint2];
        break
      }
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

    let isLeftmost = false;

    switch (angle) {
      case 0:
      case 180:
      case 270:
        isLeftmost = x <= 1;
        break;
      default:
        isLeftmost = x <= 0;
    }

    if (isLeftmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      // 竖
      const checkPoint1 = gameStatus[y][x - 1];
      const checkPoint2 = gameStatus[y + 1][x - 1];
      const checkPoint3 = gameStatus[y + 2][x - 1];
      const checkPoint4 = gameStatus[y + 3][x - 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3, checkPoint4];
    } else {
      // 横
      const checkPoint1 = gameStatus[y][x - 1];

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
      isRightmost = x >= gameWidth - 3;
    }

    if (isRightmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      // 竖
      const checkPoint1 = gameStatus[y][x + 1];
      const checkPoint2 = gameStatus[y + 1][x + 1];
      const checkPoint3 = gameStatus[y + 2][x + 1];
      const checkPoint4 = gameStatus[y + 3][x + 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3, checkPoint4];
    } else {
      // 横
      const checkPoint1 = gameStatus[y][x + 4];

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

  /** 获取预览数据 */
  getPreview() {
    return [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
    ]
  }
}

export default GridType4;