// configuration.ts
import { Configuration } from '@midwayjs/decorator';

@Configuration({
  imports: [
    '@midwayjs/orm'  					// 加载 orm 组件
  ]
})
export class ContainerConfiguratin {

}
