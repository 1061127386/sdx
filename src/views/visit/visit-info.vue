<template>
  <div class="custinfo">
    <div class="head">
      <van-nav-bar title="拜访详情">
        <template #left>
          <van-icon name="arrow-left" size="26" @click="$router.go(-1)" />
        </template>
        <template #right>
          <van-icon
            name="wap-home-o"
            size="26"
            @click="$router.push('/home')"
          />
        </template>
      </van-nav-bar>

      <div class="left">
        <img src="../../assets/images/cust/头像.png" alt="" />
        <div>
          <b>{{ custList.custName }}</b>
          <span>录入人：李白</span>
        </div>
      </div>

      <!-- <div class="right" @click="$router.push('/visit-edit/' + custList.id)">
        <van-icon name="todo-list-o" /> 修改拜访
      </div> -->

    </div>
    <div class="bg">
      <img src="../../assets/images/cust/底纹.png" />
      <div class="info">
        <div class="i-head">
          <van-icon name="orders-o" />
          基本信息
        </div>

        <ul class="i-list">
          <li>
            <p>拜访标题</p>
            <span>{{ custList.visitTitle }}</span>
          </li>
          <li>
            <p>拜访时间</p>
            <span>{{ custList.visitTime }}</span>
          </li>
          <li>
            <p>拜访地址</p>
            <span>{{ custList.visitAddress }}</span>
          </li>
          <li>
            <p>拜访原因</p>
            <span>{{ custList.visitReason }}</span>
          </li>
          <li>
            <p>拜访情况</p>
            <span>{{ custList.visitSituation }}</span>
          </li>
          <li>
            <p>
              <span>竞争信息</span>
              <span>收集情况</span>
            </p>
            <span>{{ custList.collectSituation }}</span>
          </li>
          <li>
            <p>创建时间</p>
            <span>{{ custList.createTime }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { GetVisitInfo } from "../../axios/api";

export default {
  data() {
    return {
      custList: {},
    };
  },
  created() {
    GetVisitInfo(this.$route.params.id).then((res) => {
      if (res.data.errCode == 0) {
        // console.log(JSON.parse(JSON.stringify(res.data.data)));

        this.custList = res.data.data;
      } else {
        this.$toast.fail(res.data.message);
      }
    }).catch(() => {
        this.$toast.fail("请求出错。");
      });
  },
};
</script>
 
<style lang = "less" scoped>
.custinfo {
  height: 100vh;
  width: 100vw;
  background-color: #efefef;
  position: relative;
}

.head {
  height: 30%;
  background-color: #003399;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    width: 70%;

    img {
      width: 7rem;
      margin: 0 3rem;
    }
    div {
        color: white;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

      b {
        font-size: 1.6rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 1rem;
        width: 90%;

        span {
          font-size: 1.5rem;
        }
      }
    }
  }

  /* .right {
    color: #e2e8f3;
    background-color: #365dac;
    width: 11rem;
    height: 3.5rem;
    border-top-left-radius: 1.75rem;
    border-bottom-left-radius: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    .van-icon {
      font-size: 2rem;
      margin: 0 0.5rem;
    }
  } */


  .van-hairline--bottom::after {
    border-width: 0px;
  }
  /deep/.van-nav-bar {
    background-color: #003399;
    width: 100%;
    position: absolute;
    top: 0;
    .van-icon {
      color: white;
    }
    .van-nav-bar__title {
      color: white;
    }
  }
}

.bg {
  position: absolute;
  bottom: 0;

  img {
    width: 100%;
    display: block;
  }
  .info {
    width: 80%;
    left: 10%;
    position: absolute;
    top: 5%;
    height: 70%;

    .i-head {
      line-height: 4.8rem;
      background-color: #fff;
      font-size: 1.6rem;
      font-weight: bold;
      border-bottom: 1px #ccc dotted;
      margin-bottom: 1rem;

      .van-icon {
        color: white;
        background-color: #ffcc33;
        font-size: 1.6rem;
        padding: 0.3rem;
        margin-right: 0.5rem;
        vertical-align: baseline;
      }
    }

    .i-list {
      li {
        font-size: 1.4rem;
        margin: 1.5rem 0;
        display: flex;
        align-items: center;
        p {
          display: inline-block;
          color: #aaa;
          width: 7rem;

          span {
            display: block;
          }
        }
      }
    }
  }
}
</style>