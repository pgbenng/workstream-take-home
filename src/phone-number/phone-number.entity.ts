import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phoneNumber: string;
}
