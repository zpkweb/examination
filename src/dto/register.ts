import { Rule, RuleType } from '@midwayjs/decorator';

export class RegisterDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.number().required())
  phone: number;
}
