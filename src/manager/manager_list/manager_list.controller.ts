import {Body,Controller,Delete,FileTypeValidator,Get, MaxFileSizeValidator,Param,ParseFilePipe,Post,Put,Session,UnauthorizedException,UploadedFile,UseGuards,UseInterceptors, ValidationPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { CreateManagerListDto } from './dto/create-manager_list.dto';
import { loginDto } from './dto/login.dto';
import { ManagerListService } from './manager_list.service';
import { UsePipes } from '@nestjs/common';


@Controller('manager')
export class ManagerListController {
  constructor(private readonly managerListService: ManagerListService) {}

  //NEW MANAGER must be signed up or added by the admin


  //all managers
  //@UseGuards(new SessionGuard())
  @UsePipes(new ValidationPipe())
  @Get('/viewall')
  findAll() {
    return this.managerListService.findAll();
  }

  //manager by id
  //@UseGuards(new SessionGuard())

  @UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.managerListService.findOne(+id);
  }

  //update by id
  //@UseGuards(new SessionGuard())
  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() createManagerListDto: CreateManagerListDto,
  ) {
    return this.managerListService.update(+id, createManagerListDto);
  }


  //manager delete
  //@UseGuards(new SessionGuard())
  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.managerListService.remove(+id);
  }

  // sending mail
  //@UseGuards(new SessionGuard())

  @UsePipes(new ValidationPipe())
  @Post('/sendemail')
  sendEmail(@Body() mydata:any) {
    return this.managerListService.sendEmail(mydata);
  }

  //signup

  @UsePipes(new ValidationPipe())
  @Post('/signup')
  // @UseInterceptors(
  //   FileInterceptor('myfile', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: function (req, file, cb) {
  //         cb(null, Date.now() + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  signup(
    @Body() mydto: CreateManagerListDto,

    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 1600000000000 }),
    //       new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    //     ],
    //   }),
    // )
    // file: Express.Multer.File,
  ) {
    // mydto.filename = file.filename;
    // console.log(file);
    return this.managerListService.signup(mydto);
  }


  //sign in
  @Post('/signin')
  async signin(@Session() session, @Body() mydto: loginDto) {
    const isAuthenticated = await this.managerListService.signin(mydto);
    if (isAuthenticated) {
      return { message: 'Login successful' };
    } else {
      return (
        { message: 'Invalid email or password' }
      );
    }
  }


  //sign out
  @Get('/signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }
}
