<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- <p class="explain_text">这里是已逾期未入催</p> -->
    <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="订单编号/姓名/手机号" v-model="form.id" class="input"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-select placeholder="立即贷+分期贷" v-model="form.dai">
            <el-option label="立即贷+分期贷" value="立即贷+分期贷"></el-option>
            <el-option label="立即贷" value="立即贷"></el-option>
            <el-option label="分期贷" value="分期贷"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
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
        <el-table-column prop="address" label="实借总金额" align="center"></el-table-column>
        <el-table-column prop="address" label="应还时间" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期天数" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期罚金/含逾应还总金额" align="center"></el-table-column>
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
      tableData: [{ id: 1 }, { id: 2 }, { id: 3 }],
      form: {
        id: "",
        dai: "",
        person: ""
      },
      multipleSelection: [],
      String: [],
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20,
      visible: false,
      show: true,
      hidden: false
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
      this.String = val.map(item => item.id);
      console.log(this.multipleSelection, this.String);
    },
    clear() {
      this.form = {
        id: "",
        dai: "",
        person: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {},
    see(id) {
      if (this.form.person != "") {
        this.show = false;
        this.hidden = true;
      } else {
        this.show = true;
        this.hidden = false;
      }
    },
    close() {},
    confire() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less">
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
</style>
