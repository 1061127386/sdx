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
      <van-tab title="全部" />
      <van-tab title="代发货" />
      <van-tab title="待收货" />
      <van-tab title="待评价" />
    </van-tabs>
        <order_list :order="order"/>

        <footer v-if="order.records.length != 0">
          <div
        class="getList"
        v-if="order.records.length < order.total"
        @click="getList"
      >
        展开跟多<van-icon name="arrow-down" size="14" />
      </div>
      <div class="none" v-else>没有更多了。。。</div>
        </footer>

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
      order: {
        records: [],
        total: "",
      },
      currentIdx: 1,
    };
  },
  methods: {
    // 根据tab标签栏的下标 返回对应的的api请求
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
      let active = this.active;
      this.getAPI(active)({
        keyword: this.value,
        current: 1,
        size: 2,
      })
        .then((res) => {
          if (res.data.errCode == 0) {
            let data = res.data.data;
            this.currentIdx = 1;
            this.order.records = data.records;
            this.order.total = data.total;
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
    tabFn() {
      this.search();
    },
    // 下拉获取
    getList() {
      let active = this.active;
      this.getAPI(active)({
        keyword: this.value,
        current: ++this.currentIdx,
        size: 2,
      })
        .then((res) => {
          if (res.data.errCode == 0) {
            let data = res.data.data;
            this.order.records.push(...data.records);
            this.order.total = data.total;
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
  },
  created() {
    this.search();
  },
};
</script>
 
<style lang = "less" scoped>
.order {
  /* height: 100%; // 使用百分比会固定死高度，要自适应就不要设置高度 让元素自动撑开。 */
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

footer{
  background-color: #efefef;
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