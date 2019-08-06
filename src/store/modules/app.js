import Vue from 'vue'
import { DEFAULT_THEME, DEFAULT_COLOR, DEFAULT_MULTI_TAB } from '@/store/mutation-types'
import config from '@/config/defaultSettings'

const app = {
  state: {
    themeList: config.theme.list,
    theme: '',
    color: null,
    multiTab: true
  },
  mutations: {
    TOGGLE_THEME: (state, theme) => {
      Vue.ls.set(DEFAULT_THEME, theme)
      state.theme = theme
      // 将 vuex 中的主题应用到 dom
      document.body.className = `theme-${state.theme}`
    },
    TOGGLE_COLOR: (state, color) => {
      Vue.ls.set(DEFAULT_COLOR, color)
      state.color = color
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      Vue.ls.set(DEFAULT_MULTI_TAB, bool)
      state.multiTab = bool
    }
  },
  actions: {
    ToggleTheme ({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleColor ({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    },

    ToggleMultiTab ({ commit }, bool) {
      commit('TOGGLE_MULTI_TAB', bool)
    }
  }
}

export default app
