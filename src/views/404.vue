<template>
  <div class="err">
    <h3>找不到你要的页面！</h3>
    <button @click="$router.push('/home')">返回主页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.err {
  font-size: 1.6rem;
  text-align: center;

  h3 {
    margin-top: 3rem;
  }

  button {
    margin-top: 10rem;
  }
}
</style>