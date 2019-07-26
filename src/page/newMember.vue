<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">这里是银行卡自动扣款</p> -->
        <el-tabs v-model="activeName" type="card">
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
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="实借起始时间" v-model="form.start"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="single">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="实借结束时间" v-model="form.end"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="延期后应还起始时间" v-model="form.starts"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="single">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="延期后应还结束时间" v-model="form.ends"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="已扣款次数" v-model="form.num"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="form.level" placeholder="逾期等级" style="width:200px">
                                    <el-option label="M1" value="M1"></el-option>
                                    <el-option label="M2" value="M2"></el-option>
                                    <el-option label="M3" value="M3"></el-option>
                                    <el-option label="M4" value="M4"></el-option>
                                    <el-option label="M5" value="M5"></el-option>
                                    <el-option label="M6" value="M6"></el-option>
                                    <el-option label="M7" value="M7"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                                <el-button type="primary" @click="Search">搜索</el-button>
                                <el-button type="success" @click="Onekey">一键扣款</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table border :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%;line-height: 60px;">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="name" label="编号" align="center"></el-table-column>
                            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="address" label="手机号" align="center"></el-table-column>
                            <el-table-column prop="address" label="银行卡号" width="93" align="center"></el-table-column>
                            <el-table-column prop="address" label="贷款方式" width="93" align="center"></el-table-column>
                            <el-table-column prop="address" label="还款期数" width="93" align="center"></el-table-column>
                            <el-table-column prop="address" label="实借时间" width="93" align="center"></el-table-column>
                            <el-table-column prop="address" label="实借/放款总金额" width="145" align="center"></el-table-column>
                            <el-table-column prop="address" label="延期后应还时间" width="140" align="center"></el-table-column>
                            <el-table-column prop="address" label="逾期等级" width="93" align="center"></el-table-column>
                            <el-table-column prop="address" label="逾期天数" width="93" align="center"></el-table-column>
                            <el-table-column prop="address" label="逾期罚金/含逾应还总金额" width="200" align="center"></el-table-column>
                            <el-table-column prop="address" label="电话催收次数" width="125" align="center"></el-table-column>
                            <el-table-column prop="address" label="财务是否线上减免" width="150" align="center"></el-table-column>
                            <el-table-column prop="address" label="已扣款次数和详情" width="150" align="center"></el-table-column>
                            <el-table-column prop="address" label="剩余未还/实还金额" width="160" align="center"></el-table-column>
                            <el-table-column prop="address" label="操作" align="center"></el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            :current-page.sync="page"
                            :page-size.sync="pageSize"
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
                                    <el-date-picker type="date" placeholder="起始时间" v-model="formList.start"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="single">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="结束时间" v-model="formList.end"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="Search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px;">
                            <el-table-column prop="name" label="操作时间" align="center"></el-table-column>
                            <el-table-column prop="name" label="操作人" align="center"></el-table-column>
                            <el-table-column prop="address" label="扣款比例(%)" align="center"></el-table-column>
                            <!--                            <el-table-column prop="address" label="第三方服务总支出费" width="165" align="center"></el-table-column>-->
                            <el-table-column prop="address" label="已选扣款用户总数" align="center"></el-table-column>
                            <el-table-column prop="address" label="扣款失败用户数" align="center"></el-table-column>
                            <el-table-column prop="address" label="成功扣款用户数" align="center"></el-table-column>
                            <!--                            <el-table-column prop="address" label="成功扣款用户比率(%)" width="175" align="center"></el-table-column> -->
                            <el-table-column prop="address" label="成功扣款总金额" align="center"></el-table-column>
                            <el-table-column prop="address" label="查看扣款清单" align="center"></el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            :current-page.sync="page"
                            :page-size.sync="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :page-count="totalPageCount"
                            :total="totalCount"
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
                activeName: "first",
                form: {
                    name: "",
                    id: "",
                    phone: "",
                    start: "",
                    end: "",
                    starts: "",
                    ends: "",
                    num: "",
                    level: ""
                },
                formList: {
                    start: "",
                    end: ""
                },
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 20,
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                    num: "",
                    level: ""
                }
            },
            Search(){

            },
            Onekey(){
                 
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
</style>
