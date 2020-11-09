import { Controller, Get, Provide } from '@midwayjs/decorator';

@Provide()
@Controller('/', { tagName: '分组1', description: '首页路由'})
export class HomeController {

  @Get('/', {summary: '首页', description: '这是一个首页路由'})
  async home(ctx) {
    // return 'Hello Midwayjs!';
    await ctx.render('home.njk', { name: 'egg-view-nunjucks' });
  }



}
