import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

// /user endpoint
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post('signup')
  signup(@Body() signupDto: { username: string; password: string }) {
    return this.userService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: { username: string; password: string }) {
    try {
      return this.userService.signin(signinDto);
    } catch (error) {
      console.log(error);
    }
  }
}
