// 配置生产routes
const path = require('path');
const fs = require('fs');
const render = require('json-templater/string');
const baseRoutes = require('../src/router/routesConfig/pageRoutes.js');
const notFooundRoutes = require('../src/router/routesConfig/notFound.js');

const routesArr = [];

function replaceFormat(str) {
  if (str) {
    let newStr = str.replace(/[\{\}\:]\S{1}|\S{1}\}/g, function(regStr) {
      if (regStr.length > 1) {
        return `${regStr[0]} ${regStr[1]}`;
      }
    });
    return newStr.replace(/\"/g, '\'');
  }
  return str;
}

const baseTemplate = '{ path: \'{{path}}\', name: \'{{name}}\'';

const arr = [...baseRoutes, ...notFooundRoutes];

arr.forEach((item) => {
  if (item.redirect) {
    let str = baseTemplate + ', redirect: \'{{redirect}}\' }';
    routesArr.push(render(str, item));
    return;
  }
  if (item.meta) {
    let str = baseTemplate + ', meta: {{meta}}, component: () => import(/* webpackChunkName: \'{{name}}\' */ \'@/views/{{filePath}}/{{name}}\.vue\') }';
    let meta = JSON.stringify(item.meta);
    meta = meta.replace(/\"/g, '\''); // 替换单引号
    meta = replaceFormat(meta);
    routesArr.push(render(str, { path: item.path, name: item.name, meta, filePath: item.filePath}));
    return;
  }
  let str = baseTemplate + ', component: () => import(/* webpackChunkName: \'{{name}}\' */ \'@/views/{{filePath}}/{{name}}\.vue\') }';
  routesArr.push(render(str, item));
});

const mainStr = `// 该文件为最终路由表，为项目打包时候自动生成的文件，不需要手动修改该文件（修改也会无效被覆盖）\nconst routes: any = [\n  ${routesArr.join(',\n  ')}\n];\nexport default routes;\n`;

fs.writeFileSync(path.join(__dirname, '../src/router/routesConfig/routeConfig.ts'), render(mainStr)); // 写入路由文件
