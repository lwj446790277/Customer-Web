<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.time" placeholder="订单时间" style="width:150px">
            <el-option label="订单时间" value="订单时间"></el-option>
            <el-option label="延借时间" value="延借时间"></el-option>
            <el-option label="延期后应还" value="延期后应还"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="起始时间" v-model="form.start"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="single">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束时间" v-model="form.end"></el-date-picker>
          </el-col>
        </el-form-item>
		    <el-form-item>
          <el-select placeholder="催收员姓名" v-model="form.name">
            <el-option label="立即贷+分期贷" value="立即贷+分期贷"></el-option>
            <el-option label="立即贷" value="立即贷"></el-option>
            <el-option label="分期贷" value="分期贷"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%;line-height: 60px">
        <el-table-column prop="name" label="日期" align="center"></el-table-column>
        <el-table-column prop="name" label="催收员姓名" align="center"></el-table-column>
        <el-table-column prop="address" label="分配订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="承诺还款订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="成功订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="未还清订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="坏账订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="催收次数" align="center"></el-table-column>
        <el-table-column prop="address" label="催回率(%)" align="center"></el-table-column>
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
        time: "",
        start: "",
		    end: "",
		    name: ""
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
		    time: "",
        start: "",
		    end: "",
		    name: ""
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
