<template>
  <div class="star">
    <div class="head">
      <van-nav-bar title="快递单" @click-left="$router.back(-1)">
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

    <van-empty description="暂无消息" v-if="starList.records.length == 0" />

    <ul v-else>
      <li v-for="(val, idx) in starList.records" :key="idx">
        <div class="title" @click="showInfo(val)">
          <h3>快递单号：{{ val.orderCode }}</h3>
          <van-icon name="arrow" />
        </div>
        <div class="main">
          <img src="../../assets/images/logo.jpg" alt="" />
          <div class="info">
            <!-- <h3></h3> -->
            <div>
              <span>下单时间</span>
              <b>{{ val.starTime }}</b>
            </div>
            <div>
              <span>收货人</span>
              <b>{{ val.consignee }}</b>
            </div>
            <div>
              <span>发货人</span>
              <b>{{ val.consignor }}</b>
            </div>
          </div>
        </div>
        <div class="foot">
          <van-button
            round
            type="info"
            color="#ffcc33"
            v-if="val.star == 0"
            @click="evaluation(val)"
            >评价</van-button
          ><van-button
            round
            type="info"
            plain
            color="#ffcc33"
            v-else
            @click="evaluation(val)"
            >查看评价</van-button
          >
        </div>
      </li>

      <div
        class="getList"
        v-if="starList.records.length < starList.total"
        @click="getList"
      >
        展开跟多<van-icon name="arrow-down" size="14" />
      </div>
      <div class="none" v-else>没有更多了。。。</div>
    </ul>
  </div>
</template>

<script>
import { GetStarList } from "@/axios/api";

export default {
  data() {
    return {
      value: "",
      starList: { records: [] },
      currentIdx: 1,
    };
  },
  methods: {
    search() {
      GetStarList({
        keyword: this.value,
        current: (this.currentIdx = 1),
        size: 2,
      })
        .then((res) => {
          if (res.data.errCode == 0) {
            this.starList = res.data.data;
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
    // 获取更多
    getList() {
      GetStarList({
        keyword: this.value,
        current: ++this.currentIdx,
        size: 2,
      })
        .then((res) => {
          if (res.data.errCode == 0) {
            this.starList.total = res.data.data.total;
            this.starList.records.push(...res.data.data.records);
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
    evaluation(val) {
      console.log(val);
      this.$router.push("/order_evaluation/" + val.id);
    },
    showInfo(val) {
      console.log("订单详情：",JSON.parse(JSON.stringify(val)));
      
    },
  },
  created() {
    this.search();
  },
};
</script>
 
<style lang = "less" scoped>
.star {
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

ul {
  padding-bottom: 1rem;
  background-color: #efefef;
  li {
    background-color: #fff;
    margin-top: 1rem;

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
    margin-top: 1rem;
  }
  .none {
    line-height: 3rem;
    text-align: center;
  }
}
</style>