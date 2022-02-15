import { integer, nativeMath } from 'random-js';

import type { GameRow, GameStatus } from '../types';

import { FallGrid } from './grid/GridType';
import GridType1 from './grid/GridType1';
import GridType2 from './grid/GridType2';
import GridType3 from './grid/GridType3';
import GridType4 from './grid/GridType4';
import GridType5 from './grid/GridType5';
import GridType6 from './grid/GridType6';
import GridType7 from './grid/GridType7';

/**
 * 下落的格子类型：
 *    类型1
 *        **
 *        **
 *    类型2
 *        **
 *         **
 *    类型3
 *         **
 *        **
 *    类型4
 *        *
 *        *
 *        *
 *        *
 *    类型5
 *         *
 *        ***
 *    类型6
 *        *
 *        ***
 *    类型7
 *          *
 *        ***
 */

// 创建游戏初始状态
export const createGameStatus = (
  rowCount: number,
  colCount: number
): GameStatus => {
  const status: GameStatus = [];
  // 根据行列生成状态数据
  for (let i = 0; i < rowCount; i++) {
    const row: GameRow = [];

    for (let j = 0; j < colCount; j++) {
      row.push(0);
    }

    status.push(row);
  }
  return status;
};

// 随机生成一个下落元素
export const createFallElement = (): FallGrid => {
  const random = integer(1, 100)(nativeMath);

  let grid: FallGrid | null = null;
  /*
  if (random >= 1 && random < 17) {
    grid = new GridType2();
  } else if (random >= 17 && random < 33) {
    grid = new GridType3();
  } else if (random >= 33 && random < 49) {
    grid = new GridType5();
  } else if (random >= 49 && random < 65) {
    grid = new GridType6();
  } else if (random >= 65 && random < 81) {
    grid = new GridType7();
  } else if (random >= 81 && random < 90) {
    grid = new GridType1();
  } else {
    grid = new GridType4();
  }
  */
  grid = new GridType7();
  return grid;
};
