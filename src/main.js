import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import Vuelazyload from 'vue-lazyload'

import './common/stylus/reset.styl'
import './common/stylus/icon.styl'
import './common/stylus/scale-1px.styl'


import GloBalCom from './api/global-com-reg';

Vue.config.productionTip = false

Vue.use(Vuelazyload, {
  loading: require('common/image/me.jpg')
})
Vue.use(VueResource)
Vue.use(GloBalCom)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
