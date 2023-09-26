
import mongoose from 'mongoose';
import { IImage } from './image.interface';
import { BaseSchema } from '../shared/models/baseSchema';

export class ImageSchema extends BaseSchema<IImage> {
  constructor() {
    super();
    this.schema.add({
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { 
        public_id: { type: String, required: true },
        url: { type: String, required: true }
      }
    })
  }
}

export const Image: mongoose.Model<IImage> = mongoose.model<IImage>('Image', new ImageSchema().schema);