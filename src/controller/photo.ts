import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { PhotoService } from '../service/photo';

@Provide()
@Controller('/photo')
export class PhotoController {

  @Inject()
  photoService: PhotoService;


  @Get('/getAll')
  async getPhotoAll() {
    const user = await this.photoService.findPhotos();
    return {success: true, message: 'OK', data: user};
  }
}
