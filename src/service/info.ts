import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, getConnection } from 'typeorm';
import { InfoEntity } from '../entity/info';

@Provide()
export class InfoService {
  @InjectEntityModel(InfoEntity)
  infoEntity: Repository<InfoEntity>;

  async setInfo(payload) {
    // 查找类型
    let type:any = await getConnection()
      .createQueryBuilder()
      .select("info")
      .from(InfoEntity, "info")
      .where("info.name = :name", { name: payload.name })
      .getOne();
    if(type){
      return type
    }
    // 如果没有类型，则创建类型
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(InfoEntity)
    .values({
      name: payload.name,
      show: payload.show
    })
    .execute();

    return await getConnection()
    .createQueryBuilder()
    .select("info")
    .from(InfoEntity, "info")
    .where("info.name = :name", { name: payload.name })
    .getOne();


  }

  async getInfo(id) {
    if (id) {
      return await getConnection()
        .createQueryBuilder()
        .select("tag")
        .from(InfoEntity, "tag")
        .where("tag.id = :id", { id: id })
        .getOne();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .select("tag")
        .from(InfoEntity, "tag")
        .getMany();
    }
  }

  async delInfo(id) {
    if (id) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(InfoEntity)
        .where("id = :id", { id: id })
        .execute();
    } else {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(InfoEntity)
        .execute();
    }
  }


}
