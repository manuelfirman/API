import "dotenv/config";
import { DataSource } from "typeorm";

export class PostgreSQLConnection {
  private DBPort: number;
  private setSSL: boolean;
  public AppDataSource: DataSource;

  constructor(){
    this.DBPort = !process.env.SQL_PORT_DB ? 5432 : parseInt(process.env.SQL_PORT_DB);

    this.setSSL = !process.env.SSL_DB 
    ? false 
    : process.env.SSL_SUPPORT === "0"
      ? false
      : process.env.SSL_SUPPORT === "1" && true;

    this.AppDataSource = new DataSource({
      type: "postgres",
      host: process.env.SQL_HOST_DB,
      port: this.DBPort,
      username: process.env.SQL_USER_DB,
      password: process.env.SQL_PASSWORD_DB,
      database: process.env.SQL_NAME_DB,
      synchronize: true,
      logging: false,
      ssl: this.setSSL,
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../migrations/*{.ts,.js}"],
      subscribers: [],
      migrationsRun: true,
    });
  }

  async initialize(): Promise<void> {
    await this.AppDataSource
      .initialize()
      .then(() => console.log("PostgreSQL Database connected"))
      .catch((error) => console.log(error));
  }

  async destroy(): Promise<void> {
    await this.AppDataSource.destroy();
  }

}

export const postgreSQLConnection = new PostgreSQLConnection();