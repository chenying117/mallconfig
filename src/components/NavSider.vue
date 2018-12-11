<template>
  <Sider hide-trigger :style="{background: '#fff',position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
    <Menu active-name="1_1" theme="light" width="auto" :open-names="['1']" >
      <Submenu :name="item.menuId"  v-for="item in lists" :key="item.menuId" >
        <template slot="title">
          <Icon :type="item.menuIcon"></Icon>
          {{item.menuName}}
        </template>
        <MenuItem :name="i.menuId" v-for="i in item.menuChild"  :key="i.menuId">
          <router-link :to="{ name: i.menuUrl}"> {{i.menuName}}</router-link></MenuItem>

      </Submenu>

    </Menu>

  </Sider>

</template>

<script>
    export default {
      props:["lists"],
      data(){
        return{ }
      }
    }
</script>

<style scoped>

</style>
