import { Controller, Get, UsePipes, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Console } from 'console';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { FileSizeValidationPipe } from './upload.service';
import { FileTypeValidationPipe } from './upload.service';
// export const multerOptions = {
//   storage: diskStorage({
//     destination: './uploads', // 存储文件的目录
//     filename: (req, file, callback) => {
//       // 使用原始文件名作为上传文件的名称
//       const ext = path.extname(file.originalname);
//       const name = path.basename(file.originalname, ext);
//       callback(null, `${name}-${Date.now()}${ext}`);
//     },
//   }),
//   fileFilter: (req, file, callback) => {
//     // 仅允许上传 xlsx 文件
//     if (!file.originalname.match(/\.(xlsx)$/)) {
//       return callback(new Error('Only .xlsx files are allowed!'), false);
//     }
//     callback(null, true);
//   },
//   limits: {
//     fileSize: 20000, // 文件大小限制为 20000 字节（20KB）
//   },
// };

interface ListItem {
  title: string;
  subTitle: string;
  content?: string;
}

interface DataItem {
  title: string;
  subTitle: string;
  list: ListItem[];
}

@Controller('upload')
export class UploadController {

  @Post()
  @UsePipes(FileSizeValidationPipe, FileTypeValidationPipe) // 应用管道
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("----上传aaaa");
    // console.log(file);
    try {
       // 读取 .xlsx 文件内容
       const workbook = XLSX.read(file.buffer, { type: 'buffer' });

       // 解析每个表格的数据
       const data = workbook.SheetNames.map(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const raw_rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as (string | number)[][];
        const rows = raw_rows.filter((item)=>(item.length > 0))
        console.log(rows)
        // 检查数据是否有内容
        if (rows.length < 2) {
          return {
            title: sheetName,
            subTitle: '',
            list: []
          };
        }

        // 提取标题和副标题
        const [headers, ...contentRows] = rows;
        // console.log(headers)
        // console.log(contentRows)
        const title = headers[0] as string || ''; // 第一列作为标题
        const subTitle = headers[1] as string || ''; // 第二列作为副标题

        // 处理内容行
        const preList={}
        const list: ListItem[] = contentRows.map(row => ({
          title: row[0] as string || '', // 第一列内容作为标题
          // content: row.slice(1).map(cell => cell?.toString() || '').join(' ') // 剩余列作为内容
          subTitle: row[1] as string || '', // 第一列内容作为标题
          list: (row[2] as string).split('\r\n').map((item, index)=>(
            {
              title: item,
              content: (row[3] as string).split('\r\n')[index]
            }
          ))

        }));
        console.log(list)

        return list;
      });
       

       // 返回解析后的数据
       return {
         message: 'File uploaded and parsed successfully!',
         filename: file.originalname,
         data: data
       };

    } catch (error) {
      console.error('Error processing file:', error);
      throw new BadRequestException('Failed to process file');
    }

  }
}

@Controller('test')
export class testController {
  @Get()
  getHello(): string {
    console.log("----XXX");
    return "xxxxx";
  }

}