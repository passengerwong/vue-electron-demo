export interface TableColumns {
  type?: string;
  prop: string;
  label: string;
}
const tableColumn: any = [
  { type: 'index', prop: '', label: '序号' },
  { prop: 'one', label: '操作', width: 145 },
  { prop: 'two', label: '账户' },
  { prop: 'three', label: '姓名' },
  { prop: 'four', label: '职位' },
  { prop: 'five', label: 'QQ号' },
  { prop: 'six', label: '电话' },
  { prop: 'six1', label: '邮箱' },
  { prop: 'seven', label: '微信号' },
  { prop: 'eight', label: '姓名拼音全拼', width: 110 },
  { prop: 'nine', label: 'OA账户' },
  { prop: 'ten', label: '创建日期' },
  { prop: 'ten1', label: '修改日期' },
  { prop: 'ten2', label: '是否启用' },
  { prop: 'ten3', label: '锁定时间' },
  { prop: 'ten4', label: '错误次数' },
  { prop: 'ten5', label: '部门' },
  { prop: 'ten6', label: '备注' },
];

export default tableColumn;
