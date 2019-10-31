<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <template v-if="isInArray(23)">
                <el-tab-pane label="逾期黑名单" name="first">
                    <div class="back">
                        <h2>逾期黑名单</h2>
                        <div class="table_container">
                            <el-form :model="form" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-input placeholder="姓名" v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="手机号" v-model="form.phone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="身份证号" v-model="form.idcard"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="注册起始时间" value-format="yyyy-MM-dd" @change="dateChangeStart" v-model="form.registestarttime"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="single">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="注册结束时间" value-format="yyyy-MM-dd" @change="dateChangeEnd" v-model="form.registeendtime"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-select placeholder="引流平台" v-model="form.sourcename">
                                        <el-option v-for="source in sourceList" :label="source.sourcename" :value="source.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                    <el-button type="primary" @click="Search">搜索</el-button>
                                    <el-button type="danger" @click="downloadSource">下载</el-button>
                                </el-form-item>
                            </el-form>
                            <el-table border :data="blackList" style="width: 100%">
                                <el-table-column :resizable='false' prop="user.registetime" label="注册时间" align="center" width="180"></el-table-column>
                                <el-table-column :resizable='false' prop="user.name" label="姓名" align="center" width="80"></el-table-column>
                                <el-table-column :resizable='false' prop="user.phone" label="手机号" align="center" width="130"></el-table-column>
                                <el-table-column :resizable='false' prop="user.idcard" label="身份证号" align="center" width="190"></el-table-column>
                                <el-table-column :resizable='false' prop="user.sourcename" label="引流平台" align="center" width="100"></el-table-column>
                                <el-table-column :resizable='false' prop="user.registeclient" label="客户端" align="center" width="90"></el-table-column>
                                <el-table-column :resizable='false' prop="howManyTimesBorMoney" label="借款次数" width="60" align="center"></el-table-column>
                                <el-table-column :resizable='false' label="认证信息" width="100" align="center">
                                    <template slot-scope="scope">
                                        <router-link :to="{path:'/personalInformation',query:{id:scope.row.id}}">
                                            <span class="blue">查看</span>
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column :resizable='false' label="操作" width="120" align="center">
                                    <template slot-scope="scope">
                                        <el-popover placement="bottom-end" width="300" :ref="`popover+${scope.$index}`">
                                            <p>确定解冻该用户黑名单吗？</p>
                                            <el-button class="confire" type="success" @click="deleteBlackState(scope)">确定</el-button>
                                            <el-button type="primary" slot="reference">解冻</el-button>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                    :current-page="page"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :page-count="totalPageCount"
                                    :total="totalCount"
                                    @current-change="currentChange"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
            <template v-if="isInArray(24)">
                <el-tab-pane label="人工添加黑名单" name="second">
                    <div class="back">
                        <h2>人工添加黑名单</h2>
                        <div class="table_container">
                            <el-form :model="form2" :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-input placeholder="姓名" v-model="form2.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="手机号" v-model="form2.phone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="身份证号" v-model="form2.idcard"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-select placeholder="黑名单类型" v-model="form2.blackType">
                                        <el-option label="逾期自动判定" value="1"></el-option>
                                        <el-option label="重复用户" value="2"></el-option>
                                        <el-option label="手工录入" value="3"></el-option>
                                        <el-option label="第三方黑名单" value="4"></el-option>
                                        <el-option label="三要素认证超过次数" value="5"></el-option>
                                        <el-option label="人审拒绝" value="6"></el-option>
                                        <el-option label="批量导入" value="7"></el-option>
                                        <el-option label="人工添加" value="8"></el-option>
                                        <el-option label="非法渠道" value="9"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="warning" @click="Reset2" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                    <el-button type="primary" @click="Search2()">搜索</el-button>
                                    <el-button type="danger" @click="downloadSource2">下载</el-button>
                                </el-form-item>
                                <el-button type="success" @click="batch" class="confire" style="background-color:#19b293">
                                    批量导入
                                </el-button>
                            </el-form>
                            <el-table border :data="blackList2" style="width: 100%">
                                <el-table-column :resizable='false' prop="name" label="姓名" align="center" width="80"></el-table-column>
                                <el-table-column :resizable='false' prop="phone" label="手机号" align="center" width="130"></el-table-column>
                                <el-table-column :resizable='false' prop="idcard" label="身份证号" align="center" width="190"></el-table-column>
                                <el-table-column :resizable='false' prop="blackTypeName" label="类型" align="center" width="100"></el-table-column>
                                <el-table-column :resizable='false' prop="operationtime" label="最后编辑时间" align="center" width="180"></el-table-column>
                                <el-table-column :resizable='false' prop="account" label="操作成员" align="center" width="100"></el-table-column>
                                <el-table-column :resizable='false' label="操作" align="center" width="100">
                                    <template slot-scope="scope">
                                        <!--<span @click="editDialogShow(scope.row)" class="blue">编辑</span>
                                        <span class="zhong">|</span>-->
                                        <el-popover placement="bottom-end" width="300" trigger="click"
                                                    :ref="`popover-${scope.$index}`">
                                            <span class="content">确认将该用户从黑名单删除吗？</span>
                                            <el-button class="confire" type="success" @click="deleteBlackUser(scope)">是的
                                            </el-button>
                                            <span slot="reference" class="red">删除</span>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="address" label="编辑" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" @click="editDialogShow(scope.row)">编辑</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="address" label="删除" align="center">
                                    <template slot-scope="scope">
                                        <el-popover placement="bottom-end" width="300" trigger="click"
                                                    :ref="`popover-${scope.$index}`">
                                            <span class="content">确认将该用户从黑名单删除吗？</span>
                                            <el-button class="confire" type="success" @click="deleteBlackUser(scope)">是的
                                            </el-button>
                                            <el-button type="danger" slot="reference">删除</el-button>
                                        </el-popover>
                                    </template>
                                </el-table-column> -->
                            </el-table>
                            <div class="open" @click="dialogTableVisible2 = true">
                                <i class="el-icon-plus"></i>
                                <span>添加黑名单用户</span>
                            </div>
                            <el-dialog title="新增黑名单" :visible.sync="dialogTableVisible2" customClass="customWidthe">
                                <table cellspacing="0" cellpadding="15" class="bode">
                                    <tr>
                                        <th>姓名</th>
                                        <td>
                                            <el-input placeholder="请输入姓名" v-model="addObject.name"></el-input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>手机号</th>
                                        <td>
                                            <el-input placeholder="请输入手机号" v-model="addObject.phone"></el-input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>身份证号</th>
                                        <td>
                                            <el-input placeholder="请输入身份证号" v-model="addObject.idcard"></el-input>
                                        </td>
                                    </tr>
                                </table>
                                <el-button type="primary" class="confire" @click="save">保存</el-button>
                            </el-dialog>
                            <el-dialog title="编辑黑名单" :visible.sync="editDialogTableVisible" customClass="customWidthe">
                                <table cellspacing="0" cellpadding="15" class="bode">
                                    <tr>
                                        <th>姓名</th>
                                        <td>
                                            <el-input placeholder="请输入姓名" v-model="editObject.name"></el-input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>手机号</th>
                                        <td>
                                            <el-input placeholder="请输入手机号" v-model="editObject.phone"></el-input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>身份证号</th>
                                        <td>
                                            <el-input placeholder="请输入身份证号" v-model="editObject.idcard"></el-input>
                                        </td>
                                    </tr>
                                </table>
                                <el-button type="primary" class="confire" @click="editBlackUser">保存</el-button>
                            </el-dialog>
                            <el-dialog title="批量导入" :visible.sync="batchVisiable" customClass="customWidthe">
                                <table cellspacing="0" cellpadding="15" class="bode">
                                    <tr>
                                        <th>文件选择</th>
                                        <td>
                                            <el-upload ref="upload" :auto-upload="autoUpload" class="upload-demo" :on-success="uploadFileSuccess" :action="uploadUrl" accept=".xlsx, .xls"
                                                       :file-list="fileList"  :data="uploadData"   :before-upload="beforeUpload" >
                                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">点击上传</el-button>
                                                <span>(支持xlsx/xls格式)</span>
                                            </el-upload>
                                        </td>
                                    </tr>
                                </table>
                            </el-dialog>
                            <div class="block">
                                <el-pagination :current-page="page2" :page-size="pageSize2" layout="total, prev, pager, next, jumper"
                                               :page-count="totalPageCount2"
                                               :total="totalCount2"
                                               @current-change="currentChange2">

                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
        </el-tabs>
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
                fileList: [],
                autoUpload: false,
                activeName: "first",
                form: {
                    name: "",
                    input: "",
                    time: "",
                    date: "",
                    platform: ""
                },
                form2: {
                    name: '',
                    phone: '',
                    idcard: '',
                    blackType: '',
                },
                blackList: [],
                blackList2: [],
                sourceList: [],
                addObject: {name: undefined},
                editObject: {name: undefined},
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                page2: 1,
                pageSize2: 10,
                totalPageCount2: 0,
                totalCount2: 0,
                visible: false,
                dialogTableVisible: false,
                dialogTableVisible2: false,
                editDialogTableVisible: false,
                name: "",
                phone: "",
                cardId: "",
                batchVisiable: false,
                uploadUrl: this.axios.defaults.baseURL + 'blacklistuser/importExc?companyId=' + window.localStorage.getItem("companyid") + '&operator=' + window.localStorage.getItem('userid'),
                uploadData:{}
            };
        },
        created() {
            if (this.isInArray(23)) {
                this.Search();
            }
            if (this.isInArray(24)) {
                this.Search2();
            }
        },
        methods: {
            handleClick() {
                if (this.activeName == "second") {
                    this.Search2()
                }
                if (this.activeName == "first") {
                    this.Search();
                }
            },
            isInArray: function (val) {
                var that = this;
                var testStr = ',' + window.localStorage.getItem("role") + ",";
                return testStr.indexOf("," + val + ",") != -1;
            },
            dateChangeStart(val) {
                var that = this;
                that.form.registestarttime = val;
            },
            dateChangeEnd(val) {
                var that = this;
                that.form.registeendtime = val;
            },
            getMessage() {
            },
            Search() {
                var that = this;
                if (!!that.form.phone && that.form.phone.length != 11) {
                    this.$message({
                        type: "error",
                        message: '请输入11位手机号'
                    });
                    return false;
                }
                var param = that.form;
                param.companyid = window.localStorage.getItem("companyid");
                param.page = that.page;
                that.axios.get('/user/queryAllOrdersByUserid1', {
                    params: param
                }).then(res => {
                    that.blackList = res.data.listorders;
                    that.sourceList = res.data.listsource;
                    that.page = res.data.pageutil.page;
                    that.totalPageCount = res.data.pageutil.totalPageCount;
                    that.totalCount = res.data.pageutil.totalCount;
                    that.pageSize = res.data.pageutil.pageSize;
                });
            },
            downloadSource() {
                var that = this;
                if (!!that.form.phone && that.form.phone.length != 11) {
                    this.$message({
                        type: "error",
                        message: '请输入11位手机号'
                    });
                    return false;
                }
                var param = that.form;
                param.page = undefined;
                param.companyid = window.localStorage.getItem("companyid");
                var param = that.form;
                param.companyId = window.localStorage.getItem("companyid");
                that.downloadExcel("/user/exportoverdue.do ", param, '逾期黑名单报表');
            },
            Search2() {
                var that = this;
                var param = that.form2;
                param.companyId = window.localStorage.getItem("companyid");
                param.page = that.page2;
                that.axios.get('/blacklistuser/queryAll', {
                    params: param
                }).then(res => {
                    that.blackList2 = res.data.blackuserlist;
                    that.page2 = res.data.pageutil.page;
                    that.totalPageCount2 = res.data.pageutil.totalPageCount;
                    that.totalCount2 = res.data.pageutil.totalCount;
                    that.pageSize2 = res.data.pageutil.pageSize;
                    if (!!that.blackList2.length) {
                        for (var i = 0; i < that.blackList2.length; i++) {
                            switch (that.blackList2[i].blackType) {
                                case '1':
                                    that.blackList2[i].blackTypeName = "逾期自动判定";
                                    break;
                                case '2':
                                    that.blackList2[i].blackTypeName = "重复用户";
                                    break;
                                case '3':
                                    that.blackList2[i].blackTypeName = "手工录入";
                                    break;
                                case '4':
                                    that.blackList2[i].blackTypeName = "第三方黑名单";
                                    break;
                                case '5':
                                    that.blackList2[i].blackTypeName = "三要素超过认证次数";
                                    break;
                                case '6':
                                    that.blackList2[i].blackTypeName = "人审拒绝";
                                    break;
                                case '7':
                                    that.blackList2[i].blackTypeName = "批量导入";
                                    break;
                                case '8':
                                    that.blackList2[i].blackTypeName = "人工添加";
                                    break;
                                case '9':
                                    that.blackList2[i].blackTypeName = "非法渠道";
                                    break;
                            }
                        }
                    }
                });
            },
            downloadSource2() {
                var that = this;
                var param = that.form2;
                param.page = undefined;
                param.companyId = window.localStorage.getItem("companyid");
                that.downloadExcel("/blacklistuser/exportblack.do", param, '人工添加黑名单报表');
            },
            deleteBlackState(scope) {
                var that = this;
                scope._self.$refs[`popover+${scope.$index}`].doClose();
                var id = scope.row.userId;
                that.axios.get('/user/removeBlacklist', {
                    params: {userId: id, companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除黑名单成功'
                    });
                    that.Search();
                })
            },
            deleteBlackUser(scope) {
                var that = this;
                var id = scope.row.id;
                var userId = scope.row.userid;
                scope._self.$refs[`popover-${scope.$index}`].doClose();
                that.axios.get('/blacklistuser/upaFalseDel', {
                    params: {id: id, userid: userId}
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    that.Search2();
                });
            },
            editDialogShow(object) {
                var that = this;
                that.editObject = {};
                that.editObject.id = object.id;
                that.editObject.name = object.name;
                that.editObject.phone = object.phone;
                that.editObject.idcard = object.idcard;
                that.editDialogTableVisible = true;
            },
            editBlackUser() {
                var that = this;
                that.editObject.companyid = window.localStorage.getItem("companyid");
                that.editObject.operator = window.localStorage.getItem("userid");
                that.axios.get('/blacklistuser/updateByPrimaryKey', {
                    params: that.editObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑黑名单信息成功'
                    });
                    this.Search2();
                    that.editDialogTableVisible = false;
                });
            },
            currentChange(val) {
                var that = this;
                that.page = val;
                that.Search();
            },
            currentChange2(val) {
                var that = this;
                that.page2 = val;
                that.Search2();
            },
            Reset() {
                this.form = {
                    name: '',
                    phone: '',
                    idcard: '',
                };
            },
            Reset2() {
                this.form2 = {
                    name: '',
                    phone: '',
                    idcard: '',
                    blackType: ''
                };
            },
            batch() {
                var that = this;
                that.batchVisiable = true;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            confire() {
                this.visible = false;
            },
            beforeUpload(file) {
                this.uploadData = {excelFile: file, companyId: window.localStorage.getItem("companyid"), operator: window.localStorage.getItem('userid')};
                let promise = new Promise((resolve) => {
                    this.$nextTick(function () {
                        resolve(true);
                    });
                });
                return promise; //通过返回一个promis对象解决
            },
            uploadFileSuccess() {
                var that = this;
                that.fileList = [];
                that.batchVisiable = false;
                that.$message({
                    type: "success",
                    message: "上传成功"
                });
                that.Search2();
            },
            save() {
                var that = this;
                that.addObject.companyid = window.localStorage.getItem("companyid");
                that.addObject.operator = window.localStorage.getItem("userid");
                that.axios.get('/blacklistuser/insert', {
                    params: that.addObject
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '新增黑名单成功'
                    });
                    that.dialogTableVisible2 = false;
                    that.Search2();
                })
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .el-tabs__header {
        margin: 0;
    }

    .table_container {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .single {
        margin-left: -15px;
    }

    .el-popover p {
        text-align: center;
        font-size: 18px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .confire {
        float: right;
    }

    .blue {
        color: #396fff;
        cursor: pointer;
    }

    .red {
        color: #ff050b;
        cursor: pointer;
    }

    .zhong {
        margin-left: 5px;
        margin-right: 5px;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .content {
        font-size: 1rem;
        text-align: center;
        display: block;
        margin-bottom: 15px;
        margin-top: 15px;
    }

    .confire {
        float: right;
    }

    .open {
        width: 99.9%;
        line-height: 60px;
        border: 1px solid #dfe6ec;
        margin-top: -1px;
        cursor: pointer;
        font-size: 1.2rem;
        text-align: center;
    }

    .customWidthe {
        width: 25%;
        text-align: center;
        padding-bottom: 20px;
    }

    .bode {
        width: 98%;
        margin: 20px auto;
        border-color: #dfe6ec;
    }
</style>
