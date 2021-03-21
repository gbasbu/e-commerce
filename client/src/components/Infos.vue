<template>
  <div>{{ msg }}</div>
</template>
<script>
export default {
  props: ["msg"],
};
</script>
<style lang="scss" scoped>
div {
  padding-top: 30px;
  text-align: center;
  width: 200px ;
  height: 100px;
  font-weight: bold;
  border-radius: 10px;
}
</style>