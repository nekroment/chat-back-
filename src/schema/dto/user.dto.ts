import { IsEmail, IsNotEmpty } from "class-validator"

export class UserDto {

    login: string;

    email: string;

    password: string;
}