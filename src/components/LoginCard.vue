<script setup lang="ts">
import { ThemeKey, type ThemeProperties } from './themes.ts'
import { ref } from 'vue'
// @ts-ignore
import { hexMD5 } from '@/utils/md5'
import useRouterOsData from '@/composables/router-os-data.ts'

defineProps<{
  theme: ThemeProperties
  logo: string
  logoFilterStyle: string
  glowStyle: string
  isVisible: boolean
  showSuccess: boolean
  isLoading: boolean
  currentThemeName: ThemeKey
}>()

const pin = ref('')

const { chapId, chapChallenge, linkLoginOnly, linkOrig } = useRouterOsData()

const connect = async () => {
  // Generate MD5 hash properly based on MikroTik's CHAP authentication
  const passMd5 = hexMD5(chapId.value + pin.value + chapChallenge.value)
  window.location.href = `${linkLoginOnly.value}?username=${pin.value}&password=${passMd5}&dst=${linkOrig.value}&popup=false`
}
</script>

<template>
  <div
    class="w-full max-w-xs flex flex-col items-center bg-white/85 rounded-2xl p-6 shadow-2xl backdrop-blur-lg relative overflow-hidden transition-all duration-500 transform"
    :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
  >
    <!-- Decoración superior -->
    <div
      class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r shine-animation"
      :class="theme.secondary"
    ></div>

    <div class="w-full flex justify-center relative glow-container -mt-2">
      <img
        :src="logo"
        alt="Logo"
        class="w-32 h-32 object-scale-down filter drop-shadow-lg hover-float"
        :style="`filter: ${logoFilterStyle}`"
      />
      <!-- Efecto de resplandor detrás del logo -->
      <div class="glow-effect" :style="glowStyle"></div>
    </div>

    <h1
      class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-0 -mt-4 tracking-wide drop-shadow-md animate-text"
      :class="theme.accent"
    >
      AirConexion
    </h1>
    <p
      :class="`${theme.text} mb-5 text-center text-xs type-animation font-medium`"
    >
      Internet Inalámbrico de alta velocidad
    </p>

    <form @submit.prevent="connect" class="w-full space-y-4">
      <div
        class="relative transform transition-all duration-300 hover:scale-102"
      >
        <input
          id="pin"
          v-model="pin"
          placeholder="Ingrese su PIN"
          class="w-full px-4 py-3.5 rounded-lg border-2 shadow-inner transition text-center text-xl tracking-widest input-shine bg-white/90 text-gray-900 placeholder-gray-400"
          :class="`${theme.border} ${theme.focus} pin-input`"
          required
          autocomplete="off"
        />
        <div class="pin-input-highlight" :class="theme.accent"></div>
      </div>

      <button
        type="submit"
        class="w-full bg-gradient-to-r text-white font-medium py-3.5 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mt-5 overflow-hidden relative button-animated"
        :class="showSuccess ? 'from-emerald-500 to-emerald-700' : theme.button"
        :disabled="isLoading || showSuccess"
      >
        <span v-if="isLoading" class="flex items-center">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Conectando...
        </span>
        <span v-else-if="showSuccess" class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          ¡Conectado!
        </span>
        <span v-else class="flex items-center">
          Conectar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-2 animate-bounce-x"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      </button>
    </form>

    <!-- Área de contacto/publicidad -->
    <div
      class="w-full mt-4 px-3 py-3 rounded-lg border text-center text-xs font-medium shadow-md contact-card"
      :class="`${theme.text} ${theme.border}`"
    >
      <div class="flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        Contáctanos al
        <span class="font-bold pulse-highlight">68093780</span>
      </div>
    </div>

    <div
      class="mt-4 text-center text-xs text-gray-600 border-t border-gray-100/30 pt-3 w-full"
    >
      <p>
        Al conectarte aceptas nuestros
        <a
          href="#"
          :class="`${theme.text} hover:underline font-medium transition-colors`"
          >Términos y Condiciones</a
        >
      </p>
      <div class="flex items-center justify-center mt-2">
        <p class="text-gray-400 text-[11px]">Diseñado por Nelink</p>
      </div>
    </div>

    <!-- Indicador de señal WiFi con animación -->
    <div class="absolute bottom-2 right-2 flex space-x-1">
      <div :class="`w-1 h-3 ${theme.progressBar[0]} rounded-sm wifi-bar`"></div>
      <div :class="`w-1 h-5 ${theme.progressBar[1]} rounded-sm wifi-bar`"></div>
      <div :class="`w-1 h-7 ${theme.progressBar[2]} rounded-sm wifi-bar`"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.02);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes shine {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes bounce-x {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3px);
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes wifi-pulse {
  0%,
  100% {
    height: 100%;
    opacity: 1;
  }
  50% {
    height: 40%;
    opacity: 0.7;
  }
}

@keyframes pulse-text {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 5px currentColor;
  }
}

/* Animaciones y transiciones agrupadas */
.animate-pulse-subtle,
.glow-effect {
  animation: pulse-subtle 3s infinite ease-in-out;
}
.glow-effect {
  animation-duration: 4s;
  opacity: 0.7;
}

.hover-float,
.button-animated {
  transition: transform 0.3s ease;
}
.hover-float:hover {
  animation: float 3s infinite ease-in-out;
}

form {
  animation: fadeIn 0.6s ease-out forwards;
}

.shine-animation,
.animate-text {
  background-size: 200% 200%;
  animation: shine 3s linear infinite;
}
.animate-text {
  background-size: 200% auto;
  animation-duration: 5s;
}

.animate-bounce-x {
  animation: bounce-x 1s infinite ease-in-out;
}

.type-animation {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(40, end);
}

.wifi-bar {
  transition: all 0.5s ease;
  transform-origin: bottom;
  position: relative;
}
.wifi-bar::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: currentColor;
  animation: wifi-pulse 1.5s infinite ease-in-out;
  animation-delay: calc(var(--bar-index) * 0.2s);
}
.wifi-bar:nth-child(1)::before {
  --bar-index: 0;
}
.wifi-bar:nth-child(2)::before {
  --bar-index: 1;
}
.wifi-bar:nth-child(3)::before {
  --bar-index: 2;
}

.button-animated:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
}

.input-shine {
  position: relative;
  overflow: hidden;
}
.input-shine:focus::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shine 1.5s infinite;
}

.scale-102:hover {
  transform: scale(1.02);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
button:not(:disabled):hover::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: translate(-50%, -50%);
}

.glow-container {
  position: relative;
}

/* New styles */
.contact-card {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.pulse-highlight {
  animation: pulse-text 2s infinite;
}

.pin-input {
  position: relative;
  letter-spacing: 3px;
  font-weight: 600;
}

.pin-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.pin-input-highlight {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  height: 2px;
  width: 80%;
  background: linear-gradient(to right, transparent, currentColor, transparent);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.pin-input:focus + .pin-input-highlight {
  transform: translateX(-50%) scaleX(1);
  opacity: 1;
}

@media (max-width: 370px) {
  .pin-input {
    font-size: 1rem;
  }
}
</style>
