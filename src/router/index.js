import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ProductPage from '@/views/ProductPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import CartPage from '@/views/CartPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
