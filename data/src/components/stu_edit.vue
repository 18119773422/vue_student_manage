<template>
    <el-form ref="form" :model="editStu" label-width="80px" style="width: 300px; margin: 0 auto;">
        <el-form-item label="姓名">
            <el-input v-model="editStu.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="editStu.sex">
                <el-radio label=0 checked="checked">男</el-radio>
                <el-radio label=1>女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
            <el-input v-model="editStu.birth" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="手机">
            <el-input v-model="editStu.phone" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="editStu.email" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input v-model="editStu.address" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onClose">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                temp: {}
            }
        },
        created() {
            if (!this.editStu.sNo) {
                this.$message({
                    type: 'warning',
                    message: '你没有权限访问,默认跳转首页！'
                });
                // replace ==> 替换
                this.$router.replace('/');
            } else {
                this.editStu['sex'] = this.editStu['sex'] === '女' ? '1' : '0';
            }
            this.temp = {
                sNo: this.editStu['sNo'],
                name: this.editStu['name'],
                email: this.editStu['email'],
                sex: this.editStu['sex'],
                birth: this.editStu['birth'],
                phone: this.editStu['phone'],
                address: this.editStu['address']
            };
        },
        computed: {
            ...mapState(['editStu']),
        },
        methods: {
            onSubmit() {
                let flag = true;
                // 修改过后的学生对象
                let updateObj = {};
                for (let prop in this.temp) {
                    updateObj[prop] = this.$store.state.editStu[prop];
                    if (this.temp[prop] != this.$store.state.editStu[prop]) {
                        flag = false;
                    }
                }
                if (flag) {
                    this.$message({
                        type: 'warning',
                        message: '请修改后提交'
                    })
                } else {
                    this.$notify({
                        type: 'info',
                        title: '提交到服务器',
                        message: '正在提交中...',
                        duration: 500
                    });
                    // delete updateObj.sNo;
                    this.$api.updateStudent(updateObj)
                        .then(
                            resolve => {
                                if (resolve.data === "ok") {
                                    this.$notify({
                                        type: 'success',
                                        title: '成功',
                                        message: '修改成功，正在前往首页',
                                        duration: 800,
                                    });
                                    // eslint-disable-next-line no-unused-vars
                                    setTimeout(_ => {
                                        this.$router.push('/');
                                    }, 500)
                                } else {
                                    this.$notify({
                                        type: 'error',
                                        title: '错误的提交',
                                        message: '服务器或数据格式出错'
                                    })
                                }
                            },
                            // 一般不会出现，及特殊情况下会出现
                            reject => {
                                this.$message({
                                    type: 'error',
                                    message: reject + '在提交学生中，出现了一个意外的错误！'
                                })
                            }
                        )
                }
                // console.log(temp);
            },
            onClose() {
                this.$router.replace('/')
            }
        }
    }
</script>
<style>
    body {
        overflow: auto;
    }
</style>