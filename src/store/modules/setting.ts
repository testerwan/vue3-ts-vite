//Layout组件配置的仓库
import { defineStore } from 'pinia'
let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
})
export default useLayoutSettingStore
