import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AssignedZones } from 'schemas/assigned_zones.schema';
import { Geozone } from 'schemas/geozone.schema';
import CreateAssignedZones, { DAY } from './dtos/create-assigned-zones.dto';
@Injectable()
export class AssignedZonesService {
    constructor(
        @InjectModel(AssignedZones.name) private readonly assignedZonesModel: Model<AssignedZones>,
        @InjectModel(Geozone.name) private readonly geozonesModel: Model<Geozone>,
    ) {}
    getDayOfWeek = (dayNumber: number): DAY => {
        switch (dayNumber) {
            case 1:
                return DAY.MONDAY;
            case 2:
                return DAY.TUESDAY;
            case 3:
                return DAY.WEDNESDAY;
            case 4:
                return DAY.THURSDAY;
            case 5:
                return DAY.FRIDAY;
            case 6:
                return DAY.SATURDAY;
            case 0:
                return DAY.SUNDAY;
            default:
                throw new Error('Invalid day number');
        }
    };

    async assignZone(assignedZone: CreateAssignedZones): Promise<AssignedZones[]> {
        try {
            const { employeeEmail, dayAndZone } = assignedZone;
            const zoneIds = dayAndZone.map(pair => pair.zoneId);

            // Verificar si todos los zoneId existen en la colección de geozonas
            const allZoneIdsExist = await Promise.all(zoneIds.map(async (zoneId) => {
                return await this.geozonesModel.exists({ _id: zoneId });
            }));
            
            // Verificar si todos los zoneId existen en la colección
            const allExist = allZoneIdsExist.every((exists) => exists);

            if (!allExist) {
                throw new HttpException('Alguna de las zonas no existe', HttpStatus.NOT_FOUND);
            }

            const newAssignedZones: AssignedZones[] = [];

                // Iterar a través del arreglo dayAndZone y guardar o sobrescribir cada asignación
            for (const pair of dayAndZone) {
                const { day, zoneId } = pair;

                // Buscar y actualizar la asignación existente o crear una nueva si no existe
                const existingAssignment = await this.assignedZonesModel.findOneAndUpdate(
                    { employeeEmail, day },
                    { employeeEmail, day, zoneId },
                    { upsert: true, new: true }
                );

                newAssignedZones.push(existingAssignment);
            }

            return newAssignedZones;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new HttpException('Identificador de zona inválido', HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }

    //Get zones assigned to an employee with email
    async getZonesWithEmployeeEmail(employeeEmail: string): Promise<AssignedZones[]> {
        return await this.assignedZonesModel.find({ employeeEmail }).populate({
            path: 'zoneId',
            select: 'name _id',
        });
    }

    async getZoneWithEmployeeEmailAndDay(employeeEmail: string): Promise<AssignedZones> {
        //get current day
        const date = new Date();
        const day = date.getDay();
        const dayOfWeek = this.getDayOfWeek(day);
        console.log("🚀 ~ file: assigned-zones.service.ts:89 ~ AssignedZonesService ~ getZoneWithEmployeeEmailAndDay ~ dayOfWeek:", dayOfWeek)
        return await this.assignedZonesModel.findOne({ employeeEmail, day: dayOfWeek }).populate('zoneId');

    }
}
