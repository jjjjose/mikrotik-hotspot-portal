<script setup lang="ts">
import BackgroundImg2 from '../../assets/img/fondo_lite.jpeg'
import Logo from '../../assets/img/air.png'
import LoginCard from './components/LoginCard.vue'
import Toast from './components/Toast.vue'
import Loader from './components/Loader.vue'
import { ref, onMounted, computed } from 'vue'
import {
  themes,
  logoFilters,
  overlayColors,
  type ThemeProperties,
} from './themes'
import useRouterOsData from '../../composables/router-os-data.ts'

const pin = ref('')
const isLoading = ref(false)
const isVisible = ref(false)
const showSuccess = ref(false)

// Toast state
const showToast = ref(false)
const toastMessage = ref('Este es un mensaje de prueba para el Toast')
const toastType = ref<'error' | 'success' | 'info' | 'warning'>('error')

const currentTheme = ref('purple')
const theme = computed<ThemeProperties>(() => themes[currentTheme.value])

const logoFilterStyle = computed(
  () => logoFilters[currentTheme.value] || logoFilters.blue,
)
const showChangeTheme = ref(false)
const changeTheme = (newTheme: string) => {
  currentTheme.value = newTheme
  document.documentElement.style.setProperty(
    '--bg-overlay-color',
    overlayColors[newTheme],
  )
}

const themeColors = {
  blue: { start: '#3b82f6', end: '#1d4ed8' },
  purple: { start: '#a855f7', end: '#6366f1' },
  teal: { start: '#14b8a6', end: '#059669' },
  amber: { start: '#f97316', end: '#b45309' },
  green: { start: '#22c55e', end: '#166534' },
  pink: { start: '#ec4899', end: '#a21caf' },
}

const bgStyle = computed(
  () =>
    `background-image: url('${BackgroundImg2}'); background-color: var(--bg-overlay-color);`,
)

const glowStyle = computed(
  () =>
    `background: radial-gradient(circle, ${theme.value.glow} 0%, rgba(59, 130, 246, 0) 70%);`,
)

const { error } = useRouterOsData()

const connect = (pinValue: string) => {
  pin.value = pinValue
  if (!pin.value) return
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    showSuccess.value = true
    setTimeout(() => {
      // Aquí iría la lógica real de conexión
    }, 800)
  }, 1500)
}

const closeToast = () => {
  showToast.value = false
}

// Generar partículas aleatorias
interface ParticleProps {
  xPos: number
  duration: number
  delay: number
  xOffset: number
  rotation: number
  size: number
  opacity: number
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const PARTICLE_COUNT = 30
const particles = Array.from(
  { length: PARTICLE_COUNT },
  (): ParticleProps => ({
    xPos: random(0, 100),
    duration: random(0.5, 1.5),
    delay: random(0, 2),
    xOffset: random(-2, 2),
    rotation: random(0, 1),
    size: random(4, 10),
    opacity: random(0.2, 0.4),
  }),
)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  document.documentElement.style.setProperty(
    '--bg-overlay-color',
    overlayColors[currentTheme.value],
  )

  // Check for error from RouterOS data
  if (error?.value) {
    toastMessage.value = error.value
    showToast.value = true

    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      showToast.value = false
    }, 5000)
  }
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-blend-overlay relative transition-colors duration-500"
    :class="theme.bg"
    :style="bgStyle"
  >
    <!-- Selector de tema con nombre visible -->
    <div
      v-if="showChangeTheme"
      class="theme-selector-container absolute top-4 right-4 z-10 flex flex-col items-end"
    >
      <div class="theme-selector flex space-x-2">
        <button
          v-for="(colors, themeName) in themeColors"
          :key="themeName"
          @click="changeTheme(themeName)"
          class="theme-btn relative"
          :class="
            currentTheme === themeName
              ? 'ring-2 ring-white ring-offset-2 ring-offset-black/20 scale-110 z-10'
              : ''
          "
          :style="`background: linear-gradient(to right, ${colors.start}, ${colors.end});`"
          aria-label="Cambiar tema"
        >
          <span
            v-if="currentTheme === themeName"
            class="absolute inset-0 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white drop-shadow-md"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>

    <!-- Toast Component -->
    <Toast
      :message="toastMessage"
      :type="toastType"
      :is-visible="showToast"
      @close="closeToast"
    />

    <!-- Partículas decorativas animadas -->
    <div class="particles-container">
      <div
        v-for="(p, idx) in particles"
        :key="idx"
        class="particle"
        :style="`
          --x-pos: ${p.xPos};
          --duration: ${p.duration};
          --delay: ${p.delay};
          --x-offset: ${p.xOffset};
          --rotation: ${p.rotation};
          --size: ${p.size}px;
          --opacity: ${p.opacity};
        `"
      ></div>
    </div>

    <!-- Full screen loader overlay when connecting -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center"
      :class="{ 'loader-visible': isLoading, 'loader-hidden': !isLoading }"
    >
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        :class="{ 'opacity-100': isLoading, 'opacity-0': !isLoading }"
        @click.prevent
      ></div>
      <div
        class="loader-card relative z-10 text-center p-8 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/20 shadow-xl transform transition-all duration-500"
        :class="{
          'translate-y-0 scale-100 opacity-100': isLoading,
          'translate-y-8 scale-95 opacity-0': !isLoading,
        }"
        :style="`box-shadow: 0 0 40px rgba(0,0,0,0.2), 0 0 20px ${theme.primary}40;`"
      >
        <div class="relative">
          <Loader
            :type="'dots'"
            :size="'large'"
            :color="theme.primary"
            class="mb-6"
          />
          <div
            class="pulse-circle absolute"
            :style="`background: ${theme.primary}20;`"
          ></div>
        </div>
        <p class="text-white font-medium text-xl">
          Conectando a la red<span class="loading-dots"></span>
        </p>
      </div>
    </div>

    <LoginCard
      :theme="theme"
      :logo="Logo"
      :logo-filter-style="logoFilterStyle"
      :glow-style="glowStyle"
      :is-visible="isVisible"
      :show-success="showSuccess"
      :current-theme-name="currentTheme"
      @connect="connect"
      v-model:is-loading="isLoading"
    />
  </div>
</template>

<style scoped>
@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0) rotate(0);
    opacity: 0;
  }
  10%,
  90% {
    opacity: var(--opacity, 0.3);
  }
  100% {
    transform: translateY(-100vh) translateX(calc(var(--x-offset, 0) * 50px))
      rotate(calc(var(--rotation, 0) * 360deg));
    opacity: 0;
  }
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  bottom: -10px;
  left: calc(var(--x-pos, 0) * 1%);
  width: var(--size, 8px);
  height: var(--size, 8px);
  border-radius: 50%;
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  opacity: 0;
  animation: particle-float calc(20s + (var(--duration, 1) * 10s)) linear
    infinite;
  animation-delay: calc(var(--delay, 0) * -5s);
  z-index: 1;
  /* All variables with defaults */
  --x-pos: 50;
  --duration: 1;
  --delay: 0;
  --x-offset: 0;
  --rotation: 0;
  --size: 8px;
  --opacity: 0.3;
  /* Add filter for glow effect */
  filter: blur(0.5px);
}

.theme-selector-container {
  transition: all 0.3s ease;
}

.theme-selector {
  background-color: rgba(0, 0, 0, 0.15);
  padding: 8px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.theme-name-display {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.3s ease;
}

.theme-selector:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

.theme-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  cursor: pointer;
}

.theme-btn:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.theme-btn:active {
  transform: scale(0.95);
}

:root {
  --bg-overlay-color: rgba(10, 37, 64, 0.7);
}

@media (max-width: 640px) {
  .theme-btn {
    width: 1.5rem;
    height: 1.5rem;
  }

  .theme-selector-container {
    top: auto;
    bottom: 4rem;
    right: 50%;
    transform: translateX(50%);
    flex-direction: column-reverse;
    align-items: center;
  }

  .theme-name-display {
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
}

/* Add new styles for the loader overlay */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Improved loader overlay transitions */
.loader-visible {
  pointer-events: auto;
  visibility: visible;
}

.loader-hidden {
  pointer-events: none;
  visibility: hidden;
  /* Using visibility keeps the blur loaded but hidden */
  transition: visibility 0s linear 0.5s;
}

.loader-visible .backdrop-blur-md {
  transition-delay: 0s !important;
}

.loader-hidden .backdrop-blur-md {
  transition-delay: 0s;
}

.loader-card {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

@keyframes pulse-circle {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
}

.pulse-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-circle 2s ease-in-out infinite;
  z-index: -1;
  filter: blur(10px);
}

@keyframes loading-dots {
  0%,
  20% {
    content: '.';
  }
  40%,
  60% {
    content: '..';
  }
  80%,
  100% {
    content: '...';
  }
}

.loading-dots::after {
  content: '';
  animation: loading-dots 1.5s infinite steps(1);
}
</style>
