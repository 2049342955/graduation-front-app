<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>


    <el-col :span="24" class="warp-main">
      <el-form  label-width="80px">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>待审核的小伙伴</legend>
            <div style="padding: 14px;">
              <hr>
              <div style="margin-top: 20px;margin-left: 50px">
                <el-table
                  :data="copyTableData"
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
                  <el-table-column label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="handleApprove(scope.row)" >通过</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleRefuse(scope.row)" >拒绝</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div style="margin-top: 50px;margin-left: 150px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currenyPage"
                  :page-sizes="[1,2, 3, 4, 5]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="tableData.length">
                </el-pagination>
              </div>
            </div>
          </fieldset>
        </el-card>

        <read-action :visible.sync="readVisible" :data="data"></read-action>
        <reasons :visible.sync="reasonVisible" @remove="removeRows" :data="data" ></reasons>
      </el-form>

    </el-col>
  </el-row>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'
  import _ from 'lodash';
  import ReadAction from '../pages/readAction.vue'
  import Reasons from '../components/reasons.vue'
  import Transfer from '../components/transfer/main.vue'
  export default {
    components:{ReadAction,Reasons,Transfer},
    data(){
      return {
        data: {},
        tableData:[],
        splitTableData:[],
        copyTableData:[],
        pageSize:2,
        currenyPage:1,
        readVisible:false,
        reasonVisible:false,

      }
    },
    methods:{
      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.uid =formObj.uid;
        serverObj.cid =formObj.cid;
        serverObj.status = formObj.status;
        serverObj.description = formObj.reasons;
        return serverObj;
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
      handleSizeChange(val) {
        this.splitTableData =_.chunk(this.tableData,val)||[];
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      handleCurrentChange(val) {
        this.currenyPage =val;
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },

      removeRows(data){
        console.log("data",data);
        this.reasonVisible=false;
        this.tableData = (this.tableData||[]).filter(table=>{
          return table.id != data.id;
        })
        this.copyTableData =(this.copyTableData||[]).filter(table=>{
          return table.id != data.id;
        });
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
    },
    mounted(){
      this.user =JSON.parse(sessionStorage.getItem('user'));
      this.loadData();
      //this.loadRecent();
      //this.loadPopular();
    },
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
