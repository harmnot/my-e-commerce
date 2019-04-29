import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Checkout from './views/checkout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'Aframe',
    //   component: () => './components/VR/aframe.vue',
    // },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('./components/VR/shop.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./components/form/register.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/product/:id',
      name: 'products',
      component: () => import('./components/VR/_products/detail.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/form/login.vue'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('./components/admin/dashboardAdmin.vue'),
      meta: {
        requiresAuth: true,
        is_admin: true,
      },
      children: [
        {
          path: 'addproduct',
          name: 'addproduct',
          component: () => import('./components/admin/addproduct.vue'),
        },
        {
          path: 'orders',
          name: 'statusItem',
          component: () => import('./components/admin/status.vue'),
        },
      ],
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
      });
    } else {
      const role = localStorage.getItem('role');
      if (to.matched.some(record => record.meta.is_admin)) {
        if (role === 'admin') {
          next();
        } else {
          next({ path: '/' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
