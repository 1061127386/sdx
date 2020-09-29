<template>
  <div class="main">
    <div class="head">

      <van-nav-bar
        :title="empty ? '查询' : '拜访记录'"
        @click-left="$router.back(-1)"
        @click-right="To('/visit-edit')"
      >
        <template #left>
          <van-icon name="arrow-left" size="25" />
        </template>
        <template #right v-if="!empty">
          <div>新增</div>
        </template>
      </van-nav-bar>

      <form action="/">
        <van-search
          v-model="value"
          shape="round"
          show-action
          placeholder="客户名称/拜访标题"
          @search="search((current = 1))"
        >
          <template #action>
            <div @click="search((current = 1))" style="color:#173399;">搜索</div>
          </template>
        </van-search>
      </form>

    </div>

    <div class="list">
      <van-empty description="暂无结果" v-if="empty" />

      <van-list v-else
      :finished="finished"
        :finished-text="finished?'已加载完毕...':''"
      >
        <ul>
          <li v-for="val in list" :key="val.id">
            <img src="../../assets/images/visit/Customer.png" alt="" />
            <div class="info">
              <p>
                <span>拜访标题</span>
                <span>{{ val.visitTitle }}</span>
              </p>
              <p>
                <span>客户名称</span>
                <span>{{ val.custName }}</span>
              </p>
              <p>
                <span>拜访时间</span>
                <span>{{ val.visitTime }}</span>
              </p>
            </div>
            <div class="btn" @click="To('/visit-info/'+val.id)">
              <span> 定期回访 </span>
            </div>
          </li>
          <div class="foot" @click="getList(++current)" v-if="!finished">
            展开跟多<van-icon name="arrow-down" size="14" />
          </div>
        </ul>
      </van-list>

    </div>
  </div>
</template>

<script>
import { GetVisitList } from "../../axios/api";
export default {
  data() {
    return {
      value: "",
      empty: true, // 搜索不到时的页面
      current: 1, //第几页
      size: 4, // 几条数据
      list: {}, // 数据列表
      finished: false, // 完成
    };
  },
  methods: {
    //   跳转事件
    To(path){
        this.$router.push(path)
    },
    // 搜索事件
    search(pages) {
      GetVisitList({
        keyword: this.value,
        current: pages,
        size: this.size,
      }).then((res) => {
        if (res.data.errCode == 0) {
          // console.log(JSON.parse(JSON.stringify(res.data.data.records)));

          let data = res.data.data;
        //   判断是否有总数
          if (data.total == 0) {
            this.empty = true;
            this.list = [];
          } else {
            this.empty = false;
            this.list = data.records;
            // 数组长度和总数一样就算请求所有数据完毕
            if (data.records.length == data.total) {
              this.finished = true;
            }
          }
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    // 下拉更多
    getList(pages, size) {
      // console.log(pages)
      // console.log(size)
      GetVisitList({
        keyword: this.value,
        current: pages,
        size: this.size,
      }).then((res) => {
        if (res.data.errCode == 0) {
        //   console.log(JSON.parse(JSON.stringify(res.data.data)));

          let data = res.data.data;
          if (data.total == this.list.length) {
            this.finished = true;
          } else {
            this.finished = false;
            this.list.push(...res.data.data.records);
          }
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    // 去往拜访详情页
    To(path) {
      // console.log(path)
      this.$router.push(path);
    },
  },
  created() {
    //   console.log(this.$route.params.custName)
    this.value = this.$route.params.custName;
    this.search(this.current);
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
  .van-nav-bar__right {
    color: white;
    font-size: 1.6rem;
    div {
      width: 6rem;
      text-align: right;
      line-height: 4rem;
    }
  }
}

.main {
  background-color: #efefef;
  position: relative;
  height: 100%;

  .van-search {
    margin-bottom: 1rem;
  }
}

.list {
  width: 100vw;

  .foot {
    line-height: 4rem;
    text-align: center;
    background-color: #fff;
    width: 100%;
    color: #203399;
    font-weight: 600;
  }

  .van-list {
    background: #efefef;
    li {
      display: flex;
      background-color: #fff;
      align-items: center;
      padding: 3%;
      position: relative;
      margin-bottom: 1px;
      img {
        width: 7rem;
      }
      .info {
        p {
          line-height: 2.2rem;
          font-size: 1.4rem;
          span:nth-child(1) {
            color: #aaa;
            margin: 0 1.2rem;
          }
        }
      }
      .btn {
        position: absolute;
        right: 5%;
        height: 100%;

        span {
          display: block;
          background-color: #fff7e7;
          color: #fd9f31;
          border: 1px solid #fd9f31;
          margin-top: 25%;
          padding: 0.2rem 0.5rem;
        }
      }
    }
  }
}
</style>