import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Anime {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  image: string;

}
