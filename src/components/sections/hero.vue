<template>
   <section class="hero h-[500vh]">
      <navbar />

      <!-- ── Center bracket intro ─────────────────────────── -->
      <div class="hero__mid">
         <div class="hero__bracket">
            <span class="hero__paren">(</span>

            <div class="hero__intro">
               <p class="hero__hello">HELLO!</p>
               <p class="hero__intro-text">
                  I'm Ameen Mohamed, a frontend<br>
                  developer &amp; Software Engineer.<br>
                  Welcome to my portfolio!
               </p>
            </div>

            <span class="hero__paren">)</span>
         </div>
      </div>

      <!-- ── Big display text + image ────────────────────── -->
      <div class="hero__stage">
         <span class="hero__display">Creative</span>

         <div class="hero__img-wrap">
            <img src="@/assets/images/hero.webp" alt="Ameen Mohamed" class="hero__img" fetchpriority="high"
               decoding="async" />
         </div>

         <span class="hero__display hero__display--right">dev</span>
      </div>

   </section>
</template>

<script setup>
import Navbar from '@/components/layout/navbar.vue'
import { gsap } from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
   // Bracket intro entrance
   gsap.from('.hero__bracket', {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.2
   })

   // Display text slide in from sides
   gsap.from('.hero__display:first-of-type', {
      x: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4
   })
   gsap.from('.hero__display--right', {
      x: 80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4
   })

   // Image scale in
   gsap.from('.hero__img-wrap', {
      scale: 0.85, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5
   })
})
</script>

<style scoped>
/* ── Base ──────────────────────────────────────────── */
.hero {
   min-height: 100vh;
   background: #101318;
   color: #fff;
   display: flex;
   flex-direction: column;
   overflow: hidden;
}

/* ── Mid section: bracket ─────────────────────────── */
.hero__mid {
   flex: 1;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 2rem 1rem;
}

.hero__bracket {
   display: flex;
   align-items: center;
   gap: 1.5rem;
}

.hero__paren {
   font-family: 'Cormorant Garamond', serif;
   font-weight: 300;
   font-size: clamp(7rem, 13vw, 11rem);
   line-height: 1;
   color: rgba(255, 255, 255, 0.75);
   user-select: none;
   margin-top: -0.05em;
   /* optical align */
}

.hero__intro {
   display: flex;
   flex-direction: column;
   gap: 0.6rem;
   text-align: center;
   max-width: 260px;
}

.hero__hello {
   font-size: 0.68rem;
   font-weight: 600;
   letter-spacing: 0.25em;
   color: rgba(255, 255, 255, 0.4);
   text-transform: uppercase;
}

.hero__intro-text {
   font-size: 0.88rem;
   color: rgba(255, 255, 255, 0.65);
   line-height: 1.75;
}

/* ── Stage: big text + image ────────────────────────── */
.hero__stage {
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   padding: 0 0 0;
   gap: 1rem;
   /* allow text to bleed a little at edges */
   margin: 0 -0.02em;
}

.hero__display {
   font-family: 'Yatra One', cursive;
   font-size: clamp(5rem, 14vw, 13rem);
   line-height: 0.9;
   color: #fff;
   white-space: nowrap;
   /* slight baseline alignment */
   padding-bottom: 0.05em;
   flex-shrink: 0;
}

/* ── Image in the middle ─────────────────────────── */
.hero__img-wrap {
   flex: 0 0 auto;
   /* roughly matches reference proportion */
   width: clamp(160px, 22vw, 320px);
   /* pushes image up slightly so text aligns to bottom */
   align-self: flex-end;
   margin-bottom: 0;
}

.hero__img {
   width: 100%;
   aspect-ratio: 3/4;
   object-fit: cover;
   border-radius: 16px;
   display: block;
   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 700px) {
   .hero__paren {
      font-size: 4.5rem;
   }

   .hero__stage {
      flex-direction: column;
      align-items: center;
      padding-bottom: 2rem;
   }

   .hero__display {
      font-size: 4rem;
   }

   .hero__img-wrap {
      width: 160px;
   }
}
</style>