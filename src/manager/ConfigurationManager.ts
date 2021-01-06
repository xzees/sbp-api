import ConfigurationDatastore from 'datastore/ConfigurationDatastore'
import _ from 'lodash'
import Configuration from 'database/entity/Configuration';

class ConfigurationManager {
  static default: ConfigurationManager
  private datastore: ConfigurationDatastore = new ConfigurationDatastore()
  private configurations: { [key: string]: string } = {}
  private changesDetector: any

  private constructor() {
    this.configurations = {}
    this.refetchConfiguration()
    this.changesDetector = setInterval(
      this.refetchConfiguration.bind(this),
      50000
    )
  }

  static async init() {
    ConfigurationManager.default = new ConfigurationManager()
    await ConfigurationManager.default.refetchConfiguration()
  }

  private refetchConfiguration() {
    return this.datastore.getAllConfigurations().then(configurations => {
      configurations.forEach(configuration => {
        this.configurations[configuration.key] = configuration.value
      })
    })
  }

  getConfig(key: string, defaultValue: any = null) {
    return this.configurations[key] || defaultValue
  }

  getWithInterpolation(key: string, interpolation: { [key: string]: string }) {
    let item = this.getConfig(key) || ''
    _.forEach(interpolation, (value: string, keys: string) => {
      item = item.replace(`{${keys}}`, value)
    })
    return item
  }

  getFromDataStore(key: string) {
    return this.datastore.getConfiguration(key)
  }

  getAllFromDataStore(): Promise<Configuration[]> {
    return this.datastore.getAllConfigurations()
  }

  getConfigById(id: number) {
    return this.datastore.getById(id)
  }

  saveConfiguration(configuration: Configuration) {
    return this.datastore.saveConfiguration(configuration)
  }

  async update(id: number, value: string, note?: string) {
    const configuration = await this.getConfigById(id)
    if (!configuration) throw `Configuration with id ${id} is not found.`

    configuration.value = value

    if (note)
      configuration.note = note

    return this.saveConfiguration(configuration)
  }


  async insert(key: string, value: string, note: string = '') {
    try {
      const configuration = new Configuration()
      configuration.key = key
      configuration.value = value
      configuration.note = note
      return await this.saveConfiguration(configuration)
    } catch (error) {
      throw `Configuration with key ${key} is already exist`
    }
  }

  delete(id: number) {
    return this.datastore.delete(id)
  }
}

export default ConfigurationManager
