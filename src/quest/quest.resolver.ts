import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Quest } from '../entities/quest.entity';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { QuestService } from './quest.service';

@Resolver(() => Quest)
export class QuestResolver {
  constructor(private readonly questService: QuestService) { }

  @Mutation(() => Quest)
  createQuest(@Args('createQuestDto') createQuestDto: CreateQuestDto) {
    return this.questService.create(createQuestDto);
  }

  @Query(() => [Quest], { name: 'quests' })
  findAll() {
    return this.questService.findAll();
  }

  @Query(() => Quest, { name: 'quest' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.questService.findOne(id);
  }

  @Mutation(() => Quest)
  updateQuest(@Args('updateQuestDto') updateQuestDto: UpdateQuestDto) {
    return this.questService.update(updateQuestDto);
  }

  @Mutation(() => Quest)
  removeQuest(@Args('id', { type: () => String }) id: string) {
    this.questService.remove(id);
    return { id } as Quest;
  }

  @ResolveField(() => Quest, { nullable: true })
  parent(@Parent() quest: Quest) {
    if (!quest.parentId) return null;
    return this.questService.findOne(quest.parentId);
  }

  @ResolveField(() => [Quest], { nullable: true })
  children(@Parent() quest: Quest) {
    return this.questService.getChildren(quest);
  }
}
