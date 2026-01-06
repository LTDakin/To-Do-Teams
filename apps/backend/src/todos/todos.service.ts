import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  create(createTodoDto: any) {
    console.log(createTodoDto);
    return 'This action adds a new todo';
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: any) {
    console.log(updateTodoDto);
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
