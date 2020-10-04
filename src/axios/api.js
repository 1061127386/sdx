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
export const GetCustList = params => api.get("/api/cust", { params })

// 获取客户视图
export const PostCust = id => api.post("/api/cust/" + id)

// 获取客户信息详情
export const GetCustInfo = id => api.get("/api/cust/" + id)

// 修改客户信息
export const PutCustInfo = params => api.put("/api/cust", params)

// 新增客户信息
export const PostCustInfo = params => api.post("/api/cust", params)

// 走访列表信息
export const GetVisitList = params => api.get("/api/visit", { params })

// 获取走访信息详情
export const GetVisitInfo = id => api.get("/api/visit/" + id)

// 新增走访信息
export const PostVisit = params => api.post("/api/visit", params)

// 消息中心列表
export const GetMessageList = params => api.get("/api/message", { params })

// 消息中心详情
export const GetMessageInfo = id => api.get("/api/message/" + id)

// 标记信息为已读
export const PutMessageUpdates = id => api.put("/api/message/updates?id=" + id)

// 全部订单
export const GetOrderList1 = params => api.get("/order/v1/list", { params })

// 待发货单
export const GetOrderList2 = params => api.get("/order/v1/list/1", { params })

// 待收货单
export const GetOrderList3 = params => api.get("/order/v1/list/2", { params })

// 待评价单
export const GetOrderList4 = params => api.get("/order/v1/list/3", { params })

// 确认收货
export const confirmReceipt = id => api.post("/order/v1/confirmReceipt/" + id)

// 获取订单详情
export const orderInfo = id => api.get("/order/v1/orderInfo/" + id)

// 发货
export const orderSend = params => api.post("/order/v1/send", params)

// 评价详情
export const EvaluateInfo = id => api.get("/order/v1/evaluateInfo/" + id)

// 发送订单评价
export const SendEvaluate = params => api.post("/order/v1/evaluate", params)

// 快递单列表
export const GetStarList = params => api.get("/api/star", { params })

// 查询快递单评价详情
export const GetStarInfo = id => api.get("/api/star/" + id)

// 快递单评价
export const PutStarInfo = params => api.get("/api/star", params)
