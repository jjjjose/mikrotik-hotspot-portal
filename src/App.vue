<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Portal from '@/components/Portal.vue'


function setViewportHeight() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

onMounted(() => {
  setViewportHeight()
  window.addEventListener('resize', setViewportHeight)
  window.addEventListener('orientationchange', setViewportHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', setViewportHeight)
  window.removeEventListener('orientationchange', setViewportHeight)
})
</script>

<template>
  <Portal />
  <!--  <RouterView />-->
</template>
