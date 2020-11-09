import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, getConnection } from 'typeorm';
import { TagEntity } from '../entity/tag';
import { TypeEntity } from '../entity/type';


@Provide()
export class TagService {
  @InjectEntityModel(TagEntity)
  tagEntity: Repository<TagEntity>;

  async setTag(payload) {
    let type = await getConnection()
      .createQueryBuilder()
      .select("type")
      .from(TypeEntity, "type")
      .where("type.name = :name", { name: payload.type })
      .getOne();
    let tagId;
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values({
        name: payload.name
      })
      .execute()
      .then(async (res) => {
        tagId = res.identifiers[0].id;
        await getConnection()
          .createQueryBuilder()
          .relation(TagEntity, 'type')
          .of(tagId)
          .set(type.id)
      })

    return await getConnection()
      .createQueryBuilder()
      .select("tag")
      .from(TagEntity, "tag")
      .where("tag.id = :id", { id: tagId })
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

  async delTag(payload) {
    if (payload.id) {
      return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TagEntity)
        .where("id = :id", { id: payload.id })
        .execute();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TagEntity)
        .execute();
    }

  }
}
