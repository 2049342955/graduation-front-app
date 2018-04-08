<template>
  <div class="box">
    <span style="font-size: 25px;color: black;">热门活动</span>
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px;color: #67C23A;height: 220px">
          <div style="padding: 14px;">
            <p>{{pa1.actionName}}</p>
            <span class="tt">{{pa1.summary}}</span>
          </div>
          <el-button type="info" icon="el-icon-edit" round @click.native.prevent="handleRead(pa1)"></el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px;color: #E6A23C;height: 220px">
          <div style="padding: 14px;">
            <p>{{pa2.actionName}}</p>
            <span class="tt">{{pa2.summary}}</span>
          </div>
          <el-button type="info" icon="el-icon-edit" round @click.native.prevent="handleRead(pa2)"></el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Fetch from '../api/index'
  export default {
    data() {
      return {
        popularActions:[],
        pa1:{
          actionName:'',
          summary:''
        },
        pa2:{
          actionName:'',
          summary:''
        },
      };
    },
    methods:{
      async loadActions(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/action/popularAction');
        let popularActions = result.data.data;
        this.popularActions =popularActions;
        this.pa1 = popularActions[0];
        this.pa2 = popularActions[1];
      },
      handleRead(data){
        this.$emit("read", data);
      },
    },
    mounted(){
      this.loadActions();
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
  .tt{
    height:80%;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
    margin: 10px 0px 10px 0px;
  }
</style>
