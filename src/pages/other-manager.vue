<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item>
        <el-breadcrumb-item>其他</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>


    <el-col :span="24" class="warp-main">
      <el-form  label-width="80px" ref="not" :model="notice" :rules="secondRules">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>发布公告</legend>
            <div style="padding: 14px;">
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="notice.title" suffix-icon="el-icon-edit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="内容" prop="message">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入公告内容,字数100以内"
                      v-model="notice.message">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <span slot="footer" class="dialog-footer">
                <el-button type="warning" icon="el-icon-check" round @click="handleNotice">发布</el-button>
              </span>
            </div>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>添加新社团</legend>
            <div style="padding: 14px;">
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="corporation.name" suffix-icon="el-icon-edit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="级别">
                    <el-switch
                      v-model="corporation.isSchool"
                      active-text="校级组织"
                      inactive-text="院级组织">
                    </el-switch>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="创始人" prop="createdby">
                    <el-input v-model="corporation.createdby" suffix-icon="el-icon-edit"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="24">
                  <el-form-item label="宗旨" prop="aim">
                    <el-input v-model="corporation.aim" type="textarea"
                              autosize
                              placeholder="请输入公告内容,字数100以内"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="描述" prop="description">
                    <el-input v-model="corporation.description" type="textarea"
                              autosize
                              placeholder="请输入公告内容,字数100以内"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <span slot="footer" class="dialog-footer">
                <el-button type="warning" icon="el-icon-check" round @click="handleCorporation">添加</el-button>
              </span>
            </div>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>更换首页图片</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="8">
                <el-form-item  prop="content">

                  <el-upload
                    class="avatar-uploader"
                    action="/api/api/user/uploadHome"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :auto-upload="true"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100px" height="100px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  prop="content">
                  <!--<el-upload-->
                    <!--action="/api/api/user/uploadHome1"-->
                    <!--list-type="picture-card"-->
                    <!--:auto-upload="true"-->
                    <!--:before-upload="beforeAvatarUpload"-->
                    <!--:on-remove="handleRemove">-->
                    <!--<i class="el-icon-plus"></i>-->
                  <!--</el-upload>-->
                  <!--<el-dialog :visible.sync="dialogVisible">-->
                    <!--<img width="100%" :src="dialogImageUrl1" alt="">-->
                  <!--</el-dialog>-->
                  <el-upload
                    class="avatar-uploader"
                    action="/api/api/user/uploadHome1"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess1"
                    :auto-upload="true"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar" width="100px" height="100px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  prop="content">
                  <!--<el-upload-->
                    <!--action="/api/api/user/uploadHome2"-->
                    <!--:auto-upload="true"-->
                    <!--:before-upload="beforeAvatarUpload"-->
                    <!--:on-remove="handleRemove">-->
                    <!--<i class="el-icon-plus"></i>-->
                  <!--</el-upload>-->
                  <!--<el-dialog :visible.sync="dialogVisible">-->
                    <!--<img width="100%" :src="dialogImageUrl2" alt="">-->
                  <!--</el-dialog>-->
                  <el-upload
                    class="avatar-uploader"
                    action="/api/api/user/uploadHome2"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :auto-upload="true"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar" width="100px" height="100px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>


        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>快速检索</legend>
            <div style="padding: 14px;">
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="检索">
                    <el-input v-model="keyStrings" suffix-icon="el-icon-edit" @keyup.enter.native="handleSelect"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-show="searchs">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="活动" name="1" v-show="actionsData && actionsData.length>0">
                  <el-table
                    :data="actionsData"
                    style="width: 100%">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-row :gutter="12" style="width: calc(100% - 16px)">
                            <el-col :span="24">
                              <el-form-item label="活动概述">
                                <span style="color: #e68a00" class="tt">{{ props.row.summary }}</span>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row :gutter="12" style="width: calc(100% - 16px)">
                            <el-col :span="24">
                              <el-form-item label="活动内容">
                                <span style="color: darkseagreen;font-size: smaller" class="tt">{{ props.row.content }}</span>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row :gutter="12" style="width: calc(100% - 16px)">
                            <el-col :span="24">
                              <el-button type="info" icon="el-icon-edit" round @click.native.prevent="handleRead(props.row)">详情</el-button>
                            </el-col>
                          </el-row>

                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="举办方"
                      prop="holder"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="活动名"
                      prop="actionName"
                      width="400">
                    </el-table-column>
                    <el-table-column
                      label="举办地"
                      prop="address"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      label="举办时间"
                      prop="startdate"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="终止时间"
                      prop="enddate"
                      width="180">
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
                <el-collapse-item title="社团" name="2" v-show="corporationsData && corporationsData.length>0">
                  <el-table
                    :data="corporationsData"
                    style="width: 100%">
                    <el-table-column
                      label="名称"
                      prop="name"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="创办人"
                      prop="createdby"
                      width="400">
                    </el-table-column>
                    <el-table-column
                      label="宗旨"
                      prop="aim"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      label="描述"
                      prop="description"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="创办时间"
                      prop="createddate"
                      width="180">
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
                <el-collapse-item title="用户 Efficiency" name="3" v-show="usersData && usersData.length>0">
                  <el-table
                    :data="usersData"
                    style="width: 100%">
                    <el-table-column
                      label="姓名"
                      prop="name"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="昵称"
                      prop="nick_name"
                      width="180">
                      <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                          <p>学院: {{ scope.row.collegeName?scope.row.collegeName:"未填写" }}</p>
                          <p>专业: {{ scope.row.majorName?scope.row.majorName:"未填写" }}</p>
                          <p>地址: {{ scope.row.address?scope.row.address:"未填写" }}</p>
                          <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.nick_name?scope.row.nick_name:scope.row.name}}</el-tag>
                          </div>
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="邮箱"
                      prop="email"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="手机号"
                      prop="phone"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="社团"
                      prop="corporationName"
                      width="160">
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div v-show="shows">
              结果被怪兽吃掉了，请换种说法搜索
            </div>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>活动举办情况</legend>
            <div style="padding: 14px;">
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <!--<el-col :span="12">-->
                  <!--<el-form-item label="检索">-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="12">-->
                  <!--<el-form-item label="检索">-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <el-col :span="12">
                  <div id="chartPie" style="width:100%; height:400px;"></div>
                </el-col>
                <!--<el-col :span="24">-->
                  <!--<a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>-->
                <!--</el-col>-->
              </el-row>
            </div>
          </fieldset>
        </el-card>

        <read-action :visible.sync="readVisible" :data="data"></read-action>
        <!--<reasons :visible.sync="reasonVisible" @remove="removeRows" :data="data" ></reasons>-->
      </el-form>

    </el-col>
  </el-row>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'
  import _ from 'lodash';
  import Rule from '../common/lib/corporation-rule'
  import secondRule from '../common/lib/notice-rule'
  import Axios from 'axios';
  import ReadAction from '../pages/readAction.vue'
  import echarts from 'echarts'
  export default {
    components:{ReadAction},
    data(){
      const vm =this;
      return {
        corporation:{
          name:'',
          createdby:'',
          aim:'',
          description:'',
          isSchool:true,
        },
        rules:Rule.call(vm, 'form'),
        secondRules:secondRule.call(vm,'not'),
        notice:{},
        dialogImageUrl:'',
        dialogImageUrl1:'',
        dialogImageUrl2:'',
        imageUrl:'',
        imageUrl1:'',
        imageUrl2:'',
        dialogVisible: false,
        keyStrings:'',
        users:[],
        actions:[],
        corporations:[],
        searchs:'',
        actionsData:[],
        corporationsData:[],
        usersData:[],
        readVisible:false,
        activeName: '1',
        data:{},
        shows:false,
        chartPie: null,
        allCorporations:[],
        rate:[],
        rates:[],
      }
    },
    watch:{
      rates(val){
        if(this.rates && this.rates.length == this.allCorporations.length){
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
            title: {
              text: '社团活动举办占比',
              subtext: new Date().getMonth()+"月",
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: this.allCorporations||[]
            },
            series: [
              {
                name: '活动占比',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
//                data: [
//                  { value: 0, name: '天地会' },
//                  { value: 0, name: '斧头帮' },
//                  { value: 4, name: '软件学院学生会' },
//                  { value: 2, name: '学生会' },
//                  { value: 0, name: '自律委' }
//                ],
                data:this.copy(),
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
        }

      },
    },
    methods:{
      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.title =formObj.title;
        serverObj.message =formObj.message;
        serverObj.createBy =formObj.createBy;
        return serverObj;
      },

      transCorporation(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.name =formObj.name;
        serverObj.createdby =formObj.createdby;
        serverObj.aim =formObj.aim;
        serverObj.description =formObj.description;
        serverObj.code =formObj.isSchool?'1':'0';
        return serverObj;
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },

      handleAvatarSuccess1(res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
      },

      handleAvatarSuccess2(res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw);
      },

      beforeAvatarUpload(file) {
//        console.log(file);
//        let sel = this;
//        this.file = file;
//        const isJPG = file.type === 'image/jpeg';
//        const isLt2M = file.size / 1024 / 1024 < 2;
//
//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!');
//        }
//        if (!isLt2M) {
//          this.$message.error('上传头像图片大小不能超过 2MB!');
//        }
//        return isJPG && isLt2M;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      async handleNotice(){
        let fetch = Fetch.getFetch();
        this.notice.createBy = this.user.name;
        let result = await fetch.post('/api/notice/save',this.transServer(this.notice));
        let approve = result.data.data;
        if(result && approve && approve.id){
          this.$message({message:'发布成功',type:'success',center: true})
          this.notice={};
        }else{
          this.$message.error("发布失败，请重新尝试");
        }
      },

      async handleCorporation(){
        let fetch = Fetch.getFetch();
        let result = await fetch.post('/api/corporation/save',this.transCorporation(this.corporation));
        let approve = result.data.data;
        if(result && approve && approve.id){
          this.$message({message:'添加成功',type:'success',center: true})
          this.corporation={};
        }else{
          this.$message.error("添加失败，请重新尝试");
        }
      },

      handleRead(data){
        this.data = data;
        this.readVisible=true;
      },

      async handleApprove(data){
        let fetch = Fetch.getFetch();
        let params = {id:data.cmApproveId,uid:data.id,status:'1'}
        let result = await fetch.post('/api/chairmanApprove/approve',this.transServer(params));
        let approve = result.data.data;
        if(result && approve && approve.id){
          this.$message({message:'审核成功',type:'success',center: true})
          this.tableData = (this.tableData||[]).filter(table=>{
            return table.id != data.id;
          })
          this.copyTableData =(this.copyTableData||[]).filter(table=>{
            return table.id != data.id;
          });
        }else{
          this.$message.error("审核失败，请重新尝试");
        }
      },

      async handleRefuse(data){
        let fetch = Fetch.getFetch();
        let params = {id:data.cmApproveId,uid:data.id,status:'2'}
        let result = await fetch.post('/api/chairmanApprove/approve',this.transServer(params));
        let approve = result.data.data;
        if(result && approve && approve.id){
          this.$message({message:'审核成功',type:'success',center: true})
          this.tableData = (this.tableData||[]).filter(table=>{
            return table.id != data.id;
          })
          this.copyTableData =(this.copyTableData||[]).filter(table=>{
            return table.id != data.id;
          });
        }else{
          this.$message.error("审核失败，请重新尝试");
        }
      },

      async loadData(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/action/getAllApprove');
        let actions = result.data.data;
        if(actions && actions.length>0){
          console.log('table',actions)
          this.tableData =actions;
          this.splitTableData =_.chunk(this.tableData,this.pageSize)||[];
          this.copyTableData =this.splitTableData[this.currenyPage-1];
        }
      },

      async loadData(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/user/getUnApprove');
        let users = result.data.data;
        if(users && users.length>0){
          this.tableData= users;
          this.splitTableData =_.chunk(this.tableData,this.pageSize)||[];
          this.copyTableData =this.splitTableData[this.currenyPage-1];
        }
      },

      async loadAllHomePicture(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/user/getAllHomePicture');
        let pictures = result.data.data;
        console.log("pictures",pictures)
        if(pictures && pictures.length>0){
          (pictures||[]).forEach(pic=>{
            if(pic.sortSeq == 0){
              this.imageUrl= pic.url;
            }
            if(pic.sortSeq == 1){
              this.imageUrl1= pic.url;
            }
            if(pic.sortSeq == 2){
              this.imageUrl2= pic.url;
            }
          })
        }
      },

      async loadAll(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/corporation/list');
        let corporation = result.data.data;
        this.allCorporations =corporation;
      },

      async handleSelect(){
        //let fetch = Fetch.getFetch();
        const fetch = Axios.create({baseURL:'/api/', timeout:2000*2000});
        let result = await fetch.get('/api/user/search',{params:{keyString:this.keyStrings}});
        let search = result.data.data;
        console.log('search',search);
        if(result && search){
          this.searchs = search;
          this.usersData = search.users;
          this.actionsData = search.actions;
          this.corporationsData = search.corporations;
          if(JSON.stringify(search) == "{}"){
            this.shows = true;
          }
        }
      },

      async loadRate(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/user/getMonths');
        let rate = result.data.data;
        this.rate =rate;
        (this.allCorporations||[]).forEach(corporation=>{
          let temp = this.IsINArr(corporation.name);
          if(!temp.isTrue){
            this.rates.push({
              count:0,
              name:corporation.name,
              size:temp.size,
            })
          }
        });

        (this.rate||[]).forEach(r=>{
          this.rates.push({
            count:r.count,
            name:r.name,
            size:r.size
          })
        });
        console.log('ss',this.rates)

      },

      IsINArr(val){
        var result ={};
        for(let i=0;i<this.rate.length;i++){
          if(i==this.rate.length && this.rate[i].name != val){
            result.isTrue=false;
          }else if(this.rate[i].name == val){
            result.isTrue=true;
            break;
          }
        }
        result.size =this.rate[0].size;
        return result;
      },

      copy(){
        let data=[];
        (this.rates||[]).forEach(r=>{
          data.push({
            value:r.count,
            name:r.name,
          });
        })
        return data;
      },
    },
    mounted() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.loadAllHomePicture()
      this.loadAll();
      this.loadRate();
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
