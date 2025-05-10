export const themes = {
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
  green: {
    primary: 'from-green-500 to-green-700',
    secondary: 'from-green-400 via-green-600 to-green-400',
    accent: 'from-green-700 to-green-900',
    bg: 'bg-[#064e3b]',
    border: 'border-green-200',
    focus: 'focus:border-green-500 focus:ring-green-300',
    text: 'text-green-700',
    glow: 'rgba(34,197,94,0.3)',
    button:
      'from-green-500 to-green-700 hover:from-green-600 hover:to-green-800',
    progressBar: ['bg-green-300', 'bg-green-400', 'bg-green-500'],
  },
  pink: {
    primary: 'from-pink-500 to-fuchsia-700',
    secondary: 'from-fuchsia-400 via-pink-600 to-fuchsia-400',
    accent: 'from-pink-700 to-fuchsia-900',
    bg: 'bg-[#831843]',
    border: 'border-pink-200',
    focus: 'focus:border-pink-500 focus:ring-pink-300',
    text: 'text-pink-700',
    glow: 'rgba(236,72,153,0.3)',
    button:
      'from-pink-500 to-fuchsia-700 hover:from-pink-600 hover:to-fuchsia-800',
    progressBar: ['bg-pink-300', 'bg-pink-400', 'bg-pink-500'],
  },
}

export const logoFilters: Record<string, string> = {
  purple:
    'brightness(0) invert(35%) sepia(25%) saturate(2000%) hue-rotate(240deg) brightness(100%) contrast(95%)',
  teal: 'brightness(0) invert(50%) sepia(80%) saturate(400%) hue-rotate(130deg) brightness(90%) contrast(95%)',
  amber:
    'brightness(0) invert(70%) sepia(90%) saturate(1000%) hue-rotate(350deg) brightness(100%) contrast(95%)',
  green:
    'brightness(0) invert(60%) sepia(80%) saturate(800%) hue-rotate(90deg) brightness(95%) contrast(95%)',
  pink: 'brightness(0) invert(60%) sepia(80%) saturate(1200%) hue-rotate(320deg) brightness(100%) contrast(95%)',
  blue: 'brightness(0) invert(50%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(95%)',
}

export const overlayColors: Record<string, string> = {
  purple: 'rgba(45, 27, 105, 0.7)',
  teal: 'rgba(15, 61, 64, 0.7)',
  amber: 'rgba(66, 32, 6, 0.7)',
  green: 'rgba(6, 78, 59, 0.7)',
  pink: 'rgba(131, 24, 67, 0.7)',
  blue: 'rgba(10, 37, 64, 0.7)',
}
