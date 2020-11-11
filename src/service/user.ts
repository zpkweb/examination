import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user';
import { InfoEntity } from '../entity/info';
import { TypeEntity } from '../entity/type';
import { TagEntity } from '../entity/tag';

@Provide()
export class UserService {

  @InjectEntityModel(UserEntity)
  userEntity: Repository<UserEntity>;

  @InjectEntityModel(InfoEntity)
  infoEntity: Repository<InfoEntity>;

  @InjectEntityModel(TypeEntity)
  typeEntity: Repository<TypeEntity>;

  @InjectEntityModel(TagEntity)
  tagEntity: Repository<TagEntity>;

  // 添加用户
  async setRegister(payload) {
    // 查询用户
    let user:any = await this.userEntity
      .createQueryBuilder('user')
      // .leftJoinAndSelect("user.type", "type")
      // .leftJoinAndSelect("user.tags", "tags")
      .where('user.name = :name', { name: payload.name })
      .getOne()
    // 如果用户不存在则创建用户
    if(!user){
      await this.userEntity
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          name: payload.name,
          phone: payload.phone
        })
        .execute()
        .then((res) => {
          user = res.identifiers[0]
        })
      // 关联type
      await this.userEntity
          .createQueryBuilder()
          .relation(UserEntity, "type")
          .of(user.id)
          .set(payload.typeId);
      // 关联tags
      for(let item of payload.tagsId) {
        await this.userEntity
        .createQueryBuilder()
        .relation(UserEntity, "tags")
        .of(user.id)
        .add(item);
      }
    }
    return await this.userEntity
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.type", "type")
      .leftJoinAndSelect("user.tags", "tags")
      .where("user.name = :name", { name: payload.name })
      .getOne();
  }
  // 获取注册信息
  async getRegister() {

    const info = await this.infoEntity
      .createQueryBuilder('info')
      .getMany();

    const type = await this.typeEntity
    .createQueryBuilder('type')
    .leftJoinAndSelect('type.tags', 'tags')
    .getMany();

    return {
      "info": info,
      "type": type,
    }
  }

  // 获取用户
  async getUser(id) {
    if (id) {
      return await this.userEntity
        .createQueryBuilder('user')
        .leftJoinAndSelect("user.type", "type")
        .leftJoinAndSelect("user.tags", "tags")
        .where("user.id = :id", { id: id })
        .getOne();
    } else {
      return await this.userEntity
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.type", "type")
      .leftJoinAndSelect("user.tags", "tags")
        .getMany();
    }
  }
  // 删除用户
  async delUser(id) {
    if (id) {
      await this.userEntity
        .createQueryBuilder('user')
        .delete()
        .where("user.id = :id", { id: id })
        .execute();
    } else {
      await this.userEntity
        .createQueryBuilder('user')
        .delete()
        .execute();
    }
  }

  // 用户登录
  async login(payload) {
    return await this.userEntity
      .createQueryBuilder('user')
      .where("user.name = :name", { name: payload.name })
      .andWhere("user.phone = :phone", { phone: payload.phone })
      .getOne();
  }
}
