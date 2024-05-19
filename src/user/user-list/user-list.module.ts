import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { UserList } from './entities/user-list.entity';
import { UserListController } from './user-list.controller';
import { UserListService } from './user-list.service';
import { Checkout } from '../checkout/entities/checkout.entity';
import { Payment } from '../payment/entities/payment.entity';
import { Service } from 'src/manager/service/entities/service.entity';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList])],
  controllers: [UserListController],
  providers: [UserListService],
})
export class UserListModule {}
