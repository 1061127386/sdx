<template>
  <div class="edit">
    <van-nav-bar
      :title="edit ? '修改客户信息' : '新增客户信息'"
      @click-left="$router.back(-1)"
      @click-right="$router.push('/home')"
    >
      <template #left>
        <van-icon name="arrow-left" size="25" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" size="25" />
      </template>
    </van-nav-bar>

    <ul class="list">
      <li>
        <span><b>*</b> 客户名称</span>
        <input type="text" v-model="custList.custName" />
      </li>
      <li>
        <span><b>*</b> 联系方式</span>
        <input type="text" v-model="custList.telephone" />
      </li>
      <li>
        <span>学历</span>
        <input type="text" v-model="custList.education" />
      </li>
      <li>
        <span>年龄</span>
        <input type="number" v-model="custList.age" />
      </li>
      <li>
        <span>性别</span>
        <input type="text" v-model="custList.sex" />
      </li>
      <li>
        <span>所属城市</span>
        <input type="text" v-model="custList.cityName" />
      </li>
      <li>
        <span>公司名称</span>
        <input type="text" v-model="custList.company" />
      </li>
      <li>
        <span>职务</span>
        <input type="text" v-model="custList.position" />
      </li>
    </ul>

    <div class="btn">
      <div
        @click="submit"
        :class="!custList.custName || !custList.telephone ? 'active' : ''"
      >
        {{ edit ? "保 存" : "提 交" }}
      </div>
    </div>
  </div>
</template>

<script>
import { GetCustInfo, PutCustInfo, PostCustInfo } from "../../axios/api";
export default {
  data() {
    return {
      edit: false,
      custList: {
        custName: "",
        telephone: "",
        education: "",
        age: 1,
        sex: "男",
        cityName: "",
        company: "",
        position: "",
      },
    };
  },
  created() {
    console.log("有id为编辑 没有是新增",this.$route.params.id);
    if (this.$route.params.id) {
      this.edit = true;

      GetCustInfo(this.$route.params.id).then((res) => {
        if (res.data.errCode == 0) {
          // console.log(res.data.data);
          //  this.custList=res.data.data
          let {
            id,
            custName,
            telephone,
            education,
            age,
            sex,
            cityName,
            company,
            position,
          } = res.data.data;
          this.custList = {
            id,
            custName,
            telephone,
            education,
            age,
            sex,
            cityName,
            company,
            position,
          };
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    }
  },
  methods: {
    submit() {
      // 效验每一项是否填完完毕
      for (let key in this.custList) {
        if (!this.custList[key]) {
          this.$toast.fail("请输入完信息！");
          return;
        }
      }
      // 效验性别
      if (this.custList.sex == "男" || this.custList.sex == "女") {
        // 判断是在修改还是在新增
        if (this.edit) {
          //   提交修改
          PutCustInfo(this.custList).then((res) => {
            if (res.data.errCode == 0) {
              this.$toast.success("修改成功！");
                  // 延迟跳转
              setTimeout(() => {
                this.$router.back(-1);
              }, 2000);
            } else {
              this.$toast.fail(res.data.message);
            }
          });
        } else {
          //   提交新增
          // console.log(this.custList);
          PostCustInfo(this.custList).then(
            (res) => {
              if (res.data.errCode==0) {
                // console.log(res.data)
                  this.$toast.success("添加成功！");
                  // 延迟跳转
                  setTimeout(() => {
                    this.$router.back(-1);
                  }, 2000);
              }else{
                  this.$toast.fail(res.data.message)
              }
            },
            (err) => {
              this.$toast.fail("名字重复！请重新输入。")
            }
          );
        }
      } else {
        this.$toast.fail("性别有误！");
      }
    },
  },
};
</script>
 
<style lang = "less" scoped>
.edit {
  height: 100vh;
  width: 100vw;
  background-color: #efefef;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
/deep/.van-nav-bar:nth-child(1) {
  background-color: #003399;
  margin-bottom: 1rem;

  i {
    color: white;
    width: 6rem;
    text-align: left;
    line-height: 4rem;
  }
  .van-nav-bar__title {
    color: white;
  }
  .van-nav-bar__right {
    color: white;
    font-size: 1.6rem;
    i {
      width: 6rem;
      text-align: right;
      line-height: 4rem;
    }
  }
}

.list {
  li:nth-child(2) {
    margin-bottom: 1rem;
  }

  li {
    border-bottom: 1px solid #eee;
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    height: 4rem;
    line-height: 4rem;
    align-items: center;
    font-size: 1.6rem;

    span {
      margin-left: 1.5rem;
      width: 9rem;
      b {
        color: red;
      }
    }
    input {
      width: 60%;
      height: 2.5rem;
      border-style: none;
    }
  }
}

.btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  box-sizing: border-box;

  .active {
    background-color: rgba(34, 99, 230, 0.3);
  }
  div {
    margin: 0 auto;
    line-height: 4rem;
    background-color: #2263e6;
    border-radius: 2rem;
    text-align: center;
    color: white;
    font-size: 1.6rem;
  }
}
</style>