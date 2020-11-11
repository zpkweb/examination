import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, getRepository, Brackets } from 'typeorm';
import { TypeEntity } from '../entity/type';
import { TagEntity } from '../entity/tag';


@Provide()
export class TypeService {
  @InjectEntityModel(TypeEntity)
  typeEntity: Repository<TypeEntity>;

  @InjectEntityModel(TypeEntity)
  tagEntity: Repository<TagEntity>;

  async setType(payload) {
    // 查找类型
    let type: any = await this.typeEntity
      .createQueryBuilder('type')
      .leftJoinAndSelect("type.tags", "tags")
      .where("type.name = :name OR type.id = :id", { name: payload.type, id: payload.id })
      .getOne();
    console.log(type)
    // 没有类型，创建类型
    if (!type) {
      await this.typeEntity
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
    if (payload.tags && payload.tags.length) {
      // 遍历tags
      for (let item of payload.tags) {
        // 查找标签
        let tag: any = await getRepository(TagEntity)
          .createQueryBuilder('tag')
          .leftJoinAndSelect("tag.type", "type")
          .where("tag.name = :name", { name: payload.name })
          .andWhere(new Brackets(qb => {
            qb.where('type.name = :typeName', { typeName : payload.name })
              .orWhere('type.id = :typeId', { typeId : payload.id })
          }))
          .getOne();

        // 没有标签，创建标签
        if (!tag) {
          await this.typeEntity
            .createQueryBuilder('type')
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

        await this.typeEntity
          .createQueryBuilder('type')
          .relation(TypeEntity, "tags")
          .of(type.id)
          .add(tag.id);
      }
    }

    return await this.typeEntity
      .createQueryBuilder('type')
      .leftJoinAndSelect("type.tags", "tags")
      .where("type.name = :name OR type.id = :id", { name: payload.name, id: payload.id })
      .getOne();

  }

  async getType(id) {
    // return await this.typeEntity.find();
    if (id) {
      return await this.typeEntity
        .createQueryBuilder('type')
        // .select("type")
        // .from(TypeEntity, "type")
        .leftJoinAndSelect("type.tags", "tags")
        .where("type.id = :id", { id: id })
        .getOne();
    } else {
      return await this.typeEntity
        .createQueryBuilder('type')
        // .select("type")
        // .from(TypeEntity, "type")
        .leftJoinAndSelect("type.tags", "tags")
        .getMany();
    }

  }

  async delType(id) {
    if (id) {
      await this.typeEntity
        .createQueryBuilder()
        .delete()
        .from(TypeEntity)
        .where("id = :id", { id: id })
        .execute();
    } else {
      await this.typeEntity
        .createQueryBuilder()
        .delete()
        .from(TypeEntity)
        .execute();
    }
  }
}
