<template>
  <div class="edit">
    <van-nav-bar title="新增拜访信息">
      <template #left>
        <van-icon name="arrow-left" size="26" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" size="26" @click="$router.push('/home')" />
      </template>
    </van-nav-bar>

    <!-- 表单区域开始 -->
    <van-form @submit="onSubmit" colon v-if="showForm">
      <van-field
        v-model="visitObj.custName"
        name="custName"
        disabled
        placeholder="下拉选择/搜索"
        right-icon="arrow-down"
        required
        @click="showForm = false"
        :rules="[{ required: true, message: '请填写客户名' }]"
      >
        <template #label> 客户名称 </template>
        <template #input v-if="visitObj.custName">
          {{ visitObj.custName }}
        </template>
      </van-field>

      <van-field
        v-model="visitObj.visitTitle"
        name="visitTitle"
        label="拜访标题"
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请输入拜访标题' }]"
      />

      <van-field
        v-model="visitObj.visitReason"
        name="visitReason"
        disabled
        placeholder="请选择"
        right-icon="arrow"
        required
        @click="showyuanyin = true"
        :rules="[{ required: true, message: '请填写拜访原因' }]"
      >
        <template #label> 拜访原因 </template>
        <template #input v-if="visitObj.visitReason">
          {{ visitObj.visitReason }}
        </template>
      </van-field>

      <!-- 时间绑定变量必须是基本数据字符串类型 不能是对象 -->
      <van-field
        name="visitTime"
        placeholder="请选择"
        disabled
        right-icon="arrow"
        required
        @click="showDate = true"
        :rules="[{ required: false, message: '请填写拜访时间' }]"
      >
        <template #label> 拜访时间 </template>

        <template #input v-if="visitObj.visitTime">
          {{ visitObj.visitTime }}
        </template>
      </van-field>

      <van-field
        v-model="visitObj.visitAddress"
        name="visitAddress"
        rows="2"
        autosize
        label="拜访地址"
        type="textarea"
        maxlength="30"
        placeholder="请输入"
        show-word-limit
        :rules="[{ required: false }]"
      />
      <van-field
        v-model="visitObj.visitSituation"
        name="visitSituation"
        rows="2"
        autosize
        label="拜访情况"
        type="textarea"
        maxlength="50"
        placeholder="请输入"
        show-word-limit
        :rules="[{ required: false }]"
      />
      <van-field
        v-model="visitObj.collectSituation"
        name="collectSituation"
        rows="3"
        autosize
        label="竞争信息收集情况"
        type="textarea"
        maxlength="80"
        placeholder="请输入"
        show-word-limit
        :rules="[{ required: false }]"
      />

      <div class="btn">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <VisitSearch @addName="addNamefu" v-else />

    <!-- 表单功能popup开始 -->
    <van-popup v-model="showyuanyin" position="bottom">
      <van-picker
        show-toolbar
        :columns="['例行走访', '售中支持', '售前支撑']"
        @cancel="showyuanyin = false"
        @confirm="putYuantin"
      />
    </van-popup>

    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="visitObj.visitTime"
        type="date"
        :columns-order="['year', 'month', 'day']"
        :formatter="formatter"
        @cancel="showDate = false"
        @confirm="putDate"
      />
    </van-popup>
    <!-- 表单功能popup开始 -->
    <!-- 表单区域结束 -->
  </div>
</template>

<script>
import VisitSearch from "./visit-edit-search";
import { PostVisit } from "../../axios/api";

export default {
  components: {
    VisitSearch,
  },
  data() {
    return {
      showForm: true, // 选择客户隐藏表单
      showDate: false, // 显示日期时间选择器
      showyuanyin: false, // 显示拜访原因选择器
      visitObj: {
        custId: this.$route.params.custId,
        custName: this.$route.params.custName,
        visitTime: "2020-10-01 00:00:00",
        visitAddress: "河南省洛阳市...",
        visitTitle: "",
        visitReason: "",
        visitSituation: "没",
        collectSituation: "有",
      },
    };
  },
  methods: {
    // 接收子传父的值
    addNamefu(val) {
      // console.log(val);
      this.visitObj.custName = val.custName;
      this.visitObj.custId = val.id;
      // 接收到之后关闭这个搜索组件
      this.showForm = true;
    },
    // 关联时间选择器
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    // 日期选择器关联的值
    putYuantin(value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      this.visitObj.visitReason = value;
      // 确定后关闭popup层 即隐藏
      this.showyuanyin = false;
    },
    // 提交时间事件
    putDate(val) {
      // console.log(val)
      // console.log(new Date().toLocaleDateString())
      this.visitObj.visitTime = val;
      this.showDate = false;
    },
    // 提交表单
    onSubmit(values) {
      // console.log(this.visitObj);
      // values.visitTime = this.visitObj.visitTime;
      // console.log("submit", values);

      PostVisit(this.visitObj).then((res) => {
        // console.log(res);
        if(res.status==200){
          if(res.data.errCode==0){
            this.$toast("添加成功！")
            setTimeout(() => {
              this.$router.back(-1)
            }, 600);
          }else{
            this.$toast.fail("缺少必要参数！")
          }
        }else{
          this.$toast.fail("缺少必要参数！")
        }
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.edit {
  position: relative;
  height: 100%;
  background-color: #efefef;
  overflow: scroll;
  box-sizing: border-box;
}
.van-hairline--bottom::after {
  border-width: 0px;
}
/deep/.van-nav-bar {
  background-color: #003399;
  width: 100%;
  .van-icon {
    color: white;
  }
  .van-nav-bar__title {
    color: white;
  }
}
/deep/.van-form {
  /* 高度自撑满 不溢出 触发BFC规则 */
  top: 4.6rem;
  bottom: 0;
  position: absolute;
  width: 100vw;
  box-sizing: border-box;
  overflow: scroll;

  /* 去掉所有输入框的下边框线 */
  .van-cell::after {
    border-width: 0;
  }
  /* 禁用输入时的字体 */
  .van-field__label {
    color: black;
  }
  /* 第一个输入框有上下边距 */
  .van-field:nth-child(1) {
    margin: 1rem 0;
  }
  /* 第三个输入框有下边框线 */
  .van-field:nth-child(3) {
    border-bottom: 1px solid #eee;
  }

  .van-field:nth-child(5) {
    margin-top: 1rem;
  }
  .van-field:nth-child(6) {
    margin-top: 1rem;
  }
  .van-field:nth-child(7) {
    margin-top: 1rem;
  }

  /* 拜访原因高度 */
  .van-picker__columns {
    height: 20rem;
  }

  .btn {
    /* margin-top: 2rem; */
    box-sizing: border-box;
    padding: 1rem;
    /* background-color: #fff;
          box-shadow: 0 -.5rem .5rem #ccc; */
  }
}
</style>