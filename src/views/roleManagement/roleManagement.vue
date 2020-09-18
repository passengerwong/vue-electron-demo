<template>
  <div class="roleManagement" name="roleManagement">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">新增/修改角色</span>
        <div class="header-btn">
          <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
      <div class="edit-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="名称" prop="name"><el-input v-model="form.name"></el-input></el-form-item>
            </el-col>
            <el-col :span="12" :offset="2">
              <el-form-item label="角色说明" prop="explain"><el-input v-model="form.explain"></el-input></el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title require_label">菜单<span class="red">*</span></span>
      </div>
      <div>
        <el-tree
          :data="menuData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          @check="treeCheckChange"
          :props="defaultProps">
        </el-tree>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
// 角色管理页 (row-key必须有)
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'roleManagement'
})
export default class MenuManagement extends Vue {
  title = '菜单管理页面';
  form: any = {
    name: '',
    explain: ''
  };
  rules: any = {
    name: [{ required: true, message: '名称为必填项', trigger: 'blur' }]
  }
  defaultProps: any = {
    children: 'children',
    label: 'label'
  };
  menuData: any[] = [];
  menuDataCopy: any[] = [
    {
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }
  ];
  created() {
    this.queryMenuList();
  };
  // methods
  queryMenuList() { // 查询菜单数据
    this.$http.get('/index/getMenus').then((res: any) => {
      console.log('菜单数据', res);
      const { data } = res;
      if (data.data && data.data.length) {
        this.menuData = data.data;
      }
    }).catch((err: any) => {
      console.log('----查询菜单数据', err);
    });
  }
  treeCheckChange() {
    // console.log('dfdfds', a, b, c, this.menuData);
    const a = (this.$refs.tree as any).getCheckedNodes();
    console.log('dfdfd', a);
  };
  toValidate(): boolean { // 保存角色-菜单配置
    const { name } = this.form;
    const checkedList = (this.$refs.tree as any).getCheckedNodes();
    if (!name) {
      this.$message({
        message: '名称为必填项',
        type: 'warning'
      });
      return false;
    }
    if (!checkedList || !checkedList.length) {
      this.$message({
        message: '菜单必须要选择',
        type: 'warning'
      });
      return false;
    }
    return true;
  }
  onSubmit() { // 提交数据保存
    if (this.toValidate()) {
      console.log('保存数据');
    }
  };
}
</script>
<style lang="less">
  .roleManagement[name='roleManagement'] {
    .el-card {
      // background: transparent;
    }
    .box-card {
      .clearfix {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 16px;
          font-weight: bold;
        }
        .header-btn {
        }
      }
      .el-tree {
        background: transparent;
      }
    }
  }
</style>
