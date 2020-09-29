# sdx

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


##  省点心项目  -- 登录页总结
① 用户使用本程序需要先进行登陆，获取到用户的信息 token 到本地存储，以便之后的用户数据请求。
  如果没有获取到本地存储的 token 也就是没有登录的情况下使用，需要进行路由地址拦截，强行重定向到登录页进行登录，否则不让使用 。
② 登录页分两部分，第一页 登陆logo图和第二页用户填入表单页。
  默认为logo图页面，点击之后将logo页面就行隐藏，显示输入的表单页面。
③ 用户输入账号密码之后本地做效验，检验账号和密码是否符合规则、
  不符合就不通过也不请求，而是提醒用户输入不正确。
④ 用户输入符合通过就请求，之后对服务器响应的数据做判断
  服务器返回密码不正确就提醒重新输入做请求。
⑤  账号密码通过服务器效验后，就将服务器返回的用户 token 保存到本地，
    这样路由跳转时就不会被拦截。
⑥  用户每次请求时需要将token附加到请求的header头上，这样服务器能够识别是当前用户，返回的数据也是当前用户的数据。
