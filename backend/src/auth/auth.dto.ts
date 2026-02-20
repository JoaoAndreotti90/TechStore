import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsArray, IsNumber } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'Digite um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsOptional()
  password?: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Digite um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @IsOptional()
  password?: string;
}

export class UpdateProfileDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsOptional()
  name: string;

  @IsString({ message: 'O telefone deve ser um texto.' })
  @IsOptional()
  phone: string;

  @IsString({ message: 'O endereço deve ser um texto.' })
  @IsOptional()
  address: string;
}

export class SaveOrderDto {
  @IsArray()
  cart: any[];

  @IsNumber()
  total: number;
}