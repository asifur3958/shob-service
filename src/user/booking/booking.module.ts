import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from '../checkout/entities/checkout.entity';
import { Service } from 'src/manager/service/entities/service.entity';
import { UserList } from '../user-list/entities/user-list.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { Payment } from '../payment/entities/payment.entity';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
