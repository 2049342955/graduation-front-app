<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>社团</el-breadcrumb-item>
        <el-breadcrumb-item>我的社团</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>


    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form"  label-width="80px">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>我的社团</legend>
            <div v-if="this.user && this.user.id!=null && this.user.id!=''">
              <div style="padding: 14px;" v-show="corporations.length !=0">
                <el-collapse  accordion>
                  <el-collapse-item v-for="(item,index) in corporations" :title="item.name" :name="index"  :key="item.id">
                    <el-row :gutter="12" style="width: calc(100% - 16px)">
                      <el-col :span="12">
                        <el-form-item label="名称">
                          <span style="font-size: large">{{item.name}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="创办人">
                          <span style="font-size: large">{{item.createdBy}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="12" style="width: calc(100% - 16px)">
                      <el-col :span="24">
                        <el-form-item label="主旨">
                          <span style="font-size: large">{{item.aim}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="12" style="width: calc(100% - 16px)">
                      <el-col :span="24">
                        <el-form-item label="描述">
                          <span style="font-size: large">{{item.description}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="12" style="width: calc(100% - 16px)">
                      <el-col :span="12">
                        <el-form-item label="创办时间">
                          <span style="font-size: large">{{item.createddate}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="我的角色">
                          <span style="font-size: large;color: #00C1DE;">{{item.role}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>

                </el-collapse>
              </div>
              <div v-show="corporations.length ==0">
                亲，您还未加入任何社团
              </div>
            </div>
            <div v-else="">
              亲，请先登录才能查看
            </div>
          </fieldset>
        </el-card>

        <div v-show="chairmanCp.length !=0">
          <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
            <fieldset>
              <legend>管理我的社团</legend>
              <div style="padding: 14px;">

                <div>
                  <template>
                    <el-table
                      :data="chairmanCp"
                      style="width: 800"
                      max-height="250">
                      <el-table-column
                        fixed
                        prop="name"
                        label="名称"
                        width="400">
                      </el-table-column>
                      <el-table-column
                        prop="createdBy"
                        label="创办者"
                        width="400">
                      </el-table-column>

                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="240">
                        <template slot-scope="scope">
                          <el-button
                            @click.native.prevent="handleApprove(scope.row)"
                            type="text"
                            size="small">
                            申请活动
                          </el-button>
                          <el-button
                            @click.native.prevent="handleManager(scope.row)"
                            type="text"
                            size="small">
                            管理成员
                          </el-button>
                          <el-button
                            @click.native.prevent="handleRows(scope.row)"
                            type="text"
                            size="small">
                            被拒申请
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>

              </div>
            </fieldset>
          </el-card>
        </div>

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
                <span>社团简介</span>
                <hr>
                <div style="margin-top: 20px">
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="12">
                      <el-form-item label="名称">
                        <span style="color: #ff9900">{{someOne.name}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="创办人">
                        <span style="font-size: large">{{someOne.createdby}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="24">
                      <el-form-item label="主旨">
                        <span style="font-size: large">{{someOne.aim}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="24">
                      <el-form-item label="描述">
                        <span style="font-size: large">{{someOne.description}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="12">
                      <el-form-item label="创办时间">
                        <span style="font-size: large">{{someOne.createddate}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

            </div>
          </fieldset>
        </el-card>
        <action-approve :visible.sync="visible" :data="data"></action-approve>
        <manger-user :visible.sync="mVisible":data="data"></manger-user>
        <approve-rows :visible.sync="rowVisible":data="data"></approve-rows>
      </el-form>

    </el-col>
  </el-row>
</template>

<script>
import Fetch from '../api/index'
import DeepClone from '../common/lib/deepClone'
import ActionApprove from '../components/action-approve.vue'
import MangerUser from '../components/manager-user.vue'
import ApproveRows from '../components/approve-rows.vue'
  export default {
    components:{ActionApprove,MangerUser,ApproveRows},
    data(){
      return {
        data: {},
        form:{},
        corporations:[],
        allCorporations:[],
        subCorporations:[],
        chairmanCp:[],
        college:'',
        major:'',
        majors:'',
        colleges:'',
        user:{},
        activeName:0,
        isSchool:true,
        one:'',
        someOne:{},
        visible:false,
        mVisible:false,
        rowVisible:false,
      }
    },
    methods:{
      handleRead(data){
        console.log('dd',data);
        this.data = data;
        this.visible=true;
      },
      async laodCorporation(){
        if(this.user && this.user.id && this.user.id!= null){
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
          this.chairmanCp = (corporation||[]).filter(chairman=>{
            return chairman.role == '会长'
          });
        }
      },

      async loadAll(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/corporation/list');
        let corporation = result.data.data;
        this.allCorporations =corporation;
        this.subCorporations =DeepClone.deepClone(this.allCorporations);
      },

      handleClick(){
        this.one='';
        let temp=this.isSchool?"0":"1";
        let arr =(this.allCorporations||[]).filter(corporation=>{
          return corporation.code == (this.isSchool?"0":"1")
        })
        this.subCorporations =arr;
      },
      handleSelect(){
        let arr = (this.allCorporations||[]).filter(corporation=>{
          return corporation.id == this.one;
        })
        if(arr!=null && arr.length!=0){
          this.someOne = arr[0];
        }
      },

      handleApprove(data){
        this.data=data;
        this.visible=true;
      },
      handleManager(data){
        this.data=data;
        this.mVisible=true;
      },
      handleRows(data){
        this.data = data;
        this.rowVisible=true;
      },
    },
    mounted(){
      this.user =JSON.parse(sessionStorage.getItem('user'));
      this.laodCorporation();
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
</style>
