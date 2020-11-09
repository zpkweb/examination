import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypeEntity } from './type';

@EntityModel('tag')
export class TagEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => TypeEntity, typeEntity => typeEntity.tags, {
    onDelete: 'CASCADE'
  })

  type: TypeEntity;
}
