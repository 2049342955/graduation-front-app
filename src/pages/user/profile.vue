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
              <el-form-item label="用户名" prop="number">
                <el-input v-model="form.useranme" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="nickname" label="昵称">
                <el-input v-model="form.nickname" suffix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="所属学院" prop="college">
                  <el-input v-model="form.college"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="major" label="所属专业">
                  <el-input v-model="form.major" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="入学时间" prop="startDate">
                  <el-input v-model="form.startDate"></el-input>
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
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="phone" label="手机">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item prop="address" label="住址">
                  <el-input v-model="form.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="phone" label="手机">
                  <el-input v-model="form.phone"></el-input>
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
            <legend>上传头像</legend>
            <upload></upload>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>修改密码</legend>
          </fieldset>
        </el-card>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import EditableItem from './editable-item.js'
  import Upload from './../../../src/common/lib/upload'
  export default {
    components: {
      EditableItem,Upload
    },
    data() {
      return {
        loading: false,
        form: {
          useranme: '',
          nickname: '',
          name: '',
          email: ''
        },
        rules: {
          nickname: [
            {message: '请输入昵称', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ]
        },
      }
    },
    methods: {
      handleSaveProfile() {
//        let that = this;
//        that.$refs.form.validate((valid) => {
//          if (valid) {
//            that.loading = true;
//            let args = {
//              nickname: that.form.nickname,
//              name: that.form.name,
//              email: that.form.email
//            };
//            API.changeProfile(args).then(function (result) {
//              that.loading = false;
//              if (result && parseInt(result.errcode) === 0) {
//                //修改成功
//                let user = JSON.parse(window.localStorage.getItem('access-user'));
//                user.nickname = that.form.nickname;
//                user.name = that.form.name;
//                user.email = that.form.email;
//                localStorage.setItem('access-user', JSON.stringify(user));
//                bus.$emit('setNickName', that.form.nickname);
//                that.$message.success({showClose: true, message: '修改成功', duration: 2000});
//              } else {
//                that.$message.error({showClose: true, message: result.errmsg, duration: 2000});
//              }
//            }, function (err) {
//              that.loading = false;
//              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
//            }).catch(function (error) {
//              that.loading = false;
//              console.log(error);
//              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
//            });
//          }
//        });
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.form.useranme = user.username;
        this.form.nickname = user.nickname || '';
        this.form.email = user.email || '';
        this.form.name = user.name || '';
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
</style>
