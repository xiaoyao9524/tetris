import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('@/views/Play')
  },
]

const router = createRouter({
  history: createWebHistory('/tetris/'),
  routes,
})

export default router;