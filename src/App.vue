<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {}
}
</script>
<style lang="less">
@import '~@assets/global.less';
</style>
