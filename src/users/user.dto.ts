import { IsNotEmpty, IsEmail, IsAlpha } from "class-validator";

export class UserDto {

    id: string;
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlpha()
    name: string
}