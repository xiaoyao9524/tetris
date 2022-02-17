import type { Module } from 'vuex';

import type { State, Game } from '@/types/store';

const game: Module<Game, State> =  {
  namespaced: true,
  state: () => ({
    highScore: 0
  }),
  mutations: {
    setHighScore: (state, highScore: number) => {
      state.highScore = highScore;
      localStorage.setItem('high-score', `${highScore}`);
    }
  },
  getters: {
    highScore: state => state.highScore
  }
}

export default game;
