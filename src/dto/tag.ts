import { Rule, RuleType } from '@midwayjs/decorator';

export class TagDTO {
  @Rule(RuleType.string().required())
  name: string;
}
