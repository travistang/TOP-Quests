import { QuestDependency } from '@/entities/quest-dependency.entity';
import { Quest } from '@/entities/quest.entity';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateQuestDependencyDto } from './dto/create-quest-dependency.dto';
import { UpdateQuestDependencyDto } from './dto/update-quest-dependency.dto';
import { QuestDependencyService } from './quest-dependency.service';

@Resolver(() => QuestDependency)
export class QuestDependencyCommonResolver {
  constructor(
    private readonly questDependencyService: QuestDependencyService,
  ) {}

  @Mutation(() => QuestDependency, { nullable: true })
  async createDependency(
    @Args('createDependencyDto') createDependencyDto: CreateQuestDependencyDto,
  ) {
    return this.questDependencyService.createDependency(createDependencyDto);
  }

  @Mutation(() => QuestDependency, { nullable: true })
  async removeDependency(@Args('dependentId') dependentId: string) {
    return this.questDependencyService.removeDependency(dependentId);
  }

  @Mutation(() => QuestDependency, { nullable: true })
  async updateDependency(
    @Args('updateDependencyDto') updateDependencyDto: UpdateQuestDependencyDto,
  ) {
    return this.questDependencyService.updateDependency(updateDependencyDto);
  }

  @ResolveField(() => Quest)
  async parent(@Parent() questDependency: QuestDependency) {
    const matches = await this.questDependencyService.getQuests(
      questDependency.parentId,
    );
    return matches[0];
  }

  @ResolveField(() => [Quest])
  async children(@Parent() questDependency: QuestDependency) {
    return this.questDependencyService.getQuests(
      ...questDependency.dependentIds,
    );
  }
}
