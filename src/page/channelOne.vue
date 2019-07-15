<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道1</p> -->
        <div class="main">
            <el-form :model="formList" :inline="true" class="demo-form-inline">
                <el-form-item class="single">
                    <el-col>
                        <el-date-picker type="date" placeholder="起始时间" v-model="formList.dateStart"></el-date-picker>
                        <el-date-picker type="date" placeholder="结束时间" v-model="formList.dateEnd"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="formList.type" placeholder="引流平台渠道" style="width:150px">
                        <el-option label="引流平台渠道" value="引流平台渠道"></el-option>
                        <el-option label="华为应用" value="华为应用"></el-option>
                        <el-option label="小米商城" value="小米商城"></el-option>
                        <el-option label="借吧平台" value="借吧平台"></el-option>
                        <el-option label="短信推广A" value="短信推广A"></el-option>
                        <el-option label="电销推广A" value="电销推广A"></el-option>
                        <el-option label="网站链接平台A" value="网站链接平台A"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Search()">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                <el-table-column prop="sourcename" label="引流平台渠道" align="center"></el-table-column>
                <el-table-column prop="uv" label="UV人数" align="center"></el-table-column>
                <el-table-column prop="registernum" label="注册人数" align="center"></el-table-column>
                <el-table-column prop="cvr" label="UV到注册转化率(%)" width="170" align="center"></el-table-column>
                <el-table-column prop="applynum" label="申请人数" align="center"></el-table-column>
                <el-table-column prop="cvr1" label="注册到申请转化率(%)" width="175" align="center"></el-table-column>
                <el-table-column prop="machineauditpass" label="机审通过人数" align="center"></el-table-column>
                <el-table-column prop="cvr2" label="注册到借款转化率(%)" width="175" align="center"></el-table-column>
                <el-table-column prop="address" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showDetail(scope.row.sourcename)">时间段详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="detailTableName" :visible.sync="detailTableVisible" center style="width: 130%;line-height: 60px;">
                <el-table border :data="detailTableData" style="width: 150%;line-height: 60px;" >
                    <el-table-column prop="date" label="日期" align="center"></el-table-column>
                    <el-table-column prop="uv" label="UV人数" align="center"></el-table-column>
                    <el-table-column prop="registernum" label="注册人数" align="center"></el-table-column>
                    <el-table-column prop="cvr" label="UV到注册转化率(%)" width="170" align="center"></el-table-column>
                    <el-table-column prop="activatecount" label="激活人数" align="center"></el-table-column>
                    <el-table-column prop="authencount" label="认证人数" width="175" align="center"></el-table-column>
                    <el-table-column prop="applynum" label="申请人数" align="center"></el-table-column>
                    <el-table-column prop="cvr1" label="注册到申请转化率(%)" width="175" align="center"></el-table-column>
                    <el-table-column prop="machineauditpass" label="机审通过人数" width="175" align="center"></el-table-column>
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
                    time: "",
                    date: "",
                    type: ""
                },
                detailTableVisible: false,
                detailTableName: '',
                detailObject: {name: ''},
                tableData: [],
                detailTableData: [{date:''}],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 20
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/sourcetongji/queryByToday', {
                params: {companyId: 3, page: 1}
            }).then(res => {
                that.tableData = res.data.listsourcepage;
            })
        },
        methods: {
            Search() {
            },
            currentChange() {
            },
            showDetail(sourceName) {
                var that = this;
                var param = {companyId: 3, sourcename: sourceName};
                if (!that.formList.dateEnd && !that.formList.dateStart) {
                    var date = new Date();
                    var dateString = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
                    param.dateEnd = dateString;
                    param.dateStart = dateString;
                }
                that.axios.get('/sourcetongji/queryAllPageDetail', {
                    params: param
                }).then(res => {
                    that.detailTableName = sourceName;
                    that.detailTableData = res.data;
                    that.detailTableVisible = true;
                })
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
