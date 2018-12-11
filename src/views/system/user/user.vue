<template>
<div>

  <div style=" margin-bottom: 10px;text-align: right;">
    <Input suffix="ios-search" placeholder="查询" style="width: auto" v-model="search"  @on-change="inputChange"/>
    <Button type="info" icon="md-add" @click="addUserModal = true">新增用户</Button>
  </div>
  <Table id="user_table" border :columns="userColumns" :data="userData"  v-bind:height="height" ></Table>
  <div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
      <Page :total="total" :current="current" :page-size="limit" :page-size-opts="sizeOpt" show-sizer show-total @on-change="changeTablePage" @on-page-size-change ="pageSizeChange"></Page>
    </div>
  </div>
  <Modal
    @on-cancel="cancel"
    v-model="addUserModal"
    title="添加用户">
    <user-add ref="userAdd" v-bind:user="selectuser" @updateTableData="getUserTableData" ></user-add>
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="ok">确定</Button>
    </div>
  </Modal>
</div>
</template>
<script>
  import axios from  "axios";
  import userAdd from "./userAdd.vue";
  export default {
    data () {
      return {
        total:0,
        limit:10,
        current:1,
        sizeOpt:[5,10,20],
        height:200,
        addUserModal:false,
        search:"",
        selectuser:{},
        userColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '账号',
            key: 'userName',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'md-person'
                  }
                }),
                h('strong', params.row.userName)
              ]);
            }
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
              const text = row.status === 1 ? '在线中' : row.status === 2 ? '正常' : '失效';

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '电话',
            key: 'tel'
          },
          {
            title: '部门',
            key: 'className'
          },
          {
            title: 'Action',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon : "md-search"
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.addUserModal = true;
                      this.selectuser = Object.assign({},params.row);
                    }
                  }
                }, "编辑"),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon : "ios-trash-outline"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        userData: []
      }
    },
    components: {
     userAdd
   },
    mounted() {
      this.getUserTableData(1);
      this.setHeight();
    },
    methods: {
      inputChange(){
        this.current = 1;
        this.getUserTableData();
       /* axios.get("/users/query",{
          params:{
            limit:this.limit,
            page: this.current,
            key: this.search
          }
        }).then(res=>{
          this.userData = res.data.result.list;
          this.total  =  res.data.result.length ;
        }).catch(e=>{

        });*/
      },
      setHeight(){
         this.height = this.$parent.$parent.$el.clientHeight - 143;
      },
      getUserTableData(  ){
          axios.get("/users/query",{
              params:{
                  limit:this.limit,
                  page: this.current,
                  key: this.search
              }
          }).then(res=>{
            this.userData = res.data.result.list;
            this.total  =  res.data.result.length ;
          }).catch(e=>{

          });
      },
      pageSizeChange(size){
        this.limit =size;
        this.getUserTableData();
      },
      changeTablePage (page) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
         this.current =page;
         this.getUserTableData();
      },
      show (index) {

       /* this.$Modal.info({
          title: '账户信息',
          content: `姓名：${this.userData[index].name}<br>账号：${this.userData[index].userName}<br>电话：${this.userData[index].tel}`
        })*/
      },
      ok () {
        this.$refs.userAdd.handleSubmit("formValidate");
      },
      cancel () {
        this.$refs.userAdd.handleReset("formValidate");
        this.addUserModal = false;
        this.selectuser ={};
      },
      remove (index) {
        axios.get("/users/delete",{
          params: {
              id: this.userData[index]._id
          }
        }).then(res=>{
          this.userData.splice(index, 1);
        }).catch(e=>{
        });
      }
    }
  }
</script>
