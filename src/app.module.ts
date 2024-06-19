import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Quest } from './entities/quest.entity';
import { Recording } from './entities/recording.entity';
import { Repeat } from './entities/repeat.entity';
import { QuestModule } from './quest/quest.module';
import { RecordingsModule } from './recordings/recordings.module';
import { RepeatModule } from './repeat/repeat.module';
import { QuestIntervalModule } from './quest-interval/quest-interval.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/db.sqlite3',
      synchronize: true,
      entities: [Quest, Recording, Repeat],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    QuestModule,
    RepeatModule,
    RecordingsModule,
    QuestIntervalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
