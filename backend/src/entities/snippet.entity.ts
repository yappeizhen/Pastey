import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  views: number;

  @Column('int')
  minsToExpiry: number;

  @CreateDateColumn()
  dateCreated: Date;
}
