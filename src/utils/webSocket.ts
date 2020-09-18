// webSocket 统一封装

type Func = () => void;

interface Iprop {
  url: string;
  onSend: null | Func;
  onOpen: null | Func;
  onMessage:  null | Func;
}

interface WebSocketParam extends Iprop {
  version: string;
}

class CommonWebsocket implements WebSocketParam {
  constructor(props: Iprop) {
    const { url } = props;
    this.url = url;
  }
  version = '1.0.0';
  url = '';
  onSend = null;
  onOpen = null;
  onMessage = null;
}

function createWebsocket(url: string, opt: any) { // 创建websocket
  if ('WebSocket' in window) {
    try {
      if (!url) {
        throw ('缺失url!')
        return;
      }
      const ws = new WebSocket(url);

      // open事件
      ws.onopen = () => {
        console.log('websocket: 创建&链接成功');
      }

      return ws;
    }
    catch(msg) {
      console.error('[createWebsocket: "websocket in winodw"]: 创建异常--' + msg);
    }
  } else {
    console.error('[error: websocket]: 浏览器不支持websocket，创建websocket失败！');
  }
}

export default CommonWebsocket;
