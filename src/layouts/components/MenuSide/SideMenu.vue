<template>
  <div class="nav-menu-wrapper">
    <s-menu :collapsed="collapsed" :menu="menus" :mode="mode" @select="onSelect"></s-menu>

    <div v-if="(menus&&menus.length===0)&&!collapsed" class="header-aside-menu-empty">
      <div class="aside-menu-empty">
        <a-icon type="inbox" />
        <span>没有侧栏菜单</span>
      </div>
    </div>
  </div>
</template>

<script>
import SMenu from './index'
import { mixin } from '@/utils/mixin'
export default {
  name: 'SideMenu',
  components: { SMenu },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
