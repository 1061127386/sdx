<template>
  <div class="home">
    <!-- <button @click="$router.push('/login')">login页面</button> -->

    <div class="head">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" size="26" @click="$router.go(-1)" />
        </template>
        <template #right>
          <van-icon name="wap-home-o" size="26" @click="To('/home')" />
        </template>
      </van-nav-bar>

      <img src="../assets/images/logo.jpg" alt="" />
      <div class="hang"></div>
      <div class="h-right">
        <div>用心做教育</div>
        <div>专注每一个学员的成长</div>
      </div>
    </div>

    <div class="main">
      <div @click="To('/custlist')">
        <img src="../assets/images/home/myclients.png" />
        <div>
          <span>我的客户</span>
          <p>MY CLIENTS</p>
        </div>
      </div>
      <div @click="To('/visit-list')">
        <img src="../assets/images/home/customer.png" />
        <div>
          <span>客户关怀</span>
          <p>MY CLIENTS</p>
        </div>
      </div>
      <div @click="To('/message-list')">
        <img src="../assets/images/home/news.png" />
        <div>
          <span>消息中心</span>
          <p>MY CLIENTS</p>
        </div>
      </div>

      <div @click="To('/logistics_list')">
        <img src="../assets/images/home/losistics.png" />
        <div>
          <span>物流单</span>
          <p>MY CLIENTS</p>
        </div>
      </div>
      <div @click="To('/order')">
        <img src="../assets/images/home/delivery.png" />
        <div>
          <span>送货单</span>
          <p>DELIVERY</p>
        </div>
      </div>
    </div>

    <div class="foot">
      <div class="active">
        <van-icon name="wap-home" />
        <span>系统功能</span>
      </div>
      <div class="call">
        <van-icon name="comment" />
        <span>联系</span>
      </div>
      <div @click="To('/user')">
        <i class="el-icon-user"></i>
        <span>个人中心</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    To(path) {
      this.$router.push(path);
    },
  },
};
</script>
 
<style lang = "less" scoped>
.home {
  height: 100%;
  position: relative;
  background-color: #f5f5f5;
  overflow: hidden;
}
.head {
  background-color: #003399;
  height: 25%;
  position: relative;
  display: flex;
  padding: 0px 2rem;
  justify-content: center;
  align-items: center;
  color: white;

  img {
    height: 80%;
    transform: translateY(-0.8rem);
  }
  .hang {
    width: 0.2rem;
    height: 30%;
    background-color: white;
    margin-right: 1rem;
    margin-left: 0.5rem;
  }
  .h-right {
    color: #efefef;
    font-family: "楷体";
    font-size: 1.4rem;
    line-height: 2rem;
  }

  .van-hairline--bottom::after {
    border-width: 0px;
  }
  /deep/.van-nav-bar {
    background-color: #003399;
    width: 100%;
    position: absolute;
    top: 0;
    .van-icon {
      color: white;
    }
  }
}

.main {
  height: calc(100% - 25% - 7rem);
  display: flex;
  flex-wrap: wrap;
  padding: 8% 12%;
  overflow-x: scroll;
  justify-content: space-between;
  box-sizing: border-box;

  div {
    height: 16rem;
    box-sizing: border-box;
    width: 48%;
    background-color: #fff;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      width: 4rem;
      transform: translatey(-2rem);
    }

    div {
      position: absolute;
      bottom: 1.5rem;
      height: 4rem;

      span {
        font-size: 1.6rem;
        font-weight: bold;
        color: #555;
      }
      p {
        margin-top: 0.2rem;
        white-space: nowrap;
        font-size: 1.2rem;
      }
    }
  }
}

.foot {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 7rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 13%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .call {
    background-color: #ffcc33;
    height: 7.5rem;
    width: 7.5rem;
    position: relative;
    border-radius: 50%;
    transform: translateY(-2rem);
    border: 0.6rem solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    span {
      font-size: 1.6rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    color: #aaa;
    i {
      font-size: 3rem;
    }
    span {
      font-size: 1.4rem;
    }
  }
  .active {
    color: #003399;
  }
}
</style>