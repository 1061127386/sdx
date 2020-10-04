<template>
  <div class="edit_search">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        show-action
        placeholder="客户名称/拜访标题"
        @search="search((current = 1))"
      >
        <template #action>
          <div @click="search((current = 1))" style="color: #173399">搜索</div>
        </template>
      </van-search>
    </form>

    <div class="list">
      <van-empty description="暂无结果" v-if="empty" />

      <van-list
        v-else
        :finished="finished"
        :finished-text="finished ? '已加载完毕...' : ''"
      >
        <ul>
          <li v-for="val in list" :key="val.id" @click="addNamezi(val)">
            <img src="../../assets/images/cust/头像.png" alt="" srcset="" />
            <span>{{ val.custName }}</span>
            <van-icon name="arrow" />
          </li>
        </ul>
      </van-list>
      <div class="foot" @click="getList(++current)" v-if="!finished">
        展开跟多<van-icon name="arrow-down" size="14" />
      </div>
    </div>
  </div>
</template>

<script>
import { GetCustList } from "../../axios/api";

export default {
  data() {
    return {
      value: "", // 搜索值
      empty: true, // 搜索不到时的页面
      current: 1, //第几页
      size: 7, // 几条数据
      list: {}, // 数据列表
      finished: false, // 完成
    };
  },
  methods: {
    //   子传父到上级组件
    addNamezi(val){
        // console.log(val)
        this.$emit("addName",val)
    },
    // 搜索事件
    search(pages) {
      GetCustList({
        keyword: this.value,
        current: pages,
        size: this.size,
      }).then((res) => {
        if (res.data.errCode == 0) {
        //   console.log(JSON.parse(JSON.stringify(res.data.data.records)));
        //   console.log(JSON.parse(JSON.stringify(res.data.data)));

          let data = res.data.data;
          
          //   判断是否有总数
          if (data.total == 0) {
            this.empty = true;
            this.list = [];
              this.finished = true;
          } else {
            this.empty = false;
            this.list = data.records;

            // 数组长度和总数一样就算请求所有数据完毕
            if (this.list.length == data.total) {
              this.finished = true;
            }else{
              this.finished = false;
            }

          }
        } else {
          this.$toast.fail(res.data.message);
        }
      }).catch(() => {
        this.$toast.fail("请求出错。");
      });
    },
    // 下拉更多
    getList(pages) {
      GetCustList({
        keyword: this.value,
        current: pages,
        size: this.size,
      }).then((res) => {
        if (res.data.errCode == 0) {
            console.log(JSON.parse(JSON.stringify(res.data.data)));

          let data = res.data.data;
            this.list.push(...res.data.data.records);

          if (data.total == this.list.length) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        } else {
          this.$toast.fail(res.data.message);
        }
      }).catch(() => {
        this.$toast.fail("请求出错。");
      });
    },
  },
  created() {
    //   默认调用请求数据
    this.search(this.current);
  },
};
</script>
 
<style lang = "less" scoped>
.edit_search {
  background-color: #efefef;
  position: relative;
    /* overflow: scroll; */


  .van-search {
    margin-bottom: 1rem;
  }
}

.list {
  width: 100vw;

  .foot {
    line-height: 5rem;
    text-align: center;
    background-color: #fff;
    width: 100%;
    color: #203399;
    font-weight: 600;
    border-top: 2rem solid #efefef;
  }

  .van-list {
    background: #efefef;

    ul {
      background-color: #fff;
      padding: 0 2rem;
      box-sizing: border-box;

      li {
        box-sizing: border-box;
        padding: 1rem 0;
        display: flex;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #efefef;

        img {
          width: 4rem;
          margin-right: 2rem;
        }
        span {
          font-size: 1.6rem;
          width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .van-icon {
          position: absolute;
          right: 0;
          font-size: 2rem;
          color: #ccc;
        }
      }
    }
  }
}
</style>