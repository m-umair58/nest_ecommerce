import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class billingDetailsDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    address:string

    @IsString()
    @IsNotEmpty()
    city:string

    @IsNumber()
    @IsNotEmpty()
    postalCode:number
    
    @IsNumber()
    @IsNotEmpty()
    orderId:number
    
    @IsNumber()
    @IsNotEmpty()
    userId:number
}