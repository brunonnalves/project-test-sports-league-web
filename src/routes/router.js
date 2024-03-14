import { createRouter, createWebHistory } from 'vue-router';

import NotFoundError from '../pages/NotFoundError/NotFoundError.vue';
import Schedule from '../pages/Schedule/Schedule.vue';
import Leaderboard from '../pages/Leaderboard/Leaderboard.vue';

const routes = [
  { path: '/', component: Schedule },
  { path: '/schedule', component: Schedule },
  { path: '/leaderbord', component: Leaderboard },
  { path: '/:pathMatch(.*)*', component: NotFoundError },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
