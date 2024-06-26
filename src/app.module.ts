import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { QuestDependency } from './entities/quest-dependency.entity';
import { Quest } from './entities/quest.entity';
import { Recording } from './entities/recording.entity';
import { Repeat } from './entities/repeat.entity';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { QuestDependencyModule } from './quest-dependency/quest-dependency.module';
import { QuestIntervalModule } from './quest-interval/quest-interval.module';
import { QuestModule } from './quest/quest.module';
import { RecordingsModule } from './recordings/recordings.module';
import { RepeatModule } from './repeat/repeat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: config.getOrThrow<'sqlite' | 'mysql'>('database.type'),
          host: config.get<string>('database.host'),
          database: config.get<string>('database.path', 'db/db.sqlite3'),
          password: config.get<string>('database.password'),
          synchronize: config.get<boolean>('database.synchronize', true),
          entities: [Quest, Recording, Repeat, QuestDependency],
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    QuestModule,
    RepeatModule,
    RecordingsModule,
    QuestIntervalModule,
    QuestDependencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
