import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'node:path';
import { TaskResolver } from './graphql/routes/resolvers/task.resolver';
import { TaskService } from './graphql/routes/services/task.service';
import { PrismaService } from './services/prisma.service';
import { RoutesModule } from './graphql/routes/routes.module';
import { AuthModule } from '~/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from './config/env/env.schema';

@Module({
  imports: [
    
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      /// @ts-ignore
      context: ({ req, res }) => ({ req, res }),
    }),
    RoutesModule
  ],
  controllers: [],
})
export class AppModule {}
