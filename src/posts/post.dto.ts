import { IsNotEmpty, IsEmail, IsAlpha, IsAlphanumeric, IsNumber } from "class-validator";

export class PostDto {

    id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    authorId: number
}