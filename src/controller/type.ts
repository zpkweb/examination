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
    console.log("start setType")
    const data = await this.typeService.setType(typeBody);
    console.log(data)
    return data;
  }

  @Get()
  @Get('/:ID')
  async getTypes(@Param() ID, @Query() id) {
    return await this.typeService.getType(ID||id);
  }

  @Post('/del')
  @Post('/del/:ID')
  async delType(@Param() ID, @Query() id) {
    return await this.typeService.delType(ID||id);
  }
}
