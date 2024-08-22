import { Module } from '@nestjs/common';
import { UploadController, testController } from './upload.controller';
import { UploadService,FileSizeValidationPipe } from './upload.service';

@Module({
  controllers: [UploadController, testController],
  providers: [UploadService, FileSizeValidationPipe]
})
export class UploadModule {}
