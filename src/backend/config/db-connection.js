import mysql from 'mysql2/promise';

export default class DbConnection {

  static #configuration = {
    host: 'mysql', // This is the service name defined in the docker-compose file
    user: 'root',
    password: 'super',
    database: 'myDatabase'
  };

  static #dbConnection;

  static async getConnection() {
    if (this.#dbConnection != undefined) {
      console.log('[DatabaseConnection#getConnection] Connection already initialized, reusing...');
      return this.#dbConnection;
    }

    this.#dbConnection = await mysql.createConnection(this.#configuration);

    console.log('[DatabaseConnection#getConnection] Initializing...');
    await this.#dbConnection.connect();

    console.log('[DatabaseConnection#getConnection] Initialized');
    return this.#dbConnection;
  }
}
