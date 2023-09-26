import { BaseServiceMongo } from "../shared/services/servicesMongo";
import { IImage } from "./image.interface";
import { Image } from "./image.model";

export class ImageServices extends BaseServiceMongo<IImage> {
    constructor(){
      super(Image);
    }
}

