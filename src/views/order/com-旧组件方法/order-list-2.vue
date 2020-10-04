<template>
  <div class="li">
    <div class="title" @click="showInfo(item)">
      <h3>{{ item.title }}</h3>
      <van-icon name="arrow" />
    </div>
    <div class="main">
      <img src="../../assets/images/logo.jpg" alt="" />
      <div class="info">
        <h3>{{ item.cusName }}</h3>
        <div>
          <span>下单时间</span>
          <b>{{ item.orderTime }}</b>
        </div>
        <div>
          <span>下单人</span>
          <b>{{ item.orderUserName }}</b>
        </div>
      </div>
    </div>
    <div class="foot">
        <slot name="foot" />
    </div>
  </div>
</template>

<script>
export default {
    props:["item"],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    showInfo(val) {
      console.log(val);
    },
  },
};
</script>
 
<style lang = "less" scoped>
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
.foot{
    padding: 4%;
    text-align: right;
}
</style>