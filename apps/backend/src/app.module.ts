import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [UserModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
