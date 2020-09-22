const devServer = {
  port: 8888,
  open: true,
  proxy: {
    "/": {
      // target: 'http://10.33.11.112:3333' // 自己主机
      target: 'http://10.33.11.119:9091' // 刘意
    }
  }
};

module.exports = devServer;
