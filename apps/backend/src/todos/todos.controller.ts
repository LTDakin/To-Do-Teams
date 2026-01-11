import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import type {
  createTodoDto,
  updateTodoDto,
  ShareTodoDto,
} from '../dtos/todosDtos';
import { Request } from 'express';
import { AuthenticationGuard } from 'src/auth/authentication.guard';
import { TodoAccessGuard } from 'src/auth/todo.authorization.guard';
import { UserReq } from 'src/dtos/userDtos';

type RequestWithUser = Request & { user: UserReq };

@Controller('todos')
@UseGuards(AuthenticationGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() createTodoDto: createTodoDto) {
    return this.todosService.create({
      ...createTodoDto,
      ownerId: req.user.sub,
    });
  }

  @Post('share')
  @UseGuards(TodoAccessGuard)
  share(@Body() shareTodoDto: ShareTodoDto, @Req() req: RequestWithUser) {
    return this.todosService.share({ ...shareTodoDto, ownerId: req.user.sub });
  }

  @Get(':id')
  @UseGuards(TodoAccessGuard)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Get('user/me')
  findUsersTodos(@Req() req: RequestWithUser) {
    return this.todosService.findUsersTodos(req.user.sub);
  }

  @Patch(':id')
  @UseGuards(TodoAccessGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: updateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(TodoAccessGuard)
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
