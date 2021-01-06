import Configuration from 'database/entity/Configuration'
import { Repository, Connection } from 'typeorm'
import databaseManager from 'manager/DatabaseManager'

class ConfigurationDatastore {
  private repository: Repository<Configuration>
  private connection: Connection

  constructor() {
    this.repository = databaseManager.connection.getRepository(Configuration)
  }

  private getRepository() {
    return this.repository.createQueryBuilder('configuration')
  }

  getConfiguration(key: string): Promise<Configuration | undefined> {
    return this.getRepository()
      .where('key = :key', { key })
      .getOne()
  }

  getById(id: number): Promise<Configuration | undefined> {
    return this.getRepository().where('id = :id', { id }).getOne()
  }

  getAllConfigurations(): Promise<Configuration[]> {
    return new Promise((resolve, reject) => {
      this.repository
        .createQueryBuilder('configuration')
        .getMany()
        .then(configurations => resolve(configurations))
        .catch(err => {
          reject(err)
        })
    })
  }

  saveConfiguration(configuration: Configuration): Promise<Configuration> {
    return this.repository.save(configuration)
  }

  delete(id: number) {
    return this.getRepository().delete().where('id = :id', { id }).execute()
  }
}

export default ConfigurationDatastore
