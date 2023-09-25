import { BaseServiceMongo } from "../shared/services/mongodb/servicesMongo";
import { IPhoto } from "./photo.interface";
import { PhotoModel } from "./photo.model";

export class PhotoServices extends BaseServiceMongo<IPhoto> {
    constructor(){
      super(PhotoModel);
    }
}

