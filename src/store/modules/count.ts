import type {Module} from 'vuex';

import type { State, Count } from '@/types/store';

const count: Module<Count, State> =  {
  namespaced: true,
  state: () => ({
    count: 0
  }),
  mutations: {
    increment: state => {
      state.count++
    }
  },
  getters: {
    count: state => state.count
  }
}

export default count;
