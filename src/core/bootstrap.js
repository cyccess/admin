import Vue from 'vue'
import store from '@/store/'
import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_MULTI_TAB
} from '@/store/mutation-types'
import config from '@/config/defaultSettings'

export default function Initializer () {
  store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
  store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
  store.commit('TOGGLE_MULTI_TAB', Vue.ls.get(DEFAULT_MULTI_TAB, config.multiTab))
  store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))

  // last step
}
