import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TagEntity } from './tag';

@EntityModel('type')
export class TypeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => TagEntity, tagEntity => tagEntity.type, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  tags: TagEntity[]
}
