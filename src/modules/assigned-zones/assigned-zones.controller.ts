import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssignedZonesService } from './assigned-zones.service';
import CreateAssignedZones from './dtos/create-assigned-zones.dto';

@Controller('assigned-zones')
export class AssignedZonesController {
    constructor(
        private readonly assignedZonesService: AssignedZonesService,
    ) {}

    @Post()
    async assignZone(@Body() assignedZone: CreateAssignedZones) {
        return await this.assignedZonesService.assignZone(assignedZone);
    }

    //Get zones assigned to an employee with email
    @Get('/:email')
    async getZonesWithEmployeeEmail(@Param('email') employeeEmail: string) {
        return await this.assignedZonesService.getZonesWithEmployeeEmail(employeeEmail);
    }

    //Get zones assigned to an employee with email and day
    @Get('/employee/:email')
    async getZonesWithEmployeeEmailAndDay(@Param('email') employeeEmail: string) {
        return await this.assignedZonesService.getZoneWithEmployeeEmailAndDay(employeeEmail);
    }

}
