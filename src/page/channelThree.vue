<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道3</p> -->
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="逾前发送筛选" name="first">
				<div class="back">
					<h2>逾前发送筛选</h2>
					<div class="main">
						<el-form :model="form" :inline="true" class="demo-form-inline">
							<el-form-item>
								<el-select v-model="form.name" placeholder="离最后逾前还款日" style="width:200px">
									<el-option label="当天" value="0"></el-option>
									<el-option label="往后1天" value="1"></el-option>
									<el-option label="往后2天" value="2"></el-option>
									<el-option label="往后3天" value="3"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="Search">搜索</el-button>  
							</el-form-item>
						</el-form>
						<el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
							<el-table-column prop="collection_time" label="逾前还款日期" align="center"></el-table-column>
							<el-table-column prop="phonenum" label="已选用户条数" align="center"></el-table-column>
							<el-table-column label="发送历史批次" align="center">
								<template slot-scope="scope">
									<!-- <span class="blue" @click="open">{{scope.row.interestPenaltySum}}</span> -->
									<span class="blue" @click="open(scope.row.collection_time)">共{{scope.row.shortmessagesize}}次</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<span @click="next(scope.row.phonesa,scope.row.phonenum,scope.row.collection_time)" class="blue">下一步</span>
								</template>
							</el-table-column>
						</el-table>
						<el-dialog title="发送历史批次" :visible.sync="dialogTableVisible" center>
							<el-table border :data="gridData">
<!--								<el-table-column property="collection_time" label="第几批次" align="center"></el-table-column>-->
								<el-table-column property="send_time" label="操作时间" align="center"></el-table-column>
								<el-table-column property="phonenum" label="已选用户条数" align="center"></el-table-column>
<!--								<el-table-column property="successnum" label="成功发送条数" align="center"></el-table-column>-->
							</el-table>
						</el-dialog>
						<el-dialog title="选择短信模板" :visible.sync="dialogVisible" customClass="dia" center>
							<table cellspacing="0" cellpadding="15" class="son">
								<tr>
									<th>短信模板</th>
									<td>
										<el-select v-model="type" placeholder="短信模板1" style="width:90%" @change="change">
											<el-option label="短信模板1" value="1"></el-option>
											<el-option label="短信模板2" value="2"></el-option>
											<el-option label="短信模板3" value="3"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th>模板内容</th>
									<td>
										<el-input type="textarea" v-model="desc" style="width:90%" disabled></el-input>
									</td>
								</tr>
							</table>
							<el-button type="warning" @click="dialogVisible=false" class="close">取消</el-button>
							<el-button type="primary" @click="send" class="send">发送短信</el-button>
						</el-dialog>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="短信发送历史" name="second">
				<div class="back">
					<h2>短信发送历史</h2>
					<div class="main">
						<el-table border :data="tableDatas" tooltip-effect="dark" style="width: 100%">
							<el-table-column prop="send_time" label="最后操作时间" align="center"></el-table-column>
							<el-table-column prop="collection_time" label="逾前还款日期" align="center"></el-table-column>
							<el-table-column prop="phonenum" label="已选用户条数" align="center"></el-table-column>
<!--							<el-table-column prop="successnum" label="成功发送条数" align="center"></el-table-column>-->
							<el-table-column prop="paymentmoney" label="发送历史批次" align="center">
								<template slot-scope="scope">
									<span class="blue" @click="opens(scope.row.collection_time)">共{{scope.row.shortmessagesize}}次</span>
								</template>
							</el-table-column>
						</el-table>
                        <div class="block">
                            <el-pagination
                                :current-page.sync="page"
                                :page-size.sync="Pagesize"
                                layout="total,  prev, pager, next, jumper"
                                :page-count="totalPageCount"
                                :total="totalCount"
                            ></el-pagination>
                        </div>
						<el-dialog title="发送历史批次" :visible.sync="dialogTable" center>
							<el-table border :data="sendData">
<!--								<el-table-column property="collectionTime" label="第几批次" align="center"></el-table-column>-->
								<el-table-column property="send_time" label="操作时间" align="center"></el-table-column>
								<el-table-column property="phonenum" label="已选用户条数" align="center"></el-table-column>
<!--								<el-table-column property="successnum" label="成功发送条数" align="center"></el-table-column>-->
							</el-table>
						</el-dialog>
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
				sendData: [],
				dialogTableVisible: false,
				dialogVisible: false,
				dialogTable: false,
				activeName: "first",
				form:{
					name: ""
				},
				type: "",
				desc: "123",
				phonesa: "",
				phonenum: "",
                collection_time: "",
                page: 1,
                Pagesize: 10,
                totalPageCount: 0,
                totalCount: 20
			}
		},
		created(){
			
		},
		methods:{
			open(collection_time){
				this.dialogTableVisible = true
				this.axios.get('sms/AllCollection',{
					params: {
                        collection_time
					}
				}).then(res=>{
					this.gridData = res.data.Shortmessage
				})
			},
			next(phonesa,phonenum,collection_time){
				this.dialogVisible = true
				console.log(phonesa)
				this.phonesa = phonesa
				this.phonenum = phonenum
                this.collection_time = collection_time
			},
			opens(collection_time){
				this.dialogTable = true
				this.axios.get('sms/AllCollection',{
					params: {
						collection_time
					}
				}).then(res=>{
					this.sendData = res.data.Shortmessage
				})
			},
			change(){
				if(this.type=="2"){
					this.desc="222"
				}else{
					if(this.type=="3"){
						this.desc="333"
					}else{
						this.desc="111"
					}
				}
			},
            getData(page, Pagesize) {
                this.axios
                    .get("sms/AllShortMessage", {
                        params: {
                            companyid: window.localStorage.getItem("companyid"),
                            page,
                            Pagesize
                        }
                    })
                    .then(res => {
                        this.tableDatas = res.data.Shortmessage;
                        this.page = res.data.Shortmessage.page;
                        this.Pagesize = res.data.Shortmessage.Pagesize;
                        this.totalCount = res.data.Shortmessage.length;
                    });
            },
			handleClick(){
				if(this.activeName == "second"){
					this.getData(this.page,this.Pagesize)
				}
			},
			Search(){
				this.axios.get('sms/DateAllPhone',{
					params: {
						companyid: window.localStorage.getItem("companyid"),
						biaoshi: this.form.name
					}
				}).then(res=>{
					this.tableData = res.data.Shortmessage
				})
			},
			send(){
				console.log(this.phonesa.join())
                    this.axios.get('sms/SendSms',{
                        params: {
                            companyid: window.localStorage.getItem("companyid"),
                            msg: this.desc,
                            // phone: this.phonesa.join(),
                            phone: 15219990556,
                            phonenum: this.phonenum,
                            collection_time: this.collection_time
                        }
				}).then(res=>{
					this.$confirm(res.data.desc, '提示', {
						type: 'warning',
						center: true
					})
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
	.blue{
		color: blue;
		cursor: pointer;
	}
	.dia{
		width: 30%;
	}
	.son{
		width: 95%;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.son td{
		text-align: center;
	}
	.close{
		float: left;
		margin-left: 20px;
		margin-bottom: 20px;
	}
	.send{
		float: right;
		margin-right: 20px;
	}
    .block {
        padding-top: 20px;
        text-align: center;
    }
</style>
