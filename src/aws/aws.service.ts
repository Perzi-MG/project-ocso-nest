import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.accesskey_bucket || '',
            secretAccessKey: process.env.secretkey_bucket || ''
        }
    })
    async uploadFile(file: Express.Multer.File){
        const key = file.originalname
        const url = `https://bucket-taller-ocso.s3.us-east-2.amazonaws.com/${key}`
        const bucket = "bucket-taller-ocso"
        // https://bucket-taller-ocso.s3.us-east-2.amazonaws.com/foto_2.jpg
        const command = new PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket
        })
        await this.s3.send(command);
        return url
    }
}
