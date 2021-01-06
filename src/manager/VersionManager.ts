import { ClientChannelEnum } from 'enum/ClientChannelEnum';
import ConfigurationManager from './ConfigurationManager';

class VersionManager {

  verify(version: string, channel: ClientChannelEnum) {
    let allowedVersions: string[] = []
    if (channel == ClientChannelEnum.MOBILE) {
      allowedVersions = String(ConfigurationManager.default.getConfig('allowed.mobile.app.versions') || '').split(',')
    } else if (channel == ClientChannelEnum.DESKTOP) {
      allowedVersions = String(ConfigurationManager.default.getConfig('allowed.desktop.app.versions') || '').split(',')
    }
    return allowedVersions.findIndex(x => x == version) >= 0
  }
  
}

export default VersionManager