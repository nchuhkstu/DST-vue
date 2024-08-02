import axios from 'axios'
export function request(config){
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:5000',
        timeout:5000000
    })
    //添加请求拦截器
    instance.interceptors.request.use(function(config){
        //在发送请求之前做些什么
        return config;
    },function(error){
        //在请求错误做些什么
        return Promise.reject(error);
    });
    //添加响应拦截器
    instance.interceptors.response.use(function(response){
        //2xx范围内的状态码都会触发该函数
        //对响应数据做些什么
        return response;
    },function(error){
        //超出2xx范围内的状态码都会触发该函数
        //对响应错误做些什么
        return Promise.reject(error);
    });
    return instance(config)
}