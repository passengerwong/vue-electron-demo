<template>
  <div class="exportFileCommon">
    <el-button v-bind="buttonConfig" @click="exportBtnClick">{{exportButtonName}}</el-button>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

type BeforFunction = (done?: () => void) => void | null;

@Component({
  name: 'exportFileCommon'
})
export default class ExportFileCommon extends Vue {
  @Prop({ default: '导出' }) exportButtonName!: string;
  @Prop({ default: function() { return { type: 'primary', size: 'medium' }; } }) buttonConfig!: any;
  @Prop({ default: function() { return null; } }) beforeExportFile!: BeforFunction;
  exportType = ''; // 导出类型（目前要求的是Excel和txt）
  // methods
  exportBtnClick() { // 导出按钮click
    // 如果希望在导出前做自己的操作这个地方给配置暴露出去，然后在通过回调方式走导出
    const beforeExportFile = this.beforeExportFile;
    if (beforeExportFile && typeof beforeExportFile === 'function') {
      beforeExportFile(this.exportFile);
      return;
    }
    this.exportFile();
  };
  exportFile() {
    console.log('开始导出功能');
    this.$http({ url: '/test/exporttest', method: 'post', responseType: 'blob', 'Content-type': 'application/json' }).then((res: any) => {
      console.log('--f', res);
      const content = res.data;
      const blob = new Blob([content], { type: 'application/vnd.ms-excel' });

      const a = document.createElement('a');
      a.download = 'hah.xlsx';
      const link = URL.createObjectURL(blob);
      a.href = link;
      a.click();
      window.URL.revokeObjectURL(link);
    });
  }
}
</script>
<style lang="less">
  .exportFileCommon {
    display: inline-block;
  }
</style>
