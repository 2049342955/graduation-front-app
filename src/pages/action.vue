<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item><b>活动</b></el-breadcrumb-item>
        <el-breadcrumb-item><b>我的活动</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form   label-width="80px">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>所有社团</legend>
            <div style="padding: 14px;">
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="12">
                  <el-form-item label="社团名称">
                    <el-select v-model="one" placeholder="请选择" clearable @change="handleSelect">
                      <el-option
                        v-for="item in subCorporations"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="级别">
                    <el-switch
                      v-model="isSchool"
                      @change="handleClick"
                      active-text="校级组织"
                      inactive-text="院级组织">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-show="one">
                <span>社团活动</span>
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
                            <el-col :span="24">
                              <el-button type="info" icon="el-icon-edit" round @click.native.prevent="handleRead(props.row)">查看详情</el-button>
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
                <div style="margin-top: 50px;margin-left: 200px" v-show="tableData.length>0">
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
            </div>
          </fieldset>
        </el-card>
        <read-action :visible.sync="readVisible":data="data"></read-action>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'
  import _ from 'lodash';
  import ReadAction from '../pages/readAction.vue'
  export default {
    components:{ReadAction},
    data(){
      return {
        visible:false,
        data: {},
        corporations:[],
        user:{},
        allCorporations:[],
        subCorporations:[],
        one:'',
        isSchool:true,
        tableData:[],
        splitTableData:[],
        copyTableData:[],
        pageSize:2,
        currenyPage:1,
        readVisible:false,
      }
    },
    methods:{
      handleRead(data){
        console.log('dd',data);
        this.data = data;
        this.visible=true;

      },
      handleUpdate(){},

      async loadAll(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/corporation/list');
        let corporation = result.data.data;
        this.allCorporations =corporation;
        this.subCorporations =DeepClone.deepClone(this.allCorporations);
      },

      async laodCorporation(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/corporation/myCorporation',{params:this.user});
        let corporation = result.data.data;
        (corporation||[]).forEach(corporation=>{
          if(corporation.role_name == '用户'){
            corporation.role ='成员';
          }else{
            corporation.role = corporation.role_name;
          }
        })
        this.corporations = corporation;
      },

      async handleSelect(){
       if(this.one && this.one!=null){
         let fetch = Fetch.getFetch();
         let result = await fetch.get('/api/action/getByCorporation',{params:{id:this.one}});
         let actions = result.data.data;
         console.log('actions',actions);
         if(actions && actions.length>0){
           this.tableData =actions;
           this.splitTableData =_.chunk(this.tableData,this.pageSize)||[];
           this.copyTableData =this.splitTableData[this.currenyPage-1];
         }else{
           this.tableData=[];
           this.copyTableData=[];
         }
       }
      },
      handleClick(){
        this.one='';
        let temp=this.isSchool?"0":"1";
        let arr =(this.allCorporations||[]).filter(corporation=>{
          return corporation.code == (this.isSchool?"0":"1")
        })
        this.subCorporations =arr;
      },

      handleSizeChange(val) {
        this.splitTableData =_.chunk(this.tableData,val)||[];
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      handleCurrentChange(val) {
        this.currenyPage =val;
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      handleRead(data){
        this.data=data;
        this.readVisible=true;
      },
    },
    mounted(){
      this.user =JSON.parse(sessionStorage.getItem('user'));
      //this.laodCorporation();
      this.loadAll();
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

  .tt{
    height:80%;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
    margin: 10px 0px 10px 0px;
  }
</style>
