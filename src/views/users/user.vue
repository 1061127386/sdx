<template>
  <div class="user">
    <div class="bg"></div>

    <div class="main">
      <div class="m-head">
        <img src="../../assets/images/users/user.png" alt="" />
        <div class="jie">{{ userInfo.remark }}</div>

        <div class="m-h-name">
          <div>
            <span>姓名</span>
            <b>{{ userInfo.nickName }}</b>
          </div>
          <div>
            <span>联系方式</span>
            <b>{{ userInfo.phone }}</b>
          </div>
        </div>
      </div>

      <div class="m-list">
        <van-nav-bar
          @click-right="$router.push('/info')"
          @click-left="$router.push('/info')"
        >
          <template #left>
            <img
              src="../../assets/images/users/Personal information.png"
              alt=""
            />
            <span>个人信息</span>
          </template>
          <template #right>
            <van-icon name="arrow" color="#ccc" size="18" />
          </template>
        </van-nav-bar>

        <van-nav-bar
          @click-right="$toast.fail('当前功能正在建设当中!')"
          @click-left="$toast.fail('当前功能正在建设当中!')"
        >
          <template #left>
            <img src="../../assets/images/users/money.png" alt="" />
            <span>支付中心</span>
          </template>
          <template #right>
            <van-icon name="arrow" color="#ccc" size="18" />
          </template>
        </van-nav-bar>

        <van-nav-bar
          @click-right="$toast.fail('当前功能正在建设当中!')"
          @click-left="$toast.fail('当前功能正在建设当中!')"
        >
          <template #left>
            <img src="../../assets/images/users/change Password.png" alt="" />
            <span>修改密码</span>
          </template>
          <template #right>
            <van-icon name="arrow" color="#ccc" size="18" />
          </template>
        </van-nav-bar>

        <van-nav-bar
          @click-left="$router.push('/version')"
          @click-right="$router.push('/version')"
        >
          <template #left>
            <img
              src="../../assets/images/users/Version Information.png"
              alt=""
            />
            <span>版本信息</span>
          </template>
          <template #right>
            <span>版本1.0</span>
            <van-icon name="arrow" color="#ccc" size="18" />
          </template>
        </van-nav-bar>

        <van-nav-bar @click-left="show = true" @click-right="show = true">
          <template #left>
            <img src="../../assets/images/users/qing.png" alt="" />
            <span>清除缓存</span>
          </template>
          <template #right>
            <van-icon name="arrow" color="#ccc" size="18" />
          </template>
        </van-nav-bar>
      </div>

      <van-dialog
        width="70%"
        v-model="show"
        title="是否清除缓存？"
        show-cancel-button
        confirm-button-color="#4789FF"
        @confirm="btn1"
      />

      <van-dialog
        width="70%"
        v-model="show2"
        title="是否退出登录？"
        show-cancel-button
        confirm-button-color="#4789FF"
        @confirm="btn2"
      />
    </div>

    <div class="tui" @click="show2 = true">退出登录</div>

    <div class="foot">
      <div @click="$router.push('/home')">
        <i class="el-icon-s-home"></i>
        <div>系统功能</div>
      </div>
      <div>
        <van-icon name="comment" />
        <div>联系</div>
      </div>
      <div class="active">
        <i class="el-icon-user-solid"></i>
        <div>个人中心</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetUsers } from "@/axios/api";
export default {
  data() {
    return {
      userInfo: {},
      show: false,
      show2: false,
    };
  },
  created() {
    GetUsers().then((res) => {
      if (res.status == 200 || res.status == 500) {
        if (res.data.errCode == 0) {
          // console.log(res.data.data)
          this.userInfo = res.data.data;
        } else {
          this.$toast.fail(res.data.message);
        }
      } else {
        this.$toast.fail("接口数据出错！请联系客服。");
      }
    });
  },
  methods: {
    btn1() {
      this.$toast.success("清除成功！");
    },
    btn2() {
      let _this=this
      this.$toast.loading({
        message: "退出中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1200,
        onClose() {
          localStorage.removeItem("token");
          _this.$router.push("/login");
        },
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.user {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  position: relative;

  .bg {
    height: 25%;
    width: 100%;
    background-color: #073087;
  }

  .van-dialog {
    top: 50%;
  }

  .main {
    position: absolute;
    width: 90vw;
    left: 5vw;
    top: 15%;
    border-radius: 0.5rem;

    .m-head {
      background-color: #fff;
      box-sizing: border-box;
      padding: 0px 4%;
      position: relative;
      margin-bottom: 1rem;

      img {
        width: 10rem;
        transform: translate(100%, -50%);
        border-radius: 50%;
        border: 0.5rem solid rgba(180, 180, 180, 0.2);
      }
      .jie {
        position: absolute;
        top: 50%;
        transform: translateX(-50%);
        left: 50%;
        text-align: center;
        color: #777;
      }

      .m-h-name {
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        font-size: 1.4rem;

        div {
          line-height: 5rem;
          span {
            color: #777;
          }
          b {
            margin-left: 1rem;
          }
        }
      }
    }

    .m-list {
      /deep/.van-nav-bar {
        border-radius: 0.5rem;
        margin-bottom: 1px;

        .van-nav-bar__left {
          display: flex;
          align-items: center;
          img {
            margin-right: 1rem;
            width: 2rem;
          }
          /* span{
                } */
        }

        .van-nav-bar__right {
          color: #ccc;
          span {
            font-size: 1.6rem;
          }
        }
      }
    }
  }

  .tui {
    position: absolute;
    bottom: 8rem;
    left: 5%;
    width: 90%;
    line-height: 5rem;
    background-color: #ddd;
    text-align: center;
    font-size: 1.6rem;
    color: #555;
    border-radius: 0.3rem;
  }

  .foot {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    box-sizing: border-box;
    color: #aaa;

    .active {
      color: #003399;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      i {
        font-size: 2.6rem;
      }
    }
  }
}
</style>