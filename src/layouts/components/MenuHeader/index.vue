<template>
  <div class="header-menu">
    <a-menu v-model="current" mode="horizontal" @click="select">
      <a-menu-item key="home">
        <router-link :to="{path:'/'}">
          <a-icon type="home" />首页
        </router-link>
      </a-menu-item>
      <a-menu-item key="shortcut">
        <router-link :to="{path:'/'}">
          <a-icon type="heart" />快捷方式
        </router-link>
      </a-menu-item>
      <a-menu-item v-for="menu in headerMenu" :key="menu.key">
        <a href="javascript:;">
          <a-icon :type="menu.icon" />
          {{ menu.title }}
        </a>
        <!-- <router-link :to="{path:menu.path}">
          <a-icon :type="menu.icon" />
          {{ menu.title }}
        </router-link>-->
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderMenu',
  data () {
    return {
      current: ['home']
    }
  },
  computed: {
    ...mapGetters(['addRouters']),
    headerMenu () {
      const menu = this.addRouters.filter(item => !!item.meta)
      return menu.map(item => {
        return {
          path: item.path,
          title: item.meta.title,
          icon: item.meta.icon,
          key: item.name
        }
      })
    }
  },
  methods: {
    // 切换项目改变侧栏菜单
    select ({ key }) {
      const _side = this.addRouters.filter(menu => menu.name === key)
      this.$store.commit('SET_ASIDE', _side.length > 0 ? _side[0].children : [])
    }
  }
}
</script>
