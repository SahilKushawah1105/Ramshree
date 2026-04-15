import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum ProductCategory {
  GROUND_SPICES = 'Ground Spices',
  WHOLE_SPICES = 'Whole Spices',
  OIL_SEEDS = 'Oil Seeds',
  GRAINS_PULSES = 'Grains & Pulses',
  BLENDED_SPICES = 'Blended Spices',
  OTHER = 'Other',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  shortDesc: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'simple-json',
    nullable: false,
    default: () => "('[]')",
  })
  categories: ProductCategory[];

  @Column('simple-json', { nullable: true })
  specs: any;

  @Column('simple-json', { nullable: true })
  packaging: string[];

  @CreateDateColumn()
  createdAt: Date;
}
