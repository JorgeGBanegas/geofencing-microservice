import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Geozone } from "./geozone.schema";

export type AssignedZonesDocument = HydratedDocument<AssignedZones>;
@Schema()
export class AssignedZones {
    @Prop({ required: true })
    employeeEmail: string;

    @Prop({ required: true })
    day: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Geozone', required: true })
    zoneId: Geozone;
}

export const AssignedZonesSchema = SchemaFactory.createForClass(AssignedZones);