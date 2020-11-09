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
    let typeId;
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TypeEntity)
      .values({
        name: payload.name
      })
      .execute()
      .then((res) => {
        typeId = res.identifiers[0].id;
      })
    for (let item of payload.tags) {

      let tagId;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(TagEntity)
        .values({
          name: item.name
        })
        .execute()
        .then(async (res) => {
          tagId = res.identifiers[0].id;
          await getConnection()
            .createQueryBuilder()
            .relation(TypeEntity, "tags")
            .of(typeId)
            .add(tagId);
        })
    }

    return await getConnection()
      .createQueryBuilder()
      .select("type")
      .from(TypeEntity, "type")
      .leftJoinAndSelect("type.tags", "tags")
      .where("type.id = :id", { id: typeId })
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
