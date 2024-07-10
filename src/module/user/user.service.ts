import { CloudinaryService } from '@app/common';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doctor } from 'src/core/models/doctor.schema';
import { User } from 'src/core/models/user.schemas';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
        private readonly cloudinary: CloudinaryService,
    ) { }

    fetchProfile = async (
        userId: Types.ObjectId,
        options?: {
            fields?: string
        }
    ) => {
        const fields: string = options?.fields ?
            options.fields.replace('password', '').split(',').join(' ')
            : "name email pic phone isActive gender";

        const query = this.userModel.findById(userId);
        query.select(fields);
        query.select('-password');

        const user = await query.exec();

        if (!user) throw new HttpException('User not found', 404);

        return user;
    }

    updateProfile = async (
        data: {
            id: Types.ObjectId,
            name?: string,
            email?: string,
            phone?: string,
            image?: Express.Multer.File
        }
    ) => {
        const user = await this.userModel.findById(data.id);

        if (!user) throw new HttpException('User not found', 404);
        if (data.name) user.name = data.name;
        if (data.email) user.email = data.email;
        if (data.phone) user.phone = data.phone;
        if (data.image) {
            const image = await this.cloudinary.uploadImage(data.image.path);
            user.pic = image.url;
        }

        await user.save();

        return user;
    }
}
