import api from "./axios"

// 登陆页面请求token
export const GetToken = params => api.get("/open/getToken", { params})