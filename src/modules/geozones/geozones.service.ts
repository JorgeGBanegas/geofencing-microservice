import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Geozone } from 'schemas/geozone.schema';
import CreateGeozoneDto from './dtos/create-geozone.dto';
import VerifyGeozoneDto from './dtos/verify-geozone.dto';
import * as turf from '@turf/turf';
import { AssignedZones } from 'schemas/assigned_zones.schema';
import { DAY } from '../assigned-zones/dtos/create-assigned-zones.dto';

@Injectable()
export class GeozonesService {
    constructor(
        @InjectModel(Geozone.name) private readonly geozonesModel: Model<Geozone>,
        @InjectModel(AssignedZones.name) private readonly assignedZonesModel: Model<AssignedZones>,
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


    async getGeozones(): Promise<Geozone[]> {
        const zone =  await this.geozonesModel.find().exec();
        console.log("🚀 ~ file: geozones.service.ts:42 ~ GeozonesService ~ getGeozones ~ zone:", zone)
        return zone;
    }

    async getGeozoneById(id: string): Promise<Geozone> {
        console.log("🚀 ~ file: geozones.service.ts:47 ~ GeozonesService ~ getGeozoneById ~ id:", id)
        const z =  await this.geozonesModel.findOne({ _id: id });
        console.log("🚀 ~ file: geozones.service.ts:48 ~ GeozonesService ~ getGeozoneById ~ z:", z)
        return z;
    }

    async createGeozone(geozone: CreateGeozoneDto): Promise<Geozone> {

        const existGeozone = await this.geozonesModel.findOne({ name: geozone.name });
        if (existGeozone) {
            throw new HttpException('Ya existe una zona con ese nombre', 409);
        }
        const createdGeozone = new this.geozonesModel(geozone);
        return await createdGeozone.save();
    }

    async isPointInGeozone(verifyGeozone: VerifyGeozoneDto): Promise<any> {
        
        const point = turf.point(verifyGeozone.coordinates);
        const day = this.getDayOfWeek(new Date().getDay());
        const geozone = await this.assignedZonesModel.findOne(
            { employeeEmail: verifyGeozone.emailEmployee, day }
            ).populate('zoneId');
        
        
        if (!geozone) {
            throw new HttpException('No hay zonas asignadas para este empleado este dia', 404);
        }

        const coordinates = geozone.zoneId.coordinates;
        const formattedCoordinates = [];
        formattedCoordinates.push(coordinates);

        const polygon= turf.polygon(formattedCoordinates);
        const isInGeozone =  turf.booleanPointInPolygon(point, polygon);
        return {
            isInGeozone,
            message: isInGeozone ? 'Se encuentra en la zona asignada' : 'No se encuentra en la zona asignada',
        };
    }
}
