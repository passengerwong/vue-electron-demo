import Vue from 'vue';
import Axios, { AxiosRequestConfig } from 'axios';
import { clearLoginStatus } from '@/router/tools/toDoLoginStatus';

const origin: string = window.location.origin;
Axios.defaults.baseURL = origin || 'http://10.33.11.112:3333';
// 全局配置
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'; // 请求类型
Axios.defaults.withCredentials = true; // 携带cookie
Axios.defaults.timeout = 3000; // 超时设定3s
Axios.defaults.responseType = 'json'; // 响应类型json
// 添加使用端标识（H5,PC, Android, iOS）
Axios.defaults.headers['client-info'] = 'PC'; // PC客户端

// 拦截器----请求
Axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => config, (err) => {
  console.log('请求拦截器--报错:', err);
  return Promise.reject(err);
});

// 拦截器 -- 响应
Axios.interceptors.response.use((response: any): any => {
  // console.log('响应拦截', response);
  const { data } = response;
  if (data && data.code === '1000000') { // 拦截未登录状态，跳转到登录界面(修改状态)
    clearLoginStatus();
    // origin && (window.location.href = `${origin}/#/login?isNeedBack=true`);
    return;
  }
  return response;
}, err => Promise.reject(err));

Vue.prototype.$http = Axios;
(Vue as any)._http = Axios;
export default Axios;
