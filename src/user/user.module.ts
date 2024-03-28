import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { CheckoutModule } from './checkout/checkout.module';
import { PaymentModule } from './payment/payment.module';
import { ServiceModule } from 'src/manager/service/service.module';
import { UserListModule } from './user-list/user-list.module';
import { UserList } from './user-list/entities/user-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking/entities/booking.entity';
import { Checkout } from './checkout/entities/checkout.entity';
import { Payment } from './payment/entities/payment.entity';
import { Service } from 'src/manager/service/entities/service.entity';
import { ManagerList } from 'src/manager/manager_list/entities/manager_list.entity';
import { BookingStatus } from 'src/manager/booking_status/entities/booking_status.entity';

@Module({
  controllers: [],
  providers: [],
  imports:
  [
    TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList]),
    UserListModule,
    BookingModule,
    ServiceModule,
    CheckoutModule,
    PaymentModule,
  ],
})
export class UserModule {}
