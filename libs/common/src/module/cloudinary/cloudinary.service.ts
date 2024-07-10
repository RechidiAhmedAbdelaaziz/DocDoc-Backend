import { HttpException, Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,

        });
    }

    uploadImage = async (path: string) => {
        const result = await cloudinary.uploader
            .upload(
                path,
                {
                    folder: "DocDoc",
                }
            )
            .catch((error) => {
                throw new HttpException(error, 500)
            });

        return result;

    }

}
