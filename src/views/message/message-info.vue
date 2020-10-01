<template>
  <div class="info">
    <van-nav-bar title="消息详情" @click-left="$router.back(-1)">
      <template #left>
        <van-icon name="arrow-left" size="25" />
      </template>
    </van-nav-bar>

    <div class="main">
      <div class="top">
        <div class="title">
          <h3>{{ info.title }}</h3>
          <span>{{ info.createTime }}</span>
        </div>
        <p>发布人：{{ info.sendName }}</p>
      </div>
      <div class="msg">
        {{ info.msgDate }}
      </div>
    </div>
  </div>
</template>

<script>
import { GetMessageInfo, PutMessageUpdates } from "../../axios/api";

export default {
  data() {
    return {
      info: [],
    };
  },
  async created() {
    // console.log(this.$route.params.id)
    let id = this.$route.params.id;
    let infoData = await GetMessageInfo(id);
    if (infoData.data.errCode == 0) {
      this.info = infoData.data.data;
      this.info.createTime += " " + new Date().toTimeString().substr(0, 5);

      let res = await PutMessageUpdates(id);
      // console.log(res)
      if (infoData.data.errCode == 0) {
        this.$toast("已阅！");
      } else {
        this.$toast.fail(infoData.data.message);
      }
    } else {
      this.$toast.fail(infoData.data.message);
    }
    // console.log(JSON.parse(JSON.stringify(this.info)));
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
    color: #eee;
    font-size: 1.6rem;
  }
}
.info {
  height: 100%;
  background-color: #efefef;
}

.main {
  margin-top: 1rem;
  background-color: #fff;
  padding: 4%;

  .top {
    .title {
      display: flex;
      justify-content: space-between;
      h3 {
        font-size: 1.4rem;
      }
      span {
        color: #ccc;
      }
    }
    p {
      color: #aaa;
      margin-top: 0.5rem;
    }
  }
  .msg {
    color: #555;
    line-height: 2.5rem;
    margin-top: 4%;
    font-size: 1.5rem;
  }
}
</style>