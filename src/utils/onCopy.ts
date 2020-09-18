function getEmythStr(num: number): string {
  let str = '';
  for (let k = 0; k < num; k++) {
    str += ' ';
  }
  return str;
}

// 复制功能 ---- echart数据转化为文本
export function echartToCopyText(data: any, option?: any) {
  const { x, y, title } = data;
  const { textDefaultL = 3, titleDefaultL = 5 } = option || {};
  const textareaEle: any = document.createElement('textarea');
  document.body.appendChild(textareaEle);
  let copyStr = `${title}\n`;
  // 计算标题最大长度
  let titleMaxL = 0;
  x.forEach((xV: any) => {
    const xVL = xV.toString().length;
    if (xVL > titleMaxL) {
      titleMaxL = xVL;
    }
  });

  for (let k = 0; k < x.length; k++) {
    const xTitle = x[k];
    const xLength = x[k].length; // 当前标题长度（空格8个，保持对齐和最长的比）
    copyStr += `${xTitle}${getEmythStr(titleMaxL + titleDefaultL - xLength)}`;
    // 把y轴值挨个放进去
    y.forEach((item: any) => {
      const { data } = item;
      let datamaxCount = 0;
      data.forEach((val: any) => {
        const valStr = val + '';
        if (valStr.length > datamaxCount) {
          datamaxCount = valStr.length;
        }
      });
      const dataK = data[k] + '';
      copyStr += `${dataK}${getEmythStr(datamaxCount + textDefaultL - dataK.length)}`;
    });
    copyStr += '\n';
  }
  textareaEle.value = copyStr;
  document.body.appendChild(textareaEle);
  // 复制
  textareaEle.select();
  document.execCommand('copy');
};

// 样式：
/**
 * 名称    总计（单位）
 * 标位    数量（单位）
 * 3.67   0.2
 */
