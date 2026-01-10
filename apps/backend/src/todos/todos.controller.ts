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
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createTodoDto: createTodoDto,
    @GetUser('sub') ownerId: number,
  ) {
    return this.todosService.create({ ...createTodoDto, ownerId: ownerId });
  }

  @Post('share')
  share(@Body() shareTodoDto: ShareTodoDto) {
    return this.todosService.share(shareTodoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Get('user/:userId')
  findUsersTodos(@Param('userId') userId: string) {
    return this.todosService.findUsersTodos(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: updateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
