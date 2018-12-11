import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import system from '@/views/system/system'
import user from '@/views/system/user/user'
import log from '@/views/system/logs/log'
Vue.use(Router)
export default new Router({
  routes:[
    {path:'/',name:'layout_index',component:layout,children:[   //二级路由

      {path:'system',name:'sys_index',component:system,children: [  //三级路由
        {path:'user',name:'user_index',component:user},
        {path:'log',name:'log_index',component:log}
      ]},
    ]}
  ],
  mode:"history"
});


