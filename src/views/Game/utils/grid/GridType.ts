import type {
  GameStatus
} from '../../types';

export interface GridProps {
  x: number;
  y: number;
}

// 每个格子类要有的属性
export abstract class BaseGrid {
  abstract x: number;
  abstract y: number;

  abstract checkNextLine(gameStatus: GameStatus): boolean;
  abstract toNextLine(): GridPoint[];
  abstract toLeft(): GridPoint[];
  abstract toRight(): GridPoint[];
  abstract getCurrentPosition(): GridPoint[];
}

export interface GridPoint {
  x: number;
  y: number;
}