import { Controller, Provide, Inject, Get } from "@midwayjs/decorator";
import { UserService } from '../../service/user';
import { InfoService } from '../../service/info';
import { TypeService } from '../../service/type';
import { TagService } from '../../service/tag';

@Provide()
@Controller('/')
export class TplController {

  @Inject()
  userService: UserService;

  @Inject()
  infoService: InfoService;
  @Inject()
  typeService: TypeService;
  @Inject()
  tagService: TagService;

  @Get('/', {summary: '首页', description: '这是一个首页路由'})
  async home(ctx) {
    // return 'Hello Midwayjs!';
    await ctx.render('home.njk', { name: 'egg-view-nunjucks' });
  }

  @Get('/user')
  async getUser(ctx) {
    const data = await this.userService.getUser(0);
    console.log("data----", data)
    await ctx.render('user.njk', {
      data
    });
  }

  @Get('/register')
  async User(ctx) {
    const data = await this.userService.getRegister();
    await ctx.render('register.njk', {
      data
    });
  }

  @Get('/info')
  async addInfo(ctx) {
    const data = await this.infoService.getInfo(0);
    await ctx.render('info.njk', {
      data
    });
  }

  @Get('/type')
  async addType(ctx) {
    const data = await this.typeService.getType(0);
    await ctx.render('type.njk', {
      data
    });
  }

  @Get('/tag')
  async infoAdd(ctx) {
    const data = await this.tagService.getTag(0);
    await ctx.render('tag.njk', {
      data
    });
  }

}
