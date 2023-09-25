import { BaseEntity, EntityTarget, Repository } from "typeorm";
import { postgreSQLConnection } from "../../../config/postgreSQL";

export abstract class BaseMiddleware<T extends BaseEntity> {
  public repository: Repository<T>;

  constructor(entity: EntityTarget<T>){
    this.repository = postgreSQLConnection.AppDataSource.getRepository(entity);
  }

  async getRepository<U extends BaseEntity>(entity: EntityTarget<U>){
    return postgreSQLConnection.AppDataSource.getRepository(entity);
  }

  

}