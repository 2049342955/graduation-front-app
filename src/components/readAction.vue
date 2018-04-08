<template>
    <span style="font-size: 25px;color: black;">热门活动</span>
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px;color: #67C23A">
          <div style="padding: 14px;">
            <span>新的计划为奴诶人回复我可能分开来我们发了热无法vo87t7jiouwjgeiwjgiorewjgoiewrjgtijgjtwgiotjgw</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px;color: #E6A23C">
          <div style="padding: 14px;">
            <span>新的计划为奴诶人回复我可能分开来我们发了热无法</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

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

<script>
  export default {
    data() {
      return {
        currentDate: new Date()
      };
    }
  }
</script>
