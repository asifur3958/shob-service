import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatus } from '../booking_status/entities/booking_status.entity';
import { ManageOrderController } from './manage_order.controller';
import { ManageOrderService } from './manage_order.service';
import { Booking } from 'src/user/booking/entities/booking.entity';
import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { Payment } from 'src/user/payment/entities/payment.entity';
import { Service } from '../service/entities/service.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import { ManagerList } from '../manager_list/entities/manager_list.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList])],
  controllers: [ManageOrderController],
  providers: [ManageOrderService]
})
export class ManageOrderModule {}
