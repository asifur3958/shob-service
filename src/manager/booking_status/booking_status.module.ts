import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerList } from '../manager_list/entities/manager_list.entity';
import { BookingStatusController } from './booking_status.controller';
import { BookingStatusService } from './booking_status.service';
import { BookingStatus } from './entities/booking_status.entity';
import { Booking } from 'src/user/booking/entities/booking.entity';
import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { Payment } from 'src/user/payment/entities/payment.entity';
import { Service } from '../service/entities/service.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';




@Module({
  imports: [TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList])],
  controllers: [BookingStatusController],
  providers: [BookingStatusService],
})
export class BookingStatusModule {}
