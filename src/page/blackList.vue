<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="机审判定黑名单" name="first">
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
              <el-select v-model="form.time" placeholder="注册时间" style="width:150px">
                <el-option label="注册时间" value="注册时间"></el-option>
                <el-option label="订单时间" value="订单时间"></el-option>
                <el-option label="借款时间" value="借款时间"></el-option>
                <el-option label="还款时间" value="还款时间"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="single">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="起始时间" v-model="form.date"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="引流平台" v-model="form.platform">
                <el-option label="小米应用" value="小米应用"></el-option>
                <el-option label="华为应用" value="华为应用"></el-option>
                <el-option label="360手机助手" value="360手机助手"></el-option>
                <el-option label="第三方平台甲" value="第三方平台甲"></el-option>
                <el-option label="第三方平台乙" value="第三方平台乙"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="Reset">重置</el-button>
              <el-button type="primary" @click="Search">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="注册时间" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="address" label="手机号" align="center"></el-table-column>
            <el-table-column prop="address" label="身份证号" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="引流平台" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="客户端类型" align="center"></el-table-column>
            <el-table-column prop="address" label="借款次数" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="最后借款时间" align="center"></el-table-column>
            <el-table-column prop="address" label="最后借款金额" align="center"></el-table-column>
            <el-table-column prop="address" label="延期次数/金额" align="center"></el-table-column>
            <el-table-column prop="address" label="最后应还时间" align="center"></el-table-column>
            <el-table-column prop="address" label="逾期天数" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="逾期等级" width="93" align="center"></el-table-column>
            <el-table-column prop="address" label="含逾总利息/应还总金额" width="120" align="center"></el-table-column>
            <el-table-column prop="address" label="查看认证信息" align="center"></el-table-column>
            <el-table-column prop="address" label="操作" width="140" align="center">
              <template slot-scope="scope">
                <el-popover placement="bottom-end" width="300" v-model="visible">
                  <p>确定解冻该用户黑名单吗？</p>
                  <el-button @click="visible = false">返回</el-button>
                  <el-button class="confire" type="success" @click="confire(scope.row)">是的</el-button>
                  <span class="content" slot="reference">解冻黑名单</span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
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
      </el-tab-pane>
      <el-tab-pane label="人工添加黑名单" name="second">
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
            <span>添加黑名单用户</span>
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
      activeName: "second",
      form: {
        name: "",
        input: "",
        time: "",
        date: "",
        platform: ""
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
    clear() {
      this.form = {
        name: "",
        input: "",
        time: "",
        date: "",
        platform: ""
      };
    },
    Reset() {
      this.clear();
    },
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
.content {
  font-size: 1.1rem;
  text-align: center;
  display: block;
  margin-bottom: 15px;
  margin-top: 15px;
}
.confire {
  float: right;
}
.open {
  width: 99.9%;
  line-height: 60px;
  border: 1px solid #eee;
  margin-top: -1px;
  cursor: pointer;
  font-size: 1.2rem;
  text-align: center;
}
</style>
