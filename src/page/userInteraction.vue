<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.name" placeholder="姓名" style="width:150px">
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option>
            <el-option label="身份证号" value="身份证号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="单行输入" v-model="form.input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="address" label="手机号" align="center"></el-table-column>
        <el-table-column prop="address" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="address" label="最后编辑时间" align="center"></el-table-column>
        <el-table-column prop="address" label="操作成员" align="center"></el-table-column>
        <el-table-column prop="address" label="编辑" align="center">
          <template slot-scope="scope">
                <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
              </template>
        </el-table-column>
        <el-table-column prop="address" label="删除" align="center">
          <template slot-scope="scope">
                <el-popover placement="bottom-end" width="300" trigger="click">
                  <span class="content">确认删除该轮播图吗？</span>
                  <el-button class="confire" type="success" @click="confire(scope.row)">是的</el-button>
                  <el-button type="danger" slot="reference" @click="delet(scope.row)">删除</el-button>
                </el-popover>
              </template>
        </el-table-column>
      </el-table>
      <div class="open" @click="centerDialogVisible = true">
          <!-- <i class="el-icon-circle-plus-outline"></i> -->
          <i class="el-icon-plus"></i>
          <span>添加白名单用户</span>
      </div>
      <div class="block">
        <el-pagination
          :current-page="page"
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
      form: {
        name: "",
        input: ""
      },
      tableData: [{ id: 1 }],
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20,
      visible: false
    };
  },
  methods: {
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    Reset() {},
    Search() {},
    confire() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
.single {
  margin-left: -15px;
}
.el-popover p {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.confire {
  float: right;
}
.content {
  color: blue;
  cursor: pointer;
}
.block {
  padding-top: 20px;
  text-align: center;
}
.open {
  width: 99.9%;
  line-height: 60px;
  border: 1px solid #dfe6ec;
  margin-top: -1px;
  cursor: pointer;
  font-size: 1.2rem;
  text-align: center;
}
</style>
