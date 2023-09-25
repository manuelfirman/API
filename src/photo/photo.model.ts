
import mongoose from 'mongoose';
import { IPhoto } from './photo.interface';
import { BaseSchema } from '../shared/models/mongodb/baseSchema';

export class PhotoSchema extends BaseSchema<IPhoto> {
  constructor() {
    super();
    this.schema.add({
      title: { type: String, required: true },
      description: { type: String, required: true },
      imagePath: { type: String, required: true }
    })
  }
}

export const PhotoModel: mongoose.Model<IPhoto> = mongoose.model<IPhoto>('Photo', new PhotoSchema().schema);