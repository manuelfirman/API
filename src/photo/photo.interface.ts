import { IBaseEntity } from '../shared/models/mongodb/baseSchema';
export interface IPhoto extends IBaseEntity {
  title: string;
  description: string;
  imagePath: string;
}