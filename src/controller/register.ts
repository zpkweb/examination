import { Body, Controller, Inject, Post, Provide, ALL, Validate, Get } from '@midwayjs/decorator';
import { RegisterService } from '../service/register';
import { RegisterDTO } from '../dto/register';

@Provide()
@Controller('/api/register')
export class RegisterController {

  @Inject()
  registerService: RegisterService;



  @Post()
  @Validate()
  async setRegister(@Body(ALL) registerBody: RegisterDTO){
    const data = await this.registerService.setRegister(registerBody);
    return data
  }

  @Get()
  async getRegister() {
    const data = await this.registerService.getRegister();
    return data
  }



}


