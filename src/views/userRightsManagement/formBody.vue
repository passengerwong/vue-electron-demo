<template>
  <div class="formBody">
    <div class="headers display_center" style="margin-bottom: 20px">
      <div class="title">新增/修改用户</div>
      <div class="close-btn">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span='8'>
          <el-form-item label="账户" prop="account"><el-input :disabled="formDisable.account" v-model="form.account"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="姓名" prop="name"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="QQ" prop="qq"><el-input v-model="form.qq"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='8'>
          <el-form-item label="OA账户" prop="oaaccount"><el-input v-model="form.oaaccount"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="微信"><el-input v-model="form.wechat"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="职位"><el-input v-model="form.position"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='8'>
          <el-form-item label="电话"><el-input v-model="form.telephone"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="邮箱"><el-input v-model="form.mail"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="启用" prop="isactivated">
            <el-radio-group v-model="form.isactivated">
              <el-radio label="Y">是</el-radio>
              <el-radio label="N">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门" prop="department">
            <el-select v-model="form.department" placeholder="请选择部门">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级账户">
            <el-select v-model="form.region" placeholder="请选择部门">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="备注"><el-input v-model="form.des"></el-input></el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <div class="label role display_center">角色<span class="require">*</span></div>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          label="复选框"
          width="55">
        </el-table-column>
        <el-table-column
          label="角色名称"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="角色说明"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'userRightsManagementForm'
})
export default class FormBody extends Vue {
  @Prop({ default: {} }) editData!: any;
  @Prop({ default: 'add' }) dialogType!: string;
  @Prop({ default: '' }) editUserId!: string; // 编辑的id
  formDisable: any = {
    accmount: false
  };
  form: any = {};
  rules: any = { // 表单检验规则
    account: [
      { required: true, message: '请输入账户', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    qq: [
      { required: true, message: '请输入QQ号', trigger: 'blur' }
    ],
    oaaccount: [
      { required: true, message: '请输入OA账户', trigger: 'blur' }
    ],
    isactivated: [
      { required: true }
    ],
    department: [
      { required: true }
    ]
  };
  multipleSelection: any[] = [];
  tableData: any[] = [{
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }]
  // methods
  created() {
    if (this.dialogType && this.dialogType === 'edit') { // 编辑
      this.formDisable.account = true;
      if (this.editUserId) { // 如果有id去请求
        this.getUserData();
        return;
      }
      this.form = this.editData;
    }
  };
  getUserData() { // 查询用户信息
    this.$http.get('/auth/findUserByUserId', { params: { userId: this.editUserId } }).then((res: any) => {
      const { data } = res;
      if (data && data.code === '000000' && data.data) {
        this.form = data.data || {};
      }
    }).catch((err: any) => {
      console.log('-----编辑，请求用户数据失败：', err);
    });
  };
  getUserRoles() { // 查询用户的角色配置
    // this.$http.get('auth/findRolesByOA')
  }
  // auth/findRolesByOA
  handleSelectionChange(val: any) {
    this.multipleSelection = val;
    console.log('dfsd', this.multipleSelection);
  };
  validateData() {
    const params: any = { ...this.form };
    let msg = '';
    if (!params.account) {
      msg = '请输入账户';
    } else if (!params.name) {
      msg = '请输入姓名';
    } else if (!params.qq) {
      msg = '请输入QQ号';
    } else if (!params.oaaccount) {
      msg = '请输入OA账户';
    } else if (!params.isactivated) {
      msg = '请选择是否启用';
    } else if (!params.department) {
      msg = '请选择部门';
    }
    if (msg) {
      this.$message({ message: msg, type: 'warning' });
      return false;
    }
    return params;
  }
  onSubmit() { // 保存用户信息（新增或者编辑）
    // 提前检验必填内容
    const params: any = this.validateData();
    if (params) {
      this.$emit('onSubmit');
    }
  }
  closeDialog() {
    this.$emit('closeDialog', false);
  }
}
</script>
<style lang="less">
.el-dialog__body {
  padding-top: 0;
}
.formBody {
  .headers {
    justify-content: space-between !important;
    padding-right: 20px;
    .title {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .label.role {
    margin: 0 5px 10px;
    padding-left: 8px;
    height: 35px;
    border: 1px solid #ccc;
    justify-content: flex-start;
    color: #909399;
    font-weight: bold;
    span.require {
      color: red;
      font-weight: 400;
    }
  }
}
</style>
