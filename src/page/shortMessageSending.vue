<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="back">
            <h2>注册用户短信发送</h2>
            <div class="main">
                <el-dialog title="添加注册短信" :visible.sync="dialogTable" customClass="cus" center>
                    <table cellspacing="0" cellpadding="15" class="tab_ons">
                        <tr>
                            <th>选择客户类型</th>
                            <td>
                                <el-select v-model="type" placeholder="ios" style="width:200px">
                                    <el-option label="ios" value="ios"></el-option>
                                    <el-option label="安卓" value="安卓"></el-option>
                                    <el-option label="全部" value="全部"></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>已选注册人数</th>
                            <td>
                                <div class="gray">{{people}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>短信模板</th>
                            <td>
                                <el-select v-model="message" placeholder="短信模板1" style="width:200px" @change="change">
                                    <el-option label="短信模板1" value="1"></el-option>
                                    <el-option label="短信模板2" value="2"></el-option>
                                    <el-option label="短信模板3" value="3"></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>模板内容</th>
                            <td>
                                <div class="gray">{{content}}</div>
                            </td>
                        </tr>
                    </table>
                    <el-button type="primary" @click="send" class="send">发送</el-button>
                </el-dialog>
                <el-button type="success" @click="add" class="aps">添加短信</el-button>
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column prop="orderNumber" label="操作时间" align="center"></el-table-column>
                    <el-table-column prop="name" label="客户端类型" align="center"></el-table-column>
                    <el-table-column prop="phone" label="已选注册用户" align="center"></el-table-column>
                    <el-table-column prop="drainageOfPlatformName" label="短信内容" align="center"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        :current-page="page"
                        :page-size.sync="Pagesize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
                    ></el-pagination>
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
                tableData: [],
                dialogTable: false,
                type: "",
                message: "",
                people: "1",
                content: "111",
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0
            };
        },
        created() {
            // this.getData(this.page, this.Pagesize);
        },
        methods: {
            getData(page,Pagesize){
                this.axios
                    .get("", {
                        params: {
                            companyId: window.localStorage.getItem("companyid"),
                            page,
                            Pagesize
                        }
                    })
                    .then(res => {
                        this.tableData = res.data.Orderdetails;
                        this.page = res.data.Orderdetails.page;
                        this.Pagesize = res.data.Orderdetails.Pagesize;
                        this.totalCount = res.data.Orderdetails.length;
                    });
            },
            add(){
                this.dialogTable = true
            },
            change(){
                if(this.message=="2"){
                    this.content="222"
                }else{
                    if(this.message=="3"){
                        this.content="333"
                    }else{
                        this.content="111"
                    }
                }
            },
            send(){

            }
        }
    }
</script>

<style lang="less">
    @import "../style/mixin";
    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }
    .aps{
        margin-bottom: 20px;
    }
    .cus{
        width: 30%;
        text-align: center;
    }
    .tab_ons{
        margin: 0 auto;
    }
    .tab_ons th{
        width: 50%;
    }
    .tab_ons td div.gray{
        margin-top: -10px;
        margin-bottom: -10px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #f3f6fb;
    }
    .block {
        padding-top: 20px;
        text-align: center;
    }
    .send{
        margin-top: 15px;
    }
</style>
