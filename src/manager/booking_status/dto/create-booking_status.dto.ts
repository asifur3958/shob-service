import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingStatusDto {

  id: number; //auto generate

  //status
  @IsNotEmpty({ message: 'Status is required' })
  @(IsString)({message: 'Status must be a string'})
  status: string;


  //validity
  @IsNotEmpty({ message: 'Validity is required' })
  @(IsString)({message: 'validity must be a string'})
  validity: string;


  //servicestatus
  @IsNotEmpty({ message: 'Servicestatus is required' })
  @(IsString)({message: 'servicestatus must be a string'})
  servicestatus: string;

  //manager list id
  @IsNotEmpty({ message: 'Manager_list is required' })
  @IsInt({ message: 'Manager_list must be integer' })
  Manager_listid: number;
}
