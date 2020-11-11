import { Body, Controller, Get, Inject, Post, Provide, ALL, Param, Query } from '@midwayjs/decorator';
import { TypeService } from '../service/type';
import { TypeDTO } from '../dto/type';

@Provide()
@Controller('/api/type')
export class TypeController {

  @Inject()
  typeService: TypeService;

  @Post()
  // @Validate()
  async setType(@Body(ALL) typeBody: TypeDTO) {
    const data = await this.typeService.setType(typeBody);
    console.log("setType", data)
    return data;
  }

  @Get()
  @Get('/:ID')
  async getTypes(@Param() ID, @Query() id) {
    return await this.typeService.getType(ID||id);
  }

  @Post('/del')
  @Post('/del/:ID')
  async delType(@Body() Id, @Param() ID, @Query() id) {
    return await this.typeService.delType(ID||Id||id);
  }
}
