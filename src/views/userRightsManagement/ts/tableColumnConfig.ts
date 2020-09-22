export interface TableColumns {
  type?: string;
  prop: string;
  label: string;
  width?: number;
}
const tableColumn: TableColumns[] = [
  { type: 'index', prop: 'index', label: '序号' },
  { prop: 'cus_todo', label: '操作', width: 145 },
  { prop: 'account', label: '账户' },
  { prop: 'name', label: '姓名' },
  { prop: 'position', label: '职位' },
  { prop: 'qq', label: 'QQ号', width: 110 },
  { prop: 'telephone', label: '电话', width: 120 },
  { prop: 'mail', label: '邮箱' },
  { prop: 'wechat', label: '微信号', width: 120 },
  { prop: 'full_py', label: '姓名拼音全拼', width: 110 },
  { prop: 'oaaccount', label: 'OA账户' },
  { prop: 'createtime', label: '创建日期' },
  { prop: 'updatetime', label: '修改日期' },
  { prop: 'isactivated', label: '是否启用' },
  { prop: 'locktime', label: '锁定时间' },
  { prop: 'errornum', label: '错误次数' },
  { prop: 'department', label: '部门' },
  { prop: 'des', label: '备注' },
];

export default tableColumn;
