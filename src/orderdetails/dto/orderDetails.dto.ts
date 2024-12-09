import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

enum statusEnum{
    DELIVERED = 'delivered',
    PENDING = 'pending',
    CANCELED = 'canceled'
}

export class orderDetailsDto{
    @IsNumber()
    @IsNotEmpty()
    productQuantity:number[]

    @IsNumber()
    @IsNotEmpty()
    productId:number[]
    
    @IsEnum(statusEnum,{message:'status should be either pending or delivered'})
    status:statusEnum
    
    @IsNumber()
    @IsNotEmpty()
    userId:number
} 

export class getOrderByIdDTO{
    @IsNumber()
    @IsNotEmpty()
    userId:number
} 