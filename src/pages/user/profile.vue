<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" :loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>基本信息</legend>
          <el-row :gutter="12" style="width: calc(100% - 16px)">
            <el-col :span="10">
              <el-form-item label="用户名" prop="name">
                {{form.name}}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="角色" prop="role">
                {{form.role}}
              </el-form-item>
            </el-col>
          </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="所属学院" prop="college">
                  <el-select v-model="college" placeholder="请选择" @change="handleCollege"  clearable>
                    <el-option
                      v-for="item in colleges"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <div v-if="college">
                <el-col :span="10">
                  <el-form-item prop="major" label="所属专业">
                    <el-select v-model="form.major" placeholder="请选择"   clearable>
                      <el-option
                        v-for="item in majors"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
              <div v-else>
                <el-col :span="10">
                  <el-form-item prop="major" label="所属专业">
                    请先选择学院
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="所属年级" prop="startdate">
                  <el-select v-model="form.startdate" placeholder="请选择"   clearable>
                    <el-option
                      v-for="item in startDates"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="nickName" label="昵称">
                  <el-input v-model="form.nickName" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col align="center">
                <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>联系信息</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item prop="email" label="邮箱">
                  <el-input v-model="form.email" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="phone" label="手机">
                  <el-input v-model="form.phone" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item prop="address" label="住址">
                  <el-input v-model="form.address" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col align="center">
                <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>

        <!--<el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">-->
          <!--<fieldset>-->
            <!--<legend>上传证件</legend>-->
            <!--<el-row :gutter="12" style="width: calc(100% - 16px)">-->
              <!--<el-col :span="8">-->
                <!--&lt;!&ndash;<el-form-item label="礼品封面">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-upload&ndash;&gt;-->
                    <!--&lt;!&ndash;class="avatar-uploader"&ndash;&gt;-->
                    <!--&lt;!&ndash;action=""&ndash;&gt;-->
                    <!--&lt;!&ndash;:show-file-list="false"&ndash;&gt;-->
                    <!--&lt;!&ndash;:auto-upload="false"&ndash;&gt;-->
                    <!--&lt;!&ndash;:on-change="changeFile">&ndash;&gt;-->
                    <!--&lt;!&ndash;<img id="giftImg" v-if="imageUrl" :src="imageUrl" class="avatar">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button v-else slot="trigger" size="small" type="primary">选取文件</el-button>&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-upload>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                <!--<el-form-item prop="headUrl" label="头像">-->
                  <!--<el-upload-->
                    <!--:class="[$style.uploader]"-->
                    <!--action=""-->
                    <!--:show-file-list="false"-->
                    <!--:before-upload="beforeAvatarUpload"-->
                    <!--:on-change="changeFile">-->
                    <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <!--</el-upload>-->
                <!--</el-form-item>-->
                <!--&lt;!&ndash;&lt;!&ndash;<el-form :model="ruleForm"&ndash;&gt;&ndash;&gt;-->
                         <!--&lt;!&ndash;&lt;!&ndash;ref="ruleForm">&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;<el-form-item label="上传文件">&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<el-upload ref="uploada"&ndash;&gt;&ndash;&gt;-->
                               <!--&lt;!&ndash;&lt;!&ndash;action="/api/api/user/upload"&ndash;&gt;&ndash;&gt;-->
                               <!--&lt;!&ndash;&lt;!&ndash;:file-list="fileList">&ndash;&gt;&ndash;&gt;-->
                      <!--&lt;!&ndash;&lt;!&ndash;<el-button size="small"&ndash;&gt;&ndash;&gt;-->
                                 <!--&lt;!&ndash;&lt;!&ndash;type="primary">点击上传</el-button>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;</el-upload>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;</el-form-item>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;<el-form-item>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<el-button type="primary"&ndash;&gt;&ndash;&gt;-->
                               <!--&lt;!&ndash;&lt;!&ndash;@click="submitForm('ruleForm')">导出</el-button>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;</el-form-item>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;</el-form>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<el-form-item label="上传头像">&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;<el-upload&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;class="avatar-uploader"&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;action=""&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;:auto-upload="false"&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;:show-file-list="false"&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;:on-change="changeFile"&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;:before-upload="beforeAvatarUpload">&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<img v-if="imageUrl" :src="imageUrl" class="avatar">&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;</el-upload>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;</el-form-item>&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-col :span="8">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form-item prop="ID1" label="证件正面">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-upload&ndash;&gt;-->
                    <!--&lt;!&ndash;class="avatar-uploader"&ndash;&gt;-->
                    <!--&lt;!&ndash;action="/api/api/user/uploadId1"&ndash;&gt;-->
                    <!--&lt;!&ndash;:show-file-list="false"&ndash;&gt;-->
                    <!--&lt;!&ndash;:before-upload="beforeAvatarUpload"&ndash;&gt;-->
                    <!--&lt;!&ndash;:auto-upload="true"&ndash;&gt;-->
                    <!--&lt;!&ndash;:on-change="changeFile">&ndash;&gt;-->
                    <!--&lt;!&ndash;<img  v-if="imageUrlId1" :src="imageUrlId1" class="avatar">&ndash;&gt;-->
                    <!--&lt;!&ndash;<i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<el-button v-else slot="trigger" size="small" type="primary">选取文件</el-button>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-upload>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-col :span="8">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form-item prop="ID2" label="证件背面">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-upload&ndash;&gt;-->
                    <!--&lt;!&ndash;class="avatar-uploader"&ndash;&gt;-->
                    <!--&lt;!&ndash;action="/api/api/user/uploadId2"&ndash;&gt;-->
                    <!--&lt;!&ndash;:show-file-list="false"&ndash;&gt;-->
                    <!--&lt;!&ndash;:before-upload="beforeAvatarUpload"&ndash;&gt;-->
                    <!--&lt;!&ndash;:auto-upload="true"&ndash;&gt;-->
                    <!--&lt;!&ndash;:on-change="changeFile">&ndash;&gt;-->
                    <!--&lt;!&ndash;<img  v-if="imageUrlId2" :src="imageUrlId2" class="avatar">&ndash;&gt;-->
                    <!--&lt;!&ndash;<i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<el-button v-else slot="trigger" size="small" type="primary">选取文件</el-button>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-upload>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
              <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row>-->
              <!--<el-col align="center">-->
                <!--<el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</fieldset>-->
        <!--</el-card>-->

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>修改密码</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="8">
                <el-form-item prop="oldPassword" label="原密码">
                  <el-input v-model="form.oldPassword" type="password"></el-input>
                </el-form-item>
              </el-col>
              <div v-show="form.oldPassword == this.form.password">
                <el-col :span="8">
                  <el-form-item prop="newPassword" label="新密码">
                    <el-input v-model="form.newPassword" type="password"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="ensure" label="确认">
                    <el-input v-model="form.ensure" type="password"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <el-col align="center">
                <el-button type="primary" @click="handleSavePassword">修改并保存</el-button>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>申请成为会长</legend>
            <div v-show="!this.approveLoad">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="请勿恶意使用">
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="10">
                      <el-form-item prop="corporation" label="社团名称">
                        <el-select v-model="corporation" placeholder="请选择"   clearable>
                          <el-option
                            v-for="item in corporations"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12" style="width: calc(100% - 16px);margin-bottom: 20px;margin-left: 5px">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入申请缘由,字数100以内"
                      v-model="reasons">
                    </el-input>
                  </el-row>

                  <el-row>
                    <el-col align="center">
                      <el-button type="primary" @click="handleApprove">修改并保存</el-button>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div v-if="this.approveLoad" style="margin-left: 260px">
              <el-steps :space="200" :active="1" finish-status="success">
                <el-step title="已提交"></el-step>
                <el-step title="审批中"></el-step>
                <el-step title="审批成功"></el-step>
              </el-steps>
            </div>
          </fieldset>
        </el-card>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import Axios from 'axios';
  import EditableItem from './editable-item.js'
  import Upload from './../../../src/common/lib/upload'
  import Fetch from './../../api/index'
  import Rule from './../../common/lib/profile-rule'
  import lrz from './../../common/lib/lrz'
  export default {
    components: {
      EditableItem,Upload
    },
    data() {
      const vm = this;
      return {
        loading: false,
        form: {
          useranme: '',
          nickname: '',
          name: '',
          email: '',
          major:'',
          startdate:'',
          phone:'',
          address:'',
          oldPassword:'',
          newPassword:'',
          ensure:'',
        },
        rules: Rule.call(vm, 'form'),
        college:'',
        colleges:[],
        majors:[],
        corporations:[],
        corporation:'',
        reasons:'',
        activeNames:[''],
        startDates:[{lable:'2014',value:'2014'},{lable:'2015',value:'2015'},{lable:'2016',value:'2016'},{lable:'2017',value:'2017'}],
        approveLoad:false,
        imageUrl:'',
        imageUrlId1:'',
        imageUrlId2:'',
        ruleForm:{},
        fileList: [],
        my:'/api/user/upload',
      }
    },
//    watch:{
//      async college(val){
//        if(val){
//          this.loadMajor();
//        }
//      }
//    },

    methods: {

      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.name =formObj.name;
        serverObj.nickName = formObj.nickName;
        serverObj.password = formObj.password;
        serverObj.email = formObj.email;
        serverObj.college = formObj.college;
        serverObj.major = formObj.major;
        serverObj.startdate = formObj.startdate;
        serverObj.address = formObj.address;
        serverObj.status = formObj.status;
        serverObj.phone =  formObj.phone;
        serverObj.headUrl = formObj.headUrl;
        return serverObj;
      },
      transPassword(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.name =formObj.name;
        serverObj.nickName = formObj.nickName;
        serverObj.password = formObj.newPassword;
        serverObj.email = formObj.email;
        serverObj.college = formObj.college;
        serverObj.major = formObj.major;
        serverObj.startdate = formObj.startdate;
        serverObj.address = formObj.address;
        serverObj.status = formObj.status;
        serverObj.phone =  formObj.phone;
        serverObj.headUrl = formObj.headUrl;
        return serverObj;
      },

      transApprove(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.uid =formObj.uid;
        serverObj.cid =formObj.cid;
        serverObj.status = formObj.status;
        serverObj.description = formObj.reasons;
        return serverObj;
      },

      handleChange(val) {
        console.log(val);
      },

      async loadCollege(){
        let fetch = Fetch.getFetch();
        const result = await fetch.get('/api/college/list');
        let colleges = result.data.data;
        this.colleges = (colleges ||[]).map(college => {
          return {
            value: college.id,
            label: college.name
          }
        });
      },

      async loadMajor(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/major/list',{params:{parentId:this.college}});
        let majors = result.data.data;
        this.majors = (majors||[]).map(major=>{
          return {
            value:major.id,
            label:major.name
          }
        })
      },

      async loadCorporation(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/corporation/list');
        let corporations = result.data.data;
        this.corporations = (corporations||[]).map(corporation=>{
          return {
            value:corporation.id,
            label:corporation.name
          }
        })
      },

      async handleCollege(){
        this.form.major='';
        this.loadMajor();
      },
      async handleSaveProfile() {
        this.form.college = this.college;
        const fetch = Fetch.getFetch();
        const result = await fetch.post('/api/user/save',this.transServer(this.form))
        let user = result.data.data;
        if(result && user && user.id){
          this.$message({message:'保存成功',type:'success',center: true})
          sessionStorage.setItem('user',JSON.stringify(user))
        }else{
          this.$message.error("修改失败，请重新尝试");
        }
      },

      async handleSavePassword(){
        this.form.college = this.college;
        const fetch = Fetch.getFetch();
        const result = await fetch.post('/api/user/save',this.transPassword(this.form))
        let user = result.data.data;
        if(result && user && user.id){
          this.$message({message:'保存成功',type:'success',center: true})
          sessionStorage.setItem('user',JSON.stringify(user))
          this.$router.push('/login')
        }else{
          this.$message.error("修改失败，请重新尝试");
        }
      },

      async handleApprove(){
        let fetch = Fetch.getFetch();
        let params = {uid:this.form.id,cid:this.corporation,reasons:this.reasons}
        const result = await fetch.post('/api/chairmanApprove/save',this.transApprove(params))
        let user = result.data.data;
        if(result && user && user.id){
          this.$message({message:'保存成功',type:'success',center: true})
          this.approveLoad=true;
          let user = JSON.parse(sessionStorage.getItem('user'));
          user.status=1;
          sessionStorage.setItem('user',JSON.stringify(user));
        }else{
          this.$message.error("修改失败，请重新尝试");
        }

      },
      async laodStatus(user){
        let fetch = Fetch.getFetch();
        let params = {id:user.id}
        const result = await fetch.get('/api/user/selectOne',{params:params})
        let newUser = result.data.data;
        if(result && newUser && newUser.status =='0'){
          this.approveLoad=0
        }
      },

      async beforeAvatarUpload(file) {
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
      async handleFileUpload() {
        const fetch = Axios.create({baseURL:'/api/', timeout:1000*20});
        fetch.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        const sel = this;
        const file = sel.file;
        console.log('aaaafile',file);
        //let temp = lrz(file, {width: 1000, quality: 0.3});
        let form = new FormData();
        form.append('file', sel.file);
        form.append('newName', 'aaa');
//        form
        console.log('form',form)
        //let fetch = Fetch.getFetch();
        let result = await fetch.post('/api/user/upload', form)
        if(result && result!=null){
          this.$message({message: "上传成功", type: 'success'});
        }
//            sel.request({act: 'uploadHeadImg', method: 'post', body: form}).then(datas => {
//              if (datas.code == 0){
//                sel.setSessionStorage({key: 'head_img', data: datas.data});
//                sel.$message({message: datas.msg, type: 'success'});
//              } else {
//                this.$message.error(datas.msg+',code:'+datas.code);
//              }
      },
      submitForm (formName) {
        //包含上传的文件信息和服务端返回的所有信息都在这个对象里
        this.$refs.uploada.uploadFiles
      },
      changeFile(file, fileList) {
        var This = this;
        console.log('file',file)
        this.imageUrl = URL.createObjectURL(file.raw);
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
          this.result // 这个就是base64编码了
          console.log('base',this.result);
          This.imageUrl = this.result;
        }
      }

    },
     mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.form.useranme = user.name;
        this.form.nickName = user.nickName || '';
        this.form.email = user.email || '';
        this.form.name = user.name || '';
        this.form.id = user.id;
        this.form.phone = user.phone;
        this.college = user.college;
        this.form.major = user.major;
        this.form.address = user.address;
        this.form.startdate = user.startdate;
        this.form.password = user.password;
        this.loadCollege();
        this.loadMajor();
        this.loadCorporation();
        this.form.role ="";
        let arr=user.roles||[];
        for(let i =0;i<arr.length;i++){
          if(i== arr.length-1){
            this.form.role+=arr[i].roleName;
          }else{
            this.form.role+=arr[i].roleName+",";
          }
        }
        this.approveLoad = user.status == "1"?true:false;
        this.laodStatus(user);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" module>
  .wrapper {
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

  .uploader{
    &.avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    &.avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    &.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    &.avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }


</style>
