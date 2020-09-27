<template>
  <div class="main">
    <div class="head">
      <van-nav-bar
        title="客户列表信息"
        @click-left="$router.back(-1)"
        @click-right="$router.push('/home')"
      >
        <template #left>
          <van-icon name="arrow-left" size="25" />
        </template>
        <template #right> 新增 </template>
      </van-nav-bar>

      <form action="/">
        <van-search
          v-model="value"
          shape="round"
          show-action
          placeholder="客户名称/联系方式"
          @search="search"
        >
          <template #action>
            <div @click="search">搜索</div>
          </template>
        </van-search>
      </form>
    </div>

    <div class="list">
        <van-empty description="暂无结果" v-if="empty"/>
        <ul v-else>

            <li v-for="val in list" :key="val.id">
                <div class="info">
                    <div>
                        <span>客户名称</span>
                        <p>{{val.custName}}</p>
                    </div>
                    <div>
                        <span>联系方式</span>
                        <p>{{val.telephone}}</p>
                    </div>
                    <div>
                        <span>公司名称</span>
                        <p>{{val.company}}</p>
                    </div>
                    <div>
                        <span>职务</span>
                        <p>{{val.position}}</p>
                    </div>
                </div>
                <div class="btn">
                    <van-button round type="info" color="#003399">新增拜访</van-button>
                    <van-button round type="info" color="#003399">拜访记录</van-button>
                </div>
            </li>

            <div class="foot" :class="list.length>3?'static':''" @click="getList(++current,++size)">
                展开跟多<van-icon name="arrow-down" size="14"/>
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
      empty:false,  // 搜索不到时的页面
      current:1,   //第几页
      size:3,   // 几条数据
      list:[]
    };
  },
  methods: {
    search() {
      console.log(this.value);
    },
    // 下拉更多
    getList(pages,size){
        // console.log(pages)
        // console.log(size)
         GetCustList({
           current:pages,
           size:size
       }).then(res=>{
           if(res.data.errCode==0){
               console.log(res.data.data.records)
            //    this.list.push(...res.data.data.records)
           }else{
               this.$toast.fail(res.data.message)
           }
       })
    }
  },
  created(){

      GetCustList({
          current:this.current,
          size:this.size
      }).then(res=>{
          if(res.data.errCode==0){
            //   console.log(res.data.data)
              this.list=res.data.data.records
          }else{
              this.$toast.fail(res.data.message)
          }
      })

  }
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

.list{
    position: absolute;
    top: 11rem;
    bottom: 0;
    width: 100vw;
    background-color: #fff;

    ul{
        height: 100%;
        position: relative;
        background-color: #efefef;
        overflow: auto;

        li{
            background-color: #fff;
            padding: 0 5% 0;
            margin-bottom: 1rem;
            .info{
                font-size: 1.4rem;
                padding: 2% 0;
                div{
                    line-height: 2.3rem;
                    span{
                    color: #aaa;
                    margin-right: 1rem;
                }
                p{
                    display: inline-block;
                }
                }
            }
            .btn{
                border-top: solid 1px #ccc;
                padding: 3% 0;
                display: flex;
                justify-content: flex-end;
                .van-button{
                    margin-left: 1.5rem;
                    height: 3.5rem;
                    line-height: 3.5rem;
                }
            }
        }
        .static{
            position: static !important;
            margin-top: 1rem;
        }
        .foot{
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