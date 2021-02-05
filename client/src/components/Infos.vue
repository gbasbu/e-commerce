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
  margin-bottom: 10px;
}
</style>