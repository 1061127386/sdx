<template>
  <ul>
    <!-- v-show="val.type==types?true:types==0?true:false" -->
    <van-empty
      description="暂无消息"
      v-if="sortTop.length == 0 && sortList.length == 0"
    />
    <li
      v-show="sortTop.length != 0"
      v-for="val in sortTop"
      :key="val.id"
      :class="val.top == 1 ? 'active' : ''"
      @click="showInfo(val)"
    >
      <div class="left">
        <el-badge is-dot :hidden="val.isReader == 1">
          <img
            v-if="val.type == 1"
            src="../../assets/images/message/系统消息.png"
          />
          <img v-else src="../../assets/images/message/个人信息.png" />
        </el-badge>
        <div class="title">
          <h3>
            系统消息
            <img src="../../assets/images/message/置顶.png" />
          </h3>
          <span>发布人：{{ val.sendName }}</span>
        </div>
      </div>
      <div class="right">
        <span> {{ val.createTime }} </span>
        <van-icon name="arrow" />
      </div>
    </li>

    <li
      v-show="sortList.length != 0"
      v-for="val in sortList"
      :key="val.id"
      :class="val.top == 1 ? 'active' : ''"
      @click="showInfo(val)"
    >
      <div class="left">
        <el-badge is-dot :hidden="val.isReader == 1">
          <img
            v-if="val.type == 1"
            src="../../assets/images/message/系统消息.png"
          />
          <img v-else src="../../assets/images/message/个人信息.png" />
        </el-badge>
        <div class="title">
          <h3>系统消息</h3>
          <span>发布人：{{ val.sendName }}</span>
        </div>
      </div>
      <div class="right">
        <span> {{ val.createTime }} </span>
        <van-icon name="arrow" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["toplist", "list", "isSort"],
  data() {
    return {
      num: 2,
    };
  },
  computed: {
    sortTop() {
      return this.toplist.sort((a, b) => {
        // return a.id<b.id?1:-1
        return b.id - a.id;
      });
    },
    sortList() {
      //     // 方法一：
      //     let list=[{createTime:"1949-10-01"}]
      //     this.list.map(val=>{
      //       let time=new Date(val.createTime).getTime()
      //       for(let i in list){  //如果数组为空不会执行下面的语句。
      //         let time2=new Date(list[i].createTime).getTime()
      //         if(time>time2){
      //           list.splice(i,0,val)
      //           break;
      //         }
      //       }
      //     })
      //     list.pop()
      // console.log("方法一：",JSON.parse(JSON.stringify(list)));

      // 方法二：
      // let arr2=this.list.sort((a,b)=>{
      return this.list.sort((a, b) => {
        if (this.isSort) {
          return new Date(a.createTime) - new Date(b.createTime);
        } else {
          return new Date(b.createTime) - new Date(a.createTime);
        }
      });
      // console.log("方法二：",JSON.parse(JSON.stringify(arr2)));
    },
  },
  methods: {
    showInfo(val) {
    //   console.log(val);
      this.$router.push("/message-info/"+val.id)
    },
  },
};
</script>
 
<style lang = "less" scoped>
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
</style>