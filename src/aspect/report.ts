import { Aspect, IMethodAspect, JoinPoint, Provide } from '@midwayjs/decorator';
import { InfoController } from '../controller/info';
import { UserController } from '../controller/user';
import { TagController } from '../controller/tag';
import { TypeController } from '../controller/type';


@Provide()
@Aspect([InfoController, UserController, TagController, TypeController])
export class ReportInfo implements IMethodAspect {
  async afterReturn(point: JoinPoint, result) {
    return { success: true, message: 'OK', data: result }
  }
}
