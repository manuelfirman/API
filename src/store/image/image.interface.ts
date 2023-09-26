import { IBaseEntity } from '../shared/models/baseSchema';
export interface IImage extends IBaseEntity {
  name: string;
  description: string;
  image: object;
}