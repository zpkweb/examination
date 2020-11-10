import { Rule, RuleType } from '@midwayjs/decorator';


export class UserDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  phone: string;

  @Rule(RuleType.number().required())
  typeId: number;

  @Rule(RuleType.array().required())
  tagsId: Array<number>;
}
