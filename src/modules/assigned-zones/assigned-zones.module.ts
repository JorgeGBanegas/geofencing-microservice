import { Module } from '@nestjs/common';
import { AssignedZonesController } from './assigned-zones.controller';
import { AssignedZonesService } from './assigned-zones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignedZonesSchema } from 'schemas/assigned_zones.schema';
import { GeozonesSchema } from 'schemas/geozone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AssignedZones', schema: AssignedZonesSchema },
      { name: 'Geozone', schema: GeozonesSchema }
    ]),
  ],
  controllers: [AssignedZonesController],
  providers: [AssignedZonesService]
})
export class AssignedZonesModule {}
