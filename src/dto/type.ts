import { Rule, RuleType } from '@midwayjs/decorator';



export class tagsDTO {
  @Rule(RuleType.string())
  name: string;
}

export class TypeDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(tagsDTO)
  tags: Array<tagsDTO>;
}
