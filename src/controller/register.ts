import { Body, Controller, Inject, Post, Provide, ALL, Validate, Get } from '@midwayjs/decorator';
import { RegisterService } from '../service/register';
import { Register } from '../interface';
import { RegisterDTO } from '../dto/register';

@Provide()
@Controller('/')
export class RegisterController {

  @Inject()
  registerService: RegisterService;

  @Get('/register')
  async register(ctx) {
    const registers = await this.registerService.getRegister();
    console.log("registers", registers)
    await ctx.render('register.njk', {
      data: registers
    });
  }

  @Post('/api/register')
  @Validate()
  async setRegister(@Body(ALL) registerBody: RegisterDTO): Promise<Register> {
    const register = await this.registerService.setRegister(registerBody);
    return { success: true, message: 'OK', data: register };
  }

  @Get('/api/register')
  async getRegister() {
    const registers = await this.registerService.getRegister();
    return { success: true, message: 'OK', data: registers };
  }



}


