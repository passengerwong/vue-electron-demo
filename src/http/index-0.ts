import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://10.33.11.119:9091';

Vue.prototype.$http = axios;
export default axios;
