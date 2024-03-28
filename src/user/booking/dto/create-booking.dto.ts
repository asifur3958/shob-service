import { IsInt, IsNumber, IsString, IsNotEmpty, IsIn } from "class-validator";
export class CreateBookingDto {

  id: number; //auto

  @IsNotEmpty({ message: 'time is required' })
  @IsString({message: "time must be a string"})
  time: string;

  @IsNotEmpty({ message: 'userListId is required' })
  @IsInt({message: "userListId must be a integer"})
  userListId: number;

  @IsNotEmpty({ message: 'userListId is required' })
  @IsInt({message: "userListId must be a integer"})
  serviceId: number;
}
