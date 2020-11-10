import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TagEntity } from './tag';
import { UserEntity } from './user';

@EntityModel('type')
export class TypeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => TagEntity, tagEntity => tagEntity.type, {
    cascade: true
  })
  tags: TagEntity[]

  @OneToMany(type => UserEntity, userEntity => userEntity.type)
  User: UserEntity[]
}
