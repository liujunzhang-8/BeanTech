<template>
    <div>
        <el-card>
            <el-button
                class="btn"
                type="primary"
                icon="el-icon-circle-plus-outline"
                size="mini"
                @click="addDialogVisible = true"
            >添加</el-button>
            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe>
                <el-table-column prop="customerName" label="客户公司全称" align="center"></el-table-column>
                <el-table-column prop="xxx" label="XXX" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    align="center"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="操作" width="220px" align="center">
                    <template slot-scope="scope">
                        <!-- 编辑按钮 -->
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="editUserInfo(scope.$index,scope.row)"
                        >编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-card>
        <!-- 添加客户 -->
        <el-dialog
            title="新增客户"
            :visible.sync="addDialogVisible"
            @close="addDialogClosed()"
            width="30%"
        >
            <div>
                <!-- 内容主体区域 -->
                <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="addFormRef"
                    label-width="80px"
                >
                    <el-form-item label="公司全称" prop="projectName">
                        <el-input v-model="addForm.projectName"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">提 交</el-button>
            </span>
        </el-dialog>

        <!-- 编辑对话框 -->
        <el-dialog
            title="编辑客户"
            :visible.sync="editDialogVisible"
            width="40%"
            @close="editDialogClosed"
        >
            <div>
                <!-- 内容主体区域 -->
                <el-form
                    :model="editForm"
                    :rules="editFormRules"
                    ref="editFormRef"
                    label-width="120px"
                >
                    <el-form-item label="客户公司全称" prop="customerName">
                        <el-input v-model="editForm.customerName"></el-input>
                    </el-form-item>
                    <el-form-item label="XXX" prop="xxx">
                        <el-input v-model="editForm.xxx"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editUser()">确 定</el-button>
                <el-button @click="editDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 项目总量
            total: 2,
            // 项目列表
            userlist: [
                {
                    customerName: 'vivo科技有限公司',
                    xxx: 'vivo',
                    createTime: '2020-07-30',
                    updateTime: '2020-12-30'
                },
                {
                    customerName: '华为科技有限公司',
                    xxx: '华为',
                    createTime: '2020-05-30',
                    updateTime: '2020-12-30'
                }
            ],
            // 搜索用户
            query: {
                userName: '',
                userRealName: '',
                pageSize: 5
            },
            // 新增项目
            addForm: {
                projectName: ''
            },
            // 添加对话框的显示与隐藏
            addDialogVisible: false,
            // 添加表单的验证规则对象
            addFormRules: {
                projectName: [{ required: true, message: '请输入公司全称', trigger: 'blur' }]
            },
            // 编辑项目
            editForm: {
                customerName: '',
                xxx: ''
            },
            // 编辑对话框的显示与隐藏
            editDialogVisible: false,
            // 编辑表单的验证规则对象
            editFormRules: {
                customerName: [{ required: true, message: '请输入客户公司全称', trigger: 'blur' }],
                xxx: [{ required: true, message: '请输入XXX', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        // 获取用户列表
        async getUserList() {},
        // 添加新用户
        addUser() {
            this.$refs.addFormRef.validate(async (valid) => {
                console.log(valid);
                if (!valid) {
                    return;
                } else {
                    // 可以发起添加用户的网络请求
                    const { data: res } = await this.$http.post('/user/add', this.addForm);
                    // console.log(res.data)
                    if (res.code !== '0000') {
                        this.$message.error('添加用户失败');
                    } else {
                        this.$message.success('添加用户成功！');
                        // 隐藏添加用户的对话框
                        this.addDialogVisible = false;
                        // 重新获取用户列表数据
                        this.getUserList();
                    }
                }
            });
        },
        // 监听添加用户对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        // 打开编辑
        editUserInfo(index, row) {
            this.idx = index;
            this.editForm = row;
            this.editDialogVisible = true;
        },
        // 编辑用户
        editUser() {
            this.$refs.editFormRef.validate(async (valid) => {
                console.log(valid);
                if (!valid) {
                    return;
                } else {
                    // 可以发起编辑用户的网络请求
                    const { data: res } = await this.$http.post('/user/change', this.editForm);
                    if (res.code !== '0000') {
                        this.$message.error('编辑用户失败');
                    } else {
                        this.$message.success('编辑用户成功！');
                        // 隐藏添加用户的对话框
                        this.editDialogVisible = false;
                        // 重新获取用户列表数据
                        this.getUserList();
                    }
                }
            });
        },
        // 监听编辑用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 监听pagesize改变的事件
        handleSizeChange(newSize) {
            this.query.pageSize = newSize;
            this.getUserList();
        },
        // 监听页码值改变事件
        handleCurrentChange(newPage) {
            this.query.pageNum = newPage;
            this.getUserList();
        }
    }
};
</script>

<style scoped>
span {
    color: #606266;
    font-size: 14px;
    padding-right: 10px;
}
.el-input {
    width: 216px;
    display: inline-block;
}
.el-table {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
}
.btn {
    margin: 16px 0;
    float: right;
}
.red {
    color: #ff0000;
}
.el-pagination {
    margin-top: 20px;
    margin-bottom: 10px;
    float: right;
}
</style>