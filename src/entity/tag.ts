import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { TypeEntity } from './type';
import { UserEntity } from './user';

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

  @ManyToMany(type => UserEntity, userEntity => userEntity.tags)
  User: UserEntity[]

}
