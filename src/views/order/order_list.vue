<template>
  <div>
    <van-empty description="暂无消息" v-if="order.records.length == 0" />

    <ul v-else>
      <li v-for="(val, idx) in order.records" :key="idx">
        <div class="title" @click="send(val.serialNo)">
          <h3>{{ val.title }}</h3>
          <van-icon name="arrow" />
        </div>
        <div class="main">
          <img src="../../assets/images/logo.jpg" alt="" />
          <div class="info">
            <h3>{{ val.cusName }}</h3>
            <div>
              <span>下单时间</span>
              <b>{{ val.orderTime }}</b>
            </div>
            <div>
              <span>下单人</span>
              <b>{{ val.orderUserName }}</b>
            </div>
          </div>
        </div>
        <div class="foot">
          <van-button
            round
            type="info"
            color="#003399"
            v-if="val.status == 0"
            @click="send(val.serialNo)"
            >发货</van-button
          >
          <van-button
            round
            type="info"
            plain
            color="#003399"
            v-else-if="val.status == 10"
            @click="shou(val,idx)"
            >收货</van-button
          >
          <van-button
            round
            type="info"
            color="#ffcc33"
            v-else-if="val.status == 20"
            @click="evaluate(val)"
            >评价</van-button
          ><van-button
            round
            type="info"
            plain
            color="#ffcc33"
            v-else-if="val.status == 30"
            @click="evaluate(val)"
            >查看评价</van-button
          >
        </div>
      </li>

      <div
        class="getList"
        v-if="order.records.length < order.total"
        @click="getList"
      >
        展开跟多<van-icon name="arrow-down" size="14" />
      </div>
      <div class="none" v-else>没有更多了。。。</div>
    </ul>
  </div>
</template>

<script>
import { confirmReceipt } from "@/axios/api";
export default {
  props: ["order"],
  methods: {
    // 下拉获取
    getList() {
      this.$emit("getList");
    },
    // 进入发货界面
    send(id) {
      this.$router.push("/order_send/"+id)
    },
    // 确认收货
    shou(val,idx) {
      console.log("收货订单：",val.serialNo);
    let _this=this
      this.$dialog
        .confirm({
          title: "是否确认收货?",
        })
        .then(() => {
          confirmReceipt(val.serialNo).then((res) => {
            if (res.data.errCode == 0) {
              this.$toast("收货成功。");
              _this.order.records.splice(idx,1)
            } else {
              this.$toast.fail(res.data.message);
            }
          });
        })
        .catch(() => {
          console.log("取消收货。");
        });
    },
    // 评价&详情
    evaluate(val){
      // console.log(JSON.parse(JSON.stringify(val)));
      this.$router.push("/evaluate_info/"+val.serialNo+"/?status="+val.status)
    }
  },
};
</script>
 
<style lang = "less" scoped>
ul {
  padding-bottom: 1rem;
  background-color: #efefef;
  li {
    background-color: #fff;
    margin-bottom: 1rem;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 0 4%;
      line-height: 5rem;
      h3 {
        font-size: 1.4rem;
        color: #666;
      }
      .van-icon {
        color: #ccc;
        font-size: 1.6rem;
      }
    }
    .main {
      padding: 4% 5% 5%;
      display: flex;
      align-items: center;

      img {
        width: 6rem;
        margin-right: 1.5rem;
        border-radius: 1rem;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 6rem;
        h3 {
          font-size: 1.4rem;
        }
        div {
          span {
            color: #aaa;
          }
          b {
            margin-left: 1rem;
            font-weight: initial;
          }
        }
      }
    }
    .foot {
      border-top: #ccc 1px solid;
      padding: 4% 0;
      margin: 0 4%;
      text-align: right;

      .van-button {
        height: 3rem;
      }
    }
  }

  .getList {
    line-height: 4rem;
    text-align: center;
    background-color: #fff;
    width: 100%;
    color: #203399;
    font-weight: 600;
  }
  .none {
    line-height: 3rem;
    text-align: center;
  }
}
</style>