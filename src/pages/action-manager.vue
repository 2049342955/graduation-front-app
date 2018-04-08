<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>


    <el-col :span="24" class="warp-main">
      <el-form  label-width="80px">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>待审核活动</legend>
            <div style="padding: 14px;">
              <hr>
              <div style="margin-top: 20px;margin-left: 50px">
                <el-table
                  :data="copyTableData"
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
                          <el-col :span="8">
                            <el-button type="info" icon="el-icon-edit" round @click.native.prevent="handleRead(props.row)">详情</el-button>
                          </el-col>
                          <el-col :span="8">
                            <el-button type="info" icon="el-icon-success" round @click.native.prevent="handleApprove(props.row)">通过</el-button>
                          </el-col>
                          <el-col :span="8">
                            <el-button type="info" icon="el-icon-error" round @click.native.prevent="handleRefuse(props.row)">拒绝</el-button>
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
              </div>
            </div>
          </fieldset>
        </el-card>

        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>精选活动</legend>
            <transfer
              filterable
              :titles="['最近活动','精选活动']"
              filter-placeholder="请输入活动拼音"
              v-model="popularAction"
              :data="allActions">
            </transfer>
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
  import MyTransfer from '../components/my-transfer/main.vue'
  export default {

    components:{ReadAction,Reasons,Transfer,MyTransfer},

    data(){
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data: {},
        tableData:[],
        splitTableData:[],
        copyTableData:[],
        pageSize:2,
        currenyPage:1,
        readVisible:false,
        reasonVisible:false,
        allActions:[],
        popularAction:[],
        data2: generateData2(),
        value2: [],
      }
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
      handleRead(data){
        this.data = data;
        this.readVisible=true;
      },

      async handleApprove(data){
        let fetch = Fetch.getFetch();
        let params = {aid:data.id,status:'1'}
        let result = await fetch.post('/api/action/actionApprove',this.transServer(params));
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
        this.data = data;
        this.reasonVisible = true;
      },

      async loadData(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/action/getAllApprove');
        let actions = result.data.data;
        if(actions && actions.length>0){
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

      async loadRecent(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/action/recentList');
        let actions = result.data.data;
        if(actions && actions.length>0){
//          this.allActions =(actions||[]).map(action=>{
//            return {
//              label:action.actionName,
//              key:action.id
//            }
//          });
          (actions||[]).forEach((action,index)=>{
            this.allActions.push({
              label:action.actionName,
              key:action.id
            })
          })
          console.log("action",this.allActions)
        }
      },

      async loadPopular(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/action/popularAction');
        let actions = result.data.data;
        if(actions && actions.length>0){
          this.popularAction =(actions||[]).map(action=>{
            return {
              label:action.actionName,
              key:action.id
            }
          });
        }
      },
    },
    mounted(){
      this.user =JSON.parse(sessionStorage.getItem('user'));
      this.loadData();
      this.loadRecent();
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
