<template>
  <div>
    <el-dialog
      title="申请活动"
      :visible.sync="approveVisible"
      width="80%"
      center>
      <el-form ref="form" :model="action" label-width="80px" :rules="rules">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>活动详情</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="举办方" prop="holder">
                  {{copyData.name}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="活动名" prop="actionName">
                  <el-input v-model="action.actionName" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="举办地" prop="address">
                  <el-input v-model="action.address" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="举办时间" prop="startdate">
                  <el-date-picker
                    v-model="action.startdate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="options">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="终止时间" prop="enddate">
                  <el-date-picker
                    v-model="action.enddate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="options">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>活动概述</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="20">
                <el-form-item  prop="summary">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入活动概述,字数50以内"
                    v-model="action.summary">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>活动内容</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="20">
                <el-form-item  prop="content">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入活动内容,字数100以内"
                    v-model="action.content">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>活动海报</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="20">
                <el-form-item  prop="content">
                  <el-upload
                    action="/api/api/user/upload"
                    list-type="picture-card"
                    :auto-upload="true"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="warning" icon="el-icon-check" round @click="handleApple">申请</el-button>
          <el-button type="info" icon="el-icon-error" round @click="handleCancle">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'
  import Rule from '../common/lib/action-approve-rule'
  import Axios from 'axios';

  export default {
    props: {
      visible: Boolean,
      data: Object
    },
    data() {
      const vm =this;
      return {
        approveVisible:false,
        copyData:{},
        action:{
          actionName:'',
          startdate:'',
          enddate:'',
          summary:'',
          content:'',
        },
        rules:Rule.call(vm, 'form'),
        options:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        User:{},

      };
    },
    watch: {
      /**
       * 打开时重置表单，复制数据
       * @param val
       */
      visible(val) {
        this.approveVisible = val;
        if (val) {
          this.copyData = DeepClone.deepClone(this.data);
          this.action={};
        }
      },
      approveVisible(val) {
        this.$emit("update:visible", val);
      },
    },
    methods:{
      transServer(formObj){
        const serverObj ={};
        serverObj.id = formObj.id;
        serverObj.actionName =formObj.actionName;
        serverObj.holder = formObj.holder;
        serverObj.address = formObj.address;
        serverObj.summary = formObj.summary;
        serverObj.content = formObj.content;
        serverObj.startdate = formObj.startdate;
        serverObj.enddate = formObj.enddate;
        return serverObj;
      },
      handleCancle(){
        this.approveVisible = false;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log('url',this.dialogImageUrl)
      },
      beforeAvatarUpload(file) {
        console.log(file);
        let sel = this;
        this.file = file;
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      async handleUpload(){
        let fetch = Axios.create({baseURL:'/api/', timeout:1000*20,headers:{'Authorization': this.user.id}});
        let form = new FormData();
        const result = await fetch.post('/api/user/upload',this.transServer(this.action))

      },
     async handleApple(){
        this.action.holder=this.copyData.name;
        console.log('action',this.action);
        const fetch = Fetch.getFetch();
        const result = await fetch.post('/api/action/save',this.transServer(this.action))
        let user = result.data.data;
        if(result && user && user.id){
          this.$message({message:'保存成功',type:'success',center: true})
          //sessionStorage.setItem('user',JSON.stringify(user))
          this.approveVisible = false;
        }else{
          this.$message.error("修改失败，请重新尝试");
        }
      },
    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.user=user;
        console.log('user',this.user);
      }
    }
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
