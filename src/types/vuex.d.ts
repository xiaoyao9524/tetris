// import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import type {State as IState} from './store';

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State extends IState {}

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
