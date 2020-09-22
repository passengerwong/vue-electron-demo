<template>
  <div class="menuManagement" name="menuManagement">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px;">菜单管理</span>
      </div>
      <!-- 内容部分 -->
      <div class="control-btn-wrap" style="margin: 10px 0;">
        <el-button size="mini" @click="addRootDirectory">
          <span style="color: #333;margin-right: 6px;">添加根目录</span>
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-button size="mini" type="primary" @click="menuSave">保存</el-button>
      </div>
      <div class="menu-tree-wrap">
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          ref="tree"
          draggable
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="cus-label">{{ node.label }}</span>
            <span class="edit-wrap" v-if="data.isEdit">
              名称：
              <el-input class="custom-tree-input" size="mini" type="text" placeholder="请输入名称" v-model="data.labelCopy" />
              URL：
              <el-input class="custom-tree-input" size="mini" type="text" placeholder="请输入url" v-model="data.pathCopy" />
              图标：
              <el-input class="custom-tree-input" size="mini" type="text" placeholder="请输入图标" v-model="data.iconCopy" />
              <el-button size="mini" type="primary" @click="treeDataSave(data)">保存</el-button>
            </span>
            <span class="control-btn">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                <el-button
                  type="text"
                  size="mini"
                  @click="() => edit(data)">
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                    <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="新增" placement="top-start">
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  <i class="el-icon-circle-plus-outline"></i>
                </el-button>
              </el-tooltip>
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import _ from 'lodash';

@Component({
  name: 'menuManagement',
  components: { }
})
export default class MenuManagement extends Vue {
  treeData: any[] = [];
  treeDataCopy: any[] = [];
  created() {
    this.queryMenuList();
  };
  // methods
  queryMenuList() { // 查询菜单列表
    this.$http.get('/auth/listMenu').then((res: any) => {
      const { data } = res;
      if (data && data.code === '000000' && data.data) {
        const resultData: any[] = data.data;
        const listRes = this.processTheData(resultData);
        this.treeData = _.cloneDeep(listRes);
        this.treeDataCopy = _.cloneDeep(listRes);
        console.log('处理后数据', listRes);
      }
    });
  };
  processTheData(list: any[]) {
    if (list && list.length) {
      return list.map((item: any) => {
        item.isEdit = false; // 添加编辑属性
        // copy path 和 id 便于还原
        item.pathCopy = item.path; // 备份path
        item.idCopy = item.id; // 备份id
        item.labelCopy = item.label; // 备份label
        item.iconCopy = item.icon; // 备份图标
        if (item.children) {
          item.children = this.processTheData(item.children);
        }
        return item;
      });
    } else {
      return [];
    }
  };
  addRootDirectory() { // 添加根目录
    console.log('添加根目录', this.treeData);
    const newLine: any = { id: '--', label: '新增的目录', children: [], isEdit: true };
    this.treeData.push(newLine);
  };
  append(data: any) {
    const newChild = { id: '', label: 'testtest', children: [], isEdit: true };
    if (!data.children) {
      this.$set(data, 'children', []);
    }
    data.children.push(newChild);
  };
  remove(node: any, data: any) {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const index = children.findIndex((d: any) => d.id === data.id);
    children.splice(index, 1);
  };
  edit (data: any) { // 编辑按钮（显示隐藏输入框）
    data.isEdit = !data.isEdit; // 关闭修改条
  };
  treeDataSave(data: any) { // 单条编辑保存按钮 (将copy中内容覆盖到原值)
    data.label = data.labelCopy;
    data.path = data.pathCopy;
    data.icon = data.iconCopy;
    // data.id = data.pathCopy;
    // 重新规划id（不能手动更改，在drag的时候需要）
    data.isEdit = false;
    console.log('0000', data);
  };
  menuSave() { // 最终数据保存方法
    const target = (this.$refs.tree as any).getCheckedNodes();
    const treeData: any = _.cloneDeep(this.treeData);
    console.log('去保存，查看现在的数据', this.treeData);
    // 下面处理被选中的内容----》可能没有被选中的但是内容被修改了也是需要保存的，还有就是有被选中的代表可能存在增删改的效果
    const ooo = this.toSaveData(treeData, target); // 得到被选中的内容
    console.log('0fdsf', ooo);
    if (!ooo || !ooo.length) {
      console.log('没有被选中的数据', ooo);
    }
  };
  toSaveData(list: any[], targetList: any[]) { // 去保存处理数据
    // 处理被选中的内容
    return list.filter((item: any) => {
      if (item.children && targetList.find(v => v.id.includes(item.id))) { // 待修改（如果有children的情况通过drag后变化位置无法通过includes判断）
        item.children = this.toSaveData(item.children, targetList);
        return item;
      } else if (targetList.find(v => v.id === item.id)) { // 已经有了
        return item;
      }
    });
  }
}
</script>
<style lang="less">
  .menuManagement[name="menuManagement"] {
    .add-menu-level1 {
      color: red;
    }
    .menu-tree-wrap {
      border: 1px solid red;
      padding-left: 20px;
    }
    .el-tree-node__content {
      height: 40px;
    }
    .custom-tree-node {
      .custom-tree-input {
        width: 200px;
        margin-right: 10px;
      }
      .cus-label {
        width: 120px;
        display: inline-block;
        margin-right: 15px;
      }
      .edit-wrap {
        margin-right: 10px;
      }
    }
  }
</style>
