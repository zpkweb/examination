import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, getConnection } from 'typeorm';
import { TypeEntity } from '../entity/type';
import { TagEntity } from '../entity/tag';


@Provide()
export class TypeService {
  @InjectEntityModel(TypeEntity)
  typeEntity: Repository<TypeEntity>;

  async setType(payload) {
    // 查找类型
    let type:any = await getConnection()
    .createQueryBuilder()
    .select("type")
    .from(TypeEntity, "type")
    .leftJoinAndSelect("type.tags", "tags")
    .where("type.name = :name", { name: payload.name })
    .getOne();
    // 没有类型，创建类型
    if(!type){
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(TypeEntity)
        .values({
          name: payload.name
        })
        .execute()
        .then((res) => {
          type = res.identifiers[0]
        })
    }
    // 遍历tags
    for (let item of payload.tags) {
      // 查找标签
      let tag:any = await getConnection()
      .createQueryBuilder()
      .select("tag")
      .from(TagEntity, "tag")
      .where("tag.name = :name", { name: item.name })
      .andWhere("type.name = :typename", { typename: payload.name })
      .getOne();
      // 没有类型，创建类型
      if(!tag){
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into(TagEntity)
        .values({
          name: item.name
        })
        .execute()
        .then((res) => {
          tag = res.identifiers[0]
        })
      }
      await getConnection()
        .createQueryBuilder()
        .relation(TypeEntity, "tags")
        .of(type.id)
        .add(tag.id);


    }

    return await getConnection()
      .createQueryBuilder()
      .select("type")
      .from(TypeEntity, "type")
      .leftJoinAndSelect("type.tags", "tags")
      .where("type.id = :id", { id: type.id })
      .getOne();


  }

  async getType(id) {
    // return await this.typeEntity.find();
    if (id) {
      return await getConnection()
        .createQueryBuilder()
        .select("type")
        .from(TypeEntity, "type")
        .leftJoinAndSelect("type.tags", "tags")
        .where("type.id = :id", { id: id })
        .getOne();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .select("type")
        .from(TypeEntity, "type")
        .leftJoinAndSelect("type.tags", "tags")
        .getMany();
    }

  }

  async delType(payload) {
    if (payload.id) {
      return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TypeEntity)
        .where("id = :id", { id: payload.id })
        .execute();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TypeEntity)
        .execute();
    }
  }
}
