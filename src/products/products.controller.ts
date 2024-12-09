import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productDto, productsDto } from './dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService:ProductsService){}

    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number){
        return this.productsService.getProductById(id);
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
