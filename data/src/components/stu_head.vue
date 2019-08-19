<template>
    <div class="header_scoped" @click="toIndex" >
            <i class="el-icon-s-platform"></i>
            <span>学生管理系统</span>
    </div>
</template>

<script>

    export default {
        methods: {
            toIndex() {
                this.$router.replace('/')
            }
        }
    }
</script>

<style scoped>
    .header_scoped i,
    .header_scoped span {
        font-size: 16px;
        color: #dddddd;
        line-height: 60px;
        padding: 0 5px;
    }
</style>