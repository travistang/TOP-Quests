import { Repeat } from "@/entities/repeat.entity"

export type IsDateInRepeatParams = {
    repeat: Repeat;
    startDate: Date;
    queryDate: Date;
}