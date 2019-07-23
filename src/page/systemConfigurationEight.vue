<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- <p class="explain_text">渠道预设和紧急设置</p> -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="流量和放款渠道预设" name="first">
        <div class="back">
          <h2>流量和放款渠道预设</h2>
          <div class="main">
            <el-tabs v-model="active" type="card" @tab-click="handleClick">
              <el-tab-pane label="流量渠道最大阈值" name="first">
                <!-- <h3>流量渠道最大阈值</h3>
                <hr /> -->
                <table cellpadding="30" cellspacing="0" class="tab-le">
                  <tr>
                    <th>当天uv数</th>
                    <td>
                      <el-input v-model="today"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <th>日均uv数</th>
                    <td>
                      <el-input v-model="average"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <th>每天uv最大阈值</th>
                    <td>
                      <el-input v-model="every"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <th>阈值最大说明</th>
                    <td class="explain">
                      1.当天和日均UV数是阈值设置的参考
                      2.建议UV高峰期后再设置该阈值,否则若设置的阈值≤今天的UV数,今天的渠道将强制关闭.
                      3.若每天的当天UV数=阈值最大值时,当天的所有后续用户将不能在所有渠道中注册手机号.
                      4.若阈值=0,则关闭该设置
                      5.若阈值≥0,该设置会每天循环生效
                    </td>
                  </tr>
                </table>
              </el-tab-pane>
              <el-tab-pane label="放款渠道最大阈值" name="second">
                <table cellpadding="30" cellspacing="0" class="tab-le">
                  <tr>
                    <th>当天已放款金额</th>
                    <td>
                      <el-input v-model="today"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <th>日均放款金额</th>
                    <td>
                      <el-input v-model="average"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <th>每天放款最大阈值</th>
                    <td>
                      <el-input v-model="every"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <th>阈值最大说明</th>
                    <td class="explain">                  
                      1.当天和日均已放款金额是阈值设置的参考
                      2.建议借款高峰期后再设置该阈值,否则若设置的阈值≤今天的已放款金额,今天的放款渠道将强制关闭.
                      3.若每天的当天已放款金额=阈值最大值时,当天的所有后续用户将不能借款,次日才能借款.
                      4.若阈值=0,则关闭该设置
                      5.若阈值≥0,该设置会每天循环生效
                    </td>
                  </tr>
                </table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="放款渠道紧急开关" name="second">
        <div class="back">
          <h2>放款渠道紧急开关</h2>
          <div class="main">
            <table cellpadding="40" cellspacing="0" class="tab-two">
              <tr>
                <th>当天已放款金额</th>
                <td>
                  <el-input v-model="today" style="width:60%"></el-input>
                </td>
              </tr>
              <tr>
                <th>放款渠道开关状态</th>
                <td>
                  <el-select v-model="type" placeholder="已开启" style="width:60%">
                    <el-option label="开启" value="0"></el-option>
                    <el-option label="关闭" value="1"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <th>阈值最大说明</th>
                <td class="explain">                                  
                  1.紧急开关是放款渠道产生数据异常的紧急按钮,所以正常运营时谨慎关闭.
                  2.紧急开关是放款渠道最大阈值的全局设置,也就是说紧急关闭后,最大阈值将失效.
                  3.开启和禁用每天都循环生效
                </td>
              </tr>
            </table>
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
      activeName: "first",
      active: "first",
      today: "",
      average: "",
      every: "",
      type: ""
    };
  },
  beforeCreate() {},
  methods: {
    handleClick(){

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
.el-tabs__header {
  margin: 0;
}
h3 {
  width: 100%;
  color: #999;
  font-weight: 500;
}
hr {
  border-color: #eee;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 2%;
}
.tab-le {
  width: 50%;
  margin-left: 5%;
}
.tab-le th {
  text-align: left;
  width: 40%;
  color: #707070;
}
.tab-le td {
  padding-left: 0;
}
.tab-le td .el-input .el-input__inner {
  width: 60%;
  background-color: #f3f6fb;
}
.explain {
  background-color: #f3f6fb;
  padding:10px;
}
.tab-two{
  width: 50%;
  margin-left: 5%;
}
.tab-two th {
  text-align: left;
  width: 40%;
  color: #707070;
}
.tab-two td {
  padding-left: 0;
}
.tab-two td .el-input .el-input__inner {
  background-color: #f3f6fb;
}
</style>
