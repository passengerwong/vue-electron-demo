<template>
  <div class="page-nav-com">
    <div class="logo display_center">logo</div>
    <div class="nav-menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        v-if="menuListData && menuListData.length"
        mode="horizontal">
        <template v-for="(item, idx) in menuListData">
          <el-submenu v-if="item.children && item.children.length" :index="item.id || item.path" :key="item.id || idx">
            <template slot="title">{{item.name || item.label}}</template>
            <el-menu-item
              v-for="(subItem, subidx) in item.children"
              :key="subItem.id || subidx"
              :index="subItem.id || subItem.path"
              @click="jumpTo(subItem)"
            >
              <i :class="subItem.icon || ''" />
              <span class="navLabel">{{subItem.name || subItem.label}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.id || item.path" :key="item.id || idx" @click="jumpTo(item)">
            <i :class="item.icon || ''" />
            <span class="navLabel">{{item.name || item.label}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <ul class="user-set cursor_pointer">
      <li
        :class="`display_center ${item.className}`"
        v-for="item in accountSetList"
        :key="item.id"
        @click="jumpTo(item)"
      >{{item.label}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { NavList, NavListData } from './config';
import logoutFunc from '@/views/login/tools/logout';

@Component({
  name: 'pageNav'
})
export default class PageNavCom extends Vue {
  activeIndex: string | undefined = 'index';
  navList: NavList[] = NavListData;
  menuListData: NavList[] = [];
  accountSetList: any[] = [
    { label: '账户设置', className: 'account-set', path: '', id: '1' },
    { label: '退出登录', className: 'login-out', path: '/logout', id: '2' },
  ];
  async created() {
    await this.queryMenuList();
    this.initRouter();
  };
  queryMenuList() { // 查询菜单请求
    return this.$http.get('/auth/findMenusByOA', { params: { oa: 'fumj' } }).then((res: any) => {
      const { data } = res;
      if (data.data && data.data.length) {
        this.menuListData = data.data;
      }
    }).catch((err: any) => {
      console.log('查询菜单数据失败: ', err);
    });
  }
  initRouter() { // 初始化router相关，包括我们选择nav
    let hashStr = window.location.hash;
    hashStr = hashStr.replace('#/', '');
    if (!hashStr) hashStr = 'index'; // 没有值的时候直接定位首页标签
    // 扩展后期的二级菜单，这里使用包含来判断不是===
    const items: any = this.menuListData.find(v => v.path.includes(hashStr));
    if (items && items.id) {
      this.activeIndex = items.id;
      return;
    }
    this.activeIndex = undefined;
  };
  jumpTo(item: any) {
    const { path } = item;
    console.log('jumpto', path, item);
    if (path) {
      if (path === '/logout') {
        // 执行退出登录，跳转到登录页
        return logoutFunc(this);
      }
      const hashStr: string = window.location.hash;
      if (hashStr.includes(path)) return; // 点击自己不执行
      this.$router.push({ path });
    }
  }
}
</script>
<style lang="less">
  @navPrimaryColor: rgb(70, 76, 91);
  @hoverColor:  rgba(25, 158, 216, 1);
  @normalFontColor: #ccc;
  @hoverFontColor:#fff;
  .page-nav-com{
    height: 80px;
    background-color: @navPrimaryColor;
    display: flex;
    align-items: center;
    padding: 0 12px;
    .logo {
      width: 50px;
      height: 50px;
      margin-right: 12px;
      min-width: 50px;
      background-color: rgba(215, 215, 215, 1);
      color: #fff;
      border-radius: 100%;
      overflow: hidden;
      justify-content: center;
      flex-shrink: 0;
    }
    .nav-menu {
      height: 100%;
      flex: 1;
      .el-menu-demo {
        height: 100%;
        border: none;
        background-color: @navPrimaryColor;
        .el-submenu, .el-submenu__title {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .el-menu-item,
        .el-submenu,
        .el-submenu__title  {
          height: 100%;
          display: flex;
          align-items: center;
          color: @normalFontColor;
          &.is-active, &:hover {
            border: none;
            background-color: @hoverColor;
            color: @hoverFontColor;
            i {
              color: @hoverFontColor;
            }
            .el-submenu__title {
              color: @hoverFontColor;
            }
          }

        }
      }
    }
    .user-set {
      flex-shrink: 0;
      display: flex;
      color: @normalFontColor;
      height: 100%;
      li {
        height: 100%;
        padding: 0 15px;
        text-decoration: underline;
        &:hover {
          background-color: @hoverColor;
          color: @hoverFontColor;
        }
      }
    }
  }
</style>
