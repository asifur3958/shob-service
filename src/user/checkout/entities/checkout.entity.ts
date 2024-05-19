import { Payment } from 'src/user/payment/entities/payment.entity';
import { Service } from 'src/manager/service/entities/service.entity';
import { UserList } from 'src/user/user-list/entities/user-list.entity';
import {Column,Entity,ManyToOne,OneToMany,PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Checkout')
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column()
  time: string;

  @Column({ nullable: true })
  paymentType: string;

  @ManyToOne(() => UserList, (UserList) => UserList.Checkout)
  UserList: UserList;

  @ManyToOne(() => Service, (Service) => Service.Checkout)
  Service: Service;

  @OneToMany(() => Payment, (Payment) => Payment.Checkout, { cascade: true })
  Payment: Payment[];

}
