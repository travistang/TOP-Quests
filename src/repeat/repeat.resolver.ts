import { Repeat } from "@/entities/repeat.entity";
import { Int, Parent, ResolveField, Resolver } from "@nestjs/graphql";

@Resolver(() => Repeat)
export class RepeatResolver {
    @ResolveField(() => [Int])
    dates(@Parent() repeat: Repeat) {
        return repeat.repeatingDates();
    }
}