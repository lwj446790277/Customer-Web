<template>
  <div>
    <head-top></head-top>
    <el-tabs v-model="activeName" type="card" class="firstcon" @tab-click="handleClick">
      <el-tab-pane label="综合统计" name="first">
        <div class="back">
          <h2>综合统计</h2>
          <div class="mains">
            <div class="background">
              <div class="lefts"></div>
              <span class="today">今日数据统计</span>
              <table class="all">
                <tr>
                  <td>今日放款总额</td>
                  <td>今日放款人数</td>
                  <td>今日注册人数</td>
                  <td>今日申请人数</td>
                </tr>
                <tr>
                  <th>{{one}}</th>
                  <th>{{two}}</th>
                  <th>{{three}}</th>
                  <th>{{four}}</th>
                </tr>
              </table>
              <table class="all fif">
                <tr>
                  <td>今日回款总额</td>
                  <td>今日回款笔数</td>
                  <td>今日延期笔数</td>
                  <td>今日逾后已还笔数</td>
                  <td>今日逾期已还金额</td>
                </tr>
                <tr>
                  <th>{{five}}</th>
                  <th>{{six}}</th>
                  <th>{{seven}}</th>
                  <th>{{eight}}</th>
                  <th>{{nine}}</th>
                </tr>
              </table>
              <div class="leftl"></div>
              <span class="today">累计数据统计</span>
              <table class="all fif">
                <tr>
                  <td>累计放款总金额</td>
                  <td>累计回款总金额</td>
                  <td>已注册用户总数</td>
                  <td>用户申请笔数</td>
                  <td>放款总笔数</td>
                </tr>
                <tr>
                  <th>{{first}}</th>
                  <th>{{second}}</th>
                  <th>{{third}}</th>
                  <th>{{forth}}</th>
                  <th>{{fifth}}</th>
                </tr>
              </table>
              <table class="all fif">
                <tr>
                  <td>累计应收总金额</td>
                  <td>累计实际收益</td>
                  <td>回款总笔数</td>
                  <td>放款通过率</td>
                  <td>订单回款率</td>
                </tr>
                <tr>
                  <th>{{sixth}}</th>
                  <th>{{seventh}}</th>
                  <th>{{eighth}}</th>
                  <th>{{ninth}}</th>
                  <th>{{tenth}}</th>
                </tr>
              </table>
              <div class="lef">
                <div class="lefts"></div>
                <span class="today">期限内数据</span>
                <table class="all alls">
                  <tr>
                    <td>逾前未还笔数</td>
                    <td>逾前应收总金额</td>
                  </tr>
                  <tr>
                    <th>{{one_two}}</th>
                    <th>{{one_three}}</th>
                  </tr>
                </table>
              </div>
              <div class="righ">
                <div class="leftl"></div>
                <span class="today">逾期数据</span>
                <table class="all alls">
                  <tr>
                    <td>逾后未还笔数</td>
                    <td>逾期率</td>
                    <td>逾期应收总金额</td>
                  </tr>
                  <tr>
                    <th>{{one_four}}</th>
                    <th>{{one_five}}</th>
                    <th>{{one_five}}</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="回收率报表" name="second">
        <div class="back">
          <h2>回收率报表</h2>
          <div class="main">
            <el-date-picker type="date" placeholder="起始时间" v-model="start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
            <el-date-picker type="date" placeholder="结束时间" v-model="end" class="picker" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
            <el-button type="primary" @click="Search">搜索</el-button>
            <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
              <el-table-column prop="shouldtime" label="应还日期" width="120" align="center"></el-table-column>
              <el-table-column prop="shouldorder" label="应还订单" width="93" align="center"></el-table-column>
              <el-table-column prop="overduenotrepay" label="逾前未还" width="93" align="center"></el-table-column>
              <el-table-column prop="overduerepay" label="逾前已还" width="93" align="center"></el-table-column>
              <el-table-column prop="overdueafternotrepay" label="逾后未还" width="93" align="center"></el-table-column>
              <el-table-column prop="overdueafterrepay" label="逾后已还" width="93" align="center"></el-table-column>
              <el-table-column prop="baddebt" label="已坏账" align="center"></el-table-column>
              <el-table-column prop="shouldmoney" label="应还金额" width="93" align="center"></el-table-column>
              <el-table-column prop="realymoney" label="实还金额" width="93" align="center"></el-table-column>
              <el-table-column prop="deferredmoney" label="延期费" align="center"></el-table-column>
                <el-table-column prop="overduemoney" label="逾期费" align="center"></el-table-column>
              <el-table-column prop="deratemoney" label="减免金额" width="93" align="center"></el-table-column>
              <el-table-column prop="bankdeduction" label="银行扣款金额" width="125" align="center"></el-table-column>
              <el-table-column prop="tobepaid" label="待还金额" width="93" align="center"></el-table-column>
              <el-table-column prop="overduecvr" label="逾期率" align="center"></el-table-column>
              <el-table-column prop="recovery" label="回收率" align="center"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                :current-page.sync="page"
                :page-size.sync="pageSize"
                layout="total, prev, pager, next, jumper"
                :page-count="totalPageCount"
                :total="totalCount"
                @size-change="sizeChange"
                @current-change="currentChange"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import tendency from "../components/tendency";
import {
  userCount,
  orderCount,
  getUserCount,
  getOrderCount,
  adminDayCount,
  adminCount
} from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      activeName: "first",
      start: "",
      end: "",
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 0,
      one: "",
      two: "",
      three: "",
      four: "",
        five:"",
        six: "",
        seven: "",
        eight: "",
        nine: "",
        first: "",
        second: "",
        third: "",
        forth: "",
        fifth: "",
        sixth: "",
        seventh: "",
        eighth: "",
        ninth: "",
        tenth: "",
        one_two: "",
        one_three: "",
        one_four: "",
        one_five: "",
        one_six: ""
    };
  },
  components: {
    headTop
  },
    created(){
      this.getData()
    },
  methods: {
      timeChange(val){
          // console.log(val)
          this.start = val
      },
      endChange(val){
          this.end = val
      },
      get(page,pageSize){
          this.axios.get('homepagetongji/recoveryStatement',{
              params:{
                  companyId: window.localStorage.getItem("companyid"),
                  page,
                  pageSize
              }
          }).then(res=>{
              this.tableData = res.data.listtongjito
              this.page = res.data.pageutil.page
              this.pageSize = res.data.pageutil.pageSize
              this.totalCount = res.data.pageutil.totalCount
              this.totalPageCount = res.data.pageutil.totalPageCount
          })
      },
      getData(){
          this.axios.get('homepagetongji/queryAll',{
              params:{
                  companyId: window.localStorage.getItem("companyid")
              }
          }).then(res=>{
              if(res.data.todayloantotalmoney==null){
                  res.data.todayloantotalmoney = 0
              }
              this.one = res.data.todayloantotalmoney
              this.two = res.data.todayloan
              this.three = res.data.todayregiste
              this.four = res.data.todayapply
              this.five = res.data.todayreturtoalmoney
              this.six = res.data.todayrepayment
              this.seven = res.data.todaydeferred
              this.eight = res.data.todayoverdue
              this.nine = res.data.todayoveruetotalmoney
              this.first = res.data.payrecmoney
              this.second = res.data.repaymoney
              this.third = res.data.sumregiste
              this.forth = res.data.sumapply
              this.fifth = res.data.sumloan
              this.sixth = res.data.shouldMoney
              this.seventh = res.data.realymoney
              this.eighth = res.data.sumrepayment
              this.ninth = res.data.paymentpasscvr
              this.tenth = res.data.orderrepaycvr
              this.one_two = res.data.overdue
              this.one_three = res.data.overduemoney
              this.one_four = res.data.overdue1
              this.one_five = res.data.overduecvr
              this.one_six = res.data.overshouldMoney
          })
      },
      handleClick(){
        if (this.activeName=="second"){
            this.get(this.page,this.pageSize)
        }
      },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    Search() {
        this.axios.get('homepagetongji/recoveryStatement',{
            params:{
                companyId: window.localStorage.getItem("companyid"),
                shouldrepayStartTime: this.start,
                shouldrepayEndTime: this.end,
                page: this.page
            }
        }).then(res=>{
            this.tableData = res.data.listtongjito
            this.page = res.data.pageutil.page
            this.pageSize = res.data.pageutil.pageSize
            this.totalCount = res.data.pageutil.totalCount
            this.totalPageCount = res.data.pageutil.totalPageCount
        })
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.el-tabs__header {
  margin: 0;
}
.mains {
  padding: 20px;
  margin-top: -20px;
  min-height: 70vh;
}
.main {
  padding: 20px;
  background-color: #fff;
  min-height: 70vh;
}
.background {
  // background-color: #eff2f7;
}
.lefts {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #3278f9;
  margin-right: 10px;
  float: left;
}
.leftl {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #fb8b39;
  margin-top: 10px;
  margin-right: 10px;
  float: left;
}
.today {
  font-size: 1.1rem;
  line-height: 30px;
}
.all {
  width: 100%;
  margin: 10px auto;
  box-shadow: #ccc 0px 0px 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: #fff;
}
.alls {
  width: 80%;
  margin: 10px 0;
}
.all tr th {
  line-height: 40px;
  font-size: 1.4rem;
  color: #3278f9;
}
.all tr td {
  line-height: 40px;
  color: #999;
  text-align: center;
}
.fif tr th {
  width: 20%;
}
.lef {
  width: 48%;
  float: left;
}
.righ {
  width: 48%;
  float: left;
}
// .el-tabs__content:nth-child(2){
// 	margin-top: -15px;
// 	background-color: #eff2f7;
// }
.firstcon .el-tabs__content:nth-last-child(2):first-child {
  margin-top: -15px;
  background-color: #eff2f7;
}
.picker {
  margin-left: -5px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.block {
  padding-top: 20px;
  text-align: center;
}
</style>
