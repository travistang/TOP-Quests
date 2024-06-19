import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Quest } from './quest.entity';

export enum QuestDependencyType {
  ONE_OF = 'ONE_OF',
  ALL_TASKS = 'ALL_TASKS',
  AT_LEAST_X_TASKS = 'AT_LEAST_X_TASKS',
}
registerEnumType(QuestDependencyType, { name: 'QuestDependencyType' });

@ObjectType()
@Entity('quest_dependencies')
export class QuestDependency {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => QuestDependencyType)
  @Column({
    enum: QuestDependencyType,
  })
  type: QuestDependencyType;

  @Field(() => Int)
  @Column()
  numMinTasks: number;

  @Field()
  @Column({ default: false })
  blocking: boolean;

  @Field(() => Quest)
  parent: Quest;

  @Field()
  @Column()
  parentId: string;

  @Field(() => [Quest])
  dependents: Quest[];

  dependentIds: string[];
  @Column('text', { nullable: true })
  _dependentIds: string;
}
