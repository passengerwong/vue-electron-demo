<template>
  <div class="login-page">
    <div class="login-input-wrap">
      <div class="title">用户登录</div>
      <el-form ref="form" :model="form">
        <el-form-item prop="userName">
          <el-input type="text" placeholder="请输入账号" v-model="form.userName" />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input type="password" placeholder="请输入密码" v-model="form.passWord" />
        </el-form-item>
      </el-form>
      <div class="submitBtn">
        <el-button type="primary" style="width: 100%;" @click="toSubmit">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'login'
})
export default class Login extends Vue {
  form: any = {
    userName: '',
    passWord: ''
  };
  rules: any = {
    userName: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    passWord: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
  }
  toSubmit() {
    const { userName, passWord } = this.form;
    if (!userName || !passWord) {
      this.$message({
        type: 'error',
        message: '请出入账号和密码'
      });
      return;
    }
    console.log('登录');
  }
}
</script>
<style lang="less">
.login-page {
  height: 100%;
  width: 100%;
  border: 2px solid #ccc;
  background-color: #fff;
  position: relative;
  .login-input-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    box-shadow: 0px 0px 6px 2px #ccc;
    width: 280px;
    padding: 25px 15px;
    border-radius:5px;
    .title {
      font-size: 20px;
      margin-bottom: 30px;
    }
    .submitBtn {
      margin-top: 30px;
    }
  }
}
</style>
