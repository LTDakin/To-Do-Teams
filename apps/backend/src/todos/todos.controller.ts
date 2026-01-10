import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import type {
  createTodoDto,
  updateTodoDto,
  ShareTodoDto,
} from '../dtos/todosDtos';
import { AuthenticationGuard } from 'src/auth/authentication.guard';
import { TodoAccessGuard } from 'src/auth/todo.authorization.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  create(@Body() createTodoDto: createTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Post('share')
  @UseGuards(AuthenticationGuard)
  share(@Body() shareTodoDto: ShareTodoDto) {
    return this.todosService.share(shareTodoDto);
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard, TodoAccessGuard)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Get('user/:userId')
  findUsersTodos(@Param('userId') userId: string) {
    return this.todosService.findUsersTodos(+userId);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard, TodoAccessGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: updateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, TodoAccessGuard)
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
