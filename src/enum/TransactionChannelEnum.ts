export enum TransactionChannelEnum {
  DESKTOP_WEB = 'DESKTOP_WEB',
  MOBILE_WEB = 'MOBILE_WEB',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  MOBILE_APPLICATION = 'MOBILE_APPLICATION',
  OTHER = 'OTHER'
}

export const TransactionChannelEnumGetName = (channelEnum: TransactionChannelEnum): string => {
  switch (channelEnum) {
    case TransactionChannelEnum.ANDROID: return 'Android Application'
    case TransactionChannelEnum.IOS: return 'iOS Application'
    case TransactionChannelEnum.DESKTOP_WEB: return 'Desktop Website'
    case TransactionChannelEnum.MOBILE_WEB: return 'Mobile Website (Responsive)'
    case TransactionChannelEnum.MOBILE_APPLICATION: return 'Mobile Application'
    case TransactionChannelEnum.OTHER: return 'Other'
  }
}