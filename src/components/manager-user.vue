<template>
  <div>
    <el-dialog
      title="管理成员"
      :visible.sync="managerVisible"
      width="80%"
      center>

      <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
        <fieldset>
          <legend>我的小伙伴</legend>
          <div>
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
                label="角色"
                prop="role_name"
                width="160">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.role_name!='会长'">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 50px;margin-left: 300px">
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
        </fieldset>
      </el-card>

      <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
        <fieldset>
          <legend>添加小伙伴</legend>
          <div>
            <el-form label-width="80px">
              <el-row :gutter="12" >
                <el-col :span="14">
                  <el-form-item label="小伙伴" prop="name">
                    <el-input
                      placeholder="请输入小伙伴的用户名"
                      prefix-icon="el-icon-search"
                      @keyup.enter.native="handleSelect"
                      v-model="name">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <div v-show="myPartner.name!=''" style="margin-left: 60px">
                <span style="margin-left: 500px">我的新伙伴</span>
                <hr>
                <div style="margin-top: 20px">
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="12">
                      <el-form-item label="名称">
                        <span style="color: #00cc66;font-size: large">{{myPartner.name}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="昵称">
                        <span style="color: #00cc66;font-size: large">{{myPartner.nickName?myPartner.nickName:"未填写"}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="12">
                      <el-form-item label="邮箱">
                        <span style="color: #00cc66;font-size: large">{{myPartner.email}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="手机">
                        <span style="color: #00cc66;font-size: large">{{myPartner.phone?myPartner.phone:"未填写"}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12" style="width: calc(100% - 16px)">
                    <el-col :span="12">
                      <el-form-item label="邮箱">
                        <span style="color: #00cc66;font-size: large">{{myPartner.address}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <span slot="footer" class="dialog-footer" style="margin-left: 400px">
                  <el-button type="warning" icon="el-icon-check" round @click="handlePartner">添加小伙伴</el-button>
                </span>
              </div>
            </el-form>

          </div>
        </fieldset>
      </el-card>

    </el-dialog>
  </div>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'
  import Rule from '../common/lib/action-approve-rule'
  import _ from 'lodash';
  export default {
    props: {
      visible: Boolean,
      data: Object
    },
    data() {
      const vm =this;
      return {
        managerVisible:false,
        copyData:{},
        tableData:[],
        copyTableData:[],
        splitTableData:[],
        pageSize:2,
        currenyPage:1,
        myPartner:{name:''},
        rules:Rule.call(vm, 'form'),
        name:'',
        restaurants:[],
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

      };
    },
    watch: {
      /**
       * 打开时重置表单，复制数据
       * @param val
       */
      visible(val) {
        this.managerVisible = val;
        if (val) {
          this.copyData = DeepClone.deepClone(this.data);
          this.loadUsers();
        }
      },
      managerVisible(val) {
        this.$emit("update:visible", val);
      },
    },
    methods:{
      transServer(formObj){
        const serverObj ={};
        serverObj.id = formObj.id;
        serverObj.userId =formObj.userId;
        serverObj.roleId = formObj.roleId;
        serverObj.cid = formObj.cid;
        serverObj.status = formObj.status;
        serverObj.description = formObj.description;
        return serverObj;
      },
      handleCancle(){
        this.managerVisible = false;
      },

      handleEdit(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.splitTableData =_.chunk(this.tableData,val)||[];
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      handleCurrentChange(val) {
        this.currenyPage =val;
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      async handleDelete(index, row) {
        console.log("row",row);
        let userRole = {userId:row.id,roleId:row.roleId,cid:this.copyData.id,status:"N"}
        const fetch = Fetch.getFetch();
        const result = await fetch.post('/api/userRole/save',this.transServer(userRole))
        let user = result.data.data;
        if(result && user && user.id){
          this.$message({message:'删除成功',type:'success',center: true});
          this.tableData = (this.tableData||[]).filter(table=>{
            return table.id != row.id
          })
        }else{
          this.$message.error("删除失败，请重新尝试");
        }
      },
      async handlePartner(){
        let params ={userId:this.myPartner.id,cid:this.copyData.id,status:"Y"}
        const fetch = Fetch.getFetch();
        const result = await fetch.post('/api/userRole/insertUserRole',this.transServer(params))
        let user = result.data.data;
        if(result && user){
          this.$message({message:'添加成功',type:'success',center: true})
          console.log("user",user)
          this.tableData= user;
          this.splitTableData =_.chunk(this.tableData,this.pageSize)||[];
          this.copyTableData =this.splitTableData[this.currenyPage-1];
          this.name='';
          this.myPartner.name='';
        }else{
          this.$message.error("添加失败，请重新尝试");
        }
      },
      async loadUsers(){
        const fetch = Fetch.getFetch();
        let result = await fetch.get('/api/user/getByCorporation',{params:{id:this.copyData.id}})
        let users = result.data.data;
        this.tableData= users;
        this.splitTableData =_.chunk(this.tableData,this.pageSize)||[];
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      async handleSelect(){
        const fetch = Fetch.getFetch();
        let result = await fetch.get('/api/user/getByName',{params:{name:this.name}})
        let user = result.data.data;
        if(result && user && user.id){
          console.log("user",user)
          this.myPartner = user;
        }else{
          this.$message.error("抱歉，没找到该小伙伴，请确认账户");
        }
      },
    },
    mounted(){
      //this.loadUsers();
    },
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
