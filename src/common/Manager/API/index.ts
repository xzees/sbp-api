
class APIConfig {
  static default: APIConfig = new APIConfig()

  private constructor() { }

  getConfigs() {
    return ''
  }

  getBaseUrl(): string {
    return this.getConfigs()
  }

  getRequestHeaders() {
    // const configs = env.development
    return {
      // channel: configs.channel,
      // app_version: `${appVersion.version}-${appVersion.build}`,
      // lang: !!RootStore ? RootStore.default.LocalizationStore.lang.toLocaleLowerCase() : 'TH',
      // transaction_channel: !!RootStore ? (RootStore.default.ScreenManager.isMobile ? TransactionChannelEnum.MOBILE_WEB : TransactionChannelEnum.DESKTOP_WEB) : TransactionChannelEnum.DESKTOP_WEB
    }
  }
}

export default APIConfig
