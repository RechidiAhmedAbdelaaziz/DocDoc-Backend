import { HttpException, Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from 'src/core/models/doctor.schema';
import { User } from 'src/core/models/user.schemas';
import { AppointmentRequest } from 'src/core/models/appointmentrequest.schema';
import { Appointment } from 'src/core/models/appointment.schema';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(AppointmentRequest.name) private readonly appointmentRequestModel: Model<AppointmentRequest>,
        @InjectModel(Appointment.name) private readonly appointmentModel: Model<Appointment>,
        private readonly notificationService: NotificationService,
    ) { }

    sendRequest = async (data: {
        date: Date;
        message: string;
        doctorId: Types.ObjectId;
        patientId: Types.ObjectId;
    }) => {

        const { date, message, doctorId, patientId } = data;


        const doctor = await this.doctorModel.findById(doctorId);
        if (!doctor) throw new HttpException('Doctor not found', 404);
        if (!doctor.isAvailable) throw new HttpException('Doctor is not available', 400);

        const patient = await this.userModel.findById(patientId);
        if (!patient) throw new HttpException('Patient not found', 404);

        const checkRequest = await this.appointmentRequestModel.findOne({
            doctor: doctorId,
            patient: patientId,
        });
        if (checkRequest) throw new HttpException('You already have a pending request to this Dr', 400);

        const request = await this.appointmentRequestModel.create({
            date,
            message,
            doctor: doctorId,
            patient: patientId,
        });

        await this.notificationService.createNotification({
            description: message,
            title: 'Appointment Request from ' + patient.name,
            user: doctorId,
        });

        return request;

    }

    acceptRequest = async (data: {
        requestId: Types.ObjectId;
        doctorId: Types.ObjectId;
    }) => {
        const { requestId, doctorId } = data;

        const request = await this.appointmentRequestModel.findById(requestId);
        if (!request || !request.doctor.equals(doctorId)) throw new HttpException('Request not found', 404);

        const doctor = await this.doctorModel.findById(request.doctor)
        if (!doctor) throw new HttpException('Doctor not found', 404);
        const patient = await this.userModel.findById(request.patient);
        if (!patient) throw new HttpException('Patient not found', 404);

        const appointment = await this.appointmentModel.create({
            doctor: doctor._id,
            patient: patient._id,
            date: request.date,
        });

        Promise.all([
            request.deleteOne(),
            this.notificationService.createNotification({
                description: 'You have an appointment in ' + request.date + ' with ' + doctor.name,
                title: 'Appointment Request Accepted by ' + doctor.name,
                user: patient._id,
            }),
        ])



        return appointment;
    }

    cancelRequest = async (data: {
        requestId: Types.ObjectId;
        userId: Types.ObjectId;
    }) => {
        const { requestId, userId } = data;



        const request = await this.appointmentRequestModel.findById(requestId);
        if (!request ||
            (!request.doctor.equals(userId) &&
                !request.patient.equals(userId))
        )
            throw new HttpException('Request not found', 404);

        const doctor = await this.doctorModel.findById(request.doctor)
        if (!doctor) throw new HttpException('Doctor not found', 404);
        const patient = await this.userModel.findById(request.patient);
        if (!patient) throw new HttpException('Patient not found', 404);


        await request.deleteOne();
        if (request.doctor == userId) {
            await this.notificationService.createNotification({
                description: 'Your appointment request has been refused by ' + doctor.name,
                title: 'Appointment Request Refused by ' + doctor.name,
                user: patient._id,
            });
        }

    }


    fetchAppointments = async (
        args: {
            userId: Types.ObjectId;
            page?: number;
            limit?: number;
            status?: string;
            date?: Date;
        }
    ) => {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const { userId, status, date } = args;

        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        const user = await this.userModel.findById(userId);
        if (!user) throw new HttpException('User not found', 404);

        const query = {};

        if (user['kind'] == 'Doctor') query['doctor'] = userId;
        else query['patient'] = userId;
        if (date) query['date'] = { $gte: dayStart, $lte: dayEnd };
        query['status'] = status || 'Upcoming';

        const total = await this.appointmentModel.countDocuments(query);

        const appointments = await this.appointmentModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ date: -1 });


        const pagination = {
            page,
            length: appointments.length,
            nextPage: total > page * limit ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
        }




        return {
            pagination,
            appointments,
        };
    }


}
