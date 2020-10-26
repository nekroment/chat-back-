import { IsEmail, IsNotEmpty } from "class-validator"

export class UserDto {

    login: string;

    @IsEmail()
    email: string;

    password: string;
}