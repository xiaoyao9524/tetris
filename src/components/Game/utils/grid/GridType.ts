import type {
  GameStatus
} from '../../types';

export interface GridProps {
  x: number;
  y: number;
}

// 每个格子类要有的属性
export abstract class FallGrid {
  abstract x: number;
  abstract y: number;

  abstract rotate(gameStatus: GameStatus): GridPoint[] | null;
  abstract getPreview(): number[][];
  abstract checkCreateSuccess(gameStatus: GameStatus): boolean;
  abstract checkToNextLine(gameStatus: GameStatus): boolean;
  abstract checkToLeft(gameStatus: GameStatus): boolean;
  abstract checkToRight(gameStatus: GameStatus): boolean;
  abstract toNextLine(gameStatus: GameStatus): GridPoint[] | null;
  abstract toLeft(gameStatus: GameStatus): GridPoint[] | null;
  abstract toRight(gameStatus: GameStatus): GridPoint[] | null;
  abstract getCurrentPosition(): GridPoint[];
}

export interface GridPoint {
  x: number;
  y: number;
}