<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>反欺诈报告</h2>
            <div class="main">
                <el-card class="box-card" style="margin-left:30px;width: 100%;margin-top:50px;float:left">
                    <div slot="header" class="clearfix">
                        <span><font color="white">反欺诈检测结果</font></span>
                    </div>
                    <template v-for="(object, index) in result">
                        <template v-if="index <10">
                            <div class="text item" style="width: 20%;float: left">
                                <div class='my-label'>{{object.type}}</div>
                                <div class="my-text">{{object.sum}}</div>
                            </div>
                        </template>
                    </template>
                    <template v-for="(object, index) in result">
                        <template v-if="index >=10 && index < 20">
                            <div class="text item" style="width: 20%;float: left">
                                <div class='my-label'>{{object.type}}</div>
                                <div class="my-text">{{object.sum}}</div>
                            </div>
                        </template>
                    </template>
                    <template v-for="(object, index) in result">
                        <template v-if="index >=20 && index < 30">
                            <div class="text item" style="width: 20%;float: left">
                                <div class='my-label'>{{object.type}}</div>
                                <div class="my-text">{{object.sum}}</div>
                            </div>
                        </template>
                    </template>
                    <template v-for="(object, index) in result">
                        <template v-if="index >=30 && index < 40">
                            <div class="text item" style="width: 20%;float: left">
                                <div class='my-label'>{{object.type}}</div>
                                <div class="my-text">{{object.sum}}</div>
                            </div>
                        </template>
                    </template>
                    <div class="text item">
                        <div class='my-label'></div>
                        <div class="my-text"></div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import defaultAddPicture from '../assets/img/default_add.png'

    export default {
        components: {
            headTop,
        },
        watch: {   //监听值变化：map值
            "$route": {
                handler(route) {
                    var that = this;
                    if (route.path == '/checkInfo') {
                        that.searchById();
                    }
                }
            }
        },
        data() {
            return {
                result: {},
            }
        },
        created() {
            var that = this;
            that.searchById();
        },
        methods: {
            searchById() {
                var that = this;
                that.user = {};
                that.card = {};
                if (!that.$route.query.id) {
                    return false;
                }
                that.axios.get('/user/typeifhit', {
                    params: {userid: that.$route.query.id}
                }).then(res => {
                    that.result = JSON.parse(res.data.list);
                    console.log(that.result)
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .el-card__header {
        background-color: #0e85e0;
    }

    .my-label {
        width: 50%;
        margin-top: 5px;
        float: left;
        text-align: left;
    }

    .my-text {
        width: 50%;
        margin-top: 5px;
        float: left;
        text-align: left;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .idcard {
        width: 100%;
        height: 430px;
        border: 1px solid #999;
    }

    .tit {
        display: block;
        text-align: center;
        line-height: 40px;
        border-bottom: 1px solid #999;
    }

    .pic {
        width: 100%;
    }

    .pic li {
        width: 33.3%;
        float: left;
        text-align: center;
        padding-top: 20px;
    }

    .pic li img {
        width: 80%;
        margin-bottom: 15px;
    }

    .bottom {
        width: 100%;
        margin-top: 20px;
    }

    .bottom li {
        width: 30%;
        float: left;
        border: 1px solid #999;
    }

    .cen {
        margin-left: 4.62%;
        margin-right: 4.99%;
    }

    .news {
        border-color: #dfe6ec;
        width: 94%;
        margin: 15px auto;
    }

    .news th {
        width: 40%;
        text-align: center;
    }

    .news td {
        text-align: center;
    }
</style>
