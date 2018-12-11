
<template>
    <div>
      <Table id="_table" border :columns="userColumns" :data="logData"  v-bind:height="height" ></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" :page-size="limit" :page-size-opts="sizeOpt" show-sizer show-total @on-change="changeTablePage" @on-page-size-change ="pageSizeChange"></Page>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from  "axios";
  export default {
    data () {
      return {
        total:0,
        limit:10,
        current:1,
        sizeOpt:[5,10,20],
        height:200,
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
            title: '路径',
            key: 'url'
          },

          {
            title: '日期',
            key: 'time'
          }
        ],
        logData: []
      }
    },

    mounted() {
      this.getLogTableData();
      this.setHeight();
    },
    methods: {

      setHeight(){
        this.height = this.$parent.$parent.$el.clientHeight - 110;
      },

      pageSizeChange(size){
        this.limit =size;
        this.getLogTableData();
      },
      changeTablePage (page) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        this.current =page;
        this.getLogTableData();
      },
      getLogTableData(  ){
        axios.get("/logs/query",{
          params:{
            limit:this.limit,
            page: this.current
          }
        }).then(res=>{
          this.logData = res.data.result.list;
          this.total  =  res.data.result.length ;
        }).catch(e=>{

        });
      },
    }
  }
</script>


<style scoped>

</style>
