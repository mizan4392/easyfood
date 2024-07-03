import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { readFileSync } from 'fs';
import * as fs from 'fs';
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
      imgPaths.forEach((path) => {
        fs.unlinkSync(path);
      });
      return uploadResults;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error uploading images to Cloudinary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadImage(imgPath: string): Promise<any> {
    try {
      const fileBuffer = readFileSync(imgPath);
      const uploadedFile = await new Promise((resolve, reject) => {
        v2.uploader
          .upload_stream((error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(fileBuffer);
      });

      fs.unlinkSync(imgPath);
      return uploadedFile;
    } catch (error) {
      throw new HttpException(
        'Error uploading images to Cloudinary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
