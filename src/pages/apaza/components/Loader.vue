<script setup lang="ts">
defineProps<{
  color?: string
  size?: 'small' | 'medium' | 'large'
  type?: 'spinner' | 'dots' | 'pulse'
}>()
</script>

<template>
  <div class="loader-container" :class="size || 'medium'">
    <template v-if="type === 'dots'">
      <div class="dots-container">
        <div
          class="dot"
          :style="`background-color: ${color || '#ffffff'}`"
        ></div>
        <div
          class="dot"
          :style="`background-color: ${color || '#ffffff'}`"
        ></div>
        <div
          class="dot"
          :style="`background-color: ${color || '#ffffff'}`"
        ></div>
      </div>
    </template>

    <template v-else-if="type === 'pulse'">
      <div class="pulse-container">
        <div class="pulse" :style="`border-color: ${color || '#ffffff'}`"></div>
      </div>
    </template>

    <template v-else>
      <!-- Default spinner -->
      <svg
        class="spinner"
        viewBox="0 0 50 50"
        :style="`color: ${color || '#ffffff'}`"
      >
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="4"
          stroke="currentColor"
        ></circle>
      </svg>
    </template>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-container.small {
  --size: 20px;
}

.loader-container.medium {
  --size: 30px;
}

.loader-container.large {
  --size: 40px;
}

/* Spinner animation */
.spinner {
  width: var(--size);
  height: var(--size);
  animation: rotate 2s linear infinite;
}

.spinner .path {
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

/* Dots animation */
.dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.dot {
  width: calc(var(--size) / 3);
  height: calc(var(--size) / 3);
  border-radius: 50%;
  background-color: #ffffff;
  animation: dot-pulse 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-pulse {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Pulse animation */
.pulse-container {
  position: relative;
  width: var(--size);
  height: var(--size);
}

.pulse {
  position: absolute;
  border: 4px solid white;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 1;
  animation: pulse 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
