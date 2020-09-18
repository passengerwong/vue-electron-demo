<template>
  <div class="page-base-layout">
    <div class="base-layout-tab-wrap"><slot name="baselayoutabs" /></div>
    <div class="base-layout-content-wrap"><slot name="baselayoucontent" /></div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'pagebaselayout'
})
export default class PageBaseLayout extends Vue {

}
</script>
<style lang="less">
  .page-base-layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    // background-color: rgba(242, 244, 249, 1);
    .base-layout-tab-wrap {
      height: 46px;
    }
    .base-layout-content-wrap {
      flex: 1;
      // border: 2px solid rgba(204, 204, 204, 1);
    }
  }
</style>
