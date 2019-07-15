<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.name" placeholder="订单编号" style="width:150px">
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="单行输入" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="borrowMoneyWay" label="贷款方式" align="center"></el-table-column>
        <el-table-column prop="borrowTimeLimit" label="还款期数" align="center"></el-table-column>
        <el-table-column prop="orderCreateTime" label="实借时间" align="center"></el-table-column>
        <el-table-column prop="realityBorrowMoney" label="实借总金额" width="120" align="center"></el-table-column>
        <el-table-column prop="deferAfterReturntime" label="延期后应还时间" align="center"></el-table-column>
        <el-table-column prop="overdueNumberOfDays" label="逾期天数" align="center"></el-table-column>
		    <el-table-column prop="overdueGrade" label="逾期等级" align="center"></el-table-column>
		    <el-table-column prop="shouldReapyMoney" label="逾期罚金/含逾应还总金额" width="140" align="center">
           <template scope="scope">
            <span>{{scope.row.interestPenaltySum}}/{{scope.row.order_money}}</span>
          </template>
        </el-table-column>
		    <el-table-column prop="collectionTime" label="分配时间" align="center"></el-table-column>
		    <el-table-column label="用户状态" width="120" align="center">
          <template slot-scope="scope">
                <el-select v-model="scope.row.ismg">
                    <el-option v-for="item in tableDatas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </template>
        </el-table-column>
		    <el-table-column prop="promise_money" label="承诺还清部分金额" align="center"></el-table-column>
		    <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popover placement="bottom-end" width="300" trigger="click">
              <div v-if="show">
                <p>请先选择用户状态，再操作</p>
                <!-- <el-button class="confire" type="success" @click="close(scope.row)">知道了</el-button> -->
              </div>
              <div v-if="hidden">
                <p>该用户的状态可在"已分配已催收"中查看</p>
                <!-- <el-button @click="visible = !visible">返回</el-button> -->
                <el-button class="confire" type="success" @click="confire(scope.row.ismg)">好的</el-button>
              </div>
              <span class="blue" slot="reference" @click="see(scope.row.ismg,scope.row.promise_money,scope.row.orderId)">完成联系</span>
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
import headTop from '../components/headTop'
export default {
  components: {
    		headTop,
	},
	data() {
    return {
      tableData: [{},{}],
      tableDatas: [
        { id: 1, label: "承诺还款", value: "承诺还款" },
        { id: 2, label: "承诺还清一部分", value: "承诺还清一部分" },
        { id: 3, label: "电话无人接听", value: "电话无人接听" },
        { id: 4, label: "态度恶劣", value: "态度恶劣" },
      ],
      form: {
        id: "",
        name: ""
      },
      page: 1,
      pageSize: 10,
      totalPageCount: 0,
      totalCount: 20,
      show: true,
      hidden: false
    };
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.axios.get('collection/FenpeiWeiCollection',{
        params:{
          companyId: "3"
        }
      }).then(res=>{
        this.tableData = res.data.Orderdetails
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
		    id: "",
        name: ""
      }
    },
    Reset(){
      this.clear()
    },
    Search(){
      if(this.form.name == "姓名"){
        this.axios.get('collection/FenpeiWeiCollection',{
          params:{
            companyId: "3",
            name: this.form.id,
          }
        }).then(res=>{
          this.tableData = res.data.Orderdetails
        })
      }else{
        if(this.form.name == "手机号"){
          this.axios.get('collection/FenpeiWeiCollection',{
            params:{
              companyId: "3",
              phone: this.form.id,
            }
          }).then(res=>{
            this.tableData = res.data.Orderdetails
          })
        }else{
          this.axios.get('collection/FenpeiWeiCollection',{
            params:{
              companyId: "3",
              orderNumber: this.form.id,
            }
          }).then(res=>{
            this.tableData = res.data.Orderdetails
          })
        }
      }
    },
    see(ismg) {
      console.log(ismg)
      if (ismg != undefined) {
        this.show = false;
        this.hidden = true;
      } else {
        this.show = true;
        this.hidden = false;
      }
    },
    confire(ismg,promise_money,orderId){
      this.axios.get('collection/AddCollectiondertilas',{
        params:{
          user_type: ismg,
          Collectionmoney: promise_money,
          orderId: orderId
        }
      }).then(res=>{
        this.tableData = res.data.Orderdetails
      })
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
.blue{
  color: blue;
  cursor: pointer;
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
</style>
