<template>
  <a-popover placement="bottom" title="选择主题色">
    <template slot="content">
      <div>
        <a-tag
          :color="item.color"
          @click="changeColor(item.color)"
          v-for="(item,index) in colorList"
          :key="index"
        >
          <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
          <span>{{ item.name }}</span>
        </a-tag>
      </div>
    </template>
    <span class="action">
      <a-icon type="down-square" :style="{color:primaryColor}"></a-icon>
    </span>
  </a-popover>
</template>
<script>
import { mapActions } from 'vuex'
import themeColor from './themeColor'
import { mixin } from '@/utils/mixin'

export default {
  mixins: [mixin],
  data () {
    return {
      colorList: [
        { name: '薄暮', color: '#f5222d' },
        { name: '火山', color: '#ff5500' },
        { name: '明青', color: '#13c2c2' },
        { name: '极光绿', color: '#52c41a' },
        { name: '拂晓蓝(默认)', color: '#108ee9' },
        { name: '酱紫', color: '#722ed1' }
      ]
    }
  },
  mounted () {
    this.changeColor(this.primaryColor)
  },
  methods: {
    ...mapActions(['ToggleColor']),
    changeColor (primaryColor) {
      this.ToggleColor(primaryColor)
      const hideMessage = this.$message.loading('正在切换主题！', 0)
      themeColor.changeColor(primaryColor).finally(t => {
        hideMessage()
      })
    }
  }
}
</script>
