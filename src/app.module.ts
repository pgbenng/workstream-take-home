import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './phone-number/phone-number.entity';
import { PhoneNumberModule } from './phone-number/phone-number.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'benng',
      password: '',
      database: 'postgres',
      entities: [PhoneNumber],
      synchronize: true,
    }),
    PhoneNumberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
