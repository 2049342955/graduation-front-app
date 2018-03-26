<template>
  <el-form ref="UserFrom" :model="user" :rules="rules" >
    <el-form-item prop="name">
      <!--<el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>-->
      <el-input placeholder="请输入用户名" v-model="user.name">
        <template>用户名</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="user.password"  auto-complete="off">
        <template slot="prepend">密码</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="npwd" v-if="user.password!=''">
      <el-input v-model="user.npwd">
        <template slot="prepend">确认密码</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="email">
      <!--<el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>-->
      <el-input placeholder="请输入邮箱" v-model="user.email">
        <template >邮箱</template>
      </el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="loading">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  //import API from '../api/api_user';
  import Fetch from '../api/index'
  export default {
    data() {
      return {
        loading: false,
        user:{},
        rules: {
          name: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
            //{ validator: validaePass }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min:6,max:20,message:'请输入6-20位密码',required:true, trigger: 'blur'},
            {
              validator(ignore,value,callback){
                try{
                  var errors = [];
                  if (!value){
                    callback();
                    return;
                  }
                  //校验密码复杂度
                  if (value.length < 6 || value.length > 20) {
                    errors.push(new Error("密码长度为6-20位"));
                  } else {
                    var count = 0;
                    if (value.match(/([a-z])+/)) {
                      count++;
                    }
                    if (value.match(/([0-9])+/)) {
                      count++;
                    }
                    if (value.match(/([A-Z])+/)) {
                      count++;
                    }
                    if (value.match(/[^a-zA-Z0-9]+/)) {
                      count++;
                    }
                    if (count < 2) {
                      errors.push(new Error("密码必须包括大小写字母、数字、特殊字符中任意两种!"));
                    }
                  }
                  callback(errors);
                }catch(error){
                  callback(error);
                }

              }
            }
          ],
          npwd:[{required: true, message: '请再次输入密码', trigger: 'blur'},
//            {
//              validator(ignore,value,callback){
//                try{
//                  var errors = [];
//                  if (!value){
//                    callback();
//                    return;
//                  }
//                  console.log('aaa',this)
//                  console.log(this[user])
//                  console.log(this.user)
//                  if(value!== this.user.pwd){
//                    errors.push(new Error("密码和密码不一致"));
//                  }
//                  callback(errors);
//                }catch(error){
//                  callback(error);
//                }
//
//              }
            ],
          email:[
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
              validator(ignore,value,callback){
                try{
                  var errors = [];
                  if (!value){
                    callback();
                    return;
                  }
                  if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){
                    errors.push(new Error("不是一个有效的邮箱地址"));
                  }
                  callback(errors);
                }catch(error){
                  callback(error);
                }

              }
            }
          ],
        },
        checked: true,
        activeName:''
      };
    },
    methods: {
      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.name =formObj.name;
        serverObj.nickname = formObj.nickname;
        serverObj.password = formObj.password;
        serverObj.sex = formObj.sex;
        serverObj.age = formObj.age;
        serverObj.email = formObj.email;
        serverObj.status = formObj.status;
        serverObj.phone =  formObj.phone;
        serverObj.headUrl = formObj.headUrl;
        return serverObj;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async handleRegister() {
        let that = this;
        try {
          await new Promise((res, rej) => {
            this.$refs.UserFrom.validate((valid) => {
              if (valid) {
                res();
              } else {
                rej('数据格式不对');
              }
            });
          });

          this.loading = true;
          console.log('bbbb', this.user)
          let params = {name: this.user.name, password: this.user.password, email: this.user.email};
          console.log('aaa', params)

//          await new Promise(
//            function(resolve, reject) {
//              let newUser = this.$api.post('/user/register', this.transServer(params))
//              if (){
//                resolve(value);
//              } else {
//                reject(error);
//              }
//            }
//

        const fetch = Fetch.getFetch();
        let response =  await fetch.post('/api/user/register', this.transServer(params));
        const newUser = response.data.data;
        if(newUser.id && newUser.id != null){
          this.$message({message:'注册成功',type:'success',center: true})
        }else{
          this.$message.error("注册失败，请重新注册");
        }
//          console.log('uuus',newUser)
//          this.$api.post('/api/user/register', this.transServer(params),null,r=>{
//            this.loading = false;
//            newUser = r.data
//            console.log('data',newUser)
////            localStorage.setItem('userInfo',JSON.stringify(user))
////            this.$message({message:'注册成功',type:'success',center: true})
//        })
//          if (user.id && user.id != null) {
//            localStorage.setItem('user', JSON.stringify(user))
//            //console.log()
//            this.$message({message: "注册成功", type: 'success', center: true});
//          } else {
//            //this.$message.error("注册失败，请重新注册");
//          }
        } catch (error) {
          this.$message.error(error);
        }
      }

//        this.$refs.UserFrom.validate((valid) => {
//          if (valid) {
//            res();
//          } else {
//            rej('亲,您输入数据不符合要求,请核对提示验证一下,拜托了!!');
//          }
//          this.loading = true;
//          console.log('bbbb',this.user)
//          let params = {name: this.user.name, password: this.user.password,email:this.user.email};
//          console.log('aaa',params)
//          const user = this.$api.post('/api/user/register',this.transServer(params))
//          this.loading=false;
//          if(user.id !=null){
//            localStorage.setItem('user',JSON.stringify(user))
//            //console.log()
//            this.$message({message:"注册成功",type:'success',center: true});
//          }else{
//            this.$message.error("注册失败，请重新注册");
//          }
//            if(loginParams)
//            API.login(loginParams).then(function (result) {
//              that.loading = false;
//              if (result && result.id) {
//                localStorage.setItem('access-user', JSON.stringify(result));
////                that.$store.commit('SET_ROUTERS', user.permissions)
////                that.$router.addRoutes(that.$store.getters.addRouters);
////                that.$router.options.routes = that.$store.getters.routers;
//                that.$router.push({path: '/'});
//              } else {
//                that.$message.error({showClose: true, message: result.errmsg || '登录失败', duration: 2000});
//              }
//            }, function (err) {
//              that.loading = false;
//              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
//            }).catch(function (error) {
//              that.loading = false;
//              console.log(error);
//              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
//            });
//        });
//      }
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
  }
</style>
