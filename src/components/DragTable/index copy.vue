<template>
  <div class="drag-table-wrap">
    <div class="drag-tabl-toolbox" v-if="toolBox">
      <slot name="dragTableToolbox">
        <el-button type="primary" size="mini" @click="saveCusColumns">保存自定义列</el-button>
      </slot>
    </div>
    <el-table
      :class="['cus-drag-table', dragStatusObj.draging ? 'table-draging' : '']"
      :data="tableData"
      row-key="prop"
      :header-cell-class-name="headerCellClassName"
      border
      style="width: 100%">
      <el-table-column
        v-for="item in tableColumn"
        :type="item.type || ''"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :render-header="renderHeader">
      </el-table-column>
    </el-table>
    <div class="pagination-wrap" v-if="paginationShow">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="$attrs.pageSizes || [100, 200, 300, 400]"
        :page-size="$attrs.pageSizes && $attrs.pageSizes[0] || 100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="$attrs.pageTotal || 0">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'dragTable'
})
export default class DragTable extends Vue {
  @Prop({ default: () => [] }) columnList!: any[]; // 表格列数据
  @Prop({ default: () => [] }) tableData!: any[]; // 表格数据
  @Prop({ default: false }) toolBox!: boolean; // 工具栏是否显示
  @Prop({ default: false }) paginationShow!: boolean; // 分页功能是否显示
  // data---》 start
  currentPage = 1;
  tableColumn: any[] = [];
  dragStatusObj: any = { // 表格列拖动参数
    tableHeigth: 0,
    draging: false,
    start: undefined,
    end: undefined,
    direction: undefined
  };
  // data---》 end

  created() {
    this.tableColumn = [...this.columnList];
    console.log('--------props:', this.$attrs.noDrag);
  }

  // methods
  renderHeader (h: any, obj: any) { // 渲染表头
    const { column } = obj;
    const { label, property } = column;
    const { noDrag } = this.$attrs;
    if (noDrag) { // 不用拖拽
      return h('div', label);
    }
    return h('div', {
      class: 'cus-table-head cursor_pointer',
      on: {
        mousedown: () => this.handleMouseDown(column),
        mousemove: () => this.handleMouseMove(column),
        mouseup: () => this.handleMouseUp(column)
      }
    }, [
      h('div', { class: 'cus-thead-label' }, label),
      h('span', { class: `virtual-line ${this.dragStatusObj.dragNow === property ? 'isNow' : ''}` })
    ]);
  };
  handleMouseDown(columnData: any) { // 点击事件
    // const { index } = columnData;
    const startIndex = this.getColumnIndex(columnData);
    this.dragStatusObj.draging = true;
    if (startIndex >= 0) {
      this.dragStatusObj.start = startIndex;
    }
  };
  handleMouseMove(columnData: any) { // 鼠标移动事件
    const nowIndex: number = this.getColumnIndex(columnData);
    this.dragStatusObj.end = nowIndex; // 记录移动的最后位子
    const { start, end } = this.dragStatusObj;
    if (start !== undefined && end !== undefined && start !== end) {
      this.dragStatusObj.direction = end - start > 0 ? 'right' : 'left';
    }
  };
  handleMouseUp(columnData: any) { // 鼠标点击结束
    console.log('000up:', columnData);
    const { start, end } = this.dragStatusObj;
    if (start === undefined || end === undefined) return;
    // 移动最终数据
    this.moveColumnData({ ...this.dragStatusObj });
    // 还原数据
    this.dragStatusObj.draging = false;
    this.dragStatusObj.start = undefined;
    this.dragStatusObj.end = undefined;
  };
  moveColumnData(obj: any): void {
    const { start, end, direction } = obj;
    if (start !== end) {
      let columns: any[] = [...this.tableColumn];
      const startData: any = columns[start];
      columns.splice(start, 1, '');
      if (direction === 'right') {
        columns.splice(end + 1, 0, startData);
      } else if (direction === 'left') {
        columns.splice(end, 0, startData);
      }
      columns = columns.filter((v) => v);
      this.tableColumn = [];
      setTimeout(() => {
        this.tableColumn = columns;
      }, 10);
    }
  };
  getColumnIndex(data: any) {
    return this.tableColumn.findIndex(item => item.prop === data.property);
  };
  headerCellClassName(obj: any) { // 动态类名事件
    const { noDrag } = this.$attrs;
    if (noDrag) return;
    const { columnIndex } = obj;
    const { start, end } = this.dragStatusObj;
    if (start === undefined || columnIndex === start) return '';
    return columnIndex === end ? 'drag_actived' : '';
  };
  saveCusColumns() { // 保存自定义列数据方法
    this.$emit('saveColumnData', this.tableColumn);
  }
  // 分页方法
  handleSizeChange(...arg: any[]) {
    console.log('分页', arg);
    this.$emit('handleSizeChange', arg);
  };
  handleCurrentChange(...arg: any[]) {
    console.log('分页方法', arg);
    this.$emit('handleCurrentChange', arg);
  }
}
</script>
<style lang="less">
.drag-table-wrap {
  .drag-tabl-toolbox {
    text-align: right;
  }
  .cus-drag-table {
    &.table-draging {
      .el-table__header-wrapper, .cus-table-head {
        cursor: move;
      }
    }
    .el-table__header { // 头部
      .drag_actived {
        opacity: .3;
        border: 2px dashed #666;
      }
    }
  }
  .pagination-wrap {
    text-align: right;
  }
}
</style>
