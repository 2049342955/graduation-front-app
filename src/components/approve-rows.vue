<template>
  <div>
    <el-dialog
      title="被拒申请"
      :visible.sync="rowVisible"
      width="80%"
      center>
      <el-form ref="form"  label-width="80px" >
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>活动记录</legend>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-row :gutter="12" style="width: calc(100% - 16px)">
                      <el-col :span="24">
                        <el-form-item label="活动概述">
                          <span>{{ props.row.summary }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="12" style="width: calc(100% - 16px)">
                      <el-col :span="24">
                        <el-form-item label="活动内容">
                          <span>{{ props.row.content }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="12" style="width: calc(100% - 16px)">
                      <el-col :span="24">
                        <el-form-item label="被拒原因">
                          <span>{{ props.row.description?props.row.description:"数据丢失" }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>


                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="举办方"
                prop="holder"
                width="200">
              </el-table-column>
              <el-table-column
                label="活动名"
                prop="action_name"
                width="200">
              </el-table-column>
              <el-table-column
                label="举办地"
                prop="address"
                width="200">
              </el-table-column>
              <el-table-column
                label="举办时间"
                prop="startDate"
                width="200">
              </el-table-column>
              <el-table-column
                label="终止时间"
                prop="endDate"
                width="200">
              </el-table-column>
              <!--<el-table-column label="操作" fixed="right" width="200">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button-->
                    <!--size="mini"-->
                    <!--type="danger"-->
                    <!--@click="handleDelete(scope.$index, scope.row)" v-if="scope.row.role_name!='会长'">删除</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </fieldset>
        </el-card>

      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button type="warning" icon="el-icon-check" round @click="handleApple">申请</el-button>-->
          <!--<el-button type="info" icon="el-icon-error" round @click="handleCancle">取消</el-button>-->
      <!--</span>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'
  import Rule from '../common/lib/action-approve-rule'
  export default {
    props: {
      visible: Boolean,
      data: Object
    },
    data() {
      const vm =this;
      return {
        rowVisible:false,
        copyData:{},
        tableData:[],
      };
    },
    watch: {
      /**
       * 打开时重置表单，复制数据
       * @param val
       */
      visible(val) {
        this.rowVisible = val;
        if (val) {
          this.copyData = DeepClone.deepClone(this.data);
          this.loadData();
        }
      },
      rowVisible(val) {
        this.$emit("update:visible", val);
      },
    },
    methods:{
      handleCancle(){
        this.rowVisible = false;
      },
      async loadData(){
        const fetch = Fetch.getFetch();
        const result = await fetch.get('/api/action/rejectAction',{params:{id:this.copyData.id}})
        let actions = result.data.data;
        console.log("actions",actions);
        this.tableData =actions;

      },
    },
    mounted(){
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
