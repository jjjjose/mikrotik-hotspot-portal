<script setup lang="ts">
// import BackgroundImg from '@/assets/img/fondo_wifi_6.jpeg'
import BackgroundImg2 from '@/assets/img/fondo2.jpeg'
import Logo from '@/assets/img/air.png'
import { ref, onMounted, computed } from 'vue'

const pin = ref('')
const isLoading = ref(false)
const isVisible = ref(false)
const showSuccess = ref(false)

// Temas de color disponibles
const themes: Record<string, any> = {
  blue: {
    primary: 'from-blue-500 to-blue-700',
    secondary: 'from-blue-400 via-blue-600 to-blue-400',
    accent: 'from-blue-700 to-blue-900',
    bg: 'bg-[#0a2540]',
    border: 'border-blue-200',
    focus: 'focus:border-blue-500 focus:ring-blue-300',
    text: 'text-blue-700',
    glow: 'rgba(59, 130, 246, 0.3)',
    button: 'from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
    progressBar: ['bg-blue-300', 'bg-blue-400', 'bg-blue-500'],
  },
  purple: {
    primary: 'from-purple-500 to-indigo-700',
    secondary: 'from-indigo-400 via-purple-600 to-indigo-400',
    accent: 'from-indigo-700 to-purple-900',
    bg: 'bg-[#2d1b69]',
    border: 'border-purple-200',
    focus: 'focus:border-purple-500 focus:ring-purple-300',
    text: 'text-purple-700',
    glow: 'rgba(139, 92, 246, 0.3)',
    button:
      'from-purple-500 to-indigo-700 hover:from-purple-600 hover:to-indigo-800',
    progressBar: ['bg-purple-300', 'bg-purple-400', 'bg-purple-500'],
  },
  teal: {
    primary: 'from-teal-500 to-emerald-700',
    secondary: 'from-emerald-400 via-teal-600 to-emerald-400',
    accent: 'from-teal-700 to-emerald-900',
    bg: 'bg-[#0f3d40]',
    border: 'border-teal-200',
    focus: 'focus:border-teal-500 focus:ring-teal-300',
    text: 'text-teal-700',
    glow: 'rgba(20, 184, 166, 0.3)',
    button:
      'from-teal-500 to-emerald-700 hover:from-teal-600 hover:to-emerald-800',
    progressBar: ['bg-teal-300', 'bg-teal-400', 'bg-teal-500'],
  },
  amber: {
    primary: 'from-orange-500 to-amber-700',
    secondary: 'from-amber-400 via-orange-600 to-amber-400',
    accent: 'from-amber-700 to-orange-900',
    bg: 'bg-[#422006]',
    border: 'border-amber-200',
    focus: 'focus:border-amber-500 focus:ring-amber-300',
    text: 'text-amber-700',
    glow: 'rgba(251, 191, 36, 0.3)',
    button:
      'from-orange-500 to-amber-700 hover:from-orange-600 hover:to-amber-800',
    progressBar: ['bg-amber-300', 'bg-amber-400', 'bg-amber-500'],
  },
}

// Tema actual
const currentTheme = ref('blue')

// Logo color basado en el tema
const logoFilterStyle = computed(() => {
  switch (currentTheme.value) {
    case 'purple':
      return 'brightness(0) invert(35%) sepia(25%) saturate(2000%) hue-rotate(240deg) brightness(100%) contrast(95%)'
    case 'teal':
      return 'brightness(0) invert(50%) sepia(80%) saturate(400%) hue-rotate(130deg) brightness(90%) contrast(95%)'
    case 'amber':
      return 'brightness(0) invert(70%) sepia(90%) saturate(1000%) hue-rotate(350deg) brightness(100%) contrast(95%)'
    default: // 'blue'
      return 'brightness(0) invert(50%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(95%)'
  }
})

// Obtener el tema actual
const theme = computed(() => themes[currentTheme.value])

// Función para cambiar el tema
const changeTheme = (newTheme: string) => {
  currentTheme.value = newTheme

  // Actualiza las variables CSS según el tema seleccionado
  document.documentElement.style.setProperty(
    '--bg-overlay-color',
    getOverlayColor(newTheme),
  )
}

// Función para determinar el color de superposición del fondo
const getOverlayColor = (themeName: string) => {
  switch (themeName) {
    case 'purple':
      return 'rgba(45, 27, 105, 0.7)'
    case 'teal':
      return 'rgba(15, 61, 64, 0.7)'
    case 'amber':
      return 'rgba(66, 32, 6, 0.7)'
    default: // blue
      return 'rgba(10, 37, 64, 0.7)'
  }
}

// Colores específicos para los botones de temas
const themeColors = {
  blue: { start: '#3b82f6', end: '#1d4ed8' },
  purple: { start: '#a855f7', end: '#6366f1' },
  teal: { start: '#14b8a6', end: '#059669' },
  amber: { start: '#f97316', end: '#b45309' },
}

// Estilo para el fondo de la página
const bgStyle = computed(() => {
  return `background-image: url('${BackgroundImg2}'); background-color: var(--bg-overlay-color);`
})

// Estilo para el efecto glow
const glowStyle = computed(() => {
  return `background: radial-gradient(circle, ${theme.value.glow} 0%, rgba(59, 130, 246, 0) 70%);`
})

const connect = () => {
  if (!pin.value) return
  isLoading.value = true

  // Simular tiempo de conexión
  setTimeout(() => {
    isLoading.value = false
    showSuccess.value = true

    setTimeout(() => {
      console.log('Conectando con PIN:', pin.value)
      // Aquí iría la lógica real de conexión
    }, 800)
  }, 1500)
}

onMounted(() => {
  // Animar entrada del panel
  setTimeout(() => {
    isVisible.value = true
  }, 100)

  // Establece el color de superposición inicial
  document.documentElement.style.setProperty(
    '--bg-overlay-color',
    getOverlayColor(currentTheme.value),
  )
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-blend-overlay relative transition-colors duration-500"
    :class="theme.bg"
    :style="bgStyle"
  >
    <!-- Selector de tema -->
    <div class="absolute top-4 right-4 flex space-x-2 z-10">
      <button
        v-for="(colors, themeName) in themeColors"
        :key="themeName"
        @click="changeTheme(themeName)"
        class="w-6 h-6 rounded-full transition-transform hover:scale-110 shadow-lg border border-white/30 flex-shrink-0"
        :class="
          currentTheme === themeName
            ? 'ring-2 ring-white ring-offset-2 ring-offset-black/20'
            : ''
        "
        :style="`background: linear-gradient(to right, ${colors.start}, ${colors.end});`"
        aria-label="Cambiar tema"
      ></button>
    </div>

    <!-- Partículas decorativas animadas -->
    <div class="particles-container">
      <div v-for="n in 20" :key="n" class="particle"></div>
    </div>

    <div
      class="w-full max-w-xs flex flex-col items-center bg-white/85 rounded-2xl p-5 shadow-2xl backdrop-blur-lg relative overflow-hidden transition-all duration-500 transform"
      :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
    >
      <!-- Decoración superior -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r shine-animation"
        :class="theme.secondary"
      ></div>

      <div class="w-full flex justify-center relative glow-container -mt-1">
        <img
          :src="Logo"
          alt="Logo"
          class="w-32 h-32 object-scale-down filter drop-shadow-lg hover-float"
          :style="`filter: ${logoFilterStyle}`"
        />
        <!-- Efecto de resplandor detrás del logo -->
        <div class="glow-effect" :style="glowStyle"></div>
      </div>

      <h1
        class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-0 -mt-4 tracking-wide drop-shadow-sm animate-text"
        :class="theme.accent"
      >
        AirConexion
      </h1>
      <p :class="`${theme.text} mb-4 text-center text-xs type-animation`">
        Internet Inalámbrico de alta velocidad
      </p>

      <form @submit.prevent="connect" class="w-full space-y-4">
        <div
          class="relative transform transition-all duration-300 hover:scale-102"
        >
          <input
            id="pin"
            v-model="pin"
            type="tel"
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="Ingrese su PIN"
            class="w-full px-4 py-3 rounded-lg border-2 shadow-inner transition text-center text-xl tracking-widest input-shine bg-white/90 text-gray-900 placeholder-gray-500"
            :class="`${theme.border} ${theme.focus}`"
            required
            maxlength="6"
            autocomplete="off"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r text-white font-medium py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mt-4 overflow-hidden relative button-animated"
          :class="
            showSuccess ? 'from-emerald-500 to-emerald-700' : theme.button
          "
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
      </div>

      <!-- Indicador de señal WiFi con animación -->
      <div class="absolute bottom-2 right-2 flex space-x-1">
        <div
          :class="`w-1 h-3 ${theme.progressBar[0]} rounded-sm wifi-bar`"
        ></div>
        <div
          :class="`w-1 h-5 ${theme.progressBar[1]} rounded-sm wifi-bar`"
        ></div>
        <div
          :class="`w-1 h-7 ${theme.progressBar[2]} rounded-sm wifi-bar`"
        ></div>
      </div>
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

@keyframes pulse-soft {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.02);
    opacity: 1;
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

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0) rotate(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(calc(var(--x-offset) * 50px))
      rotate(calc(var(--rotation) * 360deg));
    opacity: 0;
  }
}

/* Clases para efectos visuales */
.animate-pulse-subtle {
  animation: pulse-subtle 3s infinite ease-in-out;
}

.hover-float:hover {
  animation: float 3s infinite ease-in-out;
}

.hover-float {
  transition: transform 0.3s ease;
}

form {
  animation: fadeIn 0.5s ease-out forwards;
}

.shine-animation {
  background-size: 200% 200%;
  animation: shine 3s linear infinite;
}

.pulse-soft {
  animation: pulse-soft 2s infinite ease-in-out;
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

.button-animated {
  transition: all 0.3s ease;
}

.button-animated:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
}

.success-button {
  background: linear-gradient(to right, #10b981, #059669);
  transform: scale(1.03);
}

.glow-container {
  position: relative;
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.3) 0%,
    rgba(59, 130, 246, 0) 70%
  );
  z-index: -1;
  animation: pulse-subtle 4s infinite ease-in-out;
  opacity: 0.7;
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

.animate-text {
  background-size: 200% auto;
  animation: shine 5s linear infinite;
}

.scale-102:hover {
  transform: scale(1.02);
}

/* Partículas decorativas */
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
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  width: 8px;
  height: 8px;
  opacity: 0;
}

.particle {
  --x-offset: 0;
  --rotation: 0;
  left: calc(var(--x-pos) * 1%);
  animation: particle-float calc(20s + (var(--duration) * 10s)) linear infinite;
  animation-delay: calc(var(--delay) * -5s);
}

.particles-container .particle:nth-child(1) {
  --x-pos: 10;
  --duration: 0.5;
  --delay: 0.1;
}

.particles-container .particle:nth-child(2) {
  --x-pos: 20;
  --duration: 0.7;
  --delay: 0.2;
}

.particles-container .particle:nth-child(3) {
  --x-pos: 30;
  --duration: 0.9;
  --delay: 0.3;
}

.particles-container .particle:nth-child(4) {
  --x-pos: 40;
  --duration: 0.6;
  --delay: 0.4;
}

.particles-container .particle:nth-child(5) {
  --x-pos: 50;
  --duration: 0.8;
  --delay: 0.5;
}

.particles-container .particle:nth-child(6) {
  --x-pos: 60;
  --duration: 1;
  --delay: 0.6;
}

.particles-container .particle:nth-child(7) {
  --x-pos: 70;
  --duration: 0.7;
  --delay: 0.7;
}

.particles-container .particle:nth-child(8) {
  --x-pos: 80;
  --duration: 0.9;
  --delay: 0.8;
}

.particles-container .particle:nth-child(9) {
  --x-pos: 90;
  --duration: 0.5;
  --delay: 0.9;
}

.particles-container .particle:nth-child(10) {
  --x-pos: 15;
  --duration: 0.8;
  --delay: 1;
}

.particles-container .particle:nth-child(11) {
  --x-pos: 25;
  --duration: 0.6;
  --delay: 1.1;
}

.particles-container .particle:nth-child(12) {
  --x-pos: 35;
  --duration: 0.9;
  --delay: 1.2;
}

.particles-container .particle:nth-child(13) {
  --x-pos: 45;
  --duration: 0.7;
  --delay: 1.3;
}

.particles-container .particle:nth-child(14) {
  --x-pos: 55;
  --duration: 0.5;
  --delay: 1.4;
}

.particles-container .particle:nth-child(15) {
  --x-pos: 65;
  --duration: 0.8;
  --delay: 1.5;
}

.particles-container .particle:nth-child(16) {
  --x-pos: 75;
  --duration: 1;
  --delay: 1.6;
}

.particles-container .particle:nth-child(17) {
  --x-pos: 85;
  --duration: 0.6;
  --delay: 1.7;
}

.particles-container .particle:nth-child(18) {
  --x-pos: 95;
  --duration: 0.7;
  --delay: 1.8;
}

.particles-container .particle:nth-child(19) {
  --x-pos: 5;
  --duration: 0.9;
  --delay: 1.9;
}

.particles-container .particle:nth-child(20) {
  --x-pos: 42;
  --duration: 0.8;
  --delay: 2;
  --x-offset: 1;
  --rotation: 1;
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

/* Variables para los temas de color */
:root {
  --bg-overlay-color: rgba(10, 37, 64, 0.7);
}

/* Mejora de estilos para los botones de tema */
button[aria-label='Cambiar tema'] {
  cursor: pointer;
  transition: all 0.2s ease;
}

button[aria-label='Cambiar tema']:hover {
  transform: scale(1.1);
}

button[aria-label='Cambiar tema']:active {
  transform: scale(0.95);
}
</style>
