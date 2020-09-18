<template>
  <div class="dateSelectCom">
    <div class="datePickerWrap">
      <!-- <el-date-picker size="small" v-model="startDate" type="date" placeholder="选择开始时间" />
      <span class="line">-</span>
      <el-date-picker size="small" v-model="endDate" type="date" placeholder="选择结束时间" /> -->
      <el-date-picker
        size="small"
        v-model="date"
        type="daterange"
        start-placeholde="开始日期"
        end-placeholde="结束日期"
        value-format="yyyy-MM-dd"
        @change="dateChange"
      />
    </div>
    <div class="cus-date-group">
      <FilterGroup ref="filterGroup" :isSingle="true" :filterList="$attrs.filterDateArr" v-model="dateFilterValue" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import FilterGroup from '@/components/filterCheckboxGroup/index.vue';

@Component({
  name: 'dateSelectCom',
  components: { FilterGroup }
})
export default class DateSelectCom extends Vue {
  @Prop({ default: '' }) value!: string;
  startDate: any = '';
  endDate: any = '';
  date: any = null;
  dateFilterValue: any = [];

  @Watch('dateFilterValue', { deep: true }) // 单选框选择适合清楚日期
  dateFilterValueChange(cur: any[]) {
    if (cur && cur.length) {
      this.date = null;
      this.$emit('input', cur);
    }
  }

  // methods
  dateChange(val: any) {
    if (val && val.length) { // 清空联动选项
      const filterGroupRef: any = this.$refs.filterGroup;
      filterGroupRef.clearAllChecked();
      this.$emit('input', val);
    }
  }
}
</script>
<style lang="less">
.dateSelectCom {
  display: inline-flex;
  align-items: center;
  .datePickerWrap {
    .el-date-editor.el-input {
      width: 160px;
    }
  }
  .line {
    display: inline-block;
    padding: 0 15px;
  }
  .cus-date-group {
    margin-left: 15px;
  }
}
</style>
