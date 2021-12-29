/**
 * 0: 空格
 * 1: 已经有的格子
 * 2: 正在下落的格子
 */
export type GridStatus = 0 | 1 | 2;

export type GameRow = GridStatus[];

export type GameStatus = GameRow[];