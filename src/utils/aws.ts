import { S3 } from 'aws-sdk';

export async function uploadImagesOnAWS(files: Array<Express.Multer.File>) {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const images: { Bucket: string; Key: string; Location: string }[] = [];

      files.forEach(async (file) => {
        const filename = file.originalname;

        const params = {
          Bucket: `${process.env.AWS_BUCKET_NAME}/${process.env.AWS_BUCKET_FOLDER}`,
          Key: filename,
          Body: file.buffer,
        };

        const uploadResponse = await s3.upload(params).promise();

        images.push({
          Bucket: uploadResponse.Bucket,
          Key: uploadResponse.Key,
          Location: uploadResponse.Location,
        });

        if (images?.length === files.length) resolve(images);
      });
    } catch (error) {
      reject(error);
    }
  });
}
