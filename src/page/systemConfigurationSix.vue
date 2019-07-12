<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置6</p> -->
        <div class="main">
                    黑名单分界线: 逾期 <el-input style="width:100px" width="20px"></el-input> 天后 <el-button type="primary">保存</el-button>

            <br/><br/><br/>
            <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                <el-table-column prop="name" label="逾期等级" align="center"></el-table-column>
                <el-table-column prop="name" label="逾期第N天" align="center"></el-table-column>
                <el-table-column prop="address" label="逾期时间段" align="center"></el-table-column>
            </el-table>
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
                tableData: []
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .explain_text {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }

    .main {
        padding: 20px;
    }
</style>
