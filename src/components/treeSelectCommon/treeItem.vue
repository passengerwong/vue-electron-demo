<template>
  <div class="treeItems">
    <div class="items-content">
      <div class="levaelitem-btn">
        <span
          v-if="'isOpen' in itemData && itemData.children && itemData.children.length"
          :class="['btn-icons', itemData.isOpen ? 'el-icon-minus' : 'el-icon-plus']"
          @click.stop="itemData.isOpen = !itemData.isOpen"
        />
      </div>
      <div class="levelitem-checkbox">
        <el-checkbox v-model="itemData.checked" @change="checkboxChange"></el-checkbox>
        <span class="checkbox-label">{{itemData.label}}</span>
      </div>
      <div class="level-item-control-btn">
        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
          <el-button type="text" size="mini" @click="controlBtnClick('edit')"><i class="el-icon-edit"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
          <el-button type="text" size="mini" @click="controlBtnClick('delete')"><i class="el-icon-delete"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="新增" placement="top-start">
          <el-button type="text" size="mini" @click="controlBtnClick('add')"><i class="el-icon-circle-plus-outline"></i></el-button>
        </el-tooltip>
      </div>
    </div>
    <ul class="children-wrap" v-if="'isOpen' in itemData && itemData.children && itemData.children.length && itemData.isOpen">
      <tree-selectItem v-for="val in itemData.children" :key="val.id" :itemData="val" />
    </ul>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import selectBus from './bus';

@Component({
  name: 'treeSelectItem'
})
export default class TreeItems extends Vue {
  @Prop({ default: function() { return {}; } }) itemData!: any;
  created() {
    console.log('0fdsfds', this.itemData);
  }
  checkboxChange(val: any) {
    this.$emit('checkBoxChange', val, this.itemData);
    selectBus.$emit('checkboxChange', val, this.itemData);
  }
  controlBtnClick(type: string) {
    console.log('type:', type);
    selectBus.$emit('btnClick', type, this.itemData);
  }
}
</script>
<style lang="less">
  .treeItems {
    font-size: 16px;
    line-height: 28px;
    color: #333;
    .items-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .levaelitem-btn {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .btn-icons {
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          color: #C0C4CC;
        }
      }
      .levelitem-checkbox {
        .checkbox-label {
          margin-left: 15px;
          display: inline-block;
          width: 80px;
        }
      }
      .level-item-control-btn {
        color: red;
      }
    }
    .children-wrap {
      padding-left: 25px;
    }
  }
</style>
