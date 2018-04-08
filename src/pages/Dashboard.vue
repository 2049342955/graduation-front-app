<template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in imgs" :key="item.src">
      <img v-bind:src="item.src" width="100%" height="100%">
    </el-carousel-item>
    <el-carousel-item style="background-color: white;">
      <span style="font-size: 25px;color: black;">公告</span>
      <ul>
        <li v-for="item in notices" class="aa">
          <span style="font-size: large;color: #2d2f33">{{item.title}}&nbsp;&nbsp;:&nbsp;&nbsp;{{item.message}}</span>&nbsp;&nbsp;
        </li>
      </ul>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'

  export default {
    data(){
      return {
        imgs:[
//          {src:require("../assets/images/1.jpg"),info:"花儿"},
//          {src:require("../assets/images/2.jpg"),info:"牛头山"},
//          {src:require("../assets/images/3.jpg"),info:"郁金香"},
        ],
        notices:[],
      }
    },
    methods:{
      async loadNotice(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/notice/list');
        let notice = result.data.data;
        if(result && notice && notice.length>0){
          this.notices = notice;
          console.log('notice',this.notices)
        }
      },
      async loadAllHomePicture(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/user/getAllHomePicture');
        let pictures = result.data.data;
        console.log("pictures",pictures)
        if(pictures && pictures.length>0){
          (pictures||[]).forEach(pic=>{
            this.imgs.push({
              src:pic.url
            })
          })
        }
      }
    },
    mounted(){
      this.loadNotice();
      this.loadAllHomePicture();
    },
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
