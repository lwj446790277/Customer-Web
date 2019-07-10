<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未逾期未分配" name="first">
        <div class="main">
          <el-button type="success" @click="oneKey">一键分配</el-button>
          <el-select placeholder="分配催收员" v-model="person" class="right">
            <el-option v-for="item in per" :key="item.value" :label="item.reallyName" :value="item.collectionMemberId"></el-option>
          </el-select>
          <el-table
            border
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="orderNumber" label="订单编号" width="120" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="borrowMoneyWay" label="贷款方式" align="center"></el-table-column>
            <el-table-column prop="borrowTimeLimit" label="还款期数" align="center"></el-table-column>
            <el-table-column prop="orderCreateTime" label="实借时间" align="center"></el-table-column>
            <el-table-column prop="realityBorrowMoney/makeLoans" label="实借总金额/放款总金额" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="deferBeforeReturntime" label="延期前应还时间" align="center"></el-table-column>
            <el-table-column prop="interestOnArrears" label="应还利息/应还金额" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.interestOnArrears}}/{{scope.row.makeLoans}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="onceDeferredDay" label="每次延期天数" align="center"></el-table-column>
            <el-table-column prop="deferAfterReturntime" label="延期后应还时间" align="center"></el-table-column>
            <el-table-column prop="defeNum" label="延期次数/延期金额" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.defeNum}}/{{scope.row.defeMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <!-- <template slot="header" slot-scope="scope">
                <el-button type="success" @click="Onekey(scope)" size="mini">一键分配</el-button>
                <button>2222</button>
              </template> -->
              <template slot-scope="scope">
                <el-popover placement="bottom-end" width="300" trigger="click">
                  <div v-if="show">
                    <p>请选择催收员，再分配催单</p>
                    <!-- <el-button class="confire" type="success" @click="close(scope.row)">知道了</el-button> -->
                  </div>
                  <div v-if="hidden">
                    <p>确定要把催单分配给该催收员吗？</p>
                    <!-- <el-button @click="visible = !visible">返回</el-button> -->
                    <el-button class="confire" type="success" @click="confire(scope.row.CollectionMemberId)">是的</el-button>
                  </div>
                  <span class="content" slot="reference" @click="see(scope.row.CollectionMemberId)">分配催单</span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="Pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :page-count="totalPageCount"
              :total="totalCount"
              @size-change="sizeChange"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="未逾期已分配" name="second">
        <div class="main">
          <el-form :model="form" :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select placeholder="订单编号" v-model="form.id">
                <el-option label="订单编号" value="订单编号"></el-option>
                <el-option label="姓名" value="姓名"></el-option>
                <el-option label="手机号" value="手机号"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="single">
              <el-input placeholder="单行输入" v-model="form.single" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
            <!-- <el-form-item class="right">
              <el-select placeholder="分配催收员" v-model="form.person">
                <el-option v-for="item in per" :key="item.value" :label="item.reallyName" :value="item.collectionMemberId"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <el-table border :data="tableDataTwo" style="width: 100%">
            <el-table-column prop="orderNumber" label="订单编号" width="93" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="borrowMoneyWay" label="贷款方式" width="93" align="center"></el-table-column>
            <el-table-column prop="borrowTimeLimit" label="还款期数" width="93" align="center"></el-table-column>
            <el-table-column prop="orderCreateTime" label="实借时间" width="93" align="center"></el-table-column>
            <el-table-column prop="realityBorrowMoney/makeLoans" label="实借总金额/放款总金额" width="120" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="deferBeforeReturntime" label="延期前应还时间" width="100" align="center"></el-table-column>
            <el-table-column prop="interestOnArrears" label="应还利息/应还金额" width="110" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.interestOnArrears}}/{{scope.row.makeLoans}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="onceDeferredDay" label="每次延期天数" width="90" align="center"></el-table-column>
            <el-table-column prop="deferAfterReturntime" label="延期后应还时间" width="100" align="center"></el-table-column>
            <el-table-column prop="address" label="延期次数/延期金额" width="110" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.defeNum}}/{{scope.row.defeMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="reallyName" label="催收人" align="center"></el-table-column>
            <el-table-column prop="collectionTime" label="分配催收时间" align="center"></el-table-column>
            <el-table-column prop="collectionStatus" label="用户状态" width="93" align="center"></el-table-column>
            <el-table-column prop="collectionStatus" label="还款结果" width="93" align="center"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="Pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :page-count="totalPageCount"
              :total="totalCount"
              @size-change="sizeChange"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="逾前催收率报表" name="third">
        <div class="main">
          <el-form :model="formThree" :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="formThree.time" placeholder="日期" style="width:150px">
                <el-option label="日期" value="日期"></el-option>
                <!-- <el-option label="应还时间" value="应还时间"></el-option>
                <el-option label="实还时间" value="实还时间"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item class="single">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="起始时间" v-model="formThree.start"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item class="single">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="结束时间" v-model="formThree.end"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="tableDataThree" show-summary style="width: 100%">
            <el-table-column prop="collectiondate" label="日期" align="center"></el-table-column>
            <el-table-column prop="collection_count" label="未分配总数" align="center"></el-table-column>
            <!-- <el-table-column prop="dialNum" label="未拨打数" align="center"></el-table-column> -->
            <el-table-column prop="notconnected" label="电话未接通数" align="center"></el-table-column>
            <el-table-column prop="connected" label="电话已接通数" align="center"></el-table-column>
            <el-table-column prop="sameday" label="当天未还款数" align="center"></el-table-column>
            <el-table-column prop="paymentmade" label="当天已还款数" align="center"></el-table-column>
            <el-table-column prop="paymentmadeData" label="当天还款率(%)" align="center"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="Pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :page-count="totalPageCount"
              :total="totalCount"
              @size-change="sizeChange"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="逾前催收员报表" name="fourth">
        <div class="main">
          <el-form :model="formFour" :inline="true" class="demo-form-inline">
            <!-- <el-form-item>
              <el-select v-model="formFour.time" placeholder="日期" style="width:150px">
                <el-option label="日期" value="日期"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="起始时间" v-model="formFour.start"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item class="single">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="结束时间" v-model="formFour.end"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="tableDataFour" show-summary style="width: 100%">
            <el-table-column prop="collectiondate" label="日期" align="center"></el-table-column>
            <el-table-column prop="reallyName" label="催收员" align="center"></el-table-column>
            <el-table-column prop="collection_count" label="未分配总数" align="center"></el-table-column>
            <!-- <el-table-column prop="dialNum" label="未拨打数" align="center"></el-table-column> -->
            <el-table-column prop="notconnected" label="电话未接通数" align="center"></el-table-column>
            <el-table-column prop="connected" label="电话已接通数" align="center"></el-table-column>
            <el-table-column prop="sameday" label="当天未还款数" align="center"></el-table-column>
            <el-table-column prop="paymentmade" label="当天已还款数" align="center"></el-table-column>
            <el-table-column prop="paymentmadeData" label="当天还款率(%)" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的逾前催收订单" name="fifth">
        <div class="main">
          <el-table border :data="tableDataFive" style="width: 100%">
            <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="borrowMoneyWay" label="贷款方式" align="center"></el-table-column>
            <el-table-column prop="borrowTimeLimit" label="还款期数" align="center"></el-table-column>
            <el-table-column prop="orderCreateTime" label="实借时间" align="center"></el-table-column>
            <el-table-column prop="realityBorrowMoney/makeLoans" label="实借总金额/放款总金额" width="120" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.realityBorrowMoney}}/{{scope.row.makeLoans}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="deferBeforeReturntime" label="延期前应还时间" align="center"></el-table-column>
            <el-table-column prop="address" label="应还利息/应还金额" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.interestOnArrears}}/{{scope.row.makeLoans}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="onceDeferredDay" label="每次延期天数" align="center"></el-table-column>
            <el-table-column prop="deferAfterReturntime" label="延期后应还时间" align="center"></el-table-column>
            <el-table-column prop="address" label="延期次数/延期金额" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.defeNum}}/{{scope.row.defeMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="collectionTime" label="分配催收时间" align="center"></el-table-column>
            <el-table-column prop="address" label="电话状态" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择">
                    <el-option label="已接通" value="已接通"></el-option>
                    <el-option label="未接通" value="未接通"></el-option>
                </el-select>
            </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
              <template slot-scope="scope">
                <el-popover placement="bottom-end" width="300" trigger="click">
                  <div v-if="shows">
                    <p>请先选择电话状态，再操作</p>
                    <!-- <el-button class="confire" type="success" @click="close(scope.row)">知道了</el-button> -->
                  </div>
                  <div v-if="hide">
                    <p>确认完成该联系吗？</p>
                    <!-- <el-button @click="visible = !visible">返回</el-button> -->
                    <el-button class="confire" type="success" @click="confi(scope.row)">好的</el-button>
                  </div>
                  <span class="blue" slot="reference" @click="watch(scope.row.type)">完成联系</span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="Pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :page-count="totalPageCount"
              :total="totalCount"
              @size-change="sizeChange"
              @current-change="currentChange"
            ></el-pagination>
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
      tableData: [{}],
      per: [],
      String: [],
      tableDataTwo: [],
      tableDataThree: [],
      tableDataFour: [],
      tableDataFive: [],
      activeName: "first",
      person: "",
      form: {
        single: "",
        id: "",
        person: ""
      },
      formThree: {
        time: "",
        start: "",
        end: ""
      },
      formFour: {
        time: "",
        start: "",
        end: ""
      },
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20,
      show: true,
      hidden: false,
      shows: true,
      hide: false
    };
  },
  created(){
    this.getData(this.page, this.Pagesize)
  },
  methods: {
    getData(page,Pagesize){
      this.axios.get('postloanor/postOrders',{
        params:{
          companyId: "3",
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Orderdetails
      })

      this.axios.get('collection/collectionmember',{
        params:{
          companyId: "3"
        }
      }).then(res=>{
        this.per = res.data.collection_member
      })
    },
    getTwo(page,Pagesize){
      this.axios.get('postloanor/NoCollection',{
          params:{
            companyId: "3",
            // page,
            // Pagesize
          }
        }).then(res=>{
          this.tableDataTwo = res.data.Orderdetails
        })
    },
    getThree(page,Pagesize){
      this.axios.get('postloanor/CollectionRecoveryrate',{
          params:{
            companyId: "3",
            // page,
            // Pagesize
          }
        }).then(res=>{
          this.tableDataThree = res.data.Collection
        })
    },
    getFour(page,Pagesize){
      this.axios.get('postloanor/OverdueUser',{
          params:{
            companyId: "3",
            // page,
            // Pagesize
          }
        }).then(res=>{
          this.tableDataFour = res.data.Collection
        })
    },
    getFive(page,Pagesize){
      this.axios.get('postloanor/MyOverdue',{
          params:{
            companyId: "3",
            collectionMemberId: "1"
            // page,
            // Pagesize
          }
        }).then(res=>{
          this.tableDataFive = res.data.Orderdetails
        })
    },
    handleClick(tab, event) {
      console.log(this.activeName);
      if( this.activeName == "second" ){
        this.getTwo(this.page, this.Pagesize)
      }else{
        if( this.activeName == "third" ){
          this.getThree(this.page, this.Pagesize)
        }else{
          if( this.activeName == "fourth" ){
            this.getFour(this.page, this.Pagesize)
          }
        }
      }
      if( this.activeName == "fifth" ){
        this.getFive(this.page, this.Pagesize)
      }
    },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.String = val.map(item => item.id);
    },
    Search() {

    },
    see(id) {
      if (this.person != "") {
        this.show = false;  
        this.hidden = true;
      } else {
        this.show = true;
        this.hidden = false;
      }
    },
    watch(type) {
      console.log(type)
      if (type != undefined) {
        this.shows = false;
        this.hide = true;
      } else {
        this.shows = true;
        this.hide = false;
      }
    },
    confire(CollectionMemberId){
      this.axios.get('postloanor/UpdateOver',{
        params:{
          ids: this.String,
          CollectionMemberId
        }
      }).then(res=>{
        this.$alert("分配成功")
      })
    },
    oneKey(){
      if(this.form.person == ""){
        this.$alert('请选择催收员', '提示', {
          type: 'warning',
          center: true
        })
      }else{
        this.axios.get('postloanor/UpdateOver',{
          params:{
            ids: this.String,
            CollectionMemberId
          }
        }).then(res=>{
          this.$alert("分配成功")
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.main {
  padding: 20px;
}
.input {
  width: 200px;
  margin-right: 30px;
}
.right {
  float: right;
  margin-bottom: 20px;
}
.block {
  padding-top: 20px;
  text-align: center;
}
.single {
  margin-left: -15px;
}
p {
  font-size: 1rem;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.confire {
  float: right;
}
.content {
  color: blue;
  cursor: pointer;
}
.blue{
  color: blue;
  cursor: pointer;
}
</style>
