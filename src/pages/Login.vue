<template>
  <!--<div :style="{backgroundImage: 'url(../images/bk.jpg)'}">-->
  <el-form  label-position="left" label-width="0px"
           class="demo-ruleForm login-container" >
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane ><login-one></login-one></el-tab-pane>
        <el-tab-pane ><login-one></login-one></el-tab-pane>
        <el-tab-pane ><login-one></login-one></el-tab-pane>
        <el-tab-pane label="登录" name="first"><login-one></login-one></el-tab-pane>
        <el-tab-pane label="注册" name="second"><login-two></login-two></el-tab-pane>
      </el-tabs>
    </div>
    <!--<h3 class="title">登录</h3>-->
    <!--<el-form-item prop="username">-->
      <!--&lt;!&ndash;<el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>&ndash;&gt;-->
      <!--<el-input placeholder="请输入内容" v-model="account.username">-->
        <!--<template slot="prepend">用户名</template>-->
      <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item prop="pwd">-->
      <!--&lt;!&ndash;<el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>&ndash;&gt;-->
      <!--<el-input placeholder="请输入内容" v-model="account.pwd">-->
        <!--<template slot="prepend">密码</template>-->
      <!--</el-input>-->
    <!--</el-form-item>-->
    <!--&lt;!&ndash;<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>&ndash;&gt;-->
    <!--<el-form-item style="width:100%;">-->
      <!--<el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>-->
    <!--</el-form-item>-->
  </el-form>
  <!--</div>-->
</template>

<script>
  //import API from '../api/api_user';
  import LoginOne from '../components/loginOne.vue'
  import LoginTwo from '../components/loginTwo.vue'

  export default {
    components:{LoginOne,LoginTwo},
    data() {
      return {
        img:'../images/bk.jpg',
        loading: false,
        account: {
          username: '',
          pwd: ''
        },
//        rules: {
//          username: [
//            {required: true, message: '请输入账号', trigger: 'blur'},
//            //{ validator: validaePass }
//          ],
//          pwd: [
//            {required: true, message: '请输入密码', trigger: 'blur'},
//            //{ validator: validaePass2 }
//          ]
//        },
        checked: true,
        activeName:''
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  }
</script>
<style>
  body {
    background: #DFE9FB;
  }
</style>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  },
  .center {
    width: 960px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
