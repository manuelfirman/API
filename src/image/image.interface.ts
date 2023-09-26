import { IBaseEntity } from '../shared/models/mongodb/baseSchema';
export interface IImage extends IBaseEntity {
  name: string;
  description: string;
  image: object;
}