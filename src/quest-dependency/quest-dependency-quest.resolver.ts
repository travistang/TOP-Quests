import { QuestDependency } from '@/entities/quest-dependency.entity';
import { Quest } from '@/entities/quest.entity';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestDependencyService } from './quest-dependency.service';

@Resolver(() => Quest)
export class QuestDependencyQuestFieldResolver {
  constructor(
    private readonly questDependencyService: QuestDependencyService,
  ) {}

  @ResolveField(() => QuestDependency, { nullable: true })
  async parentDependency(@Parent() quest: Quest) {
    return this.questDependencyService.findByDependentId(quest.id);
  }

  @ResolveField(() => QuestDependency, { nullable: true })
  async childDependency(@Parent() quest: Quest) {
    return this.questDependencyService.findByParentId(quest.id);
  }
}
