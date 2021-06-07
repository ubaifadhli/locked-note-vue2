import Vue from 'vue'
import Chakra, { CThemeProvider, CReset } from '@chakra-ui/vue'
import Clipboard from 'v-clipboard'
import App from './App.vue'
import router from './router'
import 'vue2-datepicker/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Chakra)
Vue.use(Clipboard)

new Vue({
  el: '#app',
  router,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount()