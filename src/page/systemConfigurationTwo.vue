<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- <p class="explain_text">系统配置2</p> -->
    <div class="back">
      <h2>第三方接口設置</h2>
      <div class="main">
        <table border="0" cellpadding="30" cellspacing="0" class="tableTwo">
          <tr>
            <th>身份证及人脸认证</th>
            <td>
              <el-select v-model="editObject.idcardfaceauthentication">
                <el-option v-for="face in facelist" :label="face.name" :value="face.name"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <th>运营商认证</th>
            <td>
              <el-select v-model="editObject.operatorsauthentication">
                <el-option v-for="opera in operalist" :label="opera.name" :value="opera.name"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <th>借款渠道</th>
            <td>
              <el-checkbox-group v-model="editObject.loansource">
                <el-checkbox
                  v-for="(loan, index) in loanlist"
                  :label="loan.name"
                  :value="loan.name"
                ></el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <th>收款渠道</th>
            <td>
              <el-checkbox-group v-model="editObject.repaymentsource">
                <el-checkbox
                  v-for="(repay, index) in repaylist"
                  :label="repay.name"
                  :value="repay.name"
                ></el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <center>
                <el-button type="primary" @click="save()" style="background:#396fff">保存</el-button>
              </center>
            </td>
          </tr>
        </table>
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
      editObject: { loansource: [], repaymentsource: [] },
      facelist: [],
      operalist: [],
      loanlist: [],
      repaylist: []
    };
  },
  beforeCreate() {
    var that = this;
    that.axios
      .get("/thirdpartyint/queryAllCompany", {
        params: { companyId: window.localStorage.getItem("companyid") }
      })
      .then(res => {
        that.facelist = res.data.facelist;
        that.operalist = res.data.operalist;
        that.loanlist = res.data.loanlist;
        that.repaylist = res.data.repaylist;
        that.axios
          .get("/thirdpartyint/queryAll", {
            params: { companyId: window.localStorage.getItem("companyid") }
          })
          .then(res => {
            that.editObject = res.data[0];
            that.editObject.loansource = that.editObject.loansource.split(",");
            that.editObject.repaymentsource = that.editObject.repaymentsource.split(
              ","
            );
          });
      });
  },
  methods: {
    Search() {
      var that = this;
      that.axios
        .get("/thirdpartyint/queryAllCompany", {
          params: { companyId: window.localStorage.getItem("companyid") }
        })
        .then(res => {
          that.facelist = res.data.facelist;
          that.operalist = res.data.operalist;
          that.loanlist = res.data.loanlist;
          that.repaylist = res.data.repaylist;
          that.axios
            .get("/thirdpartyint/queryAll", {
              params: { companyId: window.localStorage.getItem("companyid") }
            })
            .then(res => {
              that.editObject = res.data[0];
              that.editObject.loansource = that.editObject.loansource.split(
                ","
              );
              that.editObject.repaymentsource = that.editObject.repaymentsource.split(
                ","
              );
            });
        });
    },
    save() {
      var that = this;
      var param = {};
      param.id = that.editObject.id;
      param.companyid = that.editObject.companyid;
      param.idcardfaceauthentication = that.editObject.idcardfaceauthentication;
      param.operatorsauthentication = that.editObject.operatorsauthentication;
      param.loansource = that.editObject.loansource.join(",");
      param.repaymentsource = that.editObject.repaymentsource.join(",");
      that.axios
        .get("/thirdpartyint/updateByPrimaryKey", {
          params: param
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          that.Search();
        });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";

.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}

.main {
  padding: 20px;
  background-color: #fff;
}

.tableTwo {
  margin: 20px 10%;
  width: 65%;
  border-color: #dfe6ec;
}

.tableTwo th {
  width: 40%;
}

.tableTwo td {
  padding-left: 10%;
  text-align: left;
}

.el-select .el-input__inner {
    background-color: #f3f6fb;
}
</style>
