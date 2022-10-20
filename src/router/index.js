import { createRouter, createWebHashHistory } from 'vue-router';
import ViewNotes from '@/views/ViewNotes.vue';
import ViewAuth from '@/views/ViewAuth.vue';
const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes,
  },
  {
    path: '/stats',
    name: 'stats',

    component: () => import('@/views/ViewStats.vue'),
  },
  {
    path: '/editNote/:id',
    name: 'edit',

    component: () => import('@/views/ViewEditNote.vue'),
  },
  {
    path: '/auth',
    name: 'auth',

    component: ViewAuth,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
