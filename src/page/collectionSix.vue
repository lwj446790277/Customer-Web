<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="back">
      <h2>已分配已催收</h2>
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
              <el-date-picker type="date" placeholder="实借起始时间" v-model="form.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item class="single">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="实借结束时间" v-model="form.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="延期后应还起始时间"
                v-model="form.deferAfterReturntimeStatu_time"
                value-format="yyyy-MM-dd" @change="starts"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item class="single">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="延期后应还结束时间"
                v-model="form.deferAfterReturntimeEnd_time"
                value-format="yyyy-MM-dd" @change="ends"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="逾期等级" v-model="form.level">
              <el-option
                v-for="item in level"
                :key="item.value"
                :label="item.grade"
                :value="item.grade"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
            <el-button type="primary" @click="Search">搜索</el-button>
          </el-form-item>
        </el-form>
        <!-- <div class="statistics">
        <ul>
          <li>分配订单总数</li>
          <li class="num">10</li>
          <li>承诺还款订单数</li>
          <li class="num">10</li>
          <li>成功订单数</li>
          <li class="num">10</li>
          <li>未还清订单数</li>
          <li class="num">10</li>
          <li>坏账订单数</li>
          <li class="num">10</li>
        </ul>
        </div>-->
        <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="orderNumber" label="订单编号" width="70" align="center" class="black"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="borrowMoneyWay" label="贷款方式" width="70" align="center"></el-table-column>
          <el-table-column prop="borrowTimeLimit" label="还款期数" width="70" align="center"></el-table-column>
          <el-table-column prop="orderCreateTime" label="实借时间" align="center"></el-table-column>
          <el-table-column prop="realityBorrowMoney" label="实借总金额" width="80" align="center"></el-table-column>
          <el-table-column prop="deferAfterReturntime" label="延期后应还时间" width="83" align="center"></el-table-column>
          <el-table-column prop="overdueNumberOfDays" label="逾期天数" align="center"></el-table-column>
          <el-table-column prop="overdueGrade" label="逾期等级" align="center"></el-table-column>
          <el-table-column prop="shouldReapyMoney" label="逾期罚金/含逾应还总金额" width="85" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.interestPenaltySum}}/{{scope.row.order_money}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="collectionStatus" label="用户状态" width="93" align="center"></el-table-column>
          <el-table-column prop="promise_money" label="承诺还清部分金额" width="95" align="center"></el-table-column>
          <el-table-column prop="collNum" label="催收次数" align="center"></el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" align="center"></el-table-column>
          <el-table-column label="剩余还款金额/实还金额" width="115" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.surplus_money}}/{{scope.row.realityAccount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="新增催收" width="93" align="center">
            <template slot-scope="scope">
              <span class="blue" @click="newAdd(scope.row.orderId,scope.row.name)">新增催收</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="结束催收" width="93" align="center">
            <template slot-scope="scope">
              <el-popover placement="bottom-end" width="300" trigger="click">
                <p>确定结束催收该用户吗？</p>
                <el-button type="success" class="confire" @click="confire(scope.row.orderId)">是的</el-button>
                <span class="blue" slot="reference">结束催收</span>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogTableVisible" center>
          <el-form :model="formList" :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="formList.type" placeholder="选择状态" style="width:150px">
                <el-option label="承诺还款" value="承诺还款"></el-option>
                <el-option label="承诺还清一部分" value="承诺还清一部分"></el-option>
                <el-option label="电话无人接听" value="电话无人接听"></el-option>
                <el-option label="态度恶劣" value="态度恶劣"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="输入金额" v-model="formList.money"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="add">添加记录</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="gridData">
            <el-table-column property="collectionTime" label="催收时间" align="center"></el-table-column>
            <el-table-column property="collectionStatus" label="用户状态" align="center"></el-table-column>
            <el-table-column property="promise_money" label="承诺还款金额" align="center"></el-table-column>
            <el-table-column property="orderStatus" label="订单状态" align="center"></el-table-column>
          </el-table>
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
      tableDatas: [
        { id: 1, label: "承诺还款", value: "承诺还款" },
        { id: 2, label: "承诺还清一部分", value: "承诺还清一部分" },
        { id: 3, label: "电话无人接听", value: "电话无人接听" },
        { id: 4, label: "态度恶劣", value: "态度恶劣" }
      ],
      gridData: [],
      level: [],
      dialogTableVisible: false,
      title: "",
      orderId: "",
      collectionMemberId: "",
      form: {
        name: "",
        id: "",
        phone: "",
        start: "",
        end: "",
        deferAfterReturntimeStatu_time: "",
        deferAfterReturntimeEnd_time: "",
        level: ""
      },
      formList: {
        type: "",
        money: ""
      },
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created() {
    this.getData(this.page, this.Pagesize);
    this.get();
  },
  methods: {
      timeChange(val){
          // console.log(val)
          this.form.start = val
      },
      endChange(val){
          this.form.end = val
      },
      starts(val){
          // console.log(val)
          this.form.deferAfterReturntimeStatu_time = val
      },
      ends(val){
          this.form.deferAfterReturntimeEnd_time = val
      },
    getData(page, Pagesize) {
      this.axios
        .get("collection/YiCollection", {
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
          // this.totalPageCount = res.data.pageUtil.totalPage
        });
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
    newAdd(orderId, name) {
      this.dialogTableVisible = true;
      this.orderId = orderId;
      this.title = name;
      this.axios
        .get("collection/Collectiondetails", {
          params: {
            orderId
          }
        })
        .then(res => {
          this.gridData = res.data.Orderdetails;
          this.collectionMemberId = res.data.Orderdetails.collectionMemberId;
        });
    },
    add() {
      console.log(this.collectionMemberId);
      this.axios
        .get("collection/AddCollectiondertilas", {
          params: {
            orderId: this.orderId,
            collectionMemberId: 1,
            collectionStatus: this.formList.type,
            promise_money: this.formList.money
          }
        })
        .then(res => {
          this.$confirm(res.data.desc, "提示", {
            type: "warning",
            center: true
          });
          this.axios
            .get("collection/Collectiondetails", {
              params: {
                orderId: this.orderId
              }
            })
            .then(res => {
              this.gridData = res.data.Orderdetails;
            });
        });
    },
    clear() {
      this.form = {
        name: "",
        id: "",
        phone: "",
        start: "",
        end: "",
        deferAfterReturntimeStatu_time: "",
        deferAfterReturntimeEnd_time: "",
        level: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {
        if(this.form.start!=""){
            var start = this.form.start + " " + "00:00:00"
        }
        if(this.form.end!=""){
            var end = this.form.end + " " + "23:59:59"
        }
        if(this.form.deferAfterReturntimeStatu_time!=""){
            var deferAfterReturntimeStatu_time = this.form.deferAfterReturntimeStatu_time + " " + "00:00:00"
        }
        if(this.form.deferAfterReturntimeEnd_time!=""){
            var deferAfterReturntimeEnd_time = this.form.deferAfterReturntimeEnd_time + " " + "23:59:59"
        }
      this.axios
        .get("collection/YiCollection", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            orderNumber: this.form.id,
            name: this.form.name,
            phone: this.form.phone,
            overdueGrade: this.form.level,
            start_time: start,
            end_time: end,
            deferAfterReturntimeStatu_time: deferAfterReturntimeStatu_time,
            deferAfterReturntimeEnd_time: deferAfterReturntimeEnd_time
          }
        })
        .then(res => {
          this.tableData = res.data.Orderdetails;
        })
    },
    confire(orderId) {
      this.axios
        .get("collection/JieShu", {
          params: {
            orderId
          }
        })
        .then(res => {
          this.$confirm(res.data.desc, "提示", {
            type: "warning",
            center: true
          });
          this.getData(this.page, this.Pagesize);
        });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.main {
  padding: 20px;
  background-color: #fff;
  min-height: 70vh;
}
.input {
  width: 200px;
  margin-right: 30px;
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
.statistics {
  width: 100%;
}
.statistics ul {
  width: 100%;
}
.statistics ul li {
  width: 9.93%;
  line-height: 60px;
  margin-bottom: -1px;
  float: left;
  text-align: center;
  border: 1px solid #dfe6ec;
}
.statistics ul li.num {
  margin-left: -1px;
  margin-right: -1px;
  color: red;
}
.confire {
  float: right;
}
p {
  font-size: 1rem;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.blue {
  color: blue;
  cursor: pointer;
}
.black {
  background-color: black;
}
.el-table .cell,
.el-table th > div {
  padding-left: 0;
  padding-right: 0;
}
</style>
