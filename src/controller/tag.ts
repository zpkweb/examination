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
    const data = await this.tagService.setTag(tagBody);
    return data
  }


  @Get()
  @Get('/:ID')
  async getTags(@Param() ID, @Query() id) {
    const data = await this.tagService.getTag(ID||id);
    return data
  }

  @Post('/del')
  async delTag(@Body(ALL) tagBody) {
    const data = await this.tagService.delTag(tagBody);
    return data
  }

}
