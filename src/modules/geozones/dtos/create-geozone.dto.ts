import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
class Coordinate {
    @IsNumber({}, { each: true, message: 'Las coordenadas deben ser un número' })
    @ArrayMinSize(2, { message: 'Debe haber al menos 2 coordenadas' })
    values: number[];
}

class CreateGeozoneDto {
    @IsNotEmpty({ message: 'El nombre es requerido'})
    @IsString({ message: 'El nombre debe ser una cadena de caracteres'})
    name: string;
    
    
    @IsArray({ message: 'Las coordenadas deben ser un arreglo de arreglos de números'})
    @ArrayMinSize(4, { message: 'Debe haber al menos 3 coordenadas, para formar un poligono'})
    coordinates: Coordinate[][];
}

export default CreateGeozoneDto;