<template>
    <el-table
            :data="stuList"
            border
            size="small"
            :max-height=maxHeight
            :fit=b
            style="width: 100%">
        <el-table-column
                align="center"
                fixed="left"
                prop="name"
                label="姓名"
        >
        </el-table-column>
        <el-table-column
                prop="sNo"
                label="学号">
        </el-table-column>
        <el-table-column
                prop="sex"
                label="性别">
        </el-table-column>
        <el-table-column
                prop="birth"
                label="年龄">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="手机"
                :show-overflow-tooltip=true>
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱"
                :show-overflow-tooltip=true>
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址">
        </el-table-column>
        <el-table-column
                v-if="power"
                fixed="right"
                align="center"
                label="操作"
                width="100">
            <template slot-scope="scope">
                <el-button @click="editClick(scope.row)" size="small" type="primary" icon="el-icon-edit"
                           circle></el-button>
                <el-button @click="onDel(scope.$index, stuList)" size="small" type="danger" icon="el-icon-delete"
                           circle></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        computed: {
            //获取到的学生列表
            ...mapState(['stuList', 'power'])
        },
        created() {
            // 最大高度，超过后自动出现滚动条
            this.maxHeight = window.innerHeight - 60 - 0.05 * window.innerHeight;
            //  获取数据
            this.$api.queryAllStudent().then(resolve => {
                    if (resolve.data.status === 'ok') {
                        // 服务器中设置， sex 等于 1 是女，sex 等于 0 是 男
                        // set in the server, sex is 1 equals female, sex is 0 equals male
                        resolve.data.dataSet.forEach(ele => {
                            ele['sex'] = ele['sex'] === 1 ? '女' : '男';
                        });
                        this.$store.commit('setStuList', resolve.data.dataSet);
                        this.$message({
                            message: '数据获取成功',
                            duration: 800,
                            type: 'success'
                        });
                    }
                }, reject => {
                    this.$message({
                        type: 'error',
                        message: reject + ' 出现了一个意外的错误',
                    });
                }
            );
        },
        methods: {
            ...mapMutations(['editStuInfo']),
            editClick(row) {
                this.$router.push('edit');
                // console.log(row);

                this.editStuInfo(row);
            },
            deleteRow(index, rows) {
                console.log(rows[index].sNo);
                this.$api.delBySNo(rows[index].sNo)
                    .then(resolve => {
                            if (resolve.data === 'ok') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration: 500
                                });
                                setTimeout(_ => {

                                    this.api;
                                }, 500);
                            }
                        },
                        // 一般不会出现，及特殊情况下会出现
                        reject => {
                            this.$message({
                                type: 'error',
                                message: reject + '当前操作，出现了一个意外的错误！'
                            })
                        }
                    )
                    .catch(e => console.log(e));
                rows.splice(index, 1);
            },
            onDel(i, rows) {
                this.$confirm('此操作将永久删除该学生( ' + rows[i].name + ' , ' + rows[i].sex + ' ), 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteRow(i, rows);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        data() {
            return {
                visible: false,
                b: true,
                maxHeight: 200,

            }
        },
    }
</script>

<style scoped>
    .el-table {
        /*height: calc(100% - 60px);*/
    }
</style>