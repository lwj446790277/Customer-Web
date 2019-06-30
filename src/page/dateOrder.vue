<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="未逾期未分配" name="first">
        <div class="main">
          <el-select placeholder="分配催收员" v-model="person" class="right">
            <el-option label="立即贷+分期贷" value="立即贷+分期贷"></el-option>
            <el-option label="立即贷" value="立即贷"></el-option>
            <el-option label="分期贷" value="分期贷"></el-option>
          </el-select>
          <el-table
            border
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="订单编号" width="120" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
            <el-table-column prop="address" label="手机号" align="center"></el-table-column>
            <el-table-column prop="address" label="贷款方式" align="center"></el-table-column>
            <el-table-column prop="address" label="还款期数" align="center"></el-table-column>
            <el-table-column prop="address" label="实借时间" align="center"></el-table-column>
            <el-table-column prop="address" label="实借总金额/放款总金额" align="center"></el-table-column>
            <el-table-column prop="address" label="延期前应还时间" align="center"></el-table-column>
            <el-table-column prop="address" label="应还利息/应还金额" align="center"></el-table-column>
            <el-table-column prop="address" label="每次延期天数" align="center"></el-table-column>
            <el-table-column prop="address" label="延期后应还时间" align="center"></el-table-column>
            <el-table-column prop="address" label="延期次数/延期金额" align="center"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope">
                <!-- <el-button type="success" @click="Onekey(scope)" size="mini">一键分配</el-button> -->
                <button>2222</button>
              </template>
              <template slot-scope="scope">
                <el-popover placement="bottom-end" width="300" trigger="click">
                  <div v-if="show">
                    <p>请选择催收员，再分配催单</p>
                    <el-button class="confire" type="success" @click="close(scope.row)">知道了</el-button>
                  </div>
                  <div v-if="hidden">
                    <p>确定要把催单分配给该催收员吗？</p>
                    <el-button @click="visible = !visible">返回</el-button>
                    <el-button class="confire" type="success" @click="confire(scope.row)">是的</el-button>
                  </div>
                  <span class="content" slot="reference" @click="see(scope.row)">分配催单</span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="pageSize"
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
              <el-input placeholder="请输入数字" v-model="form.single" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
            <el-form-item class="right">
              <el-select placeholder="分配催收员" v-model="form.person">
                <el-option label="立即贷+分期贷" value="立即贷+分期贷"></el-option>
                <el-option label="立即贷" value="立即贷"></el-option>
                <el-option label="分期贷" value="分期贷"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-table border :data="tableDataTwo" style="width: 100%">
            <el-table-column prop="name" label="订单编号" width="93" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="address" label="手机号" align="center"></el-table-column>
            <el-table-column prop="address" label="贷款方式" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="还款期数" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="实借时间" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="实借总金额/放款总金额" width="120" align="center"></el-table-column>
            <el-table-column prop="address" label="延期前应还时间" width="100" align="center"></el-table-column>
            <el-table-column prop="address" label="应还利息/应还金额" width="110" align="center"></el-table-column>
            <el-table-column prop="address" label="每次延期天数" width="90" align="center"></el-table-column>
            <el-table-column prop="address" label="延期后应还时间" width="100" align="center"></el-table-column>
            <el-table-column prop="address" label="延期次数/延期金额" width="110" align="center"></el-table-column>
            <el-table-column prop="address" label="催收人" align="center"></el-table-column>
            <el-table-column prop="address" label="分配催收时间" align="center"></el-table-column>
            <el-table-column prop="address" label="用户状态" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="还款结果" width="93" align="center"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="pageSize"
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
              <el-select v-model="formThree.date" placeholder="日期" style="width:150px">
                <el-option label="日期" value="日期"></el-option>
                <!-- <el-option label="应还时间" value="应还时间"></el-option>
                <el-option label="实还时间" value="实还时间"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item class="single">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="起始时间" v-model="formThree.time"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="tableDataThree" show-summary style="width: 100%">
            <el-table-column prop="name" label="日期" align="center"></el-table-column>
            <el-table-column prop="name" label="未分配总数" align="center"></el-table-column>
            <el-table-column prop="address" label="未拨打数" align="center"></el-table-column>
            <el-table-column prop="address" label="电话未接通数" align="center"></el-table-column>
            <el-table-column prop="address" label="电话已接通数" align="center"></el-table-column>
            <el-table-column prop="address" label="当天未还款数" align="center"></el-table-column>
            <el-table-column prop="address" label="当天已还款数" align="center"></el-table-column>
            <el-table-column prop="address" label="当天还款率(%)" align="center"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="pageSize"
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
            <el-form-item>
              <el-select v-model="formFour.date" placeholder="日期" style="width:150px">
                <el-option label="日期" value="日期"></el-option>
                <!-- <el-option label="应还时间" value="应还时间"></el-option>
                <el-option label="实还时间" value="实还时间"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item class="single">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="起始时间" v-model="formFour.time"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="tableDataFour" show-summary style="width: 100%">
            <el-table-column prop="name" label="日期" align="center"></el-table-column>
            <el-table-column prop="name" label="催收员" align="center"></el-table-column>
            <el-table-column prop="name" label="未分配总数" align="center"></el-table-column>
            <el-table-column prop="address" label="未拨打数" align="center"></el-table-column>
            <el-table-column prop="address" label="电话未接通数" align="center"></el-table-column>
            <el-table-column prop="address" label="电话已接通数" align="center"></el-table-column>
            <el-table-column prop="address" label="当天未还款数" align="center"></el-table-column>
            <el-table-column prop="address" label="当天已还款数" align="center"></el-table-column>
            <el-table-column prop="address" label="当天还款率(%)" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的逾前催收订单" name="fifth">
        <div class="main">
          <el-table border :data="tableDataFive" style="width: 100%">
            <el-table-column prop="name" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="name" label="手机号" align="center"></el-table-column>
            <el-table-column prop="address" label="贷款方式" align="center"></el-table-column>
            <el-table-column prop="address" label="还款期数" align="center"></el-table-column>
            <el-table-column prop="address" label="实借时间" align="center"></el-table-column>
            <el-table-column prop="address" label="实借总金额/放款总金额" width="120" align="center"></el-table-column>
            <el-table-column prop="address" label="延期前应还时间" align="center"></el-table-column>
            <el-table-column prop="address" label="应还利息/应还金额" align="center"></el-table-column>
            <el-table-column prop="address" label="每次延期天数" align="center"></el-table-column>
            <el-table-column prop="address" label="延期后应还时间" align="center"></el-table-column>
            <el-table-column prop="address" label="延期次数/延期金额" align="center"></el-table-column>
            <el-table-column prop="address" label="分配催收时间" align="center"></el-table-column>
            <el-table-column prop="address" label="电话状态" align="center"></el-table-column>
            <el-table-column prop="address" label="操作" align="center"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page.sync="page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size.sync="pageSize"
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
      tableData: [],
      tableDataTwo: [],
      tableDataThree: [],
      tableDataFour: [],
      tableDataFive: [],
      activeName: "fifth",
      person: "",
      form: {
        single: "",
        id: "",
        person: ""
      },
      formThree: {
        date: "",
        time: ""
      },
      formFour: {
        date: "",
        time: ""
      },
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  methods: {
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    clear() {
      this.formList = {
        name: "",
        single: "",
        type: "",
        id: "",
        time: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {}
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
</style>
