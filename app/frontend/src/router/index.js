import NProgress from 'nprogress';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let isFirstTransition = true;

/**
 * Constructs and returns a Vue Router object
 * @param {string} [basePath='/'] the base server path
 * @returns {object} a Vue Router object
 */
export default function getRouter(basePath = '/') {
  const router = new VueRouter({
    base: basePath,
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: { name: 'Home' }
      },
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          hasLogin: true
        }
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import(/* webpackChunkName: "form" */ '@/views/Form.vue'),
        meta: {
        }
      },
      {
        path: '/secure-form',
        name: 'SecureForm',
        component: () => import(/* webpackChunkName: "secure-form" */ '@/views/SecureForm.vue'),
        meta: {
        }
      },
      {
        path: '/secure',
        name: 'Secure',
        component: () => import(/* webpackChunkName: "secure" */ '@/views/Secure.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true
        }
      },
      {
        path: '/404',
        alias: '*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue'),
        meta: {
          hasLogin: true
        }
      }
    ]
  });

  router.beforeEach((to, _from, next) => {
    NProgress.start();
    if (to.matched.some(route => route.meta.requiresAuth)
      && router.app.$keycloak
      && router.app.$keycloak.ready
      && !router.app.$keycloak.authenticated) {
      const redirect = location.origin + basePath + to.path;
      const loginUrl = router.app.$keycloak.createLoginUrl({
        idpHint: 'idir',
        redirectUri: redirect
      });
      window.location.replace(loginUrl);
    } else {
      document.title = to.meta.title ? to.meta.title : process.env.VUE_APP_TITLE;
      if (to.query.r && isFirstTransition) {
        router.replace({ path: to.query.r.replace(basePath, '') });
      }
      next();
    }
  });

  router.afterEach(() => {
    isFirstTransition = false;
    NProgress.done();
  });

  return router;
}
