import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productsDto } from './dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService:ProductsService){}

    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts();
    }

    @Post('create')
    createProduct(@Body() dto:productsDto){
        return this.productsService.createProduct(dto);
    }

    @Post('create_many')
    createManyProduct(@Body() dto:productsDto[]){
        return this.productsService.createManyProducts(dto);
    }
}
