export interface NavList {
  path: string;
  id: string;
  label: string;
  icon?: string;
}

/**
 * 一级导航目录：
 * 配置：id 不许和path一致不包含 ‘/'字段，用来选择样式
*/
export const NavListData: NavList[] = [
  { label: '投标主页', id: 'index', path: '/index' },
  { label: 'CRM', id: 'crm', path: '/crm' },
  { label: '基础信息', id: 'base', path: '/baseInfo' },
  {
    label: '统计分析',
    id: 'ttt',
    path: '/ttt',
    icon: 'el-icon-s-data'
  },
  { label: '用户管理', id: 'userManagement', path: '/userManagement' },
  { label: '角色管理', id: 'roleManagement', path: '/roleManagement' },
  { label: '菜单管理', id: 'menuManagement', path: '/menuManagement' }
];
