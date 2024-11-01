import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './phone-number.entity';
import { PhoneNumberService } from './phone-number.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber])],
  providers: [PhoneNumberService],
  exports: [PhoneNumberService],
})
export class PhoneNumberModule {}
