export const environment = {
  production: true,

  operationList: {
    CN: 'https://dstore-operation-china.deepin.cn/',
    Default: 'https://dstore-operation-international.deepin.cn',
  } as { [key: string]: string },
  region: 'Default',
  autoSelect: true,
  operationServer: '',
  metadataServer: 'https://dstore-metadata.deepin.cn',
  themeName: 'light',
  locale: 'zh_CN',
  native: false,
  remoteDebug: false,
  supportSignIn: false,
  store_version: 0,

  server: 'http://store-chinauos.sndu.cn',
  store_env: {
    arch: 'amd64',
    mode: 'desktop',
    platform: 'community',
    region: 'CN',
    language: 'zh_CN',
    display: 'x11',
  },
  authorizationState: 1,
};
