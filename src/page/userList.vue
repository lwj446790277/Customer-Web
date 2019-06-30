<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="真实姓名" v-model="form.id" class="input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机号" v-model="form.phone" class="input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="人脸识别认证" v-model="form.face">
            <el-option label="未认证" value="未认证"></el-option>
            <el-option label="认证中" value="认证中"></el-option>
            <el-option label="需要重新认证" value="需要重新认证"></el-option>
            <el-option label="已认证" value="已认证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="个人信息认证" v-model="form.news">
            <el-option label="未认证" value="未认证"></el-option>
            <el-option label="认证中" value="认证中"></el-option>
            <el-option label="需要重新认证" value="需要重新认证"></el-option>
            <el-option label="已认证" value="已认证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="手机运营商认证" v-model="form.mobile">
            <el-option label="未认证" value="未认证"></el-option>
            <el-option label="认证中" value="认证中"></el-option>
            <el-option label="需要重新认证" value="需要重新认证"></el-option>
            <el-option label="已认证" value="已认证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="公积金认证" v-model="form.money">
            <el-option label="未认证" value="未认证"></el-option>
            <el-option label="认证中" value="认证中"></el-option>
            <el-option label="需要重新认证" value="需要重新认证"></el-option>
            <el-option label="已认证" value="已认证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="银行卡数" v-model="form.num">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="芝麻信用认证" v-model="form.credit">
            <el-option label="未认证" value="未认证"></el-option>
            <el-option label="认证中" value="认证中"></el-option>
            <el-option label="需要重新认证" value="需要重新认证"></el-option>
            <el-option label="已认证" value="已认证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="支付宝认证" v-model="form.alipay">
            <el-option label="未认证" value="未认证"></el-option>
            <el-option label="认证中" value="认证中"></el-option>
            <el-option label="需要重新认证" value="需要重新认证"></el-option>
            <el-option label="已认证" value="已认证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="邮箱认证" v-model="form.email">
            <el-option label="未认证" value="未认证"></el-option>
            <el-option label="认证中" value="认证中"></el-option>
            <el-option label="需要重新认证" value="需要重新认证"></el-option>
            <el-option label="已认证" value="已认证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.name" placeholder="时间查询" style="width:150px">
            <el-option label="注册时间" value="注册时间"></el-option>
            <!-- <el-option label="应还时间" value="应还时间"></el-option>
            <el-option label="实还时间" value="实还时间"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始时间" v-model="form.date"></el-date-picker>
          </el-col>
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
        <el-table-column prop="address" label="人脸识别认证" width="130" align="center"></el-table-column>
        <el-table-column prop="address" label="个人信息认证" width="130" align="center"></el-table-column>
        <el-table-column prop="address" label="手机运营商认证" width="140" align="center"></el-table-column>
        <el-table-column prop="address" label="公积金认证" align="center"></el-table-column>
        <el-table-column prop="address" label="应还时间" align="center"></el-table-column>
        <el-table-column prop="address" label="银行卡绑定数（0-2）" align="center"></el-table-column>
        <el-table-column prop="address" label="芝麻信用认证" width="130" align="center"></el-table-column>
        <el-table-column prop="address" label="支付宝认证" align="center"></el-table-column>
        <el-table-column prop="address" label="邮箱认证" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-popover placement="bottom-end" width="300" v-model="visible">
              <el-select placeholder="列入黑名单原因" v-model="value" class="select">
                <el-option label="未认证" value="未认证"></el-option>
                <el-option label="认证中" value="认证中"></el-option>
                <el-option label="需要重新认证" value="需要重新认证"></el-option>
                <el-option label="已认证" value="已认证"></el-option>
              </el-select>
              <el-button @click="visible = false">返回</el-button>
              <el-button class="confire" type="success" @click="confire(scope.row)">添加</el-button>
              <span class="content" slot="reference">添加黑名单</span>
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
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getUserList, getUserCount } from "@/api/getData";
export default {
  data() {
    return {
      form: {
        id: "",
        phone: "",
        face: "",
        news: "",
        mobile: "",
        money: "",
        num: "",
        credit: "",
        alipay: "",
        email: "",
        name: "",
        date: ""
      },
      tableData: [{ id: 1 }],
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20,
      visible: false,
      value: ""
    };
  },
  components: {
    headTop
  },
  created() {
    // this.initData();
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
    confire(){
        this.visible = false
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
.select {
 display: block;
 margin-bottom: 20px;
}
.confire{
    float: right;
}
.content{
    color: blue;
    cursor: pointer;
}
.block {
  padding-top: 20px;
  text-align: center;
}
</style>
