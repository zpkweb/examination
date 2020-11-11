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
    console.log("tagBody", tagBody)
    return await this.tagService.setTag(tagBody);
  }

  @Get()
  @Get('/:ID')
  async getTags(@Param() ID, @Query() id) {
    return await this.tagService.getTag(ID||id);
  }

  @Post('/del')
  @Post('/del/:ID')
  async delTag(@Body() Id, @Param() ID, @Query() id) {
    return await this.tagService.delTag(ID||Id||id);
  }

}
