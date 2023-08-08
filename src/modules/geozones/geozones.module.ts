import { Module } from '@nestjs/common';
import { GeozonesController } from './geozones.controller';
import { GeozonesService } from './geozones.service';
import { GeozonesSchema } from 'schemas/geozone.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignedZonesSchema } from 'schemas/assigned_zones.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Geozone', schema: GeozonesSchema },
      { name: 'AssignedZones', schema: AssignedZonesSchema}
    ])
  ],
  controllers: [GeozonesController],
  providers: [GeozonesService]
})
export class GeozonesModule {}
