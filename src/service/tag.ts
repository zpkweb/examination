import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, getConnection, Brackets } from 'typeorm';
import { TagEntity } from '../entity/tag';
import { TypeEntity } from '../entity/type';


@Provide()
export class TagService {
  @InjectEntityModel(TagEntity)
  tagEntity: Repository<TagEntity>;

  async setTag(payload) {

    // 查找类型
    let type:any = await getConnection()
      .createQueryBuilder()
      .select("type")
      .from(TypeEntity, "type")
      .where("type.name = :name OR type.id = :id", { name: payload.type, id: payload.id })
      .getOne();
    console.log(type)
    // 如果没有类型，则创建类型
    if(!type){
      await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TypeEntity)
      .values({
        name: payload.type
      })
      .execute()
      .then((res) => {
        type = res.identifiers[0];
      })
    }
    // 查找标签
    let tag:any = await getConnection()
      .createQueryBuilder()
      .select("tag")
      .from(TagEntity, "tag")
      .leftJoinAndSelect("tag.type", "type")
      .where("tag.name = :name", { name: payload.name })
      .andWhere(new Brackets(qb => {
        qb.where('type.name = :typeName', { typeName : payload.name })
          .orWhere('type.id = :typeId', { typeId : payload.id })
      }))
      .getOne();
    console.log(tag)
    if(tag){
      return tag;
    }
    // 如果没有标签，则创建标签
    tag = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values({
        name: payload.name
      })
      .execute()
    await getConnection()
          .createQueryBuilder()
          .relation(TagEntity, 'type')
          .of(tag.identifiers[0].id)
          .set(type.id)

    return await getConnection()
      .createQueryBuilder()
      .select("tag")
      .from(TagEntity, "tag")
      .leftJoinAndSelect("tag.type", "type")
      .where("tag.id = :id", { id: tag.identifiers[0].id })
      .getOne();
  }

  async getTag(id) {
    if (id) {
      return await getConnection()
        .createQueryBuilder()
        .select("tag")
        .from(TagEntity, "tag")
        .leftJoinAndSelect("tag.type", "type")
        .where("tag.id = :id", { id: id })
        .getOne();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .select("tag")
        .from(TagEntity, "tag")
        .leftJoinAndSelect("tag.type", "type")
        .getMany();
    }
  }

  async delTag(id) {
    console.log("delTag", id)
    if (id) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TagEntity)
        .where("id = :id", { id: id })
        .execute();
    } else {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TagEntity)
        .execute();
    }

  }
}
