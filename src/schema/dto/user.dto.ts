import { IsEmail, IsNotEmpty } from "class-validator"

export class UserDto {

    id: number;

    login: string;

    email: string;
}