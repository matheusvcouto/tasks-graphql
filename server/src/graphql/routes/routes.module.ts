import { Module } from '@nestjs/common';
import { TaskResolver } from './resolvers/task.resolver';
import { TaskService } from './services/task.service';
import { PrismaService } from '../../services/prisma.service';
import { OpenaiService } from '~/services/openai.service';

@Module({
  providers: [
    // injectables
    PrismaService,
    OpenaiService,

    // resolvers
    TaskResolver,

    // services
    TaskService,
  ],
})
export class RoutesModule {}
