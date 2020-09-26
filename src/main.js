import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入按需使用的组件和组件样式
// vantUI
import "./vantUI/index"
import 'vant/lib/index.css';
// elementUI
import "./elmUI/index"
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
