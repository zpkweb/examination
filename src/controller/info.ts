import { ALL, Body, Controller, Get, Inject, Post, Provide, Param, Query } from '@midwayjs/decorator';
import { InfoService } from '../service/info';
import { InfoDTO } from '../dto/info';

@Provide()
@Controller('/api/info')
export class InfoController {

  @Inject()
  infoService: InfoService;

  @Post()
  async setInfo(@Body(ALL) infoBody: InfoDTO) {
    return await this.infoService.setInfo(infoBody);
  }

  @Get()
  @Get('/:ID')
  async getTags(@Param() ID, @Query() id) {
    return await this.infoService.getInfo(ID||id);
  }

  @Post('/del')
  @Post('/del/:ID')
  async delInfo(@Body() Id, @Param() ID, @Query() id) {
    return await this.infoService.delInfo(ID||Id||id);
  }
}
