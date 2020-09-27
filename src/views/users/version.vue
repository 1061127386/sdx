<template>
    <div class="version">

        <van-nav-bar title="版本信息" @click-left="$router.back(-1)">
      <template #left>
        <van-icon name="arrow-left" size="25" />
      </template>
    </van-nav-bar>

    <van-nav-bar left-text="当前版本" :right-text="versions.versions"/>

    <div class="ver">
        <div>版本信息</div>
        <span>{{versions.infomation}}</span>
    </div>
    
    </div>
</template>

<script>
import { GetVersion } from "@/axios/api";

export default {
    data () {
        return {
            versions:{}
        }
    },
    created(){
        GetVersion().then(res=>{
            if (res.data.errCode==0) {
                // console.log(res.data)
                this.versions=res.data.data
            }else{
                this.$toast.fail(res.data.message)
            }
        })
    }
}
</script>
 
<style lang = "less" scoped>
.version{
    height: 100%;
    width: 100%;
    background-color: #efefef;
}
.van-nav-bar:nth-child(1) {
  background-color: #003399;

  i {
    color: white;
  }
  /deep/.van-nav-bar__title {
    color: white;
  }
}  
/deep/.van-nav-bar:nth-child(2){
    margin-bottom: 1rem;
  .van-nav-bar__left {
    span {
      color: #666;
    }
  }
  .van-nav-bar__right {
    span {
      color: #aaa;
    }
  }
}

.ver{
    background-color: #fff;
    padding: 4%;
    font-size: 1.4rem;
    span{
        line-height: 3rem;
        color: #aaa;
    }
}
</style>