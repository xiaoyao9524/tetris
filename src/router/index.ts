import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/About')
  },
  {
    path: '/play',
    component: () => import('@/views/Play')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;