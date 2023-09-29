import mongoose from "mongoose";
import { IBaseEntity } from "../models/baseSchema";

export abstract class BaseServiceMongo<T extends IBaseEntity> {
  protected model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  protected async getAllService(): Promise<T[]> {
    return this.model.find({});
  }

  public async getByIdService(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
  protected async postService(data: T): Promise<T> {
    const newModel = new this.model(data);
    return newModel.save();
  }

  protected async putService(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  protected async deleteService(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  protected async saveService(data: T): Promise<T> {
    return data.save();
  }
}