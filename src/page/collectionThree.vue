<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
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
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" show-summary style="width: 100%;line-height: 60px">
        <el-table-column prop="time" label="日期" align="center"></el-table-column>
        <el-table-column prop="number" label="累计订单总数" align="center"></el-table-column>
        <el-table-column prop="num" label="累计分配订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="累计承诺还款订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="累计成功订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="累计未还清订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="累计坏账订单数" align="center"></el-table-column>
        <el-table-column prop="address" label="累计催收次数" align="center"></el-table-column>
        <el-table-column prop="ress" label="累计催回率(%)" align="center"></el-table-column>
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
      tableData: [
        { id:1, number: 2, num: 5, ress: "10%" },
        { id:2, number: 2, num: 5, ress: "10%" },
        { id:3, number: 2, num: 5, ress: "10%" },
        { id:4, number: 2, num: 5, ress: "10%" },
      ],
      form: {
        start: "",
        end: "",
        dai: ""
      },
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created(){
    this.getData();
  },  
  methods:{ 
    getData(){
      this.axios.get('collection/CollectionLv',{
        params:{
          companyId: "3"
        }
      }).then(res=>{
        this.tableData = res.data
      })
    },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    clear(){
      this.form = {
		start: "",
		end: "",
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
