
import { BaseSchema } from "../shared/models/mongodb/schema";

export class TestEntity1 extends BaseSchema {
  constructor() {
    super();

    this.schema.add({
      name: String,
      description: String
    })
  }
}