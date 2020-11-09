import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { RegisterEntity } from '../entity/register';
import { InfoEntity } from '../entity/info';
import { TypeEntity } from '../entity/type';
import { TagEntity } from '../entity/tag';

@Provide()
export class RegisterService {

  @InjectEntityModel(RegisterEntity)
  registerEntity: Repository<RegisterEntity>;

  @InjectEntityModel(InfoEntity)
  infoEntity: Repository<InfoEntity>;

  @InjectEntityModel(TypeEntity)
  typeEntity: Repository<TypeEntity>;

  @InjectEntityModel(TagEntity)
  tagEntity: Repository<TagEntity>;

  async setRegister(payload) {
    let register = new RegisterEntity();
    register.name = payload.name;
    const registerResult = await this.registerEntity.save(register);
    return registerResult;
  }

  async getRegister() {
    const info = await this.infoEntity.find();
    const type = await this.typeEntity.find({ relations: [ 'tags' ] });
    const tag = await this.tagEntity.find();

    return {
      "info": info,
      "type": type,
      "tag": tag
    }
  }


}
