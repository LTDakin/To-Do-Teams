import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

// /user endpoint
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.userService.findUserByUsername(username);
  }

  @Get(':id')
  findUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Post('signup')
  signup(@Body() signupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto) {
    try {
      return this.userService.signin(signinDto);
    } catch (error) {
      console.log(error);
    }
  }
}
