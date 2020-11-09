import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, getConnection } from 'typeorm';
import { InfoEntity } from '../entity/info';

@Provide()
export class InfoService {
  @InjectEntityModel(InfoEntity)
  infoEntity: Repository<InfoEntity>;

  async setInfo(payload) {
    let info = new InfoEntity();
    info.name = payload.name;
    info.show = payload.show;

    return await this.infoEntity.save(info);
  }

  async getInfo() {
    return await this.infoEntity.find();
  }

  async delInfo(payload) {
    if (payload.id) {
      return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(InfoEntity)
        .where("id = :id", { id: payload.id })
        .execute();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(InfoEntity)
        .execute();
    }
  }
}
