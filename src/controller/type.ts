import { Body, Controller, Get, Inject, Post, Provide, ALL, Param, Query } from '@midwayjs/decorator';
import { TypeService } from '../service/type';
import { TypeDTO } from '../dto/type';

@Provide()
@Controller('/api/type')
export class TypeController {

  @Inject()
  typeService: TypeService;

  @Post()
  async setType(@Body(ALL) typeBody: TypeDTO) {
    const data = await this.typeService.setType(typeBody);
    return data
  }

  @Get()
  @Get('/:ID')
  async getTypes(@Param() ID, @Query() id) {
    const data = await this.typeService.getType(ID||id);
    return data
  }

  @Post('/del')
  async delType(@Body(ALL) typeBody) {
    const data = await this.typeService.delType(typeBody);
    return data
  }
}
