import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryColumn()
  name: string;

  @Column('text')
  value: string;
}
