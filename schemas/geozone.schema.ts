import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GeozonesDocument = HydratedDocument<Geozone>;

@Schema()
export class Geozone {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    coordinates: number[][][];
}

export const GeozonesSchema = SchemaFactory.createForClass(Geozone);