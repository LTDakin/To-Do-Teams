import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

// /user endpoint
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
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
