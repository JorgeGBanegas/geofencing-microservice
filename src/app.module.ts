import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // new
import { MongooseModule } from '@nestjs/mongoose';
import { GeozonesModule } from './modules/geozones/geozones.module';
import { AssignedZonesModule } from './modules/assigned-zones/assigned-zones.module';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true,
      }
    ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    GeozonesModule,
    AssignedZonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
