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
        const bucket = "bucket-taller-ocso"
        const command = new PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket
        })
        return await this.s3.send(command);
    }
}
