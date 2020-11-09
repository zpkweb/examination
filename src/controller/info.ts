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
    const info = await this.infoService.setInfo(infoBody);
    return { success: true, message: 'OK', data: info };
  }

  @Get()
  async getInfo() {
    const infos = await this.infoService.getInfo();
    return { success: true, message: 'OK', data: infos };
  }

  @Post('/del')
  async delInfo(@Body(ALL) infoBody) {
    const info = await this.infoService.delInfo(infoBody);
    return { success: true, message: 'OK', data: info };
  }
}
