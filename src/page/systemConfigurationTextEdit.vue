<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!-- <p class="explain_text">系统配置4</p> -->
        <div class="back">
            <h2>协议编辑</h2>
            <div class="main">
                <table border="0" cellpadding="50" cellspacing="0" class="tableFive">
                    <tr>
                        <th>选择协议</th>
                        <td>
                            <el-radio-group v-model="selectedId" @change="selectedChange">
                                <el-radio
                                    v-for="(text, index) in textList"
                                    :label="text.id"
                                >{{text.agreementtype}}
                                </el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                </table>
                <div class="edit_container">
                    <quill-editor v-model="content"
                                  ref="myQuillEditor"
                                  class="editer"
                                  :options="editorOption"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                </div>
                <div class="submit_btn">
                    <el-button type="primary" @click="submit">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {quillEditor} from 'vue-quill-editor'
    import qs from 'qs'

    export default {
        data() {
            return {
                textList: [],
                content: '',
                contentId: '',
                selectedId: undefined,
                editorOption: {},
            }
        },
        components: {
            headTop,
            quillEditor,
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        beforeCreate() {
            var that = this;
            that.axios.get('/editagreement/queryAll', {
                params: {companyId: window.localStorage.getItem("companyid")}
            }).then(res => {
                that.textList = res.data;
            })
        },
        methods: {
            selectedChange(id) {
                var that = this;
                that.axios.get('/editagreement/selectByPrimaryKey', {
                    params: {typeid: id}
                }).then(res => {
                    that.content = res.data.agreementcontent;
                    that.contentId = res.data.id;
                })
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            submit() {
                console.log(this.content);
                var that = this;
                that.axios.post('/editagreement/updateByPrimaryKeyWithBLOBs',
                    qs.stringify({id: that.contentId, agreementcontent: that.content})
                    , {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res => {
                    this.$message.success('修改成功');
                })
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .edit_container {
        padding: 40px;
        margin-bottom: 40px;
    }

    .editer {
        height: 350px;
    }

    .submit_btn {
        background-color: white;
        text-align: center;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }
</style>
