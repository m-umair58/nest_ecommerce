import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class productsDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    category:string

    @IsString()
    @IsNotEmpty()
    description:string

    @IsString()
    @IsNotEmpty()
    image:string

    @IsNumber()
    @IsNotEmpty()
    price:number
}

export class productDto{
    @IsNumber()
    productId:number
}