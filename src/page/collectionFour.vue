<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="back">
      <h2>催收员工作报表</h2>
      <div class="main">
        <el-form :model="form" :inline="true" class="demo-form-inline">
          <!-- <el-form-item>
          <el-select v-model="form.time" placeholder="日期" style="width:150px">
            <el-option label="日期" value="日期"></el-option>
          </el-select>
          </el-form-item>-->
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
            <el-select placeholder="催收员姓名" v-model="form.name" @change="change">
              <el-option
                v-for="item in person"
                :key="item.value"
                :label="item.reallyName"
                :value="item.collectionMemberId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="Reset" style="background-color:#e3e4e7;border:transparent;color:#000">重置</el-button>
            <el-button type="primary" @click="Search">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table
          border
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;line-height: 60px"
        >
          <el-table-column prop="collectionTime" label="日期" align="center"></el-table-column>
          <el-table-column prop="reallyName" label="催收员姓名" align="center"></el-table-column>
          <el-table-column prop="collection_count" label="分配订单数" align="center"></el-table-column>
          <el-table-column prop="sameday" label="承诺还款订单数" align="center"></el-table-column>
          <!-- <el-table-column prop="address" label="成功订单数" align="center"></el-table-column> -->
          <el-table-column prop="paymentmade" label="未还清订单数" align="center"></el-table-column>
          <el-table-column prop="connected" label="坏账订单数" align="center"></el-table-column>
          <!-- <el-table-column prop="address" label="催收次数" align="center"></el-table-column> -->
          <el-table-column prop="collNumdata" label="催回率(%)" align="center"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="page"
            :page-size.sync="Pagesize"
            layout="total, prev, pager, next, jumper"
            :page-count="totalPageCount"
            :total="totalCount"
            @size-change="sizeChange"
            @current-change="currentChange"
          ></el-pagination>
        </div>
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
      form: {
        time: "",
        start: "",
        end: "",
        name: ""
      },
      person: [],
      id: "",
      page: 1,
      Pagesize: 10,
      totalPageCount: 0,
      totalCount: 20
    };
  },
  created() {
    this.getData(this.page, this.Pagesize);
  },
  methods: {
    getData(page, Pagesize) {
      this.axios
        .get("collection/CollectionUserLv", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            page,
            Pagesize
          }
        })
        .then(res => {
          this.tableData = res.data.Collections;
          this.page = res.data.Collections.page;
          this.Pagesize = res.data.Collections.Pagesize;
          this.totalCount = res.data.Collections.length;
          // this.totalPageCount = res.data.pageUtil.totalPage
        });

      this.axios
        .get("collection/collectionmember", {
          params: {
            companyId: window.localStorage.getItem("companyid")
          }
        })
        .then(res => {
          this.person = res.data.collection_member;
        });
    },
    sizeChange() {
      //   this.getData(this.page, this.pageSize);
    },
    currentChange() {
      //   this.getData(this.page, this.pageSize);
    },
    clear() {
      this.form = {
        time: "",
        start: "",
        end: "",
        name: ""
      };
    },
    Reset() {
      this.clear();
      this.getData(this.page, this.Pagesize);
    },
    change(id) {
      console.log(id);
      this.id = id;
    },
    Search() {
      this.axios
        .get("collection/CollectionUserLv", {
          params: {
            companyId: window.localStorage.getItem("companyid"),
            start_time: this.form.start,
            end_time: this.form.end,
            collectionMemberId: this.id
            // page: this.page,
            // Pagesize: this.Pagesize
          }
        })
        .then(res => {
          this.tableData = res.data;
        });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.main {
  padding: 20px;
  background-color: #fff;
  min-height: 70vh;
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
