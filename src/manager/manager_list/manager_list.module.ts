import { Module } from '@nestjs/common';
import { ManagerListService } from './manager_list.service';
import { ManagerListController } from './manager_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatus } from '../booking_status/entities/booking_status.entity';
import { ManagerList } from './entities/manager_list.entity';
import { Booking } from 'src/user/booking/entities/booking.entity';
import { Checkout } from 'src/user/checkout/entities/checkout.entity';

import { Payment } from 'src/user/payment/entities/payment.entity';
import { Service } from '../service/entities/service.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';


@Module({
  imports: [TypeOrmModule.forFeature([BookingStatus, ManagerList, Booking,Checkout,Payment,Service,UserList])],
  controllers: [ManagerListController],
  providers: [ManagerListService]
})
export class ManagerListModule {}
