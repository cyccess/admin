import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import config from '@/config/defaultSettings'

// mock
import './mock'

// 菜单
// import { asyncRouterMap } from '@/router/routes'
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

Vue.use(VueKeyCloak, {
  init: {
    onLoad: 'login-required' // check-sso
    // checkLoginIframe: false // 禁用监控登录状态
  },
  config: config.keycloakConfig,
  onReady: keycloak => {
    console.log(keycloak)
    // console.log(`I wonder what Keycloak returns: ${keycloak}`

    new Vue({
      router,
      store,
      created () {
        bootstrap()
      },
      mounted () {
        // keycloak登录后，记录keycloak信息
        this.$store.dispatch('Login', keycloak)
      },
      watch: {
        // 检测路由变化切换侧边栏内容
        '$route.matched': {
          handler (matched) {
            // if (matched.length > 0) {
            //   const _side = asyncRouterMap.filter(menu => menu.path === matched[0].path)
            //   this.$store.commit('SET_ASIDE', _side.length > 0 ? _side[0].children : [])
            // }
          },
          immediate: true
        }
      },
      render: h => h(App)
    }).$mount('#app')
  }
})
