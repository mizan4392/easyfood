import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { readFileSync } from 'fs';

@Injectable()
export class FileUploadService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImages(imgPaths: string[]): Promise<any> {
    console.log(imgPaths);
    try {
      const uploadPromises = imgPaths.map((path) => {
        const fileBuffer = readFileSync(path);
        return new Promise((resolve, reject) => {
          v2.uploader
            .upload_stream((error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(fileBuffer);
        });
      });

      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error uploading images to Cloudinary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
