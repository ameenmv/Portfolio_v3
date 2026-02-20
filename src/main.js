// src/main.js

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// ─── GSAP: must be imported before any component uses it
import "./plugins/gsap";

// ─── Global styles (Tailwind)
import "./assets/styles/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
