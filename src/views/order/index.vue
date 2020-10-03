<template>
  <div class="order">
    <div class="head">
      <van-nav-bar title="商品订单" @click-left="$router.back(-1)">
        <template #left>
          <van-icon name="arrow-left" size="25" />
        </template>
      </van-nav-bar>

      <form action="/">
        <van-search
          v-model="value"
          shape="round"
          show-action
          placeholder="关键词搜索"
          @search="search"
        >
          <template #action>
            <div @click="search">搜索</div>
          </template>
        </van-search>
      </form>
    </div>

    <van-tabs v-model="active" @click="tabFn">
      <van-tab title="全部">
        <order_list :order="order1" @getList="getList"/>
      </van-tab>
      <van-tab title="代发货">
        <order_list :order="order2" @getList="getList"/>
      </van-tab>
      <van-tab title="待收货">
        <order_list :order="order3" @getList="getList"/>
      </van-tab>
      <van-tab title="待评价">
        <order_list :order="order4" @getList="getList"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import order_Listcom1 from './order_Listcom1'
import order_list from "./order_list";
import {
  GetOrderList1,
  GetOrderList2,
  GetOrderList3,
  GetOrderList4,
} from "@/axios/api";

export default {
  components: {
    order_list,
  },
  data() {
    return {
      value: "",
      active: 0,
      order1: {
        records: [],
        total: "",
      },
      order2: {
        records: [],
        total: "",
      },
      order3: {
        records: [],
        total: "",
      },
      order4: {
        records: [],
        total: "",
      },
      currentIdx:1,
    };
  },
  methods: {
    getAPI(active) {
      if (active == 0) {
        return GetOrderList1;
      } else if (active == 1) {
        return GetOrderList2;
      } else if (active == 2) {
        return GetOrderList3;
      } else if (active == 3) {
        return GetOrderList4;
      }
    },
    search() {
      let active=this.active
      this.getAPI(active)({
        keyword: this.value,
        current:1,
        size: 2,
      }).then((res) => {
        if (res.data.errCode == 0) {
          let data = res.data.data;
            this.currentIdx=1
          if (active == 0) {
            this.order1.records = data.records;
            this.order1.total = data.total;
          } else if (active == 1) {
            this.order2.records = data.records;
            this.order2.total = data.total;
          } else if (active == 2) {
            this.order3.records = data.records;
            this.order3.total = data.total;
          } else if (active == 3) {
            this.order4.records = data.records;
            this.order4.total = data.total;
          }
        //   console.log(JSON.parse(JSON.stringify(data)));
        } else {
          this.$toast.fail(res.data.message);
        }
      });

    },
    tabFn() {
      this.search();
    },
    getList() {
      let active=this.active
        this.getAPI(active)({
        keyword: this.value,
        current:++this.currentIdx,
        size: 2,
      }).then((res) => {
        if (res.data.errCode == 0) {
          let data = res.data.data;
          if (active == 0) {
            this.order1.records.push(...data.records);
            this.order1.total = data.total;
          } else if (active == 1) {
            this.order2.records.push(...data.records);
            this.order2.total = data.total;
          } else if (active == 2) {
            this.order3.records.push(...data.records);
            this.order3.total = data.total;
          } else if (active == 3) {
            this.order4.records.push(...data.records);
            this.order4.total = data.total;
          }
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    }
  },
  created() {
    this.search();
  },
};
</script>
 
<style lang = "less" scoped>
.order {
    height: 100%;
  background-color: #efefef;
  .head {
    /deep/.van-nav-bar {
      background-color: #003399;

      i {
        color: white;
      }
      .van-nav-bar__title {
        color: white;
      }
    }
  }
}

/deep/.van-tabs {
  margin-top: 2px;

  .van-tabs__wrap {
    /* 选择指定子元素下span没有右边框  因为带下划线有5个子元素 不能使用last-child来选择最后一个 而是指定第四个子元素下。。 */
    .van-tab:not(:nth-child(4)) {
      span {
        display: inline-block;
        width: 100%;
        border-right: 1px solid #ccc;
        text-align: center;
      }
    }

    .van-tabs__line {
      width: 5rem;
      height: 0.2rem;
      background: #ffd14a;
    }
  }

  .van-tabs__content {
    margin-top: 0.5rem;
    height: 100%;
  }
}
</style>