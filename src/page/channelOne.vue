<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道1</p> -->
        <div class="back">
            <h2>渠道数据查询</h2>
            <div class="main">
                <el-form :model="formList" :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-col>
                            <el-date-picker type="date" placeholder="起始时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeStart"
                                            v-model="formList.dateStart"></el-date-picker>
                            <el-date-picker type="date" placeholder="结束时间"
                                            value-format="yyyy-MM-dd"
                                            @change="dateChangeEnd"
                                            v-model="formList.dateEnd"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formList.sourceid" placeholder="引流平台渠道" style="width:150px">
                            <el-option v-for="source in sourcelist" :label="source.sourcename"
                                    :value="source.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
                        <el-button type="primary" @click="Search()">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                    <el-table-column prop="sourcename" label="渠道" align="center"></el-table-column>
                    <el-table-column prop="uv" label="UV人数" align="center"></el-table-column>
                    <el-table-column prop="registernum" label="注册人数" align="center"></el-table-column>
                    <el-table-column prop="cvr" label="UV到注册转化率(%)" width="170" align="center"></el-table-column>
                    <el-table-column prop="activatecount" label="激活人数" align="center"></el-table-column>
                    <el-table-column prop="authencount" label="认证人数" width="100" align="center"></el-table-column>
                    <el-table-column prop="applynum" label="申请人数" align="center"></el-table-column>
                    <el-table-column prop="cvr1" label="注册到申请转化率(%)" width="175" align="center"></el-table-column>
                    <el-table-column prop="machineauditpass" label="通过人数" width="100" align="center"></el-table-column>
                    <el-table-column prop="orderpass" label="已借款人数" align="center"></el-table-column>
                    <el-table-column prop="cvr2" label="注册到借款转化率(%)" width="175" align="center"></el-table-column>
                    <el-table-column prop="address" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="showDetail(scope.row)">时间段详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog :title="detailTableName" :visible.sync="detailTableVisible" center customClass="customWidth"
                        style="line-height: 60px;">
                    <el-table border :data="detailTableData">
                        <el-table-column prop="date" label="日期" align="center"></el-table-column>
                        <el-table-column prop="uv" label="UV人数" align="center"></el-table-column>
                        <el-table-column prop="registernum" label="注册人数" align="center"></el-table-column>
                        <el-table-column prop="cvr" label="UV到注册转化率(%)" width="170" align="center"></el-table-column>
                        <el-table-column prop="activatecount" label="激活人数" align="center"></el-table-column>
                        <el-table-column prop="authencount" label="认证人数" width="100" align="center"></el-table-column>
                        <el-table-column prop="activatecount" label="激活人数" align="center"></el-table-column>
                        <el-table-column prop="applynum" label="申请人数" align="center"></el-table-column>
                        <el-table-column prop="cvr1" label="注册到申请转化率(%)" width="175" align="center"></el-table-column>
                        <el-table-column prop="machineauditpass" label="通过人数" width="100" align="center"></el-table-column>
                        <el-table-column prop="orderpass" label="已借款人数" align="center"></el-table-column>
                        <el-table-column prop="cvr2" label="注册到借款转化率(%)" width="175" align="center"></el-table-column>
                    </el-table>
                </el-dialog>
                <div class="block">
                    <el-pagination
                        :current-page="page"
                        :page-size.sync="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :page-count="totalPageCount"
                        :total="totalCount"
                        @current-change="currentChange"
                    ></el-pagination>
                </div>
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
                formList: {
                    dateStart: "",
                    dateEnd: "",
                    sourceid: ""
                },
                sourcelist: [],
                detailTableVisible: false,
                detailTableName: '',
                detailObject: {name: ''},
                tableData: [],
                detailTableData: [{date: ''}],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/sourcetongji/queryByToday', {
                params: {companyId: window.localStorage.getItem("companyid"), page: 1}
            }).then(res => {
                that.tableData = res.data.listsourcepage;
                that.page = res.data.pageutil.page;
                that.totalPageCount = res.data.pageutil.totalPageCount;
                that.totalCount = res.data.pageutil.totalCount;
                that.pageSize = res.data.pageutil.pageSize;
                that.sourcelist = res.data.sourcelist;
            })
        },
        methods: {
            dateChangeStart(val){
                var that = this;
                that.formList.dateStart = val;
            },
            dateChangeEnd(val){
                var that = this;
                that.formList.dateEnd = val;
            },
            Search() {
                var that = this;
                if (!that.formList.sourceid && !that.formList.dateStart && !that.formList.dateEnd) {
                    var that = this;
                    that.axios.get('/sourcetongji/queryByToday', {
                        params: {companyId: window.localStorage.getItem("companyid"), page: 1}
                    }).then(res => {
                        that.tableData = res.data.listsourcepage;
                        that.page = res.data.pageutil.page;
                        that.totalPageCount = res.data.pageutil.totalPageCount;
                        that.totalCount = res.data.pageutil.totalCount;
                        that.pageSize = res.data.pageutil.pageSize;
                        that.sourcelist = res.data.sourcelist;
                    })
                } else {
                    var that = this;
                    var date = new Date();
                    var dateString = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
                    var param = that.formList;
                    if (!that.formList.dateStart && !that.formList.dateEnd) {
                        param.dateStart = dateString;
                        param.dateEnd = dateString;
                    }else if(!that.formList.dateStart){
                        param.dateStart = param.dateEnd;
                    }else if(!that.formList.dateEnd){
                        param.dateEnd = param.dateStart;
                    }
                    param.companyId = window.localStorage.getItem("companyid");
                    param.page = that.page;
                    that.axios.get('/sourcetongji/queryByTimeslot', {
                        params: param
                    }).then(res => {
                        that.tableData = res.data.listsourcepage;
                        that.page = res.data.pageutil.page;
                        that.totalPageCount = res.data.pageutil.totalPageCount;
                        that.totalCount = res.data.pageutil.totalCount;
                        that.pageSize = res.data.pageutil.pageSize;
                        that.sourcelist = res.data.sourcelist;
                    })
                }
            },
            currentChange(val) {
                var that = this;
                that.page = val;
                that.Search();
            },
            showDetail(object) {
                var that = this;
                var sourceid = object.sourceid;
                var sourcename = object.sourcename;
                var date = new Date();
                var dateString = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
                var param = {companyId: window.localStorage.getItem("companyid"), sourceid: sourceid};
                param.dateEnd = that.formList.dateEnd;
                param.dateStart = that.formList.dateStart;
                if (!that.formList.dateEnd && !that.formList.dateStart) {
                    param.dateEnd = dateString;
                    param.dateStart = dateString;
                } else if (!that.formList.dateEnd) {
                    param.dateEnd = that.formList.dateStart;
                } else if (!that.formList.dateStart) {
                    param.dateStart = that.formList.dateEnd;
                }
                that.axios.get('/sourcetongji/queryAllPageDetail', {
                    params: param
                }).then(res => {
                    that.detailTableName = sourcename;
                    that.detailTableData = res.data;
                    that.detailTableVisible = true;
                })
            },
            Reset() {
                var that = this;
                that.formList = {
                    dateStart: "",
                    dateEnd: "",
                    sourceid: ""
                }
            }
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
    .customWidth{
        width:0%;
    }
    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .right {
        float: right;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    .single {
        margin-left: -15px;
    }
</style>
