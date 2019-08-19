<template>
    <div class="stu-search">
        <el-input
                placeholder="请输入搜索内容并按回车提交"
                v-model="input"
                @keyup.13.native="searchStudent"
                clearable>
        </el-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: ''
            }
        },
        methods: {
            searchStudent() {
                console.log(this.input);
                if (this.input !== "") {
                    this.$api.searchKeyWord(this.input).then(resolve => {
                        console.log(resolve.data);
                        if (resolve.data.status === "ok") {
                            // this.$message({
                            //     type: 'success',
                            //     message: '已找到搜索内容'
                            // });
                            resolve.data.dataSet.forEach(ele => {
                                ele['sex'] = ele['sex'] === 1 ? '女' : '男';
                            });
                            this.$store.commit('setStuList', resolve.data.dataSet);
                            this.$message({
                                message: '数据获取成功',
                                duration: 800,
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                type: 'info',
                                message: resolve.data.status
                            })
                        }

                    }, reject => {
                        this.$message({
                            type: 'error',
                            message: '搜索出错了' + reject,
                        })
                    })
                }
            }
        },
        name: "stu_search"
    }
</script>

<style scoped>
    .stu-search .el-input {
        width: 300px;
        text-align: center;
        display: inline-block;
    }
</style>