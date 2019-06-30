<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- <p class="explain_text">风控1</p> -->
    <div class="main">
      <el-table :data="tableData" border style="width: 100%;line-height: 60px">
        <el-table-column prop="id" label="排序" align="center"></el-table-column>
        <el-table-column prop="corporate_name" label="图片" align="center">
          <template>
            <img
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              class="img"
            >
          </template>
        </el-table-column>
        <el-table-column prop="customer_name" label="更新时间" align="center"></el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="删除" align="center">
          <template slot-scope="scope">
            <el-popover placement="bottom-end" width="300" trigger="click">
              <span class="content">确认删除该轮播图吗？</span>
              <el-button class="confire" type="success" @click="confire(scope.row)">是的</el-button>
              <el-button type="danger" slot="reference" @click="delet(scope.row)">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
        <div class="blocks" v-if="block">
          <i class="el-icon-picture"></i>
        </div>
        <img :src="src" v-if="hidden" class="hidden">
        <el-upload class="upload-demo" :on-success="upfileSuccess" action accept=".jpg, .png">
          <el-button size="small" type="primary" class="upload">点击上传</el-button>
          <span>(支持jpg/png格式)</span>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div class="open" @click="centerDialogVisible = true">
        <!-- <i class="el-icon-circle-plus-outline"></i> -->
        <i class="el-icon-plus"></i>
        <span>添加轮播图</span>
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
      tableData: [{ id: 1 }, { id: 2 }],
      fileList: [],
      title: "添加/编辑轮播图",
      centerDialogVisible: false,
      visible: false,
      src: "",
      block: true,
      hidden: false
    };
  },
  methods: {
    upfileSuccess(res) {
      //上传文件成功处理函数
      console.log(res.desc);
      if (res.code == 200) {
        this.block = false;
        this.hidden = true;
        this.src = res.desc;
      } else {
        this.$alert(res.desc, "提示", {
          center: true
        });
      }
    },
    edit(){
      this.centerDialogVisible = true
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
// .explain_text{
// 	margin-top: 20px;
// 	text-align: center;
// 	font-size: 20px;
// 	color: #333;
// }
.main {
  padding: 20px;
}
.img {
  width: 100px;
  height: 60px;
  vertical-align: middle;
  margin: 10px;
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
.el-dialog__title {
  margin-left: 37%;
}
.el-dialog--small {
  width: 30%;
}
.blocks {
  margin: 10px auto;
  width: 70%;
  line-height: 200px;
  background-color: #eee;
  text-align: center;
}
.hidden {
  margin: 10px auto;
  width: 70%;
  height: 200px;
}
i.el-icon-picture {
  font-size: 1.6rem;
}
.upload {
  margin-left: 80px;
  margin-top: 15px;
}
.content{
  font-size: 1.1rem;
  text-align: center;
  display: block;
  margin-bottom: 15px;
  margin-top: 15px;
}
.confire {
  float: right;
}
</style>
