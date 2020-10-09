<!--
 * @Author       : 张毅哲
 * @Date         : 2020-10-04 00:23:22
 * @LastEditors  : 张毅哲
 * @FilePath     : \sdx\src\views\order\evaluateInfo.vue
 * @LastEditTime : 2020-10-04 01:17:39
 * @Description  : 描述
-->
<template>
  <div class="evaluate">
    <van-nav-bar title="评分" @click-left="$router.back(-1)">
      <template #left>
        <van-icon name="arrow-left" size="25" />
      </template>
    </van-nav-bar>

    <div class="title">
      <van-icon name="orders-o" />
      <span>订单信息</span>
    </div>
    <div class="time">
      <div>
        <span>商品</span>
        <p>{{ InfoData.prodName }}</p>
      </div>
      <div>
        <span>发货时间</span>
        <p>{{ InfoData.sendTime }}</p>
      </div>
      <div>
        <span>到达时间</span>
        <p>{{ InfoData.receiveTime }}</p>
      </div>
    </div>
    <div class="title">
      <van-icon name="orders-o" />
      <span>服务评价</span>
    </div>

    <div class="rate">
      <b>描述相符</b>
      <van-rate
        v-model="InfoData.prodConformityPoint"
        :size="30"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
        :readonly="status == 30"
      />
      <span> {{ InfoData.prodConformityPoint * 2 }}分 </span>
    </div>
    <div class="rate">
      <b>物流速度</b>
      <van-rate
        v-model="InfoData.logisticsSpeedPoint"
        :size="30"
        color="#ff8d5b"
        void-icon="star"
        void-color="#eee"
        :readonly="status == 30"
      />
      <span> {{ InfoData.logisticsSpeedPoint * 2 }}分 </span>
    </div>
    <div class="rate">
      <b>服务质量</b>
      <van-rate
        v-model="InfoData.serviceQualityPoint"
        :size="30"
        void-icon="star"
        void-color="#eee"
        :readonly="status == 30"
      />
      <span> {{ InfoData.serviceQualityPoint * 2 }}分 </span>
    </div>

    <van-field
      show-word-limit
      maxlength="120"
      v-model="InfoData.comment"
      rows="5"
      type="textarea"
      placeholder="请输入评价"
      :disabled="status == 30"
    />

    <div class="btn" v-if="status == 20">
      <div @click="submit">提交评论</div>
    </div>
  </div>
</template>

<script>
// 订单详情 评价评价详情 发送评价
import { orderInfo, EvaluateInfo, SendEvaluate } from "@/axios/api";

export default {
  data() {
    return {
      InfoData: {},
      status: 30, // 订单状态值 20未评价 30已评价
    };
  },
  created() {
    this.status = this.$route.query.status;

    if (this.status == 20) {
      orderInfo(this.$route.params.id)
        .then((res) => {
          if (res.data.errCode == 0) {
            this.InfoData = res.data.data;
            // console.log(JSON.parse(JSON.stringify(res.data)));
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    } else if (this.status == 30) {
      EvaluateInfo(this.$route.params.id)
        .then((res) => {
          if (res.data.errCode == 0) {
            this.InfoData = res.data.data;
            // console.log(JSON.parse(JSON.stringify(res.data)));
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    }
  },
  methods: {
    submit() {
      if (!this.InfoData.comment) {
        this.$toast.fail("请输入评价。");
        return;
      }
      // console.log(JSON.parse(JSON.stringify(this.InfoData)));
      let {
        serialNo,
        prodConformityPoint,
        logisticsSpeedPoint,
        serviceQualityPoint,
        comment,
      } = this.InfoData;
      SendEvaluate({
        serialNo: this.$route.params.id,
        prodConformityPoint: +prodConformityPoint,
        logisticsSpeedPoint: +logisticsSpeedPoint,
        serviceQualityPoint: +serviceQualityPoint,
        comment,
      })
        .then((res) => {
          // console.log(res);
          if (res.data.errCode == 0) {
            this.$toast("评价完成，准备返回。。");
            setTimeout(() => {
              this.$router.back(-1);
            }, 2000);
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch((err) => {
          this.$toast.fail("此单已评价过了!");
          setTimeout(() => {
            this.$router.back(-1);
          }, 1000);
        });
    },
  },
};
</script>
 
<style lang = "less" scoped>
/deep/.van-nav-bar {
  background-color: #003399;

  i {
    color: white;
  }
  .van-nav-bar__title {
    color: white;
  }
}
.evaluate {
  height: 100%;
  background-color: #efefef;

  .title {
    color: #0c3d9e;
    font-weight: bold;
    font-size: 1.6rem;
    background-color: #f5fafe;
    padding: 2% 0;
    display: flex;
    align-items: center;
    .van-icon {
      margin: 0 3%;
      font-size: 2rem;
    }
  }
  .time {
    box-sizing: border-box;
    background-color: #fff;
    padding: 3%;
    margin-bottom: 1rem;
    div {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      span {
        width: 30%;
        color: #aaa;
        line-height: 2.3rem;
      }
      p {
        color: #777;
      }
    }
  }

  .rate {
    background-color: #fff;
    padding: 4% 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    position: relative;

    &:not(:last-child)::after {
      content: "";
      width: 90%;
      position: absolute;
      height: 1px;
      background-color: #eee;
      bottom: 0;
    }

    b {
      font-weight: normal;
    }
    span {
      color: #aaa;
      width: 3rem;
      text-align: right;
    }
  }
}

.van-cell {
  margin-top: 1.5rem;
}
.btn {
  background-color: #fff;
  position: absolute;
  bottom: 0;
  width: 100vw;
  padding: 2% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    line-height: 5rem;
    background-color: #003399;
    width: 90%;
    color: white;
    font-size: 1.6rem;
    text-align: center;
    border-radius: 2.5rem;
  }
}
</style>