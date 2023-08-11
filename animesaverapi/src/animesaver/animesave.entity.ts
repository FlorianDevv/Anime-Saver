import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../user/user.entity';
import { Anime } from './anime.entity';

@Entity()
export class AnimeSave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column()
  animeId: number;

  @ManyToOne(() => Anime, (anime) => anime.id)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}
