<template>
  <a-layout :class="['layout-page']">
    <!-- 顶栏 -->
    <a-layout-header :style="{ padding: '0' }">
      <div class="header">
        <logo class="top-nav-logo" :style="{width:collapsed ? asideWidthCollapse : asideWidth}" />
        <div class="toggle-aside-btn">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
        </div>
        <menu-header></menu-header>
        <!-- 顶栏右侧 -->
        <div class="header-right">
          <span class="action">
            <a-icon type="question-circle-o"></a-icon>
          </span>

          <header-theme></header-theme>
          <header-color></header-color>
          <header-notice></header-notice>
          <header-user></header-user>
        </div>
      </div>
    </a-layout-header>
    <!-- 内容主体 -->
    <a-layout :class="['layout-view-wrapper']">
      <a-layout-sider v-model="collapsed">
        <!-- 侧边菜单 -->
        <side-menu mode="inline" :menus="mainMenu" :collapsed="collapsed"></side-menu>
      </a-layout-sider>
      <!-- 内容 -->
      <a-layout :class="['layout-container-main']">
        <a-layout-content :class="['layout-container']">
          <multi-tab v-if="multiTab"></multi-tab>
          <!-- 页面 -->
          <transition>
            <route-view />
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import RouteView from './RouteView'
import Logo from './components/Logo'
import MenuHeader from './components/MenuHeader'
import HeaderTheme from './components/HeaderTheme'
import HeaderColor from './components/HeaderColor'
import HeaderNotice from './components/HeaderNotice'
import HeaderUser from './components/HeaderUser'
import SideMenu from './components/MenuSide/SideMenu'
import MultiTab from './components/MultiTab'
import config from '@/config/defaultSettings'
import { mixin } from '@/utils/mixin'
import { mapState } from 'vuex'

export default {
  name: 'BasicLayout',
  mixins: [mixin],
  components: {
    RouteView,
    Logo,
    MenuHeader,
    HeaderTheme,
    HeaderColor,
    HeaderNotice,
    HeaderUser,
    MultiTab,
    SideMenu
  },
  computed: {
    ...mapState({
      // 动态菜单
      mainMenu: state => state.permission.aside
    })
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '56px'
    }
  },
  created () {
    // this.menus = this.mainMenu.find(item => item.path === '/business').children
  },
  methods: {
    toggle () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less">
@import '~@assets/theme/register.less';
</style>
