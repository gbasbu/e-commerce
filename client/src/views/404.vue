<template>
    <div>
        <h1>404 Not Found</h1>
        <p>The page you are looking for is not here.</p>
        <router-link class="link" to="/">Keep shopping</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    div{
        text-align: center;
        margin-top: 120px;
        h1{
            font-size: 3rem;
        }
        p{
            margin-bottom: 50px;
        }
    }
</style>