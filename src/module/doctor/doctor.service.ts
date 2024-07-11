import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Doctor } from 'src/core/models/doctor.schema';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
    ) { }


    async getDoctorById(id: Types.ObjectId, options: {
        fields?: string,
    }) {
        //remove the password field from the query
        const fields = options.fields ? options.fields.split(',').filter((field) => field !== 'password').join(' ') : '';
        return await this.doctorModel.findById(id,).select(fields);
    }

    async listDoctors(
        args: {
            specialty?: string,
            search?: string,
            sort?: string,
            page?: number,
            limit?: number,
        }
    ) {

        const page = args.page || 1;
        const limit = args.limit || 10;
        const { specialty, search, sort } = args;

        const query: FilterQuery<Doctor> = {};

        if (specialty) {
            query.role = specialty;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }


        const doctors = await this.doctorModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(sort);

        const total = await this.doctorModel.countDocuments(query);

        const pagination = {
            page: page,
            length: doctors.length,
            nextPage: total > page * limit ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
        }

        return {
            pagination,
            doctors,
        };

    }
}
