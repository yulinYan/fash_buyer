<template>
    <div>
        <mc-header></mc-header>
        <mc-footer></mc-footer>
        <div class="main-content">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    import header from "./main/header";
    import footer from "./main/footer";
    export default {
        name: "vmain",
        components:{
            'mc-footer':footer,
            'mc-header':header
        }
    }
</script>

<style scoped>
    .main-content{
        margin-top:0.5rem;
    }
</style>