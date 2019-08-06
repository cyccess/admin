<template>
  <a-table
    :dataSource="themeList"
    :rowKey="record=>record.name"
    :pagination="false"
    :bordered="true"
    :showHeader="false"
  >
    <a-table-column data-index="title" align="center" />
    <a-table-column data-index="name" align="center" />
    <a-table-clounm>
      <template slot-scope="record">
        <a-button type="primary" v-if="record.name===theme">已激活</a-button>
        <a-button v-else @click="handleSelectTheme(record.name)">选择</a-button>
      </template>
    </a-table-clounm>
  </a-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      themeList: state => state.app.themeList,
      theme: state => state.app.theme
    })
  },
  methods: {
    ...mapActions(['ToggleTheme']),
    handleSelectTheme (name) {
      this.ToggleTheme(name)
    }
  }
}
</script>
