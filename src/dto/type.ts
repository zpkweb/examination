import { Rule, RuleType } from '@midwayjs/decorator';

export class TypeDTO {
  @Rule(RuleType.string().required())
  name: string;
}
