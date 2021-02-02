<template>
    <div> {{ msg }} </div>
</template>
<script>
export default {
    props: ['msg']
}
</script>
<style lang="scss" scoped>
    div{
        color:red;
        margin-bottom: 20px;
    }
</style>