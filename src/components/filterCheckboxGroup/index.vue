<template>
  <div class="filter-checkbox-group display_center">
    <div class="group-label display_center" v-if="groupLabel">{{groupLabel}}</div>
    <ul class="checkbox-group-wrap display_center" v-if="checkboxList && checkboxList.length">
      <!-- 单选不显示全部 -->
      <li v-if="!isSingle" :class="['check-all filter-item display_center', checkEdall ? 'isActived' : '']" @click.stop="clickCheckAll">全部</li>
      <li :class="['filter-item display_center', item.isActived ? 'isActived' : '']" @click.stop="itemClick(item, index)" v-for="(item, index) in checkboxList" :key="item.id || item.key || index">
        <span class="label">{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FilterItem } from './index.d';
import _ from 'lodash';

@Component({
  name: 'filterCheckboxGroup'
})
export default class FilterCheckboxGroup extends Vue {
  @Prop({ default: false }) isSingle!: boolean; // 是否为单选
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '' }) groupLabel!: string;
  @Prop({ default: function() { return []; } }) filterList!: FilterItem[];
  checkEdall = false; // 是否全选
  checkboxList: FilterItem[] = [];

  mounted() {
    this.initData();
  };

  // methods
  initData() {
    if (!this.filterList || !this.filterList.length) {
      console.error('[filtercheckboxgroup: error] 组件确实必要参数');
      return;
    }
    this.checkboxList = this.filterList.map((item: FilterItem) => {
      if (!('isActived' in item)) {
        item.isActived = false;
      }
      return item;
    });
  }
  clickCheckAll() {
    this.checkEdall = !this.checkEdall;
    this.groupCheckedAll('all');
    this.callBackValue();
  };
  itemClick(item: FilterItem, index: number) {
    const items = { ...item };
    items.isActived = !items.isActived;
    this.$set(this.checkboxList, index, items);
    if (this.isSingle) { // 单选设置互斥
      this.singleChecked(items, index);
    } else {
      this.groupCheckedAll(); // 多选联动
    }
    this.callBackValue();
  };
  singleChecked(item: any, idx: number) { // 单选互斥联动
    const { isActived } = item;
    this.checkboxList.forEach((item: any, index: number) => {
      if (isActived && idx !== index) { // 当前已经选中，其他关闭
        item.isActived = !isActived;
      }
    });
  };
  groupCheckedAll(type?: string) { // 全选联动
    if (type) { // 全选联动单个
      this.checkboxList.forEach((item: FilterItem) => {
        item.isActived = this.checkEdall;
      });
      return;
    }
    // 单个情况
    const checkedList: FilterItem[] = this.checkboxList.filter((item: FilterItem) => item.isActived);
    this.checkEdall = this.checkboxList.length === checkedList.length;
  };
  callBackValue() { // 双向绑定数据
    const values: FilterItem[] = [];
    const checkboxList = _.cloneDeep(this.checkboxList);
    checkboxList.forEach((item: FilterItem) => {
      if (item.isActived) {
        delete item.isActived;
        values.push(item);
      }
    });
    this.$emit('input', values);
  };
  clearAllChecked() { // 清空所有选项
    this.checkboxList.forEach((item: any) => {
      item.isActived = false;
    });
    this.$emit('input', []);
    return [];
  }
}
</script>
<style lang="less">
  @activedFontColor: rgb(63, 95, 173);
  .filter-checkbox-group {
    justify-content: flex-start;
    font-size: 13px;
    .group-label {
      font-weight: 700;
      color: #6E6B77;
      margin-right: 12px;
      width: 65px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      justify-content: flex-end;
    }
    .checkbox-group-wrap {
      justify-content: flex-start;
      .filter-item {
        height: 30px;
        padding: 0 15px;
        margin-right: 8px;
        border-radius: 3px;
        cursor: pointer;
        background-color: rgb(242, 244, 249);
        &.isActived {
          background: @activedFontColor;
          color: #fff;
          transition: all .5s;
          // font-weight: 700;
        }
      }
    }
  }
</style>
