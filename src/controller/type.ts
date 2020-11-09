import { Body, Controller, Get, Inject, Post, Provide, ALL, Param, Query } from '@midwayjs/decorator';
import { TypeService } from '../service/type';
import { TypeDTO } from '../dto/type';

@Provide()
@Controller('/')
export class TypeController {
  @Inject()
  typeService: TypeService;

  @Post('/api/type')
  async setType(@Body(ALL) typeBody: TypeDTO) {
    const type = await this.typeService.setType(typeBody);
    return { success: true, message: 'OK', data: type };
  }

  @Get('/api/type')
  @Get('/api/type/:ID')
  async getTypes(@Param() ID, @Query() id) {
    const types = await this.typeService.getType(ID||id);
    return { success: true, message: 'OK', data: types };
  }

  @Post('/api/type/del')
  async delType(@Body(ALL) typeBody) {
    const type = await this.typeService.delType(typeBody);
    return { success: true, message: 'OK', data: type };
  }
}
