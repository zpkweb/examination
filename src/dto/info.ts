import { Rule, RuleType} from '@midwayjs/decorator';

export class InfoDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.boolean().required())
  show: boolean;
}
