import {Body,Controller,Delete,Get,Param,ParseIntPipe,Post,Put,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

//new checkout
  @UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createCheckoutDto: CreateCheckoutDto) {
    return this.checkoutService.create(createCheckoutDto);
  }


  @UsePipes(new ValidationPipe())
  @Get('/viewall')
  findAll() {
    return this.checkoutService.findAll();
  }


  @UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.checkoutService.findOne(+id);
  }


  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() Dto: CreateCheckoutDto,
  ) {
    return this.checkoutService.update(+id, Dto);
  }


  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.checkoutService.remove(+id);
  }


  @Get('/latest')
  getLatestBooking() {
    return this.checkoutService.findLatestCheckout();
  }
}
