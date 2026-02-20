// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // ─── Add your routes here ──────────────────
  // {
  //   path: "/",
  //   name: "Home",
  //   component: () => import("@/views/HomeView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0, behavior: "smooth" };
  },
});

export default router;
