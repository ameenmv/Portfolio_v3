<template>
   <!-- ── FAB Toggle ──────────────────────────────────────────── -->
   <Transition name="fab">
      <button v-if="showFab" class="fab" ref="fabRef" @click="open = true" @mousemove="(e) => onMouseMove(e, fabRef)"
         @mouseleave="(e) => onMouseLeave(e, fabRef)" aria-label="Open navigation">
         <span class="fab__bar"></span>
         <span class="fab__bar fab__bar--mid"></span>
         <span class="fab__bar fab__bar--short"></span>
      </button>
   </Transition>

   <!-- ── Backdrop ──────────────────────────────────────────────── -->
   <Transition name="backdrop">
      <div v-if="open" class="backdrop" @click="open = false" />
   </Transition>

   <!-- ── Side Panel ───────────────────────────────────────────── -->
   <Transition name="panel">
      <nav v-if="open" class="panel">

         <!-- Close button — sits outside panel left edge -->
         <button class="close-btn" ref="closeRef" @click="open = false" @mousemove="(e) => onMouseMove(e, closeRef)"
            @mouseleave="(e) => onMouseLeave(e, closeRef)" aria-label="Close navigation">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
               <line x1="1" y1="1" x2="12" y2="12" stroke="white" stroke-width="2" stroke-linecap="round" />
               <line x1="12" y1="1" x2="1" y2="12" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
         </button>

         <!-- ── Nav items ─────────────────────────────────────────── -->
         <ul class="nav-list">
            <li v-for="(item, i) in links" :key="i" :ref="el => { if (el) itemRefs[i] = el }" class="nav-item">
               <a :href="item.href" class="nav-item__link" @click="open = false"
                  @mousemove="(e) => onMouseMove(e, itemRefs[i])" @mouseleave="(e) => onMouseLeave(e, itemRefs[i])">
                  <span class="nav-item__num">0{{ i + 1 }}</span>
                  <span class="nav-item__label" :class="{ 'nav-item__label--active': i === activeIndex }">
                     {{ item.label }}
                  </span>
               </a>
            </li>
         </ul>

         <!-- ── Social icons ──────────────────────────────────────── -->
         <div class="socials">
            <a v-for="(s, i) in socials" :key="i" :ref="el => { if (el) socialRefs[i] = el }" :href="s.href"
               class="social-btn" target="_blank" rel="noopener noreferrer" :aria-label="s.name"
               @mousemove="(e) => onMouseMove(e, socialRefs[i])" @mouseleave="(e) => onMouseLeave(e, socialRefs[i])">
               <svg viewBox="0 0 24 24" fill="currentColor" v-html="s.svg" />
            </a>
         </div>

      </nav>
   </Transition>
</template>

<script setup>
import { useMagneticEffect } from '@/composables/useMagneticEffect'
import { gsap } from 'gsap'
import { onMounted, onUnmounted, ref, watch } from 'vue'

// ── Magnetic ─────────────────────────────────────────────────
const { onMouseMove, onMouseLeave } = useMagneticEffect({
   strength: 0.5,
   duration: 0.4,
   resetDuration: 0.7,
})

// ── State ─────────────────────────────────────────────────────
const open = ref(false)
const showFab = ref(false)

// ── Refs ──────────────────────────────────────────────────────
const fabRef = ref(null)
const closeRef = ref(null)
const itemRefs = ref([])
const socialRefs = ref([])

// ── Scroll watcher — show FAB after 60px ─────────────────────
function onScroll() { showFab.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ── Active link detection ─────────────────────────────────────
const activeIndex = ref(0)

// ── Run GSAP when panel opens ─────────────────────────────────
watch(open, (val) => {
   if (!val) return
   // reset refs each open
   itemRefs.value = []
   socialRefs.value = []

   // items: slide from right with stagger
   setTimeout(() => {
      const items = document.querySelectorAll('.nav-item')
      const social = document.querySelectorAll('.social-btn')

      gsap.fromTo(items,
         { x: 70, opacity: 0 },
         { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.09, delay: 0.12 }
      )
      gsap.fromTo(social,
         { y: 18, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.07, delay: 0.52 }
      )
   }, 30)
})

// ── Data ──────────────────────────────────────────────────────
const links = [
   { label: 'HOME', href: '#home' },
   { label: 'WORK', href: '#work' },
   { label: 'ABOUT', href: '#about' },
   { label: 'CONTACT', href: '#contact' },
]

const socials = [
   {
      name: 'LinkedIn', href: 'https://www.linkedin.com/in/ameeenmv',
      svg: `<path d="M4.98 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM.5 8.5h4.9v13H.5v-13Zm7.5 0h4.7v1.8h.1c.7-1.3 2.5-2.6 5.1-2.6 5.5 0 6.5 3.6 6.5 8.2v9.6h-4.9v-8.5c0-2 0-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.5v8.6H8v-13Z"/>`,
   },
   {
      name: 'GitHub', href: 'https://github.com/ameenmv',
      svg: `<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.04 1.79 2.74 1.27 3.41.97.1-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z"/>`,
   },
   {
      name: 'Instagram', href: 'https://www.instagram.com/ameeen_mv',
      svg: `<path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-4.75 1.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z"/>`,
   },
   {
      name: 'Twitter', href: 'https://x.com/ameeen_mv',
      svg: `<path d="M19.633 7.997c.013.175.013.35.013.524 0 5.33-4.056 11.475-11.475 11.475-2.28 0-4.402-.662-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.003-1.722 4.037 4.037 0 0 1-3.768-2.797c.25.037.487.062.75.062.35 0 .699-.05 1.024-.137a4.027 4.027 0 0 1-3.23-3.955v-.05c.537.3 1.162.487 1.824.512a4.022 4.022 0 0 1-1.798-3.354c0-.75.2-1.424.55-2.018a11.44 11.44 0 0 0 8.306 4.214c-.063-.3-.1-.612-.1-.924a4.026 4.026 0 0 1 6.96-2.753 7.957 7.957 0 0 0 2.55-.974 4.02 4.02 0 0 1-1.774 2.22 7.996 7.996 0 0 0 2.313-.624 8.642 8.642 0 0 1-2.012 2.087Z"/>`,
   },
]
</script>

<style scoped>
/* ── FAB ─────────────────────────────────────────────────── */
.fab {
   position: fixed;
   top: 24px;
   right: 24px;
   z-index: 900;
   width: 58px;
   height: 58px;
   border-radius: 50%;
   background: #101318;
   border: none;
   cursor: pointer;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: 5px;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
   transition: box-shadow 0.25s ease;
}

.fab:hover {
   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.fab__bar {
   display: block;
   width: 22px;
   height: 1.8px;
   background: #fff;
   border-radius: 2px;
   transition: width 0.2s ease;
}

.fab__bar--mid {
   width: 22px;
}

.fab__bar--short {
   width: 14px;
   align-self: flex-start;
   margin-left: 4px;
}

.fab:hover .fab__bar--short {
   width: 22px;
}

/* FAB entrance/exit */
.fab-enter-active,
.fab-leave-active {
   transition: opacity 0.3s ease, transform 0.3s ease;
}

.fab-enter-from {
   opacity: 0;
   transform: scale(0.6);
}

.fab-leave-to {
   opacity: 0;
   transform: scale(0.6);
}

/* ── Backdrop ────────────────────────────────────────────── */
.backdrop {
   position: fixed;
   inset: 0;
   z-index: 950;
   background: rgba(0, 0, 0, 0.5);
   backdrop-filter: blur(4px);
   -webkit-backdrop-filter: blur(4px);
}

.backdrop-enter-active,
.backdrop-leave-active {
   transition: opacity 0.4s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
   opacity: 0;
}

/* ── Panel ───────────────────────────────────────────────── */
.panel {
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   z-index: 1000;
   width: min(460px, 68vw);
   background: #f0ebe0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding: 3.5rem 3.5rem 3.5rem 4rem;
}

.panel-enter-active,
.panel-leave-active {
   transition: transform 0.48s cubic-bezier(0.77, 0, 0.175, 1);
}

.panel-enter-from,
.panel-leave-to {
   transform: translateX(100%);
}

/* ── Close button ────────────────────────────────────────── */
.close-btn {
   position: absolute;
   top: 28px;
   left: -26px;
   width: 52px;
   height: 52px;
   border-radius: 50%;
   background: #c0392b;
   border: none;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   box-shadow: 0 4px 18px rgba(192, 57, 43, 0.45);
   transition: background 0.2s ease;
}

.close-btn:hover {
   background: #e74c3c;
}

/* ── Nav list ────────────────────────────────────────────── */
.nav-list {
   list-style: none;
   padding: 0;
   margin: 0;
   display: flex;
   flex-direction: column;
}

.nav-item {
   display: block;
}

.nav-item__link {
   display: inline-flex;
   align-items: baseline;
   gap: 0.85rem;
   text-decoration: none;
   padding: 0.45rem 0;
   cursor: pointer;
}

.nav-item__num {
   font-size: 0.68rem;
   font-weight: 700;
   letter-spacing: 0.12em;
   color: #c0392b;
   min-width: 22px;
   line-height: 1;
}

.nav-item__label {
   display: inline-block;
   /* needed for magnetic GSAP */
   font-size: clamp(2.2rem, 5.5vw, 3.8rem);
   font-weight: 800;
   letter-spacing: 0.03em;
   text-transform: uppercase;
   color: #1c1c1c;
   line-height: 1.1;
   transition: color 0.22s ease, letter-spacing 0.22s ease;
}

.nav-item__label--active {
   color: #c0392b;
}

.nav-item__link:hover .nav-item__label {
   color: #c0392b;
   letter-spacing: 0.07em;
}

/* ── Socials ─────────────────────────────────────────────── */
.socials {
   display: flex;
   gap: 0.7rem;
   margin-top: 3rem;
}

.social-btn {
   display: inline-flex;
   /* magnetic needs this */
   align-items: center;
   justify-content: center;
   width: 44px;
   height: 44px;
   border-radius: 50%;
   background: #c0392b;
   color: #fff;
   transition: background 0.2s ease;
}

.social-btn:hover {
   background: #e74c3c;
}

.social-btn svg {
   width: 16px;
   height: 16px;
   pointer-events: none;
}
</style>
