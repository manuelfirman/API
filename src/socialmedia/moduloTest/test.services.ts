import { BaseServices } from "../shared/services/servicesPostgres";
import { TestEntity } from "./test.entity";

export class TestServices extends BaseServices<TestEntity> {
  constructor(){
    super(TestEntity);
  }

  // Agregar servicios especificos para la entidad
}

export const TestServicesInstance = new TestServices();