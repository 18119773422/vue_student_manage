<template>
    <el-form ref="addStu"
             :model="addStu"
             :rules="rules"
             label-width="80px"
             style="width: 300px; margin: 0 auto;">
        <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="addStu.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="sNo">
            <el-input v-model.number.trim="addStu.sNo" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="addStu.sex">
                <el-radio label=0>男</el-radio>
                <el-radio label=1>女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="birth">
            <el-input v-model.number.trim="addStu.birth" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
            <el-input v-model.trim="addStu.phone" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="addStu.email" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
            <el-input v-model.trim="addStu.address"  style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"
                       @click="onSubmit"
                       >提交</el-button>
            <el-button @click="resetForm('addStu')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        data() {
            return {
                addStu: {
                    sNo: '',
                    name: '',
                    email: '',
                    sex: '0',
                    birth: '',
                    phone: '',
                    address: ''
                },
                // 验证规则
                rules: {
                    name: [
                        {
                            required: true,
                            type: 'string',
                            message: '请输入姓名',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 10,
                            message: '长度在 2 到 10 个字符',
                            trigger: ['blur', 'change']
                        }
                    ],
                    sNo: [
                        {
                            required: true,
                            message: '请输入学号',
                            trigger: 'blur'
                        },
                        {
                            type: 'number',
                            min: 1,
                            max: 99999,
                            trigger: ['blur', 'change'],
                            message: '学号在 1 到 999999 之间'
                        }
                    ],
                    birth: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请输入年龄'
                        },
                        {
                            type: 'number',
                            message: '年龄必须是数字格式'
                        },
                        {
                            type: 'number',
                            min: 2,
                            max: 100,
                            trigger: ['blur', 'change'],
                            message: '年龄在 2 到 100 之间'
                        }
                    ],
                    phone: [
                        {
                            required: true,
                            message: '请输入手机号码',
                            trigger: 'blur'
                        },
                        {
                            len: 11,
                            message: '手机号应该11位'
                        },
                        {
                            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
                            trigger: ['blur', 'change'],
                            message: '请输入正确的手机号码'
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    address: [
                        {
                            type: 'string',
                            required: true,
                            message: '请输入地址',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 10,
                            message: '长度在 2 到 10 个字符',
                            trigger: ['blur', 'change']
                        }
                    ]
                },

            }
        },
        // computed: {
        //
        // },
        created() {
            this.setMobileDevices(true);
        },
        methods: {
            ...mapMutations(['setMobileDevices']),
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onSubmit() {
                // 添加学生信息

                const addStuInfo = {};
                let flag = false;
                console.log(this.addStu, 'addstu');
                for (let prop in this.addStu) {
                    if (!this.addStu.isPrototypeOf(this.$router)) {
                        addStuInfo[prop] = this.addStu[prop].toString().trim();
                        if (addStuInfo[prop] === '') {
                            flag = true;
                        }
                    }
                }
                if (flag) {
                    this.$notify({
                        title: '错误',
                        type: 'error',
                        message: '添加学生失败'
                    });
                    return;
                }
                this.$api.addStudent(addStuInfo).then(
                    resolve => {
                        if (resolve.data === 'ok') {
                            this.$emit("res");
                            this.$notify({
                                title: '成功',
                                type: 'success',
                                message: '添加学生成功',
                            });
                        } else {
                            this.$notify({
                                title: '错误',
                                type: 'error',
                                message: '添加学生失败, ' + resolve.data
                            })
                        }
                    }
                );
            },
            onClose() {
                this.$router.replace('/');
            }
        }
    }
</script>

<style scoped>

</style>