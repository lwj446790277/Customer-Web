<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">风控3</p> -->
        <div class="main">
            <div class="first">
                <h3>联系客服设置</h3>
                <ul>
                    <li>
                        <span>宣传图</span>
                        <div class="cont">
                            <img :src="left1.advertisingmap" class="hidden">
                            <el-upload class="upload-demo" :on-success="uploadFileSuccess1"
                                       action="http://192.168.0.161:8080/zhita_xiaodai_admin/homepage/PictureUpload"
                                       accept=".jpg, .png">
                                <el-button size="small" type="primary" class="upload">点击上传</el-button>
                                <span>(支持jpg/png格式)</span>
                            </el-upload>
                        </div>
                    </li>
                    <li>
                        <span>联系方式</span>
                        <div class="cont">
                            <el-input v-model="left1.contactinformation"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>二维码</span>
                        <div class="cont">
                            <img :src="left1.qrcode" class="hidden">
                            <el-upload class="upload-demo" :on-success="uploadFileSuccess2"
                                       action="http://192.168.0.161:8080/zhita_xiaodai_admin/homepage/PictureUpload"
                                       accept=".jpg, .png">
                                <el-button size="small" type="primary" class="upload">点击上传</el-button>
                                <span>(支持jpg/png格式)</span>
                            </el-upload>
                        </div>
                    </li>
                    <li>
                        <span>备注</span>
                        <div class="cont">
                            <el-input v-model="left1.remarks"></el-input>
                        </div>
                    </li>
                </ul>
                <el-button type="primary" class="save" @click="saveLeft()">保存</el-button>
            </div>
            <div class="first">
                <h3>关于我们</h3>
                <ul>
                    <li>
                        <span>APP的Logo</span>
                        <div class="cont">
                            <img :src="right1.logo" class="hidden">
                            <el-upload class="upload-demo" :on-success="uploadFileSuccess3"
                                       action="http://192.168.0.161:8080/zhita_xiaodai_admin/homepage/PictureUpload"
                                       accept=".jpg, .png">
                                <el-button size="small" type="primary" class="upload">点击上传</el-button>
                                <span>(支持jpg/png格式)</span>
                            </el-upload>
                        </div>
                    </li>
                    <li>
                        <span>公司或产品全名</span>
                        <div class="cont">
                            <el-input v-model="right1.productname"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>当前App的版本</span>
                        <div class="cont">
                            <el-input v-model="right1.appversion"></el-input>
                        </div>
                    </li>
                </ul>
                <el-button type="primary" class="save" @click="saveRight()">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                left1: {},
                right1: {},
            };
        },
        beforeCreate(){
            var that = this;
            that.axios.get('/contact/queryAll', {
                params: {companyId:window.localStorage.getItem("companyid")}
            }).then(res => {
                that.left1 = res.data[0];
                that.axios.get('/aboutus/queryAll', {
                    params: {companyId:window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.right1 = res.data[0];
                })
            })
        },
        methods: {
            Search(){
                var that = this;
                that.axios.get('/contact/queryAll', {
                    params: {companyId:window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.left1 = res.data[0];
                    that.axios.get('/aboutus/queryAll', {
                        params: {companyId:window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.right1 = res.data[0];
                    })
                })
            },
            saveLeft(){
                var that = this;
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
            saveRight(){
                var that = this;
                that.axios.get('/aboutus/updateByPrimaryKey', {
                    params: that.right1
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功'
                    });
                    this.Search();
                })
            },
            uploadFileSuccess2(res){
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
            uploadFileSuccess1(res){
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
            uploadFileSuccess3(res){
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

<style lang="less" scoped>
    @import '../style/mixin';

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .main {
        padding: 20px;
    }

    .first {
        width: 45%;
        border: 1px solid #ccc;
        float: left;
        margin-right: 50px;
        padding-bottom: 20px;
    }

    h3 {
        width: 100%;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
    }

    ul {
        display: flex;
        flex-direction: column;
        margin-left: 8%;
        margin-bottom: 4%;
    }

    ul > li > span {
        float: left;
        border: 1px solid #ccc;
        width: 45%;
        line-height: 61px;
        text-align: center;
    }

    .cont {
        float: left;
        border: 1px solid #ccc;
        width: 45%;
        line-height: 60px;
    }

    .con {
        line-height: 61px;
        text-align: center;
    }

    .el-input {
        width: 150px;
        margin-left: 20%;
    }

    .save {
        float: right;
        margin-right: 80px;
    }
</style>
