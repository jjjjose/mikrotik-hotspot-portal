import { reactive, toRefs } from 'vue'

interface RouterOsDataState {
  chapId: string
  chapSecret: string
  ip: string
  chapChallenge: string
  linkLoginOnly: string
  linkOrig: string
  mac?: string
  username?: string
  domain?: string
  server?: string
  serverAddress?: string
  trial?: string
  uptime?: string
  sessionTime?: string
  remainingBytes?: string
  bytesSent?: string
  bytesReceived?: string
  loginBy?: string
  identity?: string
  error?: string
  macIdent?: string
  hostIdent?: string
}

function createRouterOsData() {
  const state = reactive<RouterOsDataState>({
    chapId: '',
    chapSecret: '',
    ip: '',
    chapChallenge: '',
    linkLoginOnly: '',
    linkOrig: '',
  })

  const saveData = (): void => {
    const dataLocal = localStorage.getItem('routerOSData')
    console.log('leyendo...')
    if (dataLocal) {
      try {
        const dataRouterOS: RouterOsDataState = JSON.parse(dataLocal)
        Object.assign(state, dataRouterOS)
        console.log('RouterOS data loaded:', dataRouterOS)
        console.log(JSON.stringify(dataRouterOS, null, 2))
      } catch (error) {
        console.error('Error parsing RouterOS data:', error)
      }
    }
  }

  // Ejecutar saveData inmediatamente al crear la instancia
  saveData()

  return { ...toRefs(state), saveData }
}

// Singleton instance
let uniqueInstance: ReturnType<typeof createRouterOsData> | null = null

export default function useRouterOsData(): ReturnType<
  typeof createRouterOsData
> {
  if (!uniqueInstance) {
    uniqueInstance = createRouterOsData()
  }
  return uniqueInstance
}
