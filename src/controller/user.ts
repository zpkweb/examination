import { Body, Controller, Inject, Post, Provide, ALL, Get, Param, Query, Validate } from '@midwayjs/decorator';
import { UserService } from '../service/user';
import { RegisterDTO, LoginDTO } from '../dto/user';

@Provide()
@Controller('/api/user')
export class UserController {

  @Inject()
  userService: UserService;

  @Post('/register')
  @Validate()
  async setRegister(@Body(ALL) RegisterBody: RegisterDTO){
    return await this.userService.setRegister(RegisterBody);
  }

  @Get('/register')
  async getRegister() {
    return await this.userService.getRegister();
  }


  @Get()
  @Get('/:ID')
  async getUser(@Param() ID, @Query() id) {
    return await this.userService.getUser(ID||id);
  }

  @Post('/del')
  @Post('/del/:ID')
  async delType(@Body() Id,@Param() ID, @Query() id) {
    return await this.userService.delUser(ID||Id||id);
  }

  @Post('/login')
  @Validate()
  async login(@Body(ALL) loginBody: LoginDTO) {
    return await this.userService.login(loginBody)
  }

}


