<!--
 * @Author       : 张毅哲
 * @Date         : 2020-10-02 20:57:19
 * @LastEditors  : 张毅哲
 * @FilePath     : \sdx\src\views\order\order_send.vue
 * @LastEditTime : 2020-10-04 00:09:41
 * @Description  : 发货组件。
-->
<template>
  <div class="send">
    <van-nav-bar @click-left="$router.back(-1)">
      <template #left>
        <van-icon name="arrow-left" size="25" />
      </template>
    </van-nav-bar>
    <ul>
      <li>
        <span>客户</span>
        <p>{{ infoData.cusName }}</p>
      </li>
      <li>
        <span>商品</span>
        <p>{{ infoData.prodName }}</p>
      </li>
      <li>
        <span>数量</span>
        <p>{{ infoData.prodNum }}</p>
      </li>
      <li>
        <span>下单人</span>
        <p>{{ infoData.orderUserName }}</p>
      </li>
      <li>
        <span>下单时间</span>
        <p>{{ infoData.orderTime }}</p>
      </li>
    </ul>

    <van-form @submit="send">
      <van-field
        v-model="infoData.receiver"
        name="receiver"
        rows="1"
        label="收货人"
        placeholder="请输入收货人"
        :rules="[{ required: true }]"
        :disabled="infoData.status!=0"
      />
      <van-field
        v-model="infoData.linkPhone"
        name="linkPhone"
        rows="1"
        label="联系电话"
        placeholder="请输入联系电话"
        :rules="[{ required: true }]"
        :disabled="infoData.status!=0"
      />
      <van-field
        v-model="infoData.address"
        name="address"
        rows="4"
        label="收货地址"
        type="textarea"
        placeholder="请输入收货地址"
        :rules="[{ required: true }]"
        :disabled="infoData.status!=0"
      />
      <van-field
        v-model="infoData.logisticsCode"
        name="logisticsCode"
        rows="1"
        label="物流单号"
        placeholder="请输入物流单号"
        :rules="[{ required: true }]"
        :disabled="infoData.status!=0"
      />
      <div class="btn" v-if="infoData.status==0">
        <van-button round block type="info" native-type="submit">
          确认发货消息
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { orderInfo, orderSend } from "@/axios/api";
export default {
  data() {
    return {
      infoData: {},
    };
  },
  created() {
    orderInfo(this.$route.params.id).then((res) => {
      if (res.data.errCode == 0) {
        this.infoData = res.data.data;
        // console.log(JSON.parse(JSON.stringify(this.infoData)));
      } else {
        this.$toast.fail(res.data.message);
      }
    });
  },
  methods: {
    send() {
      orderSend(this.infoData).then(res=>{
          if (res.data.errCode==0) {
              this.$toast("发货成功！")
              setTimeout(() => {
                  this.$router.back(-1)
              }, 1000);
          }else{
              this.$toast.fail(res.data.message)
              this.$router.back(-1)
          }
      })
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

.send {
  height: 100%;
  background-color: #efefef;

  ul {
    margin: 1rem 0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 3% 4%;
      background-color: #fff;
      font-size: 1.4rem;
      p {
        color: #999;
      }
      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
/deep/.van-cell {
  .van-cell__title {
    width: 6rem;
    color: #000;
  }
  .van-field__body {
    color: #777;
    padding: 2%;
    padding-left: 6%;
    background-color: #eee;
    border-radius: 1rem;
    text-indent: 1rem;
  }
}
.btn {
  background-color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  button {
    width: 90%;
  }
}
</style>