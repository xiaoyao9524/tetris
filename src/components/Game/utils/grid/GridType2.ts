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
 * 类型2
 *     **
 *      **
 */

/**
 * 初始位置(4, 1)：
 * 普通角度
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * 0 0 * * * * *]
 * 1、[* * * * 0 0 * * * *]
 * 2、[* * * * * * * * * *]
 * 3、[* * * * * * * * * *]
 * x y
 * 4 1
 * 
 * 5 0
 * 6 1
 * 
 * 180度
 * *   0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * * 0 * * * *]
 * 1、[* * * * 0 0 * * * *]
 * 2、[* * * * 0 * * * * *]
 * 3、[* * * * * * * * * *]
 * x y
 * 4 1
 * 
 * 6 0
 * 6 1
 * 5 2
 * 
 */

class GridType2 extends FallGrid{
  // 当前坐标
  x: number = 4;
  y: number = 1;

  /**
   * 当前角度
   * 0   为普通
   * 180 为竖起来
   */
  private angle: number = 0;

  private checkToRotate (gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;
    const isNormalAngle = angle === 0;

    // 首先判断是否已经到最下面了(普通情况为到最后一行，竖着的情况为到倒数第二行)
    const gameRowCount = gameStatus.length - 1;

    const isDown = y >= gameRowCount - (isNormalAngle ? 1 : 2);

    if (isDown) {
      return false;
    }

    let checkList: GridStatus[] = [];
    
    if (isNormalAngle) {
      // 普通转竖
      const checkPoint1 = gameStatus[y + 1][x];
      const checkPoint2 = gameStatus[y + 2][x];

      checkList = [checkPoint1, checkPoint2];
    } else {
      // 竖转普通
      const checkPoint1 = gameStatus[y][x];
      const checkPoint2 = gameStatus[y + 1][x + 2];

      checkList = [checkPoint1, checkPoint2];
    }

    return !checkList.includes(1);
  }

  rotate(gameStatus: GameStatus): GridPoint[] | null {
    const { x, y } = this;
    const angle = ((this.angle / 180 + 1) % 2) * 180;
    const gameWidth = gameStatus[0].length - 1;

    const isAllowRotate = this.checkToRotate(gameStatus);

    if (!isAllowRotate) {
      return null;
    }

    if (angle === 0) {
      // 从竖的转成普通
      
      // 在最右侧的话需要左移1格，否则就超出最右侧了
      const isRightmost = x >= gameWidth - 1;

      if (isRightmost) {
        this.x--;
      }
    } else {
      // 从普通转成竖的

      // 希望：在最右侧的话转回来能贴在右侧
      const isRightmost = x >= gameWidth - 2;

      if (isRightmost) {
        this.x++;
      }
    }

    this.angle = angle;

    return this.getCurrentPosition();
  }

  getCurrentPosition (): GridPoint[] {
    const { x, y, angle } = this;

    let ret: GridPoint[] = [];

    if (angle === 0) {
      // 普通
      const point1: GridPoint = {
        x: x - 1,
        y: y - 1
      }
  
      const point2: GridPoint = {
        x,
        y: y - 1
      }

      const point3: GridPoint = {
        x,
        y
      }
  
      const point4: GridPoint = {
        x: x + 1,
        y
      }

      ret = [point1, point2, point3, point4];
    } else {
      // 竖起来
      const point1: GridPoint = {
        x: x + 1,
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
        x,
        y: y + 1
      }

      ret = [point1, point2, point3, point4];
    }

    return ret;
  }

  checkCreateSuccess (gameStatus: GameStatus): boolean {
    const { x, y } = this;

    const checkPoint1 = gameStatus[y - 1][x - 1];
    const checkPoint2 = gameStatus[y - 1][x];
    const checkPoint3 = gameStatus[y][x];
    const checkPoint4 = gameStatus[y][x + 1];

    return ![checkPoint1, checkPoint2, checkPoint3, checkPoint4].includes(1);
  }

  checkToNextLine (gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    let checkPointList: GridStatus[] = [];
    const gameHeight = gameStatus.length - 1;

    const isNormalAngle = angle === 0;

    const isHeightmost = y >= gameHeight - (isNormalAngle ? 0 : 1);

    if (isHeightmost) {
      return false;
    }

    if (isNormalAngle) {
      // 普通
      const checkPoint1 = gameStatus[y][x - 1];
      const checkPoint2 = gameStatus[y + 1][x];
      const checkPoint3 = gameStatus[y + 1][x + 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3];
    } else {
      // 竖版
      const checkPoint1 = gameStatus[y + 2][x];
      const checkPoint2 = gameStatus[y + 1][x + 1];

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
    const isNormalAngle = angle === 0;

    const isLeftmost = x <= (isNormalAngle ? 1 : 0);

    if (isLeftmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      const checkPoint1 = gameStatus[y - 1][x - 2];
      const checkPoint2 = gameStatus[y][x - 1];

      checkPointList = [checkPoint1, checkPoint2];
    } else {
      const checkPoint1 = gameStatus[y - 1][x];
      const checkPoint2 = gameStatus[y][x - 1];
      const checkPoint3 = gameStatus[y + 1][x - 1];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3];
    }
    return !checkPointList.includes(1);
  }

  checkToRight (gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    const gameWidth = gameStatus[0].length - 1;

    let isRightmost = x >= gameWidth - 1;

    if (isRightmost) {
      return false;
    }

    let checkPointList: GridStatus[] = [];

    if (angle === 0) {
      const checkPoint1 = gameStatus[y - 1][x + 1];
      const checkPoint2 = gameStatus[y][x + 2];

      checkPointList = [checkPoint1, checkPoint2];
    } else {
      const checkPoint1 = gameStatus[y - 1][x + 2];
      const checkPoint2 = gameStatus[y][x + 2];
      const checkPoint3 = gameStatus[y + 1][x + 1];

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

  toRight (gameStatus: GameStatus): GridPoint[] | null {
    const isAllowToRight = this.checkToRight(gameStatus);
    
    if (!isAllowToRight) {
      return null;
    }

    this.x++;

    return this.getCurrentPosition();
  }

  /** 获取预览数据 */
  getPreview () {
    return [
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0]
    ]
  }
}

export default GridType2;