import { Controller, Provide, Inject, Get } from "@midwayjs/decorator";
import { RegisterService } from '../../service/register';

@Provide()
@Controller('/')
export class TplController {

  @Inject()
  registerService: RegisterService;

  @Get('/', {summary: '首页', description: '这是一个首页路由'})
  async home(ctx) {
    // return 'Hello Midwayjs!';
    await ctx.render('home.njk', { name: 'egg-view-nunjucks' });
  }

  @Get('/register')
  async register(ctx) {
    const registers = await this.registerService.getRegister();
    console.log("registers", registers)
    await ctx.render('register.njk', {
      data: registers
    });
  }
}
