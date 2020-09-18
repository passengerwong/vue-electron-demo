<template>
  <div class="echart-wrap" id="echart-com-wrap">
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import echarts from 'echarts';
@Component({
  name: 'echartsCom'
})
export default class EchartsCom extends Vue {
  @Prop({ default: () => null }) options!: any;
  @Prop({ default: false }) showEmpth!: boolean;
  mychart: any = '';
  echartEle: HTMLDivElement | null = null;
  defaultOpts: any = {
    toolbox: {}
  };

  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  }

  initEchart() { // 初始化echarts
    // 先检测是否有参数
    // if (this.isEmpty()) return;
    const echartsEle: HTMLDivElement | null = document.querySelector('#echart-com-wrap');
    if (!echartsEle && !this.mychart) {
      this.initEchart();
      return;
    }
    this.echartEle = echartsEle;
    echartsEle && (this.mychart = echarts.init(echartsEle));
    this.mychart && this.echartSetOpt();
    this.addEventLister();
  }

  echartSetOpt() { // 设置echarts参数
    // const opts: any = {...this.defaultOpts, ...this.options};
    this.mychart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false
          },
          saveAsImage: {}
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    });
  }

  isEmpty(): boolean { // 显示空并判空的时候返回true，注入空状态
    return true;
  }

  addEventLister() { // 注册事件
    if (this.mychart) {
      window.addEventListener('resize', () => {
        console.log('0000resizer');
        this.mychart.resize();
      });
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.mychart.resize();
    });
  }
}
</script>
<style lang="less">
  .echart-wrap {
    width: 100%;
    height: 100%;
  }
</style>
