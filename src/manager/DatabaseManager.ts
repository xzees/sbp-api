import { Connection } from "typeorm";
import databaseConnection from "database/connection";

class DatabaseManager {

  connection: Connection
  isConnected: boolean = false

  createConnection(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      databaseConnection.createConnection()
        .then(connection => {
          this.isConnected = true
          this.connection = connection
          resolve(true)
        })
        .catch(err => {
          this.isConnected = false
          console.log(err)
          process.exit(1)
        })
    })
  }
}

const databaseManager = new DatabaseManager()

export default databaseManager