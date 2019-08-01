<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="back">
      <h2>还款实时流水</h2>
      <div class="main">
        <el-form :model="form" :inline="true" class="demo-form-inline">
          <!-- <el-form-item>
            <el-select v-model="form.name" placeholder="还款流水号" style="width:150px">
              <el-option label="还款流水号" value="还款流水号"></el-option>
              <el-option label="订单编号" value="订单编号"></el-option>
              <el-option label="姓名" value="姓名"></el-option>
              <el-option label="手机号" value="手机号"></el-option>
            </el-select>
          </el-form-item> -->
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
              <el-date-picker type="date" placeholder="起始时间" v-model="form.start" value-format="yyyy-MM-dd" @change="timeChange"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item class="single">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="结束时间" v-model="form.end" value-format="yyyy-MM-dd" @change="endChange"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.qudao" placeholder="还款渠道" style="width:150px" @change="change">
              <el-option
                v-for="item in Thirdparty_interface"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="warning"
              @click="Reset"
              style="background-color:#e3e4e7;border:transparent;color:#000"
            >重置</el-button>
            <el-button type="primary" @click="Search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="remittanceTime" label="流水号时间" align="center"></el-table-column>
          <el-table-column prop="loanSource" label="还款渠道" align="center"></el-table-column>
          <el-table-column prop="pipelinenumber" label="还款流水号" align="center"></el-table-column>
          <el-table-column prop="paymentmoney" label="还款金额" align="center"></el-table-column>
          <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="page"
            :page-size.sync="Pagesize"
            layout="total, prev, pager, next, jumper"
            :page-count="totalPageCount"
            :total="totalCount"
            @size-change="sizeChange"
            @current-change="currentChange"
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
      Thirdparty_interface: [],
      id: "",
      form: {
        name: "",
        input: "",
        start: "",
        end: "",
        qudao: ""
      },
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created() {
    this.get();
    this.getData(this.page, this.Pagesize);
  },
  methods: {
      timeChange(val){
          // console.log(val)
          this.form.start = val
      },
      endChange(val){
          this.form.end = val
      },
    get() {
      this.axios
        .get("fina/RepaymentAll", {
          params: {
            compayId: window.localStorage.getItem("companyid")
          }
        })
        .then(res => {
          this.Thirdparty_interface = res.data.Repayment_setting;
        });
    },
    getData(page, Pagesize) {
      this.axios
        .get("fina/HuanKuan", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            page,
            Pagesize
          }
        })
        .then(res => {
          this.tableData = res.data.Repayment;
          this.page = res.data.Repayment.page;
          this.Pagesize = res.data.Repayment.Pagesize;
          this.totalCount = res.data.Repayment.length;
        });
    },
    change(id) {
      console.log(id);
      let selectedWorkName = {};
      this.id = id;
      selectedWorkName = this.Thirdparty_interface.find(item => {
        //这里的chargingWorkNameList就是上面遍历的数据源
        return item.id === this.id;
        //筛选出匹配数据，是对应数据的整个对象
      });
    },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    clear() {
      this.form = {
        name: "",
        input: "",
        start: "",
        end: "",
        qudao: ""
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
      this.axios.get("fina/HuanKuan", {
        params: {
          companyId: window.localStorage.getItem("companyid"),
          orderNumber:  this.form.id,
          phone:  this.form.phone,
          name: this.form.name,
          start_time: start,
          end_time: end,
          thirdparty_id: this.id
        }
      })
      .then(res => {
        this.tableData = res.data.Repayment;
      })
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
</style>
