import { IsNotEmpty, IsString } from "class-validator";

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
    readonly category: string;

    @IsNotEmpty({ message: 'Price is required' })
    readonly price: number;
}