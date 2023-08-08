import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GeozonesService } from './geozones.service';
import CreateGeozoneDto from './dtos/create-geozone.dto';
import VerifyGeozoneDto from './dtos/verify-geozone.dto';

@Controller('geozones')
export class GeozonesController {
    constructor(
        private readonly geozoneService: GeozonesService,
    ) {}

    @Get()
    async getGeofencing() {
        return await this.geozoneService.getGeozones();
    }

    @Get('/:id')
    async getGeozoneById(@Param('id') id: string) {
        return await this.geozoneService.getGeozoneById(id);
    }


    @Post()
    async createGeofencing(@Body() geozone: CreateGeozoneDto) {
        return await this.geozoneService.createGeozone(geozone);
    }

    @Post('/verify')
    async isPointInGeozone(@Body() verifyGeozone: VerifyGeozoneDto) {
        const s =  await this.geozoneService.isPointInGeozone(verifyGeozone);
        console.log("🚀 ~ file: geozones.controller.ts:31 ~ GeozonesController ~ isPointInGeozone ~ s:", s)
        return s;
    }
}
