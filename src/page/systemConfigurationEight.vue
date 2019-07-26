<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">渠道预设和紧急设置</p> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="流量和放款渠道预设" name="first">
                <div class="back">
                    <h2>流量和放款渠道预设</h2>
                    <div class="main">
                        <el-tabs v-model="active" type="card" @tab-click="handleClick">
                            <el-tab-pane label="流量渠道最大阈值" name="first">
                                <!-- <h3>流量渠道最大阈值</h3>
                                <hr /> -->
                                <table cellpadding="30" cellspacing="0" class="tab-le">
                                    <tr>
                                        <th>当天uv数</th>
                                        <td>
                                            <input
                                                autocomplete="off"
                                                type="text"
                                                rows="2"
                                                validateevent="true"
                                                class="el-input__inner nmsl"
                                                v-model="todayregiste"
                                                disabled="disabled"
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>日均uv数</th>
                                        <td>
                                            <input
                                                autocomplete="off"
                                                type="text"
                                                rows="2"
                                                validateevent="true"
                                                class="el-input__inner nmsl"
                                                v-model="dailyregiste"
                                                disabled="disabled"
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>每天uv最大阈值</th>
                                        <td>
                                            <input
                                                autocomplete="off"
                                                type="number"
                                                rows="2"
                                                validateevent="true"
                                                class="el-input__inner nmsl"
                                                v-model="maxthresholdvalue"
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>阈值最大说明</th>
                                        <td class="explain">
                                            1.当天和日均UV数是阈值设置的参考<br/><br/>
                                            2.建议UV高峰期后再设置该阈值,否则若设置的阈值≤今天的UV数,今天的渠道将强制关闭<br/><br/>
                                            3.若每天的当天UV数=阈值最大值时,当天的所有后续用户将不能在所有渠道中注册手机号<br/><br/>
                                            4.若阈值=0,则关闭该设置<br/><br/>
                                            5.若阈值≥0,该设置会每天循环生效
                                        </td>
                                    </tr>
                                </table>
                                <br/>
                                <center>
                                    <el-button type="primary" @click="save1()" class="btns">保存</el-button>
                                </center>
                            </el-tab-pane>
                            <el-tab-pane label="放款渠道最大阈值" name="second">
                                <table cellpadding="30" cellspacing="0" class="tab-le">
                                    <tr>
                                        <th>当天已放款金额</th>
                                        <td>
                                            <input
                                                autocomplete="off"
                                                type="text"
                                                rows="2"
                                                validateevent="true"
                                                class="el-input__inner nmsl"
                                                v-model="loantoday"
                                                disabled="disabled"
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>日均放款金额</th>
                                        <td>
                                            <input
                                                autocomplete="off"
                                                type="text"
                                                rows="2"
                                                validateevent="true"
                                                class="el-input__inner nmsl"
                                                v-model="dailyloanmoney"
                                                disabled="disabled"
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>每天放款最大阈值</th>
                                        <td>
                                            <input
                                                autocomplete="off"
                                                type="text"
                                                rows="2"
                                                validateevent="true"
                                                class="el-input__inner nmsl"
                                                v-model="maxthresholdvalue2"
                                                placeholder="每天放款最大阈值"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>阈值最大说明</th>
                                        <td class="explain">
                                            1.当天和日均已放款金额是阈值设置的参考<br/><br/>
                                            2.建议借款高峰期后再设置该阈值,否则若设置的阈值≤今天的已放款金额,今天的放款渠道将强制关闭<br/><br/>
                                            3.若每天的当天已放款金额=阈值最大值时,当天的所有后续用户将不能借款,次日才能借款<br/><br/>
                                            4.若阈值=0,则关闭该设置<br/><br/>
                                            5.若阈值≥0,该设置会每天循环生效<br/><br/>
                                        </td>
                                    </tr>
                                </table>
                                <br/>
                                <center>
                                    <el-button type="primary" @click="save2()" class="btns">保存</el-button>
                                </center>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="放款渠道紧急开关" name="second">
                <div class="back">
                    <h2>放款渠道紧急开关</h2>
                    <div class="main">
                        <table cellpadding="40" cellspacing="0" class="tab-two">
                            <tr>
                                <th>当天已放款金额</th>
                                <td>
                                    <input
                                        autocomplete="off"
                                        type="text"
                                        rows="2"
                                        validateevent="true"
                                        class="el-input__inner nmsl"
                                        v-model="loantoday"
                                        disabled="disabled"
                                        placeholder="0"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>放款渠道开关状态</th>
                                <td>
                                    <el-radio-group v-model="status"  @change="changeStatus">
                                        <el-radio label="1">开启</el-radio>
                                        <el-radio label="2">关闭</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <th>阈值最大说明</th>
                                <td class="explain">
                                    1.紧急开关是放款渠道产生数据异常的紧急按钮,所以正常运营时谨慎关闭.
                                    2.紧急开关是放款渠道最大阈值的全局设置,也就是说紧急关闭后,最大阈值将失效.
                                    3.开启和禁用每天都循环生效
                                </td>
                            </tr>
                        </table>
                        <br/>
                        <center>
                            <el-button type="primary" @click="changeState()" class="btns">保存</el-button>
                        </center>
                    </div>
                </div>
            </el-tab-pane>
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
                activeName: "first",
                active: "first",
                todayregiste: '',
                dailyregiste: '',
                maxthresholdvalue: '',
                loantoday: '',
                dailyloanmoney: '',
                maxthresholdvalue2: '',
                status:''
            };
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/usthresholdvalue/usersourcemax', {
                params: {companyId: window.localStorage.getItem("companyid")}
            }).then(res => {
                that.todayregiste = res.data.todayregiste;
                that.dailyregiste = res.data.dailyregiste;
                that.maxthresholdvalue = res.data.maxthresholdvalue;
                that.axios.get('/loanthresholdvalue/loanmax', {
                    params: {companyId: window.localStorage.getItem("companyid")}
                }).then(res => {
                    that.loantoday = res.data.loantoday;
                    that.dailyloanmoney = res.data.dailyloanmoney;
                    that.maxthresholdvalue2 = res.data.maxthresholdvalue;
                    that.axios.get('/loanthresholdvalue/loanmax', {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.loantoday = res.data.loantoday;
                        that.dailyloanmoney = res.data.dailyloanmoney;
                        that.maxthresholdvalue2 = res.data.maxthresholdvalue;
                        that.axios.get('/loanthresholdvalue/queryloantoday', {
                            params: {companyId: window.localStorage.getItem("companyid")}
                        }).then(res => {
                            that.status = res.data.status;
                        })
                    })
                })
            })
        },
        methods: {
            handleClick() {

            },
            save1() {
                var that = this;
                that.axios.get('/usthresholdvalue/upamaxthresholdvalue', {
                    params: {maxthresholdvalue: that.maxthresholdvalue}
                }).then(res => {
                    this.$message.success('修改成功');
                })
            },
            save2() {
                var that = this;
                that.axios.get('/loanthresholdvalue/upamaxthresholdvalue', {
                    params: {maxthresholdvalue: that.maxthresholdvalue2}
                }).then(res => {
                    this.$message.success('修改成功');
                })
            },
            changeStatus(state){
                var that = this;
                that.status = state;
            },
            changeState() {
                var that = this;
                that.axios.get('/loanthresholdvalue/upaloanstatus', {
                    params: {companyId:window.localStorage.getItem("companyid"),status:that.status}
                }).then(res => {
                    this.$message.success('修改成功');
                    that.axios.get('/loanthresholdvalue/queryloantoday', {
                        params: {companyId: window.localStorage.getItem("companyid")}
                    }).then(res => {
                        that.status = res.data.status;
                    })
                })
            },

        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .nmsl {
        background-color: #f3f6fb;
        border: transparent;
        border-radius: 0;
        text-align: center;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .el-tabs__header {
        margin: 0;
    }

    h3 {
        width: 100%;
        color: #999;
        font-weight: 500;
    }

    hr {
        border-color: #eee;
        margin-left: -20px;
        margin-right: -20px;
        margin-bottom: 2%;
    }

    .tab-le {
        width: 50%;
        margin-left: 5%;
    }

    .tab-le th {
        text-align: left;
        width: 40%;
        color: #707070;
    }

    .tab-le td {
        padding-left: 0;
    }

    .tab-le td .el-input .el-input__inner {
        width: 60%;
        background-color: #f3f6fb;
        border: transparent;
    }

    .explain {
        background-color: #f3f6fb;
        padding: 10px;
    }

    .tab-two {
        width: 50%;
        margin-left: 5%;
    }

    .tab-two th {
        text-align: left;
        width: 40%;
        color: #707070;
    }

    .tab-two td {
        padding-left: 0;
    }

    .tab-two td .el-input .el-input__inner {
        background-color: #f3f6fb;
        border: transparent;
    }
</style>
