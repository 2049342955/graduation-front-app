<template>
  <div>
    <el-dialog
      title="拒绝原因"
      :visible.sync="reasonVisible"
      width="80%"
      center>
      <el-form ref="form" :model="reason" label-width="80px" :rules="rules">

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>活动不足</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="20">
                <el-form-item  prop="descripttion">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入活动不足之处,字数100以内"
                    v-model="reason.description">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="warning" icon="el-icon-check" round @click="handleApple">提交</el-button>
          <el-button type="info" icon="el-icon-error" round @click="handleCancle">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'
  import Rule from '../common/lib/reasons-rule'
  export default {
    props: {
      visible: Boolean,
      data: Object
    },
    data() {
      const vm =this;
      return {
        reasonVisible:false,
        copyData:{},
        reason:{
          description:''
        },
        rules:Rule.call(vm, 'form'),
        dialogImageUrl: '',
        dialogVisible: false,

      };
    },
    watch: {
      /**
       * 打开时重置表单，复制数据
       * @param val
       */
      visible(val) {
        this.reasonVisible = val;
        if (val) {
          this.copyData = DeepClone.deepClone(this.data);
          this.action={};
        }
      },
      reasonVisible(val) {
        this.$emit("update:visible", val);
      },
    },
    methods:{
      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.aid =formObj.aid;
        serverObj.approveDate = formObj.approveDate;
        serverObj.status = formObj.status;
        serverObj.description = formObj.description;
        return serverObj;
      },
      handleCancle(){
        this.reasonVisible = false;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      async handleApple(){
        let fetch = Fetch.getFetch();
        let params = {aid:this.copyData.id,status:'2',description:this.reason.description}
        console.log("pp",params);
        let result = await fetch.post('/api/action/actionApprove',this.transServer(params));
        let approve = result.data.data;
        if(result && approve && approve.id){
          this.$message({message:'审核成功',type:'success',center: true})
          this.$emit("remove", this.copyData);
          //this.reasonVisible=false;
        }else{
          this.$message.error("审核失败，请重新尝试");
        }
      },
    },
  }
</script>


<style lang="scss" rel="stylesheet/scss" module>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box{
    margin: 50px 0px 10px 0px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
  }

  .panel {
    transition: all .3s;
    &:hover {
      box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
    }
    &.shawdow {
      box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
    }
    &.margin {
      margin: 4px 100px 4px 100px
    }
  }

  .text{
    height: 300px;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  }
</style>
