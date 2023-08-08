import { ArrayMaxSize, ArrayMinSize, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

class VerifyGeozoneDto{
    
    @ArrayMinSize(2, { message: 'Debe haber al menos 2 elementos en el array' })
    @ArrayMaxSize(2, { message: 'El array no puede contener más de 2 elementos' })
    @IsNumber({}, { each: true, message: 'Los elementos del array deben ser números' })
    coordinates: number[];

    @IsNotEmpty({ message: 'El email es requerido'})
    @IsEmail({}, { message: 'El email debe ser un email válido'})
    emailEmployee: string;
}

export default VerifyGeozoneDto;