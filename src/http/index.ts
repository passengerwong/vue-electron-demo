import Axios, { AxiosRequestConfig } from 'axios';

// Axios.defaults.baseURL = 'http://127.0.0.1:3333';
Axios.defaults.baseURL = 'http://10.33.11.141:3333';
Axios.defaults.withCredentials = true;

// 拦截器----请求
Axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  console.log('请求拦截器：', config);
  return config;
}, (err) => {
  console.log('请求拦截器--报错:', err);
  return Promise.reject(err);
});

// 拦截器 -- 响应
Axios.interceptors.response.use((response: any): any => {
  console.log('000fd', response);
  return response;
}, err => Promise.reject(err));

export default Axios;
