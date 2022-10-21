import { createRouter, createWebHashHistory } from 'vue-router';
import ViewNotes from '@/views/ViewNotes.vue';
import ViewAuth from '@/views/ViewAuth.vue';
import { useStoreAuth } from '../stores/storeAuth';

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

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth();
  if (!storeAuth.user.uid && to.name !== 'auth') {
    return { name: 'auth' };
  }

  if (storeAuth.user.uid && to.name === 'auth') {
    return false; //stop the user from navigating away from the current page
  }
});

export default router;
