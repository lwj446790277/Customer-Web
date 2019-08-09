<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">风控1</p> -->
        <div class="back">
            <h2>轮播图设置</h2>
            <div class="main">
                <el-table :data="tableData" border style="width: 100%;line-height: 60px">
                    <el-table-column prop="sort" label="排序" align="center">
                        <template slot-scope="scope">
                            {{scope.row.sort}}
                            <span class="blue el-icon-caret-top"
                                  @click="updateSortById(scope.row.id,scope.row.sort)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="viewpagerpicture" label="图片" align="center">
                        <template scope="scope">
                            <img :src="scope.row.viewpagerpicture" width="40" height="40" class="head_pic"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updatetime" label="更新时间" align="center"></el-table-column>
                    <el-table-column label="编辑" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openEditBannerDialog(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="删除" align="center">
                        <template slot-scope="scope">
                            <el-popover placement="bottom-end" width="300" trigger="click">
                                <span class="content">确认删除该轮播图吗？</span>
                                <el-button class="confire" type="success"
                                           @click="deleteBanner(scope.row.id,scope.row.sort)">是的
                                </el-button>
                                <el-button type="danger" slot="reference" @click="deleteAlert(scope.row)">删除</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="添加轮播图" :visible.sync="addBannerDialogVisible" width="30%" center>
                    <div class="blocks" v-if="block">
                        <i class="el-icon-picture"></i>
                    </div>
                    <img :src="src" v-if="hidden" class="hidden"/>
                    <el-upload
                        class="upload-demo"
                        :on-success="uploadFileSuccess"
                        :show-file-list="false"
                        action="http://39.98.83.65:8080/zhita_xiaodai_admin/homepage/PictureUpload"
                        accept=".jpg, .png"
                    >
                        <el-button size="small" type="primary" class="upload">点击上传</el-button>
                        <span>(支持jpg/png格式)</span>
                    </el-upload>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="addBannerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBanner()">确 定</el-button>
          </span>
                </el-dialog>
                <el-dialog title="编辑轮播图" :visible.sync="editBannerDialogVisible" width="30%" center>
                    <div class="blocks" v-if="block2">
                        <i class="el-icon-picture"></i>
                    </div>
                    <img :src="src2" v-if="hidden2" class="hidden"/>
                    <el-upload
                        class="upload-demo"
                        :on-success="uploadFileSuccess2"
                        :show-file-list="false"
                        action="http://39.98.83.65:8080/zhita_xiaodai_admin/homepage/PictureUpload"
                        accept=".jpg, .png"
                    >
                        <el-button size="small" type="primary" class="upload">点击上传</el-button>
                        <span>(支持jpg/png格式)</span>
                    </el-upload>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="editBannerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editBanner()">确 定</el-button>
          </span>
                </el-dialog>
                <div class="open" @click="addBannerDialogVisible = true">
                    <!-- <i class="el-icon-circle-plus-outline"></i> -->
                    <i class="el-icon-plus"></i>
                    <span>添加轮播图</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from "../components/headTop";

    export default {
        components: {
            headTop
        },
        data() {
            return {
                addBannerObject: {},
                editBannerObject: {},
                tableData: [],
                fileList: [],
                addBannerDialogVisible: false,
                editBannerDialogVisible: false,
                visible: false,
                src: "",
                src2: "",
                block: true,
                block2: false,
                hidden: false,
                hidden2: true
            };
        },
        beforeCreate() {
            var that = this;
            that.axios.get("/homepage/queryAll", {
                params: {companyId: window.localStorage.getItem("companyid")}
            }).then(res => {
                that.tableData = res.data;
            });
        },
        methods: {
            updateSortById(id, sort) {
                var that = this;
                if (sort == 1) {
                    that.$message({
                        type: "error",
                        message: "已经是第1位了"
                    });
                    return false;
                }
                that.axios.get("/homepage/upasort", {
                    params: {id: id, sort: sort}
                }).then(res => {
                    that.Search();
                    that.$message({
                        type: "success",
                        message: "排序修改成功"
                    });
                });
            },
            uploadFileSuccess(res) {
                var that = this;
                if (!!res.success) {
                    this.block = false;
                    this.hidden = true;
                    this.src = res.success;
                    that.addBannerObject.viewpagerpicture = res.success;
                    this.$message({
                        type: "success",
                        message: "图片上传成功"
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    });
                }
            },
            uploadFileSuccess2(res) {
                var that = this;
                if (!!res.success) {
                    this.block2 = false;
                    this.hidden2 = true;
                    this.src2 = res.success;
                    that.editBannerObject.viewpagerpicture = res.success;
                    this.$message({
                        type: "success",
                        message: "图片上传成功"
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg
                    });
                }
            },
            openEditBannerDialog(object) {
                var that = this;
                that.editBannerObject = object;

                that.src2 = that.editBannerObject.viewpagerpicture;
                that.editBannerDialogVisible = true;
            },
            Search() {
                var that = this;
                that.axios.get("/homepage/queryAll", {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.tableData = res.data;
                });
            },
            addBanner() {
                var that = this;
                that.addBannerObject.companyid = window.localStorage.getItem("companyid");
                that.axios.get("/homepage/insert", {
                    params: that.addBannerObject
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "添加成功"
                    });
                    this.Search();
                    that.addBannerDialogVisible = false;
                });
            },
            editBanner() {
                var that = this;
                that.editBannerObject.companyid = window.localStorage.getItem(
                    "companyid"
                );
                that.axios.get("/homepage/updateByPrimaryKey", {
                    params: that.editBannerObject
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "编辑成功"
                    });
                    this.Search();
                    that.editBannerDialogVisible = false;
                });
            },
            deleteBanner(id, sort) {
                var that = this;
                that.axios.get("/homepage/updateFalDel", {
                    params: {id: id, sort: sort}
                }).then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    this.Search();
                });
            },
            deleteAlert() {
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";
    // .explain_text{
    // 	margin-top: 20px;
    // 	text-align: center;
    // 	font-size: 20px;
    // 	color: #333;
    // }
    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .img {
        width: 100px;
        height: 60px;
        vertical-align: middle;
        margin: 10px;
    }

    .open {
        width: 99.9%;
        line-height: 60px;
        border: 1px solid #eee;
        margin-top: -1px;
        cursor: pointer;
        font-size: 1.2rem;
        text-align: center;
    }

    .el-dialog__title {
        margin-left: 37%;
    }

    .el-dialog--small {
        width: 30%;
    }

    .blocks {
        margin: 10px auto;
        width: 70%;
        line-height: 200px;
        background-color: #eee;
        text-align: center;
    }

    .hidden {
        margin: 10px auto;
        width: 70%;
        height: 200px;
    }

    i.el-icon-picture {
        font-size: 1.6rem;
    }

    .upload {
        margin-left: 80px;
        margin-top: 15px;
    }

    .content {
        font-size: 1.1rem;
        text-align: center;
        display: block;
        margin-bottom: 15px;
        margin-top: 15px;
    }

    .confire {
        float: right;
    }
</style>
