<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是银行卡自动扣款</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="一键扣款" name="first">
                <div class="back">
					<h2>一键扣款</h2>
                    <div class="main">
                        <el-form :model="form" :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-input placeholder="订单编号" v-model="form.id"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="姓名" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="手机号" v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="银行卡号" v-model="form.bankcardName"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="form.level" placeholder="逾期等级" style="width:200px">
                                    <el-option
                                        v-for="item in level"
                                        :key="item.value"
                                        :label="item.grade"
                                        :value="item.grade"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="实借起始时间" v-model="form.start" value-format="yyyy-MM-dd" @change="starts"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="single">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="实借结束时间" v-model="form.end" value-format="yyyy-MM-dd" @change="ends"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="延期后应还起始时间" v-model="form.starts" value-format="yyyy-MM-dd" @change="started"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="single">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="延期后应还结束时间" v-model="form.ends" value-format="yyyy-MM-dd" @change="ended"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                <el-button type="primary" @click="Search">搜索</el-button>
                                <el-button type="success"  @click="dialogTables=true">一键扣款</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table border :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%;line-height: 60px;">
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column prop="orderNumber" label="编号" align="center"></el-table-column>
                            <el-table-column prop="trueName" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                            <el-table-column prop="bankcardName" label="银行卡号" width="93" align="center"></el-table-column>
                            <el-table-column prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
                            <el-table-column prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
                            <el-table-column prop="orderCreateTime" label="实借时间" width="93" align="center"></el-table-column>
                            <el-table-column prop="address" label="实借/放款总金额" width="145" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="deferAfterReturntime" label="延期后应还时间" width="140" align="center"></el-table-column>
                            <el-table-column prop="overdueGrade" label="逾期等级" width="93" align="center"></el-table-column>
                            <el-table-column prop="overdueNumberOfDays" label="逾期天数" width="93" align="center"></el-table-column>
                            <el-table-column label="逾期罚金/含逾应还总金额" width="200" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.interestPenaltySum}}/{{scope.row.order_money}}</span>
                                </template>
                            </el-table-column>
<!--                            <el-table-column prop="address" label="电话催收次数" width="125" align="center"></el-table-column>-->
<!--                            <el-table-column prop="address" label="财务是否线上减免" width="150" align="center"></el-table-column>-->
                            <el-table-column label="查看详情" width="150" align="center">
                                <template slot-scope="scope">
                                    <span class="blue" @click="watch(scope.row.trueName,scope.row.orderId)">查看详情</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="剩余未还/实还金额" width="160" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.surplus_money}}/{{scope.row.realityAccount}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <span class="blue" @click="kou(scope.row.orderId,scope.row.orderNumber,scope.row.userId,scope.row.trueName,scope.row.surplus_money,scope.row.realityAccount)">扣款</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog :title="title" :visible.sync="Table" customClass="cuse">
                            <el-table border :data="gridData">
                                <el-table-column property="deduction_time" label="扣款时间" align="center"></el-table-column>
                                <el-table-column property="deductionproportion" label="扣款比例（%）" align="center"></el-table-column>
                                <el-table-column property="deduction_money" label="扣款金额" align="center"></el-table-column>
                            </el-table>
                        </el-dialog>
                        <el-dialog title="一键扣款" :visible.sync="dialogTable" customClass="cus" center>
                            <table cellspacing="0" cellpadding="15" class="tab_on">
                                <tr>
                                    <th>扣款比例设置</th>
                                    <td>
                                        <el-select v-model="bili" placeholder="100%" style="width:200px">
                                            <el-option label="100%" value="100%"></el-option>
                                            <el-option label="50%" value="50%"></el-option>
                                            <el-option label="25%" value="25%"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>已选总人数</th>
                                    <td>1</td>
                                </tr>
                            </table>
                            <el-button type="primary" @click="koukuan" class="kou">扣款</el-button>
                        </el-dialog>
                        <el-dialog title="一键扣款" :visible.sync="dialogTables" customClass="cus" center>
                            <table cellspacing="0" cellpadding="15" class="tab_on">
                                <tr>
                                    <th>扣款比例设置</th>
                                    <td>
                                        <el-select v-model="bilis" placeholder="100%" style="width:200px">
                                            <el-option label="100%" value="100"></el-option>
                                            <el-option label="50%" value="50"></el-option>
                                            <el-option label="25%" value="25"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>已选总人数</th>
                                    <td>{{total}}</td>
                                </tr>
                            </table>
                            <el-button type="primary" @click="koukuans" class="kou">扣款</el-button>
                        </el-dialog>
                        <div class="block">
                            <el-pagination
                            :current-page.sync="page"
                            :page-size.sync="Pagesize"
                            layout="total, prev, pager, next, jumper"
                            :page-count="totalPageCount"
                            :total="totalCount"
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="扣款记录表" name="second">
                <div class="back">
					<h2>扣款记录表</h2>
                    <div class="main">
                        <el-form :model="formList" :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="起始时间" v-model="formList.start" value-format="yyyy-MM-dd" @change="start"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="single">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="结束时间" v-model="formList.end" value-format="yyyy-MM-dd" @change="end"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="Searchs">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table border :data="tableDatas" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="deduction_time" label="操作时间" width="175" align="center"></el-table-column>
                            <el-table-column prop="account" label="操作人" align="center"></el-table-column>
                            <el-table-column prop="deductionproportion" label="扣款比例(%)" align="center"></el-table-column>
<!--                            <el-table-column prop="address" label="第三方服务总支出费" width="165" align="center"></el-table-column>-->
                            <el-table-column prop="userNum" label="已选扣款用户总数" align="center"></el-table-column>
                            <el-table-column prop="shiNum" label="扣款失败用户数" align="center"></el-table-column>
                            <el-table-column prop="chengNum" label="成功扣款用户数" align="center"></el-table-column>
                            <el-table-column prop="cdata" label="成功扣款用户比率(%)" width="175" align="center"></el-table-column>
                            <el-table-column prop="chengMoney" label="成功扣款总金额" align="center"></el-table-column>
                            <el-table-column label="查看扣款清单" align="center">
                                <template slot-scope="scope">
                                    <span class="blue" @click="watchs(scope.row.deduction_time)">扣款清单</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog title="扣款总详情" :visible.sync="Tables" customClass="cuses">
                            <el-table border :data="gridDatas">
                                <el-table-column property="deduction_time" label="扣款时间" align="center"></el-table-column>
                                <el-table-column property="name" label="姓名" align="center"></el-table-column>
                                <el-table-column property="collection_money" label="(扣款前)含逾应还总金额" width="190" align="center"></el-table-column>
                                <el-table-column property="deductionproportion" label="扣款比例" align="center"></el-table-column>
                                <el-table-column property="deduction_money" label="扣款金额" align="center"></el-table-column>
                            </el-table>
                        </el-dialog>
                        <div class="block">
                            <el-pagination
                            :current-page.sync="pages"
                            :page-size.sync="Pagesizes"
                            layout="total, prev, pager, next, jumper"
                            :page-count="totalPageCounts"
                            :total="totalCounts"
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
        },
        data(){
            return{
                tableData: [],
                tableDatas: [],
                gridData: [],
                gridDatas: [],
                level: [],
                activeName: "first",
                form: {
                    name: "",
                    id: "",
                    phone: "",
                    start: "",
                    end: "",
                    starts: "",
                    ends: "",
                    bankcardName: "",
                    level: ""
                },
                formList: {
                    start: "",
                    end: ""
                },
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 0,
                pages: 1,
                Pagesizes: 10,
                totalPageCounts: 0,
                totalCounts: 0,
                title: "",
                Table: false,
                Tables: false,
                dialogTable: false,
                dialogTables: false,
                bili: "",
                bilis: "",
                orderId: "",
                orderNumber: "",
                userId: "",
                companyId: "",
                trueName: "",
                surplus_money: "",
                realityAccount: "",
                Phone: "",
                total: ""
            }
        },
        created(){
    	    this.getData(this.page,this.Pagesize)
            this.get()
        },
        methods:{
            starts(val){
                this.form.start = val
            },
            ends(val){
                this.form.end = val
            },
            started(val){
                this.form.starts = val
            },
            ended(val){
                this.form.ends = val
            },
            start(val){
                this.formList.start = val
            },
            end(val){
                this.formList.end = val
            },
            get() {
                this.axios
                    .get("operation/YuqiM", {
                        params: {
                            companyId: window.localStorage.getItem("companyid")
                        }
                    })
                    .then(res => {
                        this.level = res.data.OverdueClass;
                    });
            },
            getData( page, Pagesize ){
                this.axios.get('Chanpay/SelectBankName',{
                    params:{
                        companyId: window.localStorage.getItem("companyid"),
                        page,
                        Pagesize
                    }
                }).then(res=>{
                    this.tableData = res.data.Orderdetails
                    this.page = res.data.Orderdetails.page
                    this.Pagesize = res.data.Orderdetails.Pagesize
                    this.totalCount = res.data.Orderdetails.length
                })
            },
            gets(pages,Pagesizes){
                this.axios.get('Chanpay/BankdeduDta',{
                    params:{
                        companyId: window.localStorage.getItem("companyid"),
                        page: this.pages,
                        Pagesize: this.Pagesizes
                    }
                }).then(res=>{
                    this.tableDatas = res.data.Bankdeduction
                    this.pages = res.data.Bankdeduction.page
                    this.Pagesizes = res.data.Bankdeduction.Pagesize
                    this.totalCounts = res.data.Bankdeduction.length
                      for (var i=0;i<res.data.Bankdeduction.length;i++){
                          res.data.Bankdeduction[i].cdata=((res.data.Bankdeduction[i].chengNum/res.data.Bankdeduction[i].userNum)*100)
                          if(res.data.Bankdeduction[i].cdata!=0){
                              res.data.Bankdeduction[i].cdata=(res.data.Bankdeduction[i].cdata).toFixed(2)
                          }
                      }
                })
            },
            handleClick(tab, event) {
                if(this.activeName == "second"){
                    this.gets(this.pages,this.Pagesizes)
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.total = val.length;
                this.orderId = (val.map(item => item.orderId)).join();
                this.orderNumber = (val.map(item => item.orderNumber));
                this.userId = (val.map(item => item.userId)).join();
                this.trueName = (val.map(item => item.trueName));
                this.surplus_money = (val.map(item => item.surplus_money));
                this.Phone = (val.map(item => item.Phone));
                console.log(this.orderId,this.total)
            },
            kou(orderId,orderNumber,userId,trueName,surplus_money,realityAccount){
                this.dialogTable = true
                this.orderId = orderId
                this.orderNumber = orderNumber
                this.userId = userId
                this.trueName = trueName
                this.surplus_money = surplus_money
                this.realityAccount = realityAccount
            },
            koukuan(){
                this.axios.get('Chanpay/SendBank',{
                    params:{
                        companyId: window.localStorage.getItem("companyid"),
                        orderIds: this.orderId,
                        deductionproportion: this.bili,
                        sys_userId: window.localStorage.getItem("userid")
                    }
                }).then(res=>{
                    this.$confirm(res.data.desc, "提示", {
                        type: "warning",
                        center: true
                    }).then(() => {

                    })
                })
            },
            koukuans(){
                if(this.total == 0){
                    this.$confirm("请先选择订单", "提示", {
                        type: "warning",
                        center: true
                    })
                }else {
                    this.axios.get('Chanpay/SendBank',{
                        params:{
                            companyId: window.localStorage.getItem("companyid"),
                            orderIds: this.orderId,
                            deductionproportion: this.bilis,
                            sys_userId: window.localStorage.getItem("userid")
                        }
                    }).then(res=>{
                        if(res.data.code == 200){
                            this.$confirm(res.data.desc, "提示", {
                                type: "warning",
                                center: true
                            }).then(() => {

                            })
                        }else {
                            this.$confirm("扣款失败", "提示", {
                                type: "warning",
                                center: true
                            }).then(() => {

                            })
                        }

                    })
                }
            },
            Reset(){
                this.form = {
                    name: "",
                    id: "",
                    phone: "",
                    start: "",
                    end: "",
                    starts: "",
                    ends: "",
                    bankcardName: "",
                    level: ""
                }
            },
            Search(){
                if(this.form.start!=""){
                    var start = this.form.start + " " + "00:00:00"
                }
                if(this.form.end!=""){
                    var end = this.form.end + " " + "23:59:59"
                }
                if(this.form.starts!=""){
                    var starts = this.form.starts + " " + "00:00:00"
                }
                if(this.form.ends!=""){
                    var ends = this.form.ends + " " + "23:59:59"
                }
                this.axios.get('Chanpay/SelectBankName',{
                    params:{
                        companyId: window.localStorage.getItem("companyid"),
                        orderNumber: this.form.id,
                        trueName: this.form.name,
                        phone: this.form.phone,
                        bankcardName: this.form.bankcardName,
                        orderCreateTimeStatu_time: start,
                        orderCreateTimeEnd_time: end,
                        deferAfterReturntimeStatu_time: starts,
                        deferAfterReturntimeEnd_time: ends,
                        overdueGrade: this.form.level,
                    }
                }).then(res=>{
                    this.tableData = res.data.Orderdetails
                    this.totalCount = res.data.Orderdetails.length
                })
            },
            watch(trueName,orderId){
                this.Table = true
                this.title = trueName
                this.axios.get('Chanpay/AllBankDetails',{
                    params:{
                        orderId
                    }
                }).then(res=>{
                    this.gridData = res.data.Bankdeduction
                })
            },
            watchs(deduction_time){
                this.Tables = true
                this.axios.get('Chanpay/AllDetails',{
                    params:{
                        sys_userId: window.localStorage.getItem("userid"),
                        deduction_time
                    }
                }).then(res=>{
                    this.gridDatas = res.data.Bankdeduction
                })
            },
            Searchs(){
                if(this.formList.start!=""){
                    var start = this.formList.start + " " + "00:00:00"
                }
                if(this.formList.end!=""){
                    var end = this.formList.end + " " + "23:59:59"
                }
                this.axios.get('Chanpay/BankdeduDta',{
                    params:{
                        companyId: window.localStorage.getItem("companyid"),
                        statu_time: start,
                        end_time: end
                    }
                }).then(res=>{
                    this.tableDatas = res.data.Bankdeduction
                    this.totalCounts = res.data.Bankdeduction.length
                    for (var i=0;i<res.data.Bankdeduction.length;i++){
                        res.data.Bankdeduction[i].cdata=((res.data.Bankdeduction[i].chengNum/res.data.Bankdeduction[i].userNum)*100)
                        if(res.data.Bankdeduction[i].cdata!=0){
                            res.data.Bankdeduction[i].cdata=(res.data.Bankdeduction[i].cdata).toFixed(2)
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
    }
    .el-tabs__header {
  		margin: 0;
	}
	.main{
		padding: 20px;
		background-color: #fff;
        min-height: 70vh;
	}
    .single {
        margin-left: -15px;
    }
    .block {
		padding-top: 20px;
		text-align: center;
	}
    .cus{
        width: 25%;
        text-align: center;
    }
    .cuse{
         width: 35%;
         text-align: center;
     }
    .cuses{
        width: 50%;
        text-align: center;
    }
    .tab_on{
        margin: 0 auto;
    }
    .blue{
        color: blue;
        cursor: pointer;
    }
    .kou{
        margin-top: 20px;
    }
</style>
