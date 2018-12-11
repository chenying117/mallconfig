<template>
  <Form ref="formValidate" :model="user" :rules="ruleValidate" :label-width="80">
    <FormItem label="账号" prop="userName">
      <Input v-model="user.userName" placeholder="请输入你的账号"></Input>
    </FormItem>
    <FormItem label="姓名" prop="name">
      <Input v-model="user.name" placeholder="请输入你的姓名"></Input>
    </FormItem>
    <FormItem label="邮箱" prop="email">
      <Input v-model="user.email" placeholder="请输入邮箱"></Input>
    </FormItem>
    <FormItem label="联系电话" prop="tel">
      <Input v-model="user.tel" placeholder="请输入联系电话"></Input>
    </FormItem>
    <FormItem label="部门" prop="class">
      <Select v-model="user.class" @on-change ="valueChange" placeholder="请选择部门">
        <Option v-for="item in classList" :value="item.class" :key="item.class">{{item.className}}</Option>

      </Select>
    </FormItem>
    <FormItem label="" prop="className" v-show="false">
      <Input v-model="user.className" placeholder=""></Input>
    </FormItem>
  <!--  <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>-->
  </Form>
</template>
<script>
  import axios from "axios";
  export default {
    props:["user"],
    data () {
      return {
        classList:[{
            class:"1",
            className: "软件部"
        },{
          class:"2",
          className: "硬件部"
        },{
          class:"3",
          className: "市场部"
        }],
        ruleValidate: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
         email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          class: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ]
        }
      }
    },
    mounted() {


    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

              if(this.user._id){
                axios.post("/users/update",this.user).then( res=>{
                  this.$emit('updateTableData');
                  this.$Message.success('Success!');
                });
              }else{
                axios.post("/users/add",this.user).then( res=>{
                  this.$emit('updateTableData');
                  this.$Message.success('Success!');
                });
              }


          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      valueChange(index){
          for(var i =0; i < this.classList.length;i++){
              if(this.classList[i].class == index){
                  this.user.className = this.classList[i].className;
              }
          }
      }
    }
  }
</script>
