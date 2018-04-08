<template>
  <div class="box">
    <!--<span style="font-size: 25px;color: black;">联系我们</span>-->
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          联系我们<i class="header-icon el-icon-info"></i>请Click me
        </template>
        <div>当你遇到问题的时候，那就换个网站试试,说不定就好了</div>
      </el-collapse-item>
    </el-collapse>
  </div>
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
    margin: 50px 0px 60px 0px;
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
