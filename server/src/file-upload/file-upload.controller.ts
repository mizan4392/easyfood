import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(@UploadedFiles() files: any): Promise<any> {
    console.log(files);
    const filepaths = files.map((file) => file.path);

    return this.fileUploadService.uploadImages(filepaths);
  }
}
