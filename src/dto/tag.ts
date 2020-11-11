import { Rule, RuleType } from '@midwayjs/decorator';

export class TagDTO {
  @Rule(RuleType.string())
  type: string;

  @Rule(RuleType.string())
  id: string;

  @Rule(RuleType.string().required())
  name: string;
}
