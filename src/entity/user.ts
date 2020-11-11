import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { TagEntity } from './tag';
import { TypeEntity } from './type';

@EntityModel('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    length: 11
  })
  phone: string;

  @ManyToOne(type => TypeEntity, typeEntity => typeEntity.user,{
    // onDelete: 'CASCADE'
  })
  type: TypeEntity;

  @ManyToMany(type => TagEntity, tagEntity => tagEntity.user,{
    cascade: true
  })
  @JoinTable()
  tags: TagEntity[];
}
