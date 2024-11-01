import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PhoneNumberService } from '../src/phone-number/phone-number.service';
import * as fs from 'fs';
import * as csv from 'csv-parser';

async function importPhoneNumbers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const phoneNumberService = app.get(PhoneNumberService);

  const csvFilePath = '../data/phone.csv';
  const phoneNumbers: string[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv({ headers: ['phone_number'] }))
      .on('data', (row) => {
        const rawNumber = row['phone_number']
          ? String(row['phone_number'])
          : null;
        if (rawNumber) phoneNumbers.push(rawNumber);
        else
          console.warn(
            `Skipping row with missing or undefined phone number: ${row}`,
          );
      })
      .on('end', resolve)
      .on('error', reject);
  });

  await phoneNumberService.importPhoneNumbers(phoneNumbers);
  console.log('Phone numbers imported successfully.');
  await app.close();
}

importPhoneNumbers().catch((error) => {
  console.error(
    `importPhoneNumbers script failure. Error at: ${error.message}`,
  );
  process.exit(1);
});
