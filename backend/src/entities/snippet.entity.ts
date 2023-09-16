import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
