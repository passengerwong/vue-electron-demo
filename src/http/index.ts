import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:3333';
console.log('aaaa', axios.defaults.headers);

export default axios;
