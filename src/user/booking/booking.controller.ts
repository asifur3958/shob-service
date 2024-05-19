import {Body,Controller,Delete,Get,Param,ParseIntPipe,Post,Put,UsePipes,ValidationPipe,} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';


@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @UsePipes(new ValidationPipe())


  //new booking
  @Post('/insert')
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }


  //all booking
  @UsePipes(new ValidationPipe())
  @Get('/viewall')
  findAll() {
    return this.bookingService.findAll();
  }


  //booking by id
  @UsePipes(new ValidationPipe())
  @Get('get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.bookingService.findOne(+id);
  }


  //updating booking
  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBookingDto: CreateBookingDto,
  ) {
    return this.bookingService.update(+id, updateBookingDto);
  }


  //deleting booking
  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.bookingService.remove(+id);
  }


  //latest booking
  @Get('/latest')
  getLatestBooking() {
    return this.bookingService.findLatestBooking();
  }
}
