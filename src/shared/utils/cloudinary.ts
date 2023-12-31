import { v2 as cloudinaryV2 } from 'cloudinary';

class Cloudinary {
  constructor(){
    cloudinaryV2.config({ 
      cloud_name: process.env.CLOUDINARY_NAME as string, 
      api_key: process.env.CLOUDINARY_API_KEY as string, 
      api_secret: process.env.CLOUDINARY_API_SECRET as string 
    });
  }

  async uploadImage(filePath: string){    
    return await cloudinaryV2.uploader.upload(filePath, { folder: "API"});
  }
}

export const cloudinary = new Cloudinary();