<style scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }

</style>
<template>
  <div class="layout" >
    <Layout :style="{minHeight: '100vh'}">
     <nav-header></nav-header>
      <Layout class="ivu-layout-has-sider">
        <nav-sider v-bind:lists="lists" ></nav-sider>
        <Layout :style="{padding: '0 24px 24px',marginLeft:'200px'}">
          <nav-breadcrumb></nav-breadcrumb>
          <Content v-bind:style="style">
            <router-view class="view" ></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import NavHeader from "./NavHeader.vue";
  import NavSider from "./NavSider.vue";
  import NavBreadcrumb from "./NavBreadcrumb.vue";
  import axios from "axios";
  export default {
    name: "layout",
    data(){
      return {
        lists:[],
        style:{padding: '24px', minHeight: "400px", background: '#fff'}
      }
    },
    mounted(){
      axios.get("/menus").then(res=>{
        console.dir(res);

        this.lists = res.data.result.list;

      }).catch(res=>{

      });
    },
    components:{
      NavSider,
      NavHeader,
      NavBreadcrumb
    }
  }
</script>
