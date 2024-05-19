import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from '../checkout/entities/checkout.entity';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Booking } from '../booking/entities/booking.entity';
import { Service } from 'src/manager/service/entities/service.entity';
import { UserList } from '../user-list/entities/user-list.entity';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
