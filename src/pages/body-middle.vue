<template>
  <div class="box">
    <span style="font-size: 25px;color: black;">最新活动</span>
    <el-row :gutter="16">
      <el-col :span="24">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px;color: #409EFF;height: 250px">
          <div style="padding: 14px;">
            <ul>
              <li v-for="item in actions" class="aa"><span style="font-size: large;color: #2d2f33">{{item.actionName}}</span>&nbsp;&nbsp;
                <el-button type="info" icon="el-icon-edit" round @click.native.prevent="handleRead(item)"></el-button>
              </li>
            </ul>
          </div>
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
        actions:[]
      };
    },
    methods:{
      async loadActions(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/action/approveList');
        let actions = result.data.data;
        this.actions = actions;
        console.log('corporations',this.actions)
      },

      handleRead(data){
        this.$emit("read", data);
      },

    },
    mounted(){
      console.log("jinl ")
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

  .aa{
    width:80%;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow: hidden;
    margin: 10px 0px 10px 0px;
  }
</style>
