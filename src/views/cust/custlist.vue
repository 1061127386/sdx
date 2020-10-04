<template>
  <div class="main">
    <div class="head">
      <van-nav-bar
        :title="empty ? '查询' : '客户列表信息'"
        @click-left="$router.back(-1)"
        @click-right="To('/cust-edit')"
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
          placeholder="客户名称/联系方式"
          @search="search((current = 1), (size = 3))"
        >
          <template #action>
            <div @click="search((current = 1), (size = 3))">搜索</div>
          </template>
        </van-search>
      </form>
    </div>

    <div class="list">
      <van-empty description="暂无结果" v-if="empty" />
      <ul v-else>
        <li v-for="val in list" :key="val.id">
          <div class="info">
            <i class="el-icon-s-promotion" @click="To('/cust/' + val.id)"></i>
            <div>
              <span>客户名称</span>
              <p>{{ val.custName }}</p>
            </div>
            <div>
              <span>联系方式</span>
              <p>{{ val.telephone }}</p>
            </div>
            <div>
              <span>公司名称</span>
              <p>{{ val.company }}</p>
            </div>
            <div>
              <span>职务</span>
              <p>{{ val.position }}</p>
            </div>
          </div>
          <div class="btn">
            <van-button
              round
              type="info"
              color="#003399"
              @click="To('/visit-edit/' + val.id + '/' + val.custName)"
              >新增拜访</van-button
            >
            <van-button
              round
              type="info"
              color="#003399"
              @click="To('/visit-list/' + val.id + '/' + val.custName)"
              >拜访记录</van-button
            >
          </div>
        </li>

        <div
          class="foot"
          :class="list.length > 3 ? 'static' : ''"
          @click="getList(++current, size)"
        >
          展开跟多<van-icon name="arrow-down" size="14" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { GetCustList } from "../../axios/api";
export default {
  data() {
    return {
      value: "",
      empty: false, // 搜索不到时的页面
      current: 1, //第几页
      size: 3, // 几条数据
      list: [],
    };
  },
  methods: {
    // 搜索事件
    search(pages, size) {
      GetCustList({
        keyword: this.value,
        current: pages,
        size: size,
      })
        .then((res) => {
          if (res.data.errCode == 0) {
            //  console.log(res.data.data)
            this.list = res.data.data.records;
            //  获取不到数据 数组就显示为空页面
            if (this.list.length < 1) {
              this.empty = true;
            } else {
              this.empty = false;
            }
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
    // 下拉更多
    getList(pages, size) {
      // console.log(pages)
      // console.log(size)
      GetCustList({
        keyword: this.value,
        current: pages,
        size: size,
      })
        .then((res) => {
          if (res.data.errCode == 0) {
            //  console.log(res.data.data)
            if (res.data.data.records.length > 1) {
              this.list.push(...res.data.data.records);
            } else {
              this.$toast({
                message: "没有更多数据了！",
                icon: "info-o",
              });
            }
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("请求出错。");
        });
    },
    // 去往客户详情页
    To(path) {
      // console.log(path)
      this.$router.push(path);
    },
  },
  created() {
    GetCustList({
      current: this.current,
      size: this.size,
    })
      .then((res) => {
        if (res.data.errCode == 0) {
          // console.log(res.data.data)
          this.list = res.data.data.records;
        } else {
          this.$toast.fail(res.data.message);
        }
      })
      .catch(() => {
        this.$toast.fail("请求出错。");
      });
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
  height: 100%;
  background-color: #efefef;
  position: relative;

  .van-search {
    margin-bottom: 1rem;
  }
}

.list {
  position: absolute;
  top: 11rem;
  bottom: 0;
  width: 100vw;
  background-color: #fff;

  ul {
    height: 100%;
    position: relative;
    background-color: #efefef;
    overflow: auto;

    li {
      background-color: #fff;
      padding: 0 5% 0;
      margin-bottom: 1rem;
      .info {
        font-size: 1.4rem;
        padding: 2% 0;
        position: relative;
        div {
          line-height: 2.3rem;
          span {
            color: #aaa;
            margin-right: 1rem;
          }
          p {
            display: inline-block;
            font-size: 1.4rem;
          }
        }
        .el-icon-s-promotion {
          font-size: 4rem;
          position: absolute;
          right: 0;
          color: lightpink;
          line-height: 7rem;
          width: 35%;
          text-align: center;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .btn {
        border-top: solid 1px #ccc;
        padding: 3% 0;
        display: flex;
        justify-content: flex-end;
        .van-button {
          margin-left: 1.5rem;
          height: 3.5rem;
          line-height: 3.5rem;
        }
      }
    }
    .static {
      position: static !important;
      margin-top: 1rem;
    }

    .foot {
      position: absolute;
      bottom: 0;
      line-height: 4rem;
      text-align: center;
      background-color: #fff;
      width: 100%;
      color: #203399;
      font-weight: 600;
    }
  }
}
</style>