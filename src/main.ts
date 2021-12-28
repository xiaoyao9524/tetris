import { createApp } from 'vue';
import router from '@/router';
import { store, key } from '@/store';
import App from './App.vue';
import './styles/reset.scss';
import './styles/iconfont.scss';

createApp(App)
  .use(store, key)
  .use(router)
  .mount('#app')
