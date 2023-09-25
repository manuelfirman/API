import mongoose from 'mongoose';

export interface IBaseEntity extends mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export abstract class BaseSchema<T extends IBaseEntity> {
  public schema: mongoose.Schema<T>;

  constructor() {
    this.schema = new mongoose.Schema<T>(
      {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
      { versionKey: false }
    );
  }
}