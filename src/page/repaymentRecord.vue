<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="订单号" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="流水号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="还款账号" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="是否金额减免" v-model="form.type">
            <el-option label="是" value="是"></el-option>
            <el-option label="不是" value="不是"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="name" label="订单号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="address" label="手机号" align="center"></el-table-column>
        <el-table-column prop="address" label="借款金额" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="应还逾期罚金" align="center"></el-table-column>
        <el-table-column prop="address" label="已还逾期罚金" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期天数" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="应还本息" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="减免金额" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="应还款金额" align="center"></el-table-column>
        <el-table-column prop="address" label="还款账号" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="流水号" align="center"></el-table-column>
        <el-table-column prop="address" label="还款方式" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="应还款日期" align="center"></el-table-column>
        <el-table-column prop="address" label="实际还款日期" align="center"></el-table-column>
        <el-table-column prop="address" label="操作日期" width="93" align="center"></el-table-column>
        <el-table-column prop="address" label="补扣" align="center">
          <template slot-scope="scope">
            <el-popover placement="bottom-end" width="300" v-model="visible">
              <el-input placeholder="补扣金额" class="input"></el-input>
              <span>元</span>
              <el-button @click="visible = !visible">返回</el-button>
              <el-button class="confire" type="success" @click="confire(scope.row)">提交</el-button>
              <span class="content" slot="reference">补扣</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="退还" align="center">
          <template slot-scope="scope">
            <el-popover placement="bottom-end" width="300" v-model="visibles">
              <el-input placeholder="退还金额" class="input"></el-input>
              <span>元</span>
              <el-button @click="visibles = !visibles">返回</el-button>
              <el-button class="confire" type="success" @click="Return(scope.row)">提交</el-button>
              <span class="content" slot="reference">退还</span>
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
      tableData: [{ id: 1 }, { id: 2 }],
      form: {
        id: "",
        name: "",
        phone: "",
        type: "",
        account: ""
      },
      visible: false,
      visibles: false,
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
    clear() {
      this.form = {
        id: "",
        name: "",
        phone: "",
        type: "",
        account: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {
      // return
    },
    confire() {
      this.visible = false;
    },
    Return() {
      this.visibles = false;
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
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
.input {
  margin-left: 35px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.confire {
  float: right;
}
.content {
  color: blue;
  cursor: pointer;
}
</style>
