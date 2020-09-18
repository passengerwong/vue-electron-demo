<template>
  <PageBaseLayout>
    <template #baselayoutabs></template>
    <template #baselayoucontent>
      <div class="btn-wrap">
        <el-button type='primary' @click="toQueryData">查询</el-button>
      </div>
      <div class="datebar">
        <DateSelectCom :filterDateArr="dateFilterArr" v-model="dateSel" />
      </div>
      <div class="searchlist-item" v-for="(item, idx) in searchListData" :key="idx">
          <FilterGroup :groupLabel="item.label" :filterList="item.data" v-model="item.values" />
      </div>
    </template>
  </PageBaseLayout>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import FilterGroup from '@/components/filterCheckboxGroup/index.vue';
import DateSelectCom from '@/components/dateSelectCom/index.vue';
import MixinsFile from './mixin';

@Component({
  name: 'indexPage',
  components: { FilterGroup, DateSelectCom },
  mixins: [MixinsFile]
})
export default class IndexPage extends Vue {
  title = 'index page';
  filterList: any[] = [
    { label: 'one', id: '1' },
    { label: 'two', id: '2' },
    { label: 'three', id: '3' }
  ];
  filterValues: any[] = [];
  searchListData: any[] = [];
  dateFilterArr: any[] = [{ label: '前天', code: '01' }, { label: '昨天', code: '02' }];
  dateSel: any[] = [];

  created() {
    // this.$http.get('/test/getSearchList').then((res: any) => {
    //   const { data } = res;
    //   if (data && data.length) {
    //     this.processListData(data);
    //   }
    // });
  };
  processListData(data: any) {
    const list: any[] = data.map((item: any) => {
      if (!('values' in item)) {
        item.values = [];
      }
      return item;
    });
    this.searchListData = list;
  };
  toQueryData() {
    console.log('查询数据');
    this.processQueryParams();
  };
  processQueryParams() {
    const searchlist = this.searchListData;
    console.log('查询参数', searchlist);
    const obj: {[prop: string]: any} = {};
    searchlist.forEach((item: any) => {
      const k: string = item.code;
      if (item.data.length === item.values.length) {
        obj[k] = 'all';
        return;
      }
      if (!item.values || !item.values.length) {
        obj[k] = '';
        return;
      }
      obj[k] = item.values;
    });
    console.log('查询参数对象', obj);
  };
}
</script>
<style lang="less">
.searchlist-item {
  margin-bottom: 10px;
}
</style>
