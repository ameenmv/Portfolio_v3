<template>
   <section class="hero">
      <navbar />

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

      <div class="hero__stage">
         <span class="hero__display" ref="creativeRef" @mousemove="(e) => onDisplayMouseMove(e, creativeRef)"
            @mouseleave="(e) => onDisplayMouseLeave(e, creativeRef)">Creative</span>

         <div class="hero__img-wrap">
            <img src="@/assets/images/hero.webp" alt="Ameen Mohamed" class="hero__img" fetchpriority="high"
               decoding="async" />
         </div>

         <span class="hero__display hero__display--right" ref="devRef" @mousemove="(e) => onDisplayMouseMove(e, devRef)"
            @mouseleave="(e) => onDisplayMouseLeave(e, devRef)">dev</span>
      </div>

   </section>
</template>

<script setup>
import Navbar from '@/components/layout/navbar.vue'
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'

const creativeRef = ref(null)
const devRef = ref(null)


function buildShadow(x, y) {
   const layers = []
   const steps = 8
   for (let i = 1; i <= steps; i++) {
      const ratio = i / steps
      layers.push(`${x * ratio}px ${y * ratio}px 0 rgb(235, 218, 40)`)
   }
   return layers.join(', ')
}

function onDisplayMouseMove(event, elRef) {
   const el = elRef?.$el || elRef
   if (!el) return
   const bounds = el.getBoundingClientRect()

   const offsetX = event.clientX - (bounds.left + bounds.width / 2)
   const offsetY = event.clientY - (bounds.top + bounds.height / 2)

   const maxShadow = 15
   const normX = (offsetX / (bounds.width / 2)) * maxShadow
   const normY = (offsetY / (bounds.height / 2)) * maxShadow

   gsap.to(el, {
      x: offsetX * 0.08,
      y: offsetY * 0.12,
      textShadow: buildShadow(normX, normY),
      duration: 0.5,
      ease: 'power2.out',
   })
}

function onDisplayMouseLeave(event, elRef) {
   const el = elRef?.$el || elRef
   if (!el) return

   gsap.to(el, {
      x: 0,
      y: 0,
      textShadow: buildShadow(0, 0),
      duration: 0.9,
      ease: 'elastic.out(1, 0.4)',
   })
}


onMounted(() => {
   gsap.from('.hero__bracket', {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.2
   })

   gsap.from('.hero__display:first-of-type', {
      x: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4
   })
   gsap.from('.hero__display--right', {
      x: 80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4
   })

   gsap.from('.hero__img-wrap', {
      scale: 0.85, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5
   })
})
</script>

<style scoped>
.hero {
   min-height: 100vh;
   background: #101318;
   color: #fff;
   display: flex;
   flex-direction: column;
   overflow: hidden;
}

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

/* Stage */
.hero__stage {
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   gap: 1rem;
   margin: 0 -0.02em;
}

.hero__display {
   font-family: 'Yatra One', cursive;
   font-size: clamp(5rem, 14vw, 13rem);
   line-height: 0.9;
   color: #fff;
   white-space: nowrap;
   padding-bottom: 0.05em;
   flex-shrink: 0;
   cursor: default;
   will-change: filter, opacity;
   text-shadow: 0 0 0 rgb(235, 218, 40);
}

.hero__img-wrap {
   flex: 0 0 auto;
   width: clamp(160px, 22vw, 320px);
   align-self: flex-end;
}

.hero__img {
   width: 100%;
   aspect-ratio: 3/4;
   object-fit: cover;
   border-radius: 16px;
   display: block;
   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

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