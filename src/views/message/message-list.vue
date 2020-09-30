<template>
  <div class="message">
    <van-nav-bar
      title="消息中心"
      @click-left="$router.back(-1)"
      @click-right="sort"
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
        <van-tab title="全部消息" dot>
          <ul>
            <li v-for="val in listData" :key="val.id" :class="val.top==1?'active':''">
              <div class="left">
                <el-badge is-dot :hidden="val.isReader == 1">
                  <img v-if="val.type==1" src="../../assets/images/message/系统消息.png"/>
                  <img v-else src="../../assets/images/message/个人信息.png"/>
                </el-badge>
                <div class="title">
                  <h3>
                    系统消息
                    <img
                      v-if="val.top == 1"
                      src="../../assets/images/message/置顶.png"
                      alt=""
                    />
                  </h3>
                  <span>发布人：张三</span>
                </div>
              </div>
              <div class="right">
                <span> 2020-03-10 </span>
                <van-icon name="arrow" />
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="系统消息" dot> 2 </van-tab>
        <van-tab title="个人消息" dot> 3 </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { GetMessageList } from "../../axios/api";
export default {
  data() {
    return {
      active: 0,
      listData: [],
    };
  },
  methods: {
    sort() {
      console.log(123);
    },
  },
  created() {
    GetMessageList({
      current: 1,
      size: 50,
    }).then((res) => {
      if (res.data.errCode == 0) {
        console.log(JSON.parse(JSON.stringify(res.data.data.records)));

        this.listData = res.data.data.records;
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

  ul {
    background: #fff;
    box-sizing: border-box;
    padding: 0 4%;

    .active {
      border-bottom: 1px solid #ccc;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 4% 0;

      .left {
        display: flex;
        align-items: center;

        .el-badge {
          margin-right: 1.6rem;
          img {
            width: 3.6rem;
          }
          /deep/.el-badge__content {
            top: 0.3rem;
            right: 0.8rem;
            border-style: none;
          }
        }

        .title {
          line-height: 2.2rem;
          h3 {
            font-size: 1.4rem;
            img {
              width: 1rem;
              margin-left: 0.5rem;
            }
          }
          span {
            color: #aaa;
            font-size: 1.2rem;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        color: #aaa;
        span {
          margin-right: 1rem;
          font-size: 1.2rem;
        }
        i {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>