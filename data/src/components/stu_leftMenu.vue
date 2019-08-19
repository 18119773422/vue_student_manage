<template>
    <div class="leftMenu">
        <el-menu  default-active="student_manage"
                  class="el-menu-vertical-demo"
                  :mode="flag ? 'horizontal' : 'vertical'"
                  :unique-opened=true
                  menu-trigger="click"
                  :router="true"
                  :collapse="flag">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span slot="title">学生管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/">学生列表</el-menu-item>
                    <el-menu-item index="/add">新增学生</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统设置</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="show-menu">
                        <el-switch
                                v-model="bel"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="操作权限"
                                @change="changeStatus"
                                >
                        </el-switch>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>


    </div>
</template>
<style>
    .el-menu-vertical-demo {
        height: calc(100vh - 60px);

    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: calc(100vh - 60px);
        /*min-height: 400px;*/
        background: #fff;
    }
</style>

<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        data() {
            return {
                bel:null,
                student_num:1,
                maxNum: 20,
                flag: false
            }
        },
        created () {
            this.bel = this.power;
            // 如果设备宽度 小于等于 768 ，我们对菜单进行折叠
            this.flag = window.innerWidth <= 900;
            // eslint-disable-next-line no-console
            console.log('当前设备宽度 <= 900', this.flag);
        },
        methods: {
            ...mapMutations(['setPower']),
            changeStatus() {
                this.setPower(this.bel);
            }
            // handleOpen(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            // handleClose(key, keyPath) {
            //     console.log(key, keyPath);
            // }
        },
        computed:{
            ...mapState(['power'])
        },

    }
</script>

