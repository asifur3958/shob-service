import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/user/booking/entities/booking.entity';

import { Service } from './entities/service.entity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import { Payment } from 'src/user/payment/entities/payment.entity';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
