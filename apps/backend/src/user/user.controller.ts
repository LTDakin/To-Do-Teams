import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

// /user endpoint
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  find(@Query('id') id?: string, @Query('username') username?: string) {
    if (id) {
      return this.userService.findById(+id);
    }
    if (username) {
      return this.userService.findByUsername(username);
    }
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
