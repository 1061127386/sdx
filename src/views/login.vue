<template>
  <div class="login">
    <img
      src="../assets/images/login/login-1.jpg"
      v-if="!isLogin"
      @click="isLogin = true"
    />

    <img src="../assets/images/login/login-2.jpg" v-if="isLogin" />

    <div class="fixed" v-if="isLogin">
      <div>
        <input type="text" v-model="username" />
      </div>
      <div>
        <input type="password" v-model="password" />
      </div>
      <button @click="login">立即登陆</button>
    </div>
  </div>
</template>

<script>
// 导入请求的连接
import { GetToken } from "../axios/api";

export default {
  data() {
    return {
      isLogin: false,
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // 判断输入框是否有输入。
      if (!this.username || !this.password) {
        return this.$toast.fail("请正确输入账号密码！");
      }
      GetToken({
        username: this.username,
        password: this.password,
      })
        .then((res) => {
          if (res.status == 200 || res.status == 500) {
            if (res.data.errCode == 0) {
              //  console.log(res.data.data)
              // 将token保存到本地
              localStorage.setItem("token", res.data.data);
              // 跳转到主页
              this.$router.push("/home");
            } else {
              this.$toast.fail(res.data.message);
            }
          } else {
            this.$router.push("/404");
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.login {
  height: 100vh;
  width: 100vw;

  img {
    display: block;
    height: 100%;
    width: 100%;
  }

  .fixed {
    /* background-color: #fff; */
    position: absolute;
    height: 50vh;
    width: 100%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 10%;
    box-sizing: border-box;
    align-items: center;

    div {
      width: 65%;
      line-height: 3rem;
      border-radius: 1.5rem;
      margin-bottom: 1rem;
      overflow: hidden;
      background-color: gold;
      outline-style: none;
      padding-left: 4.5rem;
      box-sizing: border-box;
      position: relative;
      display: flex;
      border: 1px solid black;

      input {
        width: 100%;
        line-height: 3rem;
        background-color: gold;
        border-width: 0;
      }
    }
    div::before {
      z-index: 999;
      content: "账户";
      position: absolute;
      left: 1.5rem;
      top: 0;
      font-weight: bold;
    }
    div:nth-child(2)::before {
      content: "密码";
    }

    button {
      width: 45%;
      line-height: 3rem;
      border-radius: 1.5rem;
      margin: auto;
      color: white;
      background-color: #4366fe;
      outline-style: none;
      box-sizing: border-box;
      border: 2px solid #4366fe;
    }
  }
}
</style>