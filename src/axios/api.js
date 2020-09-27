import api from "./axios"

// 登陆页面请求token
export const GetToken = params => api.get("/open/getToken", { params })

// 个人中心用户信息展示
export const GetUsers = () => api.get("/users/list")

// 个人中心用户信息详情
export const GetUserInfo = () => api.get("/users/info")

// 个人中心>版本信息
export const GetVersion = () => api.get("/users/version")

// 客户列表信息
export const GetCustList = params => api.get("/api/cust",{params})

// 获取客户视图
export const PostCust = id => api.post("/api/cust/" + id)

// 获取客户信息详情
export const GetCustInfo = id => api.get("/api/cust/"+id)

// 修改客户信息
export const PutCustInfo = params => api.put("/api/cust" ,params)

// 新增客户信息
export const PostCustInfo = params => api.post("/api/cust", params)