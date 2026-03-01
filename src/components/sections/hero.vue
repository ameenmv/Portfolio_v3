<template>
   <section class="hero" ref="heroRef">
      <navbar />

      <div class="hero__center">
         <h1 class="hero__title">
            <span class="hero__line">DESIGN WITH A</span>
            <span class="hero__line hero__line--red">HUMAN TOUCH</span>
         </h1>
      </div>

      <button class="hero__scroll-btn" aria-label="Scroll down">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 13l5 5 5-5" />
            <path d="M7 7l5 5 5-5" />
         </svg>
      </button>
   </section>
</template>

<script setup>
import Navbar from '@/components/layout/navbar.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)

onMounted(() => {
   const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

   tl.from('.hero__line', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
   })

   tl.from('.hero__scroll-btn', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(2)',
   }, '-=0.5')

   gsap.to(heroRef.value, {
      backgroundColor: '#d4a0a0',
      scrollTrigger: {
         trigger: heroRef.value,
         start: 'top top',
         end: 'bottom top',
         scrub: 0.8,
      }
   })
})
</script>

<style scoped>
.hero {
   min-height: 100vh;
   background: #f5f0e8;
   color: #1a1a1a;
   display: flex;
   flex-direction: column;
   position: relative;
   overflow: hidden;
}

.hero__center {
   flex: 1;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 2rem;
   z-index: 2;
}

.hero__title {
   text-align: center;
   margin: 0;
   display: flex;
   flex-direction: column;
   gap: 0.1em;
}

.hero__line {
   display: block;
   font-family: 'Pastline Sans', serif;
   font-size: clamp(2.5rem, 7vw, 5.5rem);
   font-weight: 400;
   letter-spacing: 0.05em;
   line-height: 1.1;
}

.hero__line--red {
   color: #c0392b;
}

.hero__scroll-btn {
   position: absolute;
   bottom: 2.5rem;
   right: 3rem;
   width: 64px;
   height: 64px;
   border-radius: 50%;
   background: #1a1714;
   color: #f5f0e8;
   border: none;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 2;
   transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
      background 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.hero__scroll-btn:hover {
   transform: scale(1.08);
   background: #c0392b;
}

@media (max-width: 700px) {
   .hero__scroll-btn {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 52px;
      height: 52px;
   }
}
</style>