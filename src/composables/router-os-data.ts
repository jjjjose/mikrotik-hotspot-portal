import { reactive, toRefs } from 'vue'

interface RouterOsDataState {
  chapId: string;
  chapSecret: string;
  ip: string;
  chapChallenge: string;
  linkLoginOnly: string;
  linkOrig: string;
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
    const dataLocal = localStorage.getItem('dataRouterOS')
    const dataRouterOS: RouterOsDataState = dataLocal ? JSON.parse(dataLocal) : alert('No hay datos guardados')
    Object.assign(state, dataRouterOS)
  }

  return { ...toRefs(state), saveData }
}

let uniqueInstance: ReturnType<typeof createRouterOsData> | null = null

export default function useRouterOsData(): ReturnType<typeof createRouterOsData> {
  if (!uniqueInstance) {
    uniqueInstance = createRouterOsData()
  }
  return uniqueInstance
}
