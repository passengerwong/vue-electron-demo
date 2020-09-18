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
          <el-form-item label="账户" prop="accmount"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="姓名" prop="name"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <!-- <el-form-item label="姓名拼音全拼"><el-input v-model="form.name"></el-input></el-form-item> -->
          <el-form-item label="职位"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span='8'>
          <el-form-item label="职位"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col> -->
        <el-col :span='8'>
          <el-form-item label="电话"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="邮箱"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="QQ"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='8'>
          <el-form-item label="微信"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="OA账户"><el-input v-model="form.name"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="启用">
            <el-radio-group v-model="form.isOpen">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-select v-model="form.region" placeholder="请选择部门">
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
          <el-form-item label="备注"><el-input v-model="form.name"></el-input></el-form-item>
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
  form: any = {
    name: '222',
    region: 'beijing',
    date1: '2020-09-10',
    isOpen: '',
  }
  rules: any = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    accmount: [
      { required: true, message: '请输入活动名称', trigger: 'blur' }
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
  crated() {
    if (this.editData && Object.keys(this.editData).length) {
      this.form = this.editData;
    }
  };
  handleSelectionChange(val: any) {
    this.multipleSelection = val;
    console.log('dfsd', this.multipleSelection);
  }
  onSubmit() {
    this.$emit('onSubmit');
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
