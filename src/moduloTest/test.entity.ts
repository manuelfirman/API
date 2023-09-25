import { Column, Entity } from "typeorm";
import { BaseEntityApp } from "../shared/models/postgresql/baseEntity";
@Entity()
export class TestEntity extends BaseEntityApp {
  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 200 })
  description: string;
}