<template>
  <div>
    <dash-board></dash-board>
    <myBody @read="handleRead"></myBody>
    <my-body-middle @read="handleRead"></my-body-middle>
    <my-body-bottom></my-body-bottom>
    <read-action :visible.sync="visible" @update="handleUpdate" :data="data"></read-action>
  </div>
</template>

<script>
  import DashBoard from './Dashboard.vue'
  import myBody from './body-top.vue'
  import myBodyMiddle from './body-middle.vue'
  import myBodyBottom from './body-bottom.vue'
  import ReadAction from './readAction.vue'
  export default {
    components:{DashBoard,myBody,myBodyMiddle,myBodyBottom,ReadAction},
    data(){
      return {
        visible:false,
        data: {},
      }
    },
    methods:{
      handleRead(data){
        this.data = data;
        this.visible=true;

      },
      handleUpdate(){},
    },
    mounted(){
//      let rout = JSON.parse(sessionStorage.getItem('router'));
//      console.log('routType',typeof rout)
//      console.log()
////      if(rout && rout.length>0){
////        console.log('rr',rout)
////        this.$router.options.routes = rout;
////      }
    }
  }
</script>

