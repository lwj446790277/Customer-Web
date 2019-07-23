<template>
    <div>
        <head-top></head-top>
        <table border="0" cellpadding="50" cellspacing="0" class="tableFive">
            <tr>
                <th>选择协议</th>
                <td>
                    <el-radio-group v-model = "selectedValue">
                        <el-radio label="1">关于我们</el-radio>
                        <el-radio label="2">用户协议</el-radio>
                        <el-radio label="3">贷款协议</el-radio>
                        <el-radio label="4">延期协议</el-radio>
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
</template>

<script>
    import headTop from '../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                content: '<h3>文本编辑</h3>',
                selectedValue:{},
                editorOption: {
			        
		        }
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
        methods: {
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		    submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.edit_container{
		padding: 40px;
		margin-bottom: 40px;
	}
	.editer{
		height: 350px;
	}
	.submit_btn{
		text-align: center;
	}
</style>
