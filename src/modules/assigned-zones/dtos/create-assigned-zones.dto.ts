import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum DAY {
    MONDAY = 'Lunes',
    TUESDAY = 'Martes',
    WEDNESDAY = 'Miercoles',
    THURSDAY = 'Jueves',
    FRIDAY = 'Viernes',
    SATURDAY = 'Sabado',
    SUNDAY = 'Domingo',
}

class pairDayAndZone {
    @IsEnum(DAY, { message: 'El día de la semana debe ser un día válido'})
    day: DAY;

    @IsNotEmpty({ message: 'El id de la zona es requerido'})
    @IsString({ message: 'El id de la zona debe ser un string'})
    zoneId: string;
}

class CreateAssignedZones {
    @IsNotEmpty({ message: 'El email del empleado es requerido'})
    @IsEmail({}, { message: 'El email del empleado debe ser un email válido'})
    employeeEmail: string;

    @IsArray({ message: 'Las zonas asignadas deben ser un arreglo de ids'})
    dayAndZone: pairDayAndZone[]
}

export default CreateAssignedZones;