import { IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "src/auth/schemas/user.schema";

export class CreateBookDto {

    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    readonly title: string;

    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description is required' })
    readonly description: string;

    @IsString({ message: 'Author must be a string' })
    @IsNotEmpty({ message: 'Author is required' })
    readonly author: string;

    @IsString({ message: 'Category must be a string' })
    @IsNotEmpty({ message: 'Category is required' })
    @IsEnum(Category, { message: 'Category must be one of the following: Action, Adventure, Comedy, Drama, Horror, Romance, Thriller, SciFi, Fantasy, Mystery, Historical, Classic' })
    readonly category: string;

    @IsNotEmpty({ message: 'Price is required' })
    readonly price: number;

    @IsEmpty({ message: 'User can not pass user id' })
    readonly user: User
}