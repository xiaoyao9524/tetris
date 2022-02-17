export interface Count {
  count: number;
}

export interface Game {
  highScore: number;
}

export interface State {
  count: Count;
  game: Game;
}
