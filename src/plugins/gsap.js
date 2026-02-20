// src/plugins/gsap.js
// ─── GSAP plugin registration ───────────────────────────────────────────────
// Import and register all GSAP plugins you need in one place.
// This file is imported ONCE in main.js before anything else.

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// Optional: set global defaults
// gsap.defaults({ ease: "power3.out", duration: 0.8 });

export { gsap, ScrollToPlugin, ScrollTrigger, TextPlugin };

