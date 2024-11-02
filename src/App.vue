<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import useRouterOsData from './composables/router-os-data.ts'
import {ref} from "vue";
// @ts-ignore
import {hexMD5} from "./utils/md5";

const {chapId, chapChallenge, chapSecret, ip, linkLoginOnly, linkOrig} = useRouterOsData()


const user = ref()
const pass = ref()

const login = async () => {
  // const response = await fetch(linkLoginOnly.value, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: new URLSearchParams({
  //     'username': user.value,
  //     'password': hexMD5(chapId + pass.value + chapChallenge),
  //     'dst': linkOrig.value,
  //     'popup': 'true',
  //   }),
  // })
  // window.location.href = `$(link-login-only)?username=${myUser}&password=${password}&dst=$(link-orig)&popup=false`;

  // const chId = localStorage.getItem('chapId')
  // const chCh = localStorage.getItem('chapChallenge')
  const passMd5 = hexMD5(chapId.value + pass.value + chapChallenge.value)

  window.location.href = `${linkLoginOnly.value}?username=${user.value}&password=${passMd5}&dst=${linkOrig.value}&popup=false`
  // console.log(response)

  // if (response.ok) {
  //   window.location.href = linkOrig.value
  // } else {
  //   alert('Login failed')
  // }
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  {{ chapId }}-{{ chapChallenge }}-{{ chapSecret }} {{ ip }} {{ linkLoginOnly }} {{ linkOrig }}
  <br/>
  <input type="text" v-model="user"/>
  <br/>
  <input type="password" v-model="pass"/>
  <br/>
  <button @click="login">Login</button>
  <HelloWorld msg="Vite + Vue"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
