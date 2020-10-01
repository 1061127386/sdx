<template>
  <div class="message">
    <van-nav-bar
      title="消息中心"
      @click-left="$router.back(-1)"
      @click-right="isSort = !isSort"
    >
      <template #left>
        <van-icon name="arrow-left" size="25" />
      </template>
      <template #right>
        <div>排序 <i class="el-icon-sort"></i></div>
      </template>
    </van-nav-bar>

    <div class="list">
      <van-tabs v-model="active">
        <van-tab title="全部消息" :dot="showDot1 || showDot2">
          <messageList
            :isSort="isSort"
            :list="list"
            :toplist="toplist"
          />
        </van-tab>
        <van-tab title="系统消息" :dot="showDot1">
          <messageList
            :isSort="isSort"
            :list="newList(list, 1)"
            :toplist="newList(toplist, 1)"
          />
        </van-tab>
        <van-tab title="个人消息" :dot="showDot2">
          <messageList
            :isSort="isSort"
            :list="newList(list, 2)"
            :toplist="newList(toplist, 2)"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { GetMessageList } from "../../axios/api";
import messageList from "./messageList-com";
export default {
  components: {
    messageList,
  },
  data() {
    return {
      active: 0,
      showDot1: false,
      showDot2: false,
      toplist: [],
      list: [],
      isSort: false, // 翻转列表排序
    };
  },
  computed: {
    newList() {
      return (arr, type) => {
        return arr.filter((val) => {
          return val.type == type ? val : "";
        });
      };
    },
  },
  created() {
    GetMessageList({
      current: 1,
      size: 50,
    }).then((res) => {
      if (res.data.errCode == 0) {
        res.data.data.records.map((val) => {
          // 分离 置顶和未置顶
          if (val.top == 1) {
            this.toplist.push(val);
          } else {
            this.list.push(val);
          }

          // 判断是否有未读的
          if (val.isReader == 0) {
            if (val.type == 1) {
              this.showDot1 = true;
            } else if (val.type == 2) {
              this.showDot2 = true;
            }
          }
        });
      }else{
        this.$toast.fail(res.data.message)
      }
    });
  },
};
</script>
 
<style lang = "less" scoped>
.message {
  background-color: #efefef;
  height: 100%;
}
/deep/.van-nav-bar {
  background-color: #003399;

  i {
    color: white;
  }
  .van-nav-bar__title {
    color: white;
    font-size: 1.6rem;
  }
  .van-nav-bar__right {
    color: white;
    font-size: 1.6rem;
    div {
      width: 6rem;
      text-align: right;
      line-height: 4rem;

      .el-icon-sort {
        font-weight: bold;
      }
    }
  }
}

.list {
  /deep/.van-tabs {
    .van-info {
      width: 1rem;
      height: 1rem;
      right: -0.5rem;
      top: -0.2rem;
      background-color: #f66576;
    }
    .van-tabs__line {
      background-color: #ffcc33;
      width: 6rem;
    }
  }

  /deep/.van-tabs__content {
    margin-top: 1rem;
  }
}
</style>