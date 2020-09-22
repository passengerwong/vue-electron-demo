const path = require('path');
const devServer = require('./webpackConfig/devServer');
const resolve = (url) => path.join(__dirname, url);

require('./webpackConfig/buildRoutes.ts');
module.exports = {
  chainWebpack: config => {
    config.resolve.extensions.merge(['.js', '.ts', '.less', '.css', '.vue', '.json']);
    config.resolve.alias.set('@', resolve('src'));
  },
  // 第三方插件配置
  pluginOptions: {
    // vue-cli-plugin-electron-builder配置
    electronBuilder: {
      productName: 'electron-vue-demos', // 项目打包名称
      win: { // window
        icon: '', // 256*256软件图标ico格式
        target: [{
          traget: 'nsis', // 打包成一个独立的exe安装程序
          arch: ['x64'] // 打包出来32 bit + 64bit //  ia32
        }]
      },
      dmg: {
        contents: [
          {
            x: 410,
            y: 150,
            type: 'link',
            path: '/Applications'
          },
          {
            x: 130,
            y: 150,
            type: 'file'
          }
        ]
      },
      mac: {
        icon: ''
      },
      linux: {
        icon: '',
        target: 'AppImage'
      },
      files: ['**/*'],
      extraResources: { // 拷贝dll等静态文件到指定位置，否则打包后出现找不到dll问题
        from: 'resources/',
        to: './'
      },
      asar: false,
      nsis: {
        oneClick: false, // 是否一件安装，false一步步执行
        allowElevation: true, // 允许请求提升，如果为false用户必须使用提升的权限重新启动安装程序
        allowToChangeInstallationDirectory: true, // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
        installerIcon: '', // 安装图标ico格式
        uninstallerIcon: '', // 卸载图标
        installerHeaderIcon: '', // 安装是头部图标
        createDesktopShortcut: true, // 创建桌面快捷图标
        createStartMenuShortcut: true // 创建开始菜单图标
      }
    },
    chainWebpackMainProcess: config => { // 主进程
      config.plugin('define').tap(args => {
        args[0].IS_ELECTRON = true;
        return args;
      });
    },
    chainWebpackRendererProcess: config => { // 渲染进程
      config.plugin('define').tap(args => {
        args[0].IS_ELECTRON = true;
        return args;
      });
    }
  },
  devServer
};
