<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">风控3</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="联系客服设置" name="first">
                <div class="back">
                    <h2>联系客服设置</h2>
                    <div class="main">
                        <table cellpadding="30" cellspacing="0" class="table" style="width: 100%;margin-left: 0px;">
                            <tr>
                                <th>联系方式</th>
                                <td>
                                    <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner nmsl" v-model="left1.contactinformation" placeholder="请输入联系方式"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>备注</th>
                                <td>
                                    <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner nmsl" v-model="left1.remarks" placeholder="请输入备注"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>宣传图</th>
                                <td>
                                    <div class="cont">
                                        <img :src="left1.advertisingmap" class="hidden" width="150px" height="150px">
                                        <el-upload class="upload-demo" :on-success="uploadFileSuccess1" :action="uploadUrl" accept=".jpg, .png" :show-file-list="false">
                                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                                            <span>(支持jpg/png格式)</span>
                                        </el-upload>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>二维码</th>
                                <td>
                                    <div class="cont">
                                        <img :src="left1.qrcode" class="hidden" width="150px" height="150px">
                                        <el-upload class="upload-demo" :on-success="uploadFileSuccess2" :action="uploadUrl" accept=".jpg, .png" :show-file-list="false">
                                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                                            <span>(支持jpg/png格式)</span>
                                        </el-upload>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <center>
                                        <el-button type="primary" @click="saveLeft()">保存</el-button>
                                    </center>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关于我们设置" name="second">
                <div class="back">
                    <h2>关于我们设置</h2>
                    <div class="main">
                        <table cellpadding="30" cellspacing="0" class="table" style="width: 100%;margin-left: 0px;">
                            <tr>
                                <th>公司或产品全名</th>
                                <td>
                                    <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner nmsl" v-model="right1.productname" placeholder="请输入公司或产品全名"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>当前App的版本</th>
                                <td>
                                    <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner nmsl" v-model="right1.appversion" placeholder="请输入备注"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>APP图标</th>
                                <td>
                                    <div class="cont">
                                        <img :src="right1.logo" class="hidden" width="150px" height="150px">
                                        <el-upload class="upload-demo" :on-success="uploadFileSuccess3" :action="uploadUrl" accept=".jpg, .png" :show-file-list="false">
                                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                                            <span>(支持jpg/png格式)</span>
                                        </el-upload>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>是否强制更新</th>
                                <td>
                                    <el-radio-group v-model="right1.ifcoerceupdate">
                                        <el-radio label="1">需要</el-radio>
                                        <el-radio label="2">不需要</el-radio>
                                    </el-radio-group>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>APP注册用户是否拉黑</th>
                                <td>
                                    <el-radio-group v-model="black.ifblacklist">
                                        <el-radio label="1">拉黑</el-radio>
                                        <el-radio label="2">不拉黑</el-radio>
                                    </el-radio-group>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>是否让用户直接进入风控</th>
                                <td>
                                    <el-radio-group v-model="fk.iffengkong">
                                        <el-radio label="1">进入</el-radio>
                                        <el-radio label="2">不进入</el-radio>
                                    </el-radio-group>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>安卓下载链接</th>
                                <td>
                                    <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner nmsl"
                                           v-model="right1.androidlink" placeholder="请输入安卓链接"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>IOS下载链接</th>
                                <td>
                                    <input autocomplete="off" type="text" rows="2" validateevent="true" class="el-input__inner nmsl" v-model="right1.ioslink"
                                           placeholder="请输入IOS链接"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <center>
                                        <el-button type="primary" @click="saveRight()">保存</el-button>
                                    </center>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import headTop from '../components/headTop'

    import defaultAddPicture from '../assets/img/default_add.png'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                activeName: "first",
                left1: {},
                right1: {ifcoerceupdate: undefined},
                black: {ifblacklist: undefined},
                fk: {iffengkong: undefined},
                uploadUrl: this.axios.defaults.baseURL + 'homepage/PictureUpload',
            };
        },
        created() {
            this.Search();
            this.Search2();
        },
        methods: {
            handleClick() {

            },
            Search() {
                var that = this;
                that.axios.get('/contact/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.left1 = res.data[0];
                    if (!that.left1.qrcode) {
                        that.left1.qrcode = defaultAddPicture;
                    }
                    if (!that.left1.logo) {
                        that.left1.logo = defaultAddPicture;
                    }
                })
            },
            Search2() {
                var that = this;
                that.axios.get('/aboutus/queryAll', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.right1 = res.data[0];
                    if (!that.right1.logo) {
                        that.right1.logo = defaultAddPicture;
                    }
                    that.axios.get('/ifblacklist/queryAll', {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.black = res.data;
                        that.axios.get('/iffengkong/queryAll', {
                            params: {companyId: window.localStorage.getItem("companyid")}
                        }).then(res => {
                            that.fk = res.data;
                        })
                    })
                })
            },
            saveLeft() {
                var that = this;
                if (that.left1.qrcode == defaultAddPicture) {
                    that.left1.qrcode = '';
                }
                if (!that.left1.logo == defaultAddPicture) {
                    that.left1.logo = '';
                }
                that.axios.get('/contact/updateByPrimaryKey', {
                    params: that.left1
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    this.Search();
                })
            },
            saveRight() {
                var that = this;
                if (that.right1.logo == defaultAddPicture) {
                    that.right1.logo = '';
                }
                that.axios.get('/aboutus/updateByPrimaryKey', {
                    params: that.right1
                }).then(res => {
                    that.axios.get('/ifblacklist/updateByPrimaryKey', {
                        params: that.black
                    }).then(res => {
                        that.axios.get('/iffengkong/updateByPrimaryKey', {
                            params: that.fk
                        }).then(res => {
                            this.$message({
                                type: 'success',
                                message: '编辑成功'
                            });
                            this.Search2();
                        })
                    })
                })
            },
            uploadFileSuccess2(res) {
                var that = this;
                if (!!res.success) {
                    that.left1.qrcode = res.success;
                    this.$message({
                        type: 'success',
                        message: '图片上传成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            },
            uploadFileSuccess1(res) {
                var that = this;
                if (!!res.success) {
                    that.left1.advertisingmap = res.success;
                    this.$message({
                        type: 'success',
                        message: '图片上传成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            },
            uploadFileSuccess3(res) {
                var that = this;
                if (!!res.success) {
                    that.right1.logo = res.success;
                    this.$message({
                        type: 'success',
                        message: '图片上传成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .main {
        padding: 20px;
        background-color: white;
        min-height: 70vh;
    }

    .table {
        margin: 20px 20%;
        width: 35%;
        border-color: #dfe6ec;
    }

    .el-tabs__header {
        margin: 0;
    }

    .table th {
        width: 400px;
        text-align: left;
        padding-left: 100px;
    }

    .table td {
        width: 400px;
    }

    .nmsl {
        background-color: #f3f6fb;
        border: transparent;
        border-radius: 0;
        text-align: center;
    }
</style>
