import { PipeTransform, BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as mime from 'mime-types'; // 用于获取文件 MIME 类型

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 10000000; // 设定文件大小限制为  字节（10KMB）
    console.log("大小校验")
    console.log(value.size)
    // 校验文件大小
    if (value.size > oneKb) {
      throw new BadRequestException('File size exceeds the allowed limit of 10MB.');
    }

    return value; // 返回文件对象，如果验证通过
  }
}
@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const allowedMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; // .xlsx 文件的 MIME 类型

    // 获取文件 MIME 类型
    const mimeType = mime.lookup(value.originalname);
    
    if (!allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException('Invalid file type. Only .xlsx files are allowed.');
    }

    return value;
  }
}
// 在管道中加入解析xlxs ， 打印出解析的表格内容
@Injectable()
export class UploadService {}