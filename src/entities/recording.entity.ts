import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quest } from './quest.entity';

@ObjectType()
@Entity('recordings')
export class Recording {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  value: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ nullable: true })
  note?: string;

  @Field(() => Quest)
  @ManyToOne(() => Quest, (quest) => quest.recordings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questId' })
  quest: Quest;

  @Column({ name: 'questId' })
  questId: string;
}

@InputType()
export class DateRangeFilter {
  @Field(() => Date, { nullable: true })
  start?: Date;

  @Field(() => Date, { nullable: true })
  end?: Date;
}
@InputType()
export class RecordFilter extends DateRangeFilter {
  @Field(() => String, { nullable: true })
  sortedBy?: keyof Recording;
}
