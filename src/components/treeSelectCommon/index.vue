<template>
  <div class="commonTreeSelect" v-if="treeData && treeData.length">
    <!-- <div class="treeItems" v-for="(item, idx) in treeData" :key="item.id + idx || idx">
      <div class="levaelitem-btn"><span v-if="'isOpen' in item && item.children && item.children.length" :class="['btn-icons', item.isOpen ? 'el-icon-minus' : 'el-icon-plus']"></span></div>
      <div class="levelitem-checkbox"> <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox></div>
      <ul class="children-wrap">
      </ul>
    </div> -->
    <TreeItem :itemData="item" v-for="(item) in treeData" :key="item.id" @checkBoxChange="checkBoxChange" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TreeItem from './treeItem.vue';
import selectBus from './bus';

@Component({
  name: 'commonTreeSelect',
  components: { TreeItem }
})
export default class CommonTreeSelect extends Vue {
  title = 'commontess'
  treeData: any[] = [];
  created() {
    (window as any).tree = this;
    this.initData();
    selectBus.$on('checkboxChange', (val: any, itemData: any) => {
      console.log('bus传值', val, itemData);
    });
  }
  initData() {
    const initTreeData = this.$attrs.data;
    if (!initTreeData || !Array.isArray(initTreeData) || !initTreeData.length) {
      console.error('[cus-com: error], component/treeSelectCommon error, initData error');
      return;
    }
    this.treeData = initTreeData;
    console.log('初始化数据为：', this.treeData);
  };
  checkBoxChange(val: any, item: any) {
    console.log('-----', val, item);
    // 工作内容：1、选中后判断同级是否全选---》控制上级，2、判断是否有下级---》控制下级是否全选或者全不选
  }
}
</script>
<style lang="less">
.commonTreeSelect {
  // .treeItems {
  //   font-size: 16px;
  //   line-height: 22px;
  //   color: #333;
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
  //   .levaelitem-btn {
  //     width: 20px;
  //     height: 20px;
  //     .btn-icons {
  //       font-size: 13px;
  //       font-weight: 900;
  //       cursor: pointer;
  //     }
  //   }
  // }
}
</style>
