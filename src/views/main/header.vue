<template>
    <div class="header">
        <img src="../../assets/images/logo.png"/>
    </div>
</template>

<script>
    export default {
        name: "vheader"
    }
</script>

<style scoped>
.header{
    position: fixed;
    height: 0.5rem;
    width: 100%;
    top: 0;
    /*头部吸顶保证在最顶层*/
    z-index:3;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #faf9fc;
}
.header img{
    width: 1.3rem;
    height: auto;
}
</style>