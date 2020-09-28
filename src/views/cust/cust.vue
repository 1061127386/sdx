<template>
  <div class="cust">
    <div class="head">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" size="26" @click="$router.go(-1)" />
        </template>
        <template #right>
          <van-icon name="wap-home-o" size="26" @click="To('/home')" />
        </template>
      </van-nav-bar>

      <div class="h-info">
        <img src="../../assets/images/cust/头像.png" alt="" />
        <div>
          <h3>名称：{{custData.custName}}</h3>
          <p>电话：{{custData.telephone}}</p>
        </div>
        <span @click="To('/custinfo/'+custData.id)">客户信息</span>
      </div>
    </div>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(val, idx) in custData.datas" :key="idx">
        <template #title>
          <i :class="[val.class, active == idx ? 'active' : '']"></i>
          <span :class="active == idx ? 'active' : ''">{{ val.title }}</span>
        </template>
      </van-tab>
    </van-tabs>

    <div class="main">
        <p v-for="(val,idx) in 4" :key="idx" v-show="idx==active">{{val}}</p>
    </div>
  </div>
</template>

<script>
import {PostCust} from "../../axios/api"
export default {
  data() {
    return {
      active: 1,
      classes: [
        {
          class: "iconfont icon-fenxi",
          txt: "收入分析",
        },

        {
          class: "iconfont icon-danjiangongyu",
          txt: "旗下企业",
        },
        {
          class: "iconfont icon-chengxinhezuowoshou",
          txt: "合作伙伴",
        },
        {
          class: "iconfont icon-shouru",
          txt: "当年收入",
        },
      ],
      custData:{}
    };
  },
  created(){
    PostCust(this.$route.params.id).then(res=>{
      if(res.data.errCode==0){
       this.custData=res.data.data
        
        // for (let idx = 0; idx < this.custData.datas.length; idx++) {
        //   let num=idx
        //   if(this.custData.datas[idx]["sort"]>this.custData.datas[++num]["sort"] && num<this.custData.datas.length){
        //       console.log(idx)
        //   }
        // }
        let newarr=[]
          this.custData.datas.map(val=>{
            let idx=val.sort
            newarr[--idx]=val
            newarr[idx].class=this.classes[idx].class
          })
      this.custData.datas=newarr

       console.log(JSON.parse(JSON.stringify(this.custData.datas)));

      }else{
        this.$toast.fail(res.data.message)
      }
    })
  },
  methods:{
    To(path){
      this.$router.push(path)
    }
  }
};
</script>
 
<style lang = "less" scoped>
@import url("../../iconfonts/cust/iconfont.css");

.cust {
  height: 100vh;
  position: relative;
  background-color: #f5f5f5;
  box-sizing: border-box;
}
.head {
  background-color: #003399;
  height: 25%;
  position: relative;

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
  }

  .h-info {
    position: absolute;
    bottom: 0;
    left: 7.5%;
    width: 85%;
    background-color: #f8fcff;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    display: flex;
    box-sizing: border-box;
    padding-right: 0;
    align-items: center;

    img {
      width: 7rem;
      margin: 2rem;
    }
    div {
      margin-left: rem;
      h3 {
        font-size: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        color: #666;
      }
    }
    span {
      position: absolute;
      right: 0;
      top: 10%;
      color: white;
      background-color: #ffcc33;
      line-height: 2.6rem;
      padding: 0 0.7rem;
      width: 6rem;
      text-align: center;
      border-top-left-radius: 1.3rem;
      border-bottom-left-radius: 1.3rem;
    }
  }
}

/deep/.van-tabs {
  .van-tabs__wrap {
    height: 6rem;
    .van-tab__text {
      display: flex;
      flex-direction: column;
      align-items: center;

      .active {
        color: #003399;
      }

      i {
        font-size: 2rem;
      }

      span {
        font-size: 1.4rem;
        font-weight: 500;
        color: #777;
      }
    }

    .van-tabs__line {
      background-color: #ffcc33 !important;
    }
  }
}

.main {
  background-color: #efefef;
  position: absolute;
  bottom: 0;
  height: calc(75% - 6rem);
  width: 100vw;
  box-sizing: border-box;
  overflow: scroll;
  padding: 4%;
}
</style>