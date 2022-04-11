import PanelComponent from './Panel.vue'
import type { App } from 'vue'

const Panel = {
  install(Vue: App) {
    Vue.component(PanelComponent.name, PanelComponent)
  },
}

export default Panel
