import { BaseEntity, EntityTarget, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { postgreSQLConnection } from "../../../config/postgreSQL";


export abstract class BaseServices<T extends BaseEntity>{
  public repository: Repository<T>;

  constructor(entity: EntityTarget<T>){
    this.repository = postgreSQLConnection.AppDataSource.getRepository(entity);
  }

  async getRepository<U extends BaseEntity>(entity: EntityTarget<U>): Promise<Repository<U>> {
    return postgreSQLConnection.AppDataSource.getRepository(entity);
  }

  async getAllService(): Promise<T[]> {
    return await this.repository.find();
  }

  async getByIdService(id: number): Promise<T | null> {
    return await this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  async postService(data: T): Promise<T | null> {
    return this.repository.save(data);
  }

  async putService(id: number, data: T): Promise<UpdateResult | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.repository.update({ id } as unknown as FindOptionsWhere<T>, data as any);
  }

  async deleteService(id: number): Promise<T | null> {
    const entityToDelete = await this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);

    if(!entityToDelete) return null;
    
    await this.repository.remove(entityToDelete);
    return entityToDelete;
  }
}