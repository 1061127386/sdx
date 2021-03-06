import Vue from "vue";
import axios from "axios";

// 创建拦截请求实例
const instance = axios.create({
    baseURL: "https://www.ahsj.link/nebula-api",
    // timeout:5000 // 请求返回数据等待时间 超过就断开请求 
})



//  浏览器请求前的拦截
instance.interceptors.request.use(config => {
    let token = localStorage.getItem("token")
    // console.log(token)
    if (token) {
        config.headers["x-auth-token"] = token
    }
    // console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})


// 接收到服务器响应后的拦截
instance.interceptors.response.use(response => {

    // console.log(response)
    return response
}, error => {
    return Promise.reject(error)
})

// 导出拦截配置
export default instance