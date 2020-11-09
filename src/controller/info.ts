import { ALL, Body, Controller, Get, Inject, Post, Provide } from '@midwayjs/decorator';
import { InfoService } from '../service/info';
import { InfoDTO } from '../dto/info';

@Provide()
@Controller('/api/info')
export class InfoController {

  @Inject()
  infoService: InfoService;

  @Post()
  async setInfo(@Body(ALL) infoBody: InfoDTO) {
    const data = await this.infoService.setInfo(infoBody);
    return data
  }

  @Get()
  async getInfo() {
    const data = await this.infoService.getInfo();
    return data
  }

  @Post('/del')
  async delInfo(@Body(ALL) infoBody) {
    const data = await this.infoService.delInfo(infoBody);
    return data
  }
}
