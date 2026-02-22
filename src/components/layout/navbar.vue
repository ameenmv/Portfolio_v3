<template>
   <nav class="bg-background text-text p-2">
      <div class="container mx-auto px-4 py-4">
         <div class="flex justify-between items-center">

            <!-- Logo -->
            <div class="text-2xl font-bold">|| आमीन ||</div>

            <!-- Nav Links -->
            <div class="flex space-x-12">
               <a v-for="(link, index) in navLinks" :key="index" :href="link.href" class="nav-link"
                  :ref="el => { if (el) linkRefs[index] = el }" @mousemove="(e) => onMouseMove(e, linkRefs[index])"
                  @mouseleave="(e) => onMouseLeave(e, linkRefs[index])">
                  {{ link.label }}
               </a>
            </div>

         </div>
      </div>
   </nav>
</template>

<script setup>
import { useMagneticEffect } from '@/composables/useMagneticEffect'
import { ref } from 'vue'

const { onMouseMove, onMouseLeave } = useMagneticEffect({
   strength: 1,
   duration: 0.6,
   resetDuration: 0.6,
})

const linkRefs = ref([])

const navLinks = [
   { label: 'Home', href: '#' },
   { label: 'About', href: '#' },
   { label: 'Projects', href: '#' },
   { label: 'Contact', href: '#' },
]
</script>

<style scoped>
.nav-link {
   display: inline-block;
   /* required so GSAP translate works correctly */
   position: relative;
   cursor: pointer;
   font-weight: 500;
   transition: color 0.2s ease;
   padding: 4px 2px;
}

.nav-link::after {
   content: '';
   position: absolute;
   bottom: 0;
   left: 0;
   width: 0;
   height: 1.5px;
   background: currentColor;
   transition: width 0.3s ease;
}

.nav-link:hover::after {
   width: 100%;
}
</style>