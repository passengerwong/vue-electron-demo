<template>
  <div class="login-page">
    <div class="login-input-wrap">
      <div class="title">修改密码</div>
      <el-form ref="form" :model="form">
        <!-- <el-form-item prop="userName">
          <el-input type="text" placeholder="请输入账号" v-model="form.userName" />
        </el-form-item> -->
        <el-form-item prop="passWord">
          <el-input type="password" placeholder="请输入密码" v-model="form.passWord" />
        </el-form-item>
        <el-form-item prop="passWordConfirm">
          <el-input type="password" placeholder="请在此确认密码" v-model="form.passWordConfirm" />
        </el-form-item>
      </el-form>
      <div class="errMsg">
        <div v-show="errMsg">{{errMsg}}</div>
      </div>
      <div class="submitBtn">
        <el-button type="primary" style="width: 100%;" @click="toSubmit">提交</el-button>
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
    passWord: '',
    passWordConfirm: ''
  };
  errMsg = ''; // 提示信息
  timer: any = 0;
  rules: any = {
    userName: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    passWord: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
  }
  validateData() { // 校验
    const { passWord, passWordConfirm } = this.form;
    if (!passWord || !passWordConfirm) {
      this.setErrMsg('请出入密码');
      return false;
    } else if (passWord !== passWordConfirm) {
      this.setErrMsg('两次输入密码不一致，请确认密码');
      return false;
    }
    return true;
  };
  setErrMsg(msg: string) {
    if (msg) {
      this.errMsg = '';
      clearTimeout(this.timer);
      this.errMsg = msg;
      this.timer = setTimeout(() => {
        this.errMsg = '';
      }, 1500);
    }
  };
  toSubmit() {
    if (this.validateData()) { // 可以修改
      console.log('登录');
    }
  };
  beforeDestroy() {
    clearTimeout(this.timer);
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
    .errMsg {
      font-size: 14px;
      color: red;
      line-height: 20px;
      height: 20px;
      opacity: .7;
    }
    .submitBtn {
      margin-top: 10px;
    }
  }
}
</style>
