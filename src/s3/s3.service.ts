import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3;
  private bucket: string;
  private folder: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
    });

    this.bucket = this.configService.get<string>('AWS_BUCKET_NAME') as string;
    this.folder = this.configService.get<string>('AWS_BUCKET_FOLDER') as string;
  }

  async uploadImagesOnAWS(files: Array<Express.Multer.File>) {
    const uploads = files.map(async (file) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: this.bucket,
        Key: `${this.folder}/${filename}`, // Folder in the Key, not Bucket
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const uploadResponse = await this.s3.upload(params).promise();

      return {
        Bucket: uploadResponse.Bucket,
        Key: uploadResponse.Key,
        Location: uploadResponse.Location,
      };
    });

    return Promise.all(uploads); // Ensure all uploads complete
  }
}





// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class S3Service {}
