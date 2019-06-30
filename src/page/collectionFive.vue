<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="订单编号/姓名/手机号" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="贷款方式" v-model="form.dai">
            <!-- <el-option label="立即贷+分期贷" value="立即贷+分期贷"></el-option> -->
            <el-option label="立即贷" value="立即贷"></el-option>
            <el-option label="分期贷" value="分期贷"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="name" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
        <el-table-column prop="address" label="手机号" align="center"></el-table-column>
        <el-table-column prop="address" label="贷款方式" align="center"></el-table-column>
        <el-table-column prop="address" label="还款期数" align="center"></el-table-column>
        <el-table-column prop="address" label="实借时间" align="center"></el-table-column>
        <el-table-column prop="address" label="实借总金额" width="120" align="center"></el-table-column>
        <el-table-column prop="address" label="应还时间" align="center"></el-table-column>
        <el-table-column prop="address" label="逾期天数" align="center"></el-table-column>
		<el-table-column prop="address" label="逾期等级" align="center"></el-table-column>
		<el-table-column prop="address" label="逾期罚金/含逾应还总金额" width="140" align="center"></el-table-column>
		<el-table-column prop="address" label="分配时间" align="center"></el-table-column>
		<el-table-column prop="address" label="用户状态" align="center"></el-table-column>
		<el-table-column prop="address" label="承诺还清部分金额" align="center"></el-table-column>
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
 
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
		},
		data() {
    return {
      tableData: [],
      form: {
        id: "",
        dai: ""
      },
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  methods:{
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    clear(){
      this.form = {
		id: "",
        dai: ""
      }
    },
    Reset(){
      this.clear()
    },
    Search(){

    }
  }
    }
</script>

<style lang="less">
	@import '../style/mixin';
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
.single{
    margin-left: -15px;
}
</style>
