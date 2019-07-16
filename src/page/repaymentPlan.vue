<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="main">
      <el-form :model="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="form.name" placeholder="还款流水号" style="width:150px">
            <el-option label="还款流水号" value="还款流水号"></el-option>
            <el-option label="订单编号" value="订单编号"></el-option>
            <el-option label="姓名" value="姓名"></el-option>
            <el-option label="手机号" value="手机号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="single">
          <el-input placeholder="单行输入" v-model="form.input"></el-input>
        </el-form-item>
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
          <el-select v-model="form.qudao" placeholder="还款渠道" style="width:150px" @change="change">
            <el-option v-for="item in Thirdparty_interface" :key="item.value" :label="item.repaymentSource" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="Reset">重置</el-button>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="remittanceTime" label="流水号时间" align="center"></el-table-column>
        <el-table-column prop="loanSource" label="还款渠道" align="center"></el-table-column>
        <el-table-column prop="pipelinenumber" label="还款流水号" align="center"></el-table-column>
        <el-table-column prop="paymentmoney" label="还款金额" align="center"></el-table-column>
        <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <!-- <el-table-column prop="address" label="操作" align="center"></el-table-column> -->
      </el-table>
      <div class="block">
        <el-pagination
          :current-page.sync="page"
          :page-sizes="[10, 15, 20, 25]"
          :page-size.sync="Pagesize"
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
      tableData: [],
      Thirdparty_interface: [],
      id: "",
      form: {
        name: "",
        input: "",
        start: "",
        end: "",
        qudao: ""
      },
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created(){
    this.get()
    this.getData(this.page,this.Pagesize)
  },
  methods: {
    get(){
				this.axios.get('fina/ThirdpatyAll',{
					params:{
						compayId: "3"
					}
				}).then(res=>{
					this.Thirdparty_interface = res.data.Thirdparty_interface
				})
			},
    getData( page, Pagesize ){
      this.axios.get('fina/HuanKuan',{
        params:{
          companyId: "3",
          // page,
          // Pagesize
        }
      }).then(res=>{
        this.tableData = res.data.Repayment
      })
    },
    change(id){
      console.log(id)
      let selectedWorkName = {};
      this.id = id
      selectedWorkName = this.Thirdparty_interface.find((item)=>{//这里的chargingWorkNameList就是上面遍历的数据源
         return item.id === this.id;
         //筛选出匹配数据，是对应数据的整个对象
      })
    },
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
        start: "",
        end: "",
        qudao: ""
      };
    },
    Reset() {
      this.clear();
    },
    Search() {
      if(this.form.name == "手机号"){
        this.axios.get('fina/HuanKuan',{
          params:{
            // companyId: "3",
            phone: this.form.input,
            start_time: this.form.start,
            end_time: this.form.end,
            thirdparty_id: this.id
          }
        }).then(res=>{
          this.tableData = res.data.Repayment
        })
      }else{
        if(this.form.name == "订单编号"){
          this.axios.get('fina/HuanKuan',{
            params:{
              // companyId: "3",
              orderNumber: this.form.input,
              start_time: this.form.start,
              end_time: this.form.end,
              thirdparty_id: this.id
            }
          }).then(res=>{
            this.tableData = res.data.Repayment
          })
        }else{
          if(this.form.name == "姓名"){
            this.axios.get('fina/HuanKuan',{
              params:{
                // companyId: "3",
                name: this.form.input,
                start_time: this.form.start,
                end_time: this.form.end,
                thirdparty_id: this.id
              }
            }).then(res=>{
              this.tableData = res.data.Repayment
            })
          }else{
            this.axios.get('fina/HuanKuan',{
              params:{
                // companyId: "3",
                pipelinenumber: this.form.input,
                start_time: this.form.start,
                end_time: this.form.end,
                thirdparty_id: this.id
              }
            }).then(res=>{
              this.tableData = res.data.Repayment
            })
          }
        }
      }
      
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
</style>
