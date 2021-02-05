import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/activation",
    name: "Activate",
    component: () => import("../views/Activate.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/reset-request",
    name: "ResetRequest",
    component: () => import("../views/ResetRequest.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
