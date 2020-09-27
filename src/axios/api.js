import api from "./axios"

// 登陆页面请求token
export const GetToken = params => api.get("/open/getToken", { params })

// 个人中心用户信息展示
export const GetUsers = () => api.get("/users/list")

// 个人中心用户信息详情
export const GetUserInfo = () => api.get("/users/info")


// 个人中心>版本信息
export const GetVersion = () => api.get("/users/version")
