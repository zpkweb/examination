import { Body, Controller, Get, Inject, Post, Provide, ALL, Param, Query } from '@midwayjs/decorator';
import { TagService } from '../service/tag';
import { TagDTO } from '../dto/tag';

@Provide()
@Controller('/api/tag')
export class TagController {
  @Inject()
  tagService: TagService;

  @Post()
  async setTag(@Body(ALL) tagBody: TagDTO) {
    const tag = await this.tagService.setTag(tagBody);
    return { success: true, message: 'OK', data: tag };
  }


  @Get()
  @Get('/:ID')
  async getTags(@Param() ID, @Query() id) {
    const types = await this.tagService.getTag(ID||id);
    return { success: true, message: 'OK', data: types };
  }

  @Post('/del')
  async delTag(@Body(ALL) tagBody) {
    const tag = await this.tagService.delTag(tagBody);
    return { success: true, message: 'OK', data: tag };
  }

}
