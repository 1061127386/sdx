<template>
  <div class="custinfo">
    <div class="head">
      <van-nav-bar title="客户详情">
        <template #left>
          <van-icon name="arrow-left" size="26" @click="$router.go(-1)" />
        </template>
        <template #right>
          <van-icon name="wap-home-o" size="26" @click="$router.push('/home')" />
        </template>
      </van-nav-bar>

        <div class="left">
            <img src="../../assets/images/cust/头像.png" alt="">
            <span>{{custList.custName}}</span>
        </div>
        <div class="right" @click="$router.push('/cust-edit/'+custList.id)">
            <van-icon name="todo-list-o" /> 编辑信息
        </div>

    </div>
    <div class="bg">
        <img src="../../assets/images/cust/底纹.png" >
        <div class="info">
            <div class="i-head">
                    <van-icon name="orders-o" />
                基本信息</div>

            <ul class="i-list">
                <li>
                    <p>客户名称</p>
                    <span>{{custList.custName}}</span>
                </li>
                <li>
                    <p>联系电话</p>
                    <span>{{custList.telephone}}</span>
                </li>
                <li>
                    <p>学历</p>
                    <span>{{custList.education}}</span>
                </li>
                <li>
                    <p>性别</p>
                    <span>{{custList.sex}}</span>
                </li>
                <li>
                    <p>年龄</p>
                    <span>{{custList.age}}</span>
                </li>
                <li>
                    <p>所属城市</p>
                    <span>{{custList.cityName}}</span>
                </li>
                <li>
                    <p>公司名称</p>
                    <span>{{custList.company}}</span>
                </li>
                <li>
                    <p>职位</p>
                    <span>{{custList.position}}</span>
                </li>
                <li>
                    <p>录入时间</p>
                    <span>{{custList.createTime}}</span>
                </li>
            </ul>
        </div>
    </div>    
  </div>
</template>

<script>
import { GetCustInfo } from "../../axios/api";

export default {
  data() {
    return {
      custList: {},
    };
  },
  created() {
    GetCustInfo(this.$route.params.id).then((res) => {
      if (res.data.errCode == 0) {
        // console.log(res.data.data);
        this.custList = res.data.data;
      } else {
        this.$toast.fail(res.data.message);
      }
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
  justify-content:space-between;

  .left{
      display: flex;
      align-items: center;
      width: 70%;
      
      img{
          width: 7rem;
          margin: 0 3rem;
      }
      span{
          color: white;
          font-size: 1.6rem;
          white-space:nowrap;
          overflow:hidden;
          text-overflow: ellipsis;
      }
  }
  .right{
      color: #e2e8f3;
      background-color:#365dac;
      width: 11rem;
      height: 3.5rem;
      border-top-left-radius: 1.75rem;
      border-bottom-left-radius: 1.75rem;
      display: flex;
      justify-content:center;
      align-items:center;
      font-size: 1.4rem;
      .van-icon{
          font-size: 2rem;
          margin:0 .5rem
      }
  }
  

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
    .van-nav-bar__title{
        color: white;
    }
  }
}

.bg{
    position: absolute;
    bottom: 0;

    img{
        width: 100%;
        display: block;
    }
    .info{
        width: 80%;
        left: 10%;
        position: absolute;
        top: 5%;
        height: 70%;

        .i-head{
            line-height: 4.8rem;
            background-color: #fff;
            font-size: 1.6rem;
            font-weight: bold;
            border-bottom: 1px #ccc dotted;
            margin-bottom: 1rem;

            .van-icon{
                color: white;
                background-color: #ffcc33;
                font-size: 1.6rem;
                padding: .3rem;
                margin-right: .5rem;
                vertical-align: baseline;
            }
        }

        .i-list{

            li{
                line-height: 3.5rem;
                font-size: 1.4rem;
                p{
                    display: inline-block;
                    color: #aaa;
                    width: 7rem;
                }
            }
            li:nth-child(2){
                span{
                    color: #40a0ed;
                    letter-spacing: .1rem;
                    border-bottom: 1px solid lightskyblue;
                }
            }
        }
    }
}
</style>