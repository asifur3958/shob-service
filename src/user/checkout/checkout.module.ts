import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { Service } from 'src/manager/service/entities/service.entity';
import { UserList } from '../user-list/entities/user-list.entity';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Checkout } from './entities/checkout.entity';
import { Booking } from '../booking/entities/booking.entity';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList]),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
