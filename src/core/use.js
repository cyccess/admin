import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

// ext library
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'

Vue.use(Antd)

Vue.use(VueStorage, config.storageOptions)
Vue.use(PermissionHelper)
