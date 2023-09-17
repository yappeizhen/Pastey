import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Index()
  @Column({ default: 0 })
  views: number;

  @Column('int')
  minsToExpiry: number;

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated: Date;
}
