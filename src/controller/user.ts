import { Body, Controller, Inject, Post, Provide, ALL, Get, Param, Query } from '@midwayjs/decorator';
import { UserService } from '../service/user';

@Provide()
@Controller('/api/user')
export class UserController {

  @Inject()
  userService: UserService;

  @Post()
  async setUser(@Body(ALL) UserBody){
    return await this.userService.setRegister(UserBody);
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
  async login(@Body(ALL) userBody) {
    return await this.userService.login(userBody)
  }

}


