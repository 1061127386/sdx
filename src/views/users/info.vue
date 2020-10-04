<template>
  <div class="info">
    <van-nav-bar
      title="个人信息"
      @click-left="$router.back(-1)"
      @click-right="$router.push('/home')"
    >
      <template #left>
        <van-icon name="arrow-left" size="25" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" size="25" />
      </template>
    </van-nav-bar>

    <van-nav-bar left-text="姓名" :right-text="userInfo.name" />
    <van-nav-bar left-text="联系电话" :right-text="userInfo.phone" />
    <van-nav-bar left-text="性别" :right-text="userInfo.year_salary" />
    <van-nav-bar left-text="年薪" :right-text="userInfo.name" />
    <van-nav-bar left-text="月薪" :right-text="userInfo.month_salary" />
    <van-nav-bar left-text="个人简介" :right-text="userInfo.remark" />
  </div>
</template>

<script>
import { GetUserInfo } from "@/axios/api";

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    GetUserInfo()
      .then((res) => {
        if (res.data.errCode == 0) {
          // console.log(res.data.data);
          this.userInfo = res.data.data;
        } else {
          this.$toast.fail(res.data.message);
        }
      })
      .catch(() => {
        this.$toast.fail("请求出错。");
      });
  },
};
</script>
 
<style lang = "less" scoped>
.info {
  height: 100%;
  width: 100%;
  background: #efefef;
}
/deep/.van-nav-bar {
  .van-nav-bar__left {
    span {
      color: #666;
    }
  }
  .van-nav-bar__right {
    span {
      color: #aaa;
    }
  }
}

.van-nav-bar:nth-child(1) {
  background-color: #003399;
  margin-bottom: 1rem;

  i {
    color: white;
  }
  /deep/.van-nav-bar__title {
    color: white;
  }
}
.van-nav-bar:nth-child(3) {
  margin-bottom: 1rem;
}
</style>