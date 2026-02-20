import { IsArray, IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckoutItemDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  image: string;
}

export class CreateSessionDto {
  @IsArray({ message: 'Os itens do carrinho devem ser uma lista.' })
  @ValidateNested({ each: true }) 
  @Type(() => CheckoutItemDto)   
  items: CheckoutItemDto[];

  @IsEmail({}, { message: 'Forneça um e-mail válido para o checkout.' })
  email: string;
}