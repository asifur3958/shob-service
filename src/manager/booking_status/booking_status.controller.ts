
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { BookingStatusService } from './booking_status.service';
import { CreateBookingStatusDto } from './dto/create-booking_status.dto';

//@UseGuards(SessionGuard)

@Controller('booking-status')
export class BookingStatusController {
  constructor(private readonly bookingStatusService: BookingStatusService) {}


  //adding new booking
  @Post('/insert')
  create(@Body() createBookingStatusDto: CreateBookingStatusDto) {
    return this.bookingStatusService.create(createBookingStatusDto);
  }


  //all booking
  @Get('/viewall')
  findAll() {
    return this.bookingStatusService.findAll();
  }

  //booking by id
  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.bookingStatusService.findOne(+id);
  }


  //updating booking by id
  @Patch('/update/:id')
  update(
    @Param('id') id: number,
    @Body() createBookingStatusDto: CreateBookingStatusDto,
  ) {
    return this.bookingStatusService.update(+id, createBookingStatusDto);
  }


  //deleting booking by id
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.bookingStatusService.remove(+id);
  }
}
