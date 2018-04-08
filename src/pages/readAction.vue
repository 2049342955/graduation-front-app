<template>
    <div>
      <el-dialog
        :title="copyData.actionName"
        :visible.sync="readVisible"
        width="80%"
        center>
        <el-form ref="form" :model="copyData" label-width="80px">
          <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
            <fieldset>
              <legend>活动详情</legend>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="举办方" prop="holder">
                    {{copyData.holder}}
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="活动名称" prop="actionName">
                    {{copyData.actionName}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="举办时间" prop="startdate">
                    {{copyData.startdate}}
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="终止时间" prop="enddate">
                    {{copyData.enddate}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="活动地点" prop="address">
                    {{copyData.address}}
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
          </el-card>

          <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
            <fieldset>
              <legend>活动概述</legend>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="20">
                  <el-form-item  prop="summary">
                    {{copyData.summary}}
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
          </el-card>

          <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
            <fieldset>
              <legend>活动内容</legend>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="20">
                  <el-form-item  prop="content">
                    {{copyData.content}}
                  </el-form-item>
                </el-col>
              </el-row>
            </fieldset>
          </el-card>

          <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
            <fieldset>
              <legend>活动海报</legend>
              <div v-if="copyData.pictures && copyData.pictures && copyData.pictures.length>0">
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="6" v-for="item in copyData.pictures" :key="item.id">
                    <el-form-item >
                      <img :src="item.purl" width="100px" height="100px">
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-else>
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="20">
                    <el-form-item  prop="content">
                      暂无图片
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

            </fieldset>
          </el-card>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="success" icon="el-icon-check" round @click="handleCancle">取消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import DeepClone from '../common/lib/deepClone'
  export default {
    props: {
      visible: Boolean,
      data: Object
    },
    data() {
      return {
        readVisible:false,
        copyData:{
          pictures:[],
        },

      };
    },
    watch: {
      /**
       * 打开时重置表单，复制数据
       * @param val
       */
      visible(val) {
        this.readVisible = val;
//        this.isEdit = false;
        if (val) {
          this.copyData = DeepClone.deepClone(this.data);
          console.log('copyData',this.copyData)
        }
      },
      readVisible(val) {
        this.$emit("update:visible", val);
      },
    },
    methods:{
      handleCancle(){
        this.readVisible = false;
      },
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
