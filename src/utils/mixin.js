// import Vue from 'vue'
import { mapState } from 'vuex'

const mixin = {
  computed: {
    ...mapState({
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      multiTab: state => state.app.multiTab
    })
  },
  methods: {

  }
}

export { mixin }
