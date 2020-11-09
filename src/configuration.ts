// configuration.ts
import { Configuration } from '@midwayjs/decorator';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [
    '@midwayjs/orm',
    swagger
  ]
})
export class ContainerConfiguratin {

}
