import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  minsToExpiry: Date | null;
}
