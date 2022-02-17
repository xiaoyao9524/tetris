import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex';

// modules
import count from './modules/count';
import game from './modules/game';

// types
import {State as IState} from '@/types/store';
export interface State extends IState{};

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    count,
    game
  }
})
