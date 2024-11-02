<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import useRouterOsData from './composables/router-os-data.ts'
import { onMounted, onUnmounted, ref } from 'vue'
// @ts-ignore
import { hexMD5 } from './utils/md5'

const { chapId, chapChallenge, chapSecret, ip, linkLoginOnly, linkOrig } = useRouterOsData()


const user = ref()
const pass = ref()

const login = async () => {

  const passMd5 = hexMD5(chapId.value + pass.value + chapChallenge.value)

  window.location.href = `${linkLoginOnly.value}?username=${user.value}&password=${passMd5}&dst=${linkOrig.value}&popup=false`

}

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
  <RouterView />
</template>
