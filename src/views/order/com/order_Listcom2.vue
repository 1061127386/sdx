<template>
  <ul>
      <van-empty description="暂无消息" v-if="list.length==0"/>
      <li v-for="(val,idx) in list" :key="idx" v-else>
          <order_list :item="val">
              <template #foot>
                  <van-button round type="info" color="#003399" v-if="val.status==0">发货</van-button>
                  <van-button round type="info" plain color="#003399" v-else-if="val.status==10">收货</van-button>
                  <van-button round type="info" color="#ffcc33" v-else-if="val.status==20">评价</van-button>
                  <van-button round type="info" plain color="#ffcc33" v-else-if="val.status==30">查看评价</van-button>
              </template>
          </order_list>
      </li>
  </ul>
</template>

<script>
import { GetOrderList1 } from "@/axios/api";
import order_list from './order-list'

export default {
    components:{
        order_list
    },
  data() {
    return {
        list:[]
    };
  },
  created() {
    GetOrderList1({
      keyword: "",
      current: 1,
      size: 10,
    }).then((res) => {
      if (res.data.errCode == 0) {
        let data = res.data.data;
        this.list=data.records

        // console.log(JSON.parse(JSON.stringify(data.records)));
      } else {
        this.$toast.fail(res.data.message);
      }
    });
  }
};
</script>
 
<style lang = "less" scoped>
ul{
    padding-bottom: 1rem;
    li{
        background-color: #fff;
        margin-bottom: 1rem;

        .van-button{
            height: 3rem;
        }
    }
}
</style>