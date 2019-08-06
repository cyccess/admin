<template>
  <div>
    <span class="action" @click="dialogVisible = true">
      <a-icon type="skin"></a-icon>
    </span>

    <a-modal title="主题" :visible="dialogVisible" @cancel="()=>{dialogVisible=false}" :footer="null">
      <theme-list></theme-list>
    </a-modal>
  </div>
</template>
<script>
import ThemeList from './components/ThemeList'
export default {
  components: { ThemeList },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
