import Vue from 'vue'
// eslint-disable-next-line
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    keycloak: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_KEYCLOAK: (state, keycloak) => {
      state.keycloak = keycloak
    }
  },

  actions: {
    // 登录
    Login ({ commit }, keycloak) {
      return new Promise((resolve, reject) => {
        // login(userInfo).then(response => {
        //   const result = response.result
        //   Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
        //   commit('SET_TOKEN', result.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })

        // console.log(keycloak.loadUserInfo())

        Vue.ls.set(ACCESS_TOKEN, keycloak.token, 5 * 60 * 1000)
        commit('SET_TOKEN', keycloak.token)
        commit('SET_KEYCLOAK', keycloak)
        resolve()
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const result = response.result

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })

              role.permissionList = state.keycloak.realmAccess.roles // role.permissions.map(permission => { return permission.permissionId })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        resolve()
        // logout(state.token).then(() => {
        //   resolve()
        // }).catch(() => {
        //   resolve()
        // })
      })
    }
  }
}

export default user
