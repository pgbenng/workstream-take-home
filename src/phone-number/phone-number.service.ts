import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneNumber } from './phone-number.entity';
import { parsePhoneNumberWithError } from 'libphonenumber-js';

@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  public async importPhoneNumbers(phoneNumbers: string[]): Promise<void> {
    for (const rawNumber of phoneNumbers) {
      try {
        const formattedNumber = this.formatToE164(rawNumber);
        const phoneNumber = new PhoneNumber();
        phoneNumber.phoneNumber = formattedNumber;
        await this.phoneNumberRepository.save(phoneNumber);
      } catch (error) {
        throw new Error(
          `importPhoneNumbers(): Skipping invalid phone number ${rawNumber} due to formatting error: ${error.message}`,
        );
      }
    }
  }

  private formatToE164(rawNumber: string): string {
    try {
      const parsedCAPhoneNumber = parsePhoneNumberWithError(rawNumber);
      return parsedCAPhoneNumber.format('E.164');
    } catch (error) {
      throw new Error(`formatToE164(): ${error.message}`);
    }
  }
}
