const MixinsFile = {
  created() {
    const href = window.location.href;
    if (href.includes('localhost')) { // 开发环节
      const opt: any = (this as any).$options;
      const vueName: string = opt.name;
      if (vueName) {
        window[vueName] = this;
      }
    }
  }
};

export default MixinsFile;
