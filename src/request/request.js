//引入axios请求模块
import axios from 'axios'

//创建单列(实列化create)
const instance = axios.create({
    //配置请求的基准路径
    baseURL:'http://kumanxuan1.f3322.net:8001',
    //设置请求超时时间
    timeout: 6000
})

//请求拦截器
instance.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    if(token){
        config.headers['X-Nideshop-Token'] = token;
    }
    return config;
}, err => {
    return Promise.reject(err)
})





//响应拦截
instance.interceptors.response.use(res =>{
    return res;
}, err =>{
    return Promise.reject(err)
})

//导出请求拦截
export default instance;