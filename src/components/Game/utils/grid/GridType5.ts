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
 */

/**
 * 普通角度(x: 3, y: 0)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * 0 0 0 * * * *]
 * 2、[* * * * * * * * * *]
 * 
 * 90度(x: 4, y: 0)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * * 0 0 * * * *]
 * 2、[* * * * 0 * * * * *]
 * 
 * 180度(x: 3, y: 1)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * * * * * * *]
 * 1、[* * * 0 0 0 * * * *]
 * 2、[* * * * 0 * * * * *]

 *
 * 270度(x: 3, y: 0)
 *     0 1 2 3 4 5 6 7 8 9
 * 0、[* * * * 0 * * * * *]
 * 1、[* * * 0 0 * * * * *]
 * 2、[* * * * 0 * * * * *]
 */

interface CheckToRotateResult {
  isAllow: boolean;
  moveUp: number;
}

class GridType4 extends FallGrid{
  // 初始坐标
  x: number = 4;
  y: number = 0;

  /**
   * 当前角度
   * 0、90、180、270
   */
  private angle: number = 0;

  // 检查是否可以旋转
  checkToRotate (gameStatus: GameStatus): CheckToRotateResult {
    const { x, y, angle } = this;

    const checkResult: CheckToRotateResult = {
      isAllow: false,
      moveUp: -1
    }

    const gameHeight = gameStatus.length - 1;

    const isHorizontal = angle === 0;

    let checkList = [];

    if (!isHorizontal) {
      console.log('gameHeight: ', gameHeight)
      // 离最下面的行数
      const fallLastNum = gameHeight - y;
      console.log('fallLastNum: ', fallLastNum)

      if (fallLastNum <= 3) {
        // return fallLastNum;
        checkResult.moveUp = fallLastNum;
      }

      // 横，要转成竖
      console.log('横，要转成竖: ', gameStatus);
      const checkPoint1 = gameStatus[y][x + 1];
      const checkPoint2 = gameStatus[y + 1] ? gameStatus[y + 1][x + 1] : null;
      const checkPoint3 = gameStatus[y + 2] ? gameStatus[y + 2][x + 1] : null;
      const checkPoint4 = gameStatus[y + 3] ? gameStatus[y + 3][x + 1] : null;

      checkList = [checkPoint1];
      checkPoint2 && checkList.push(checkPoint2);
      checkPoint3 && checkList.push(checkPoint3);
      checkPoint4 && checkList.push(checkPoint4);
    } else {
      // 竖，要转成横
      console.log('竖，要转成横')
      const checkPoint1 = gameStatus[y][x - 1];
      const checkPoint2 = gameStatus[y][x];
      const checkPoint3 = gameStatus[y][x + 1];
      const checkPoint4 = gameStatus[y][x + 2];

      checkList = [checkPoint1, checkPoint2, checkPoint3, checkPoint4];
    }

    checkResult.isAllow = !checkList.includes(1);

    return checkResult;
  }

  rotate (gameStatus: GameStatus): GridPoint[] | null {
    console.clear();
    // const isAllowToRotate = this.checkToRotate(gameStatus);

    // const { isAllow, moveUp } = isAllowToRotate;

    // if (!isAllow) {
    //   return null
    // }
    
    // if (moveUp >= 0) {
    //   this.y -= (3 - moveUp);
    // }

    // console.log('y: ', this.y)
    /**
     * 0 0
     * 1 90
     * 2 180
     * 3 270
     */

    // console.log(((0 / 90) % 4 * 90))
    // console.log(((90 / 90) % 4 * 90))
    // console.log(((180 / 90) % 4 * 90))
    // console.log(((270 / 90) % 4 * 90))
    // console.log(((360 / 90) % 4 * 90))

    const { x, y, angle } = this;
    const newAngle = ((((angle + 90) / 90) % 4) * 90);
    console.log('newAngle: ', newAngle)
    // const gameWidth = gameStatus[0].length - 1;

    

    this.angle = newAngle;

    return [
      {x: 1, y: 0}
    ];
  }

  getCurrentPosition (): GridPoint[] {
    const { x, y, angle } = this;

    let ret: GridPoint[] = [];

    

    return ret;
  }

  checkCreateSuccess (gameStatus: GameStatus): boolean {
    const { x, y } = this;

    const checkPoint1 = gameStatus[y][x + 1];
    const checkPoint2 = gameStatus[y][x + 2];
    const checkPoint3 = gameStatus[y + 1][x];
    const checkPoint4 = gameStatus[y + 1][x + 1];

    return ![checkPoint1, checkPoint2, checkPoint3, checkPoint4].includes(1);
  }

  checkToNextLine (gameStatus: GameStatus): boolean {
    const { x, y, angle } = this;

    let checkPointList: GridStatus[] = [];

    const gameHeight = gameStatus.length - 1;

    const isNormalAngle = angle === 0;

    // 检查是否到底了
    const isHeightmost = y >= gameHeight - (isNormalAngle ? 3 : 0);

    if (isHeightmost) {
      return false;
    }

    if (isNormalAngle) {
      // 竖
      const checkPoint1 = gameStatus[y + 4][x];

      checkPointList = [checkPoint1];
    } else {
      // 横
      const checkPoint1 = gameStatus[y + 1][x];
      const checkPoint2 = gameStatus[y + 1][x + 1];
      const checkPoint3 = gameStatus[y + 1][x + 2];
      const checkPoint4 = gameStatus[y + 1][x + 3];

      checkPointList = [checkPoint1, checkPoint2, checkPoint3, checkPoint4];
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

    const isLeftmost = x <= 0;
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

  checkToRight (gameStatus: GameStatus): boolean {
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
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
    ]
  }
}

export default GridType4;