import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  from: string;

  @Column('varchar')
  to: string;

  @Column('varchar')
  value: string;

  @Column('varchar')
  blockNumber: string;

  @CreateDateColumn()
  createdAt: Date;
}
