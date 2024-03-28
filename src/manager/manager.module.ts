import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { BookingStatusModule } from './booking_status/booking_status.module';
import { ManageOrderModule } from './manage order/manage_order.module';
import { ManagerListModule } from './manager_list/manager_list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerList } from './manager_list/entities/manager_list.entity';
import { Booking } from 'src/user/booking/entities/booking.entity';
import { Checkout } from 'src/user/checkout/entities/checkout.entity';
import { Payment } from 'src/user/payment/entities/payment.entity';
import { Service } from './service/entities/service.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import { BookingStatus } from './booking_status/entities/booking_status.entity';


@Module({
  controllers: [],
  providers: [],
  imports:
  [
    TypeOrmModule.forFeature([ManagerList, BookingStatus, Booking,Checkout,Payment,Service,UserList]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'asifur3958@gmail.com',
          pass: 'dqts uahx zsui tzmu',
        },
      },
    }),
    ManagerListModule,
    BookingStatusModule,
    ManageOrderModule,
  ],
})
export class ManagerModule {}
