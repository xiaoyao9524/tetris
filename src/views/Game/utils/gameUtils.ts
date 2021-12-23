import type {
  GameRow,
  GameStatus
} from '../types';

export const createGameStatus = (rowCount: number, colCount: number): GameStatus => {
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