// 登录页面使用到的方法库

// localstroge取值
function getLocalStorageItem(key: string): string | null {
  return window.localStorage.getItem(key);
};

// localstroge设置
function setLocalStorageItem(key: string, val: any): void {
  if (!key) {
    console.error('[logon->>loginTool]: 使用setLocalStorageItem函数缺少必要参数，或者参数异常，你传入的为', key);
    return;
  }
  window.localStorage.setItem(key, val);
};

function updateLoginState() { // 更新登录成功数据(userId, userName)
};

export { getLocalStorageItem, setLocalStorageItem, updateLoginState };
