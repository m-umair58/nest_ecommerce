import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { productsDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
    constructor(private prisma:PrismaService){}

    async getAllProducts(){
        try{
            const products = await this.prisma.products.findMany();
            if(!products){
                throw new NotFoundException("Products Data Not found...!");
            }
            return products;
        }catch(e){
            if (e instanceof PrismaClientKnownRequestError) {
                console.log('Forbidden exception caught:', e.message); 
                throw new ForbiddenException('there is an error');
              }
        }
    }

    async createProduct(dto:productsDto){
        try{
            const product = await this.prisma.products.create({
                data:{
                    name:dto.name,
                    description:dto.description,
                    image:dto.image,
                    price:dto.price,
                    category:dto.category
                }
            })
            return product;
        }catch(e){
            if (e instanceof PrismaClientKnownRequestError) {
                console.log('Forbidden exception caught:', e.message); 
                throw new ForbiddenException('there is an error');
              }
        }
    }
    
    async createManyProducts(dtos: productsDto[]) {
        try {
          const products = await this.prisma.products.createMany({
            data: dtos.map(dto => ({
              name: dto.name,
              description: dto.description,
              image: dto.image,
              price: dto.price,
              category: dto.category,
            })),
          });
          return {
            count: products.count,
            message: `${products.count} products added successfully.`,
          };
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError) {
            console.log('Forbidden exception caught:', e.message);
            throw new ForbiddenException('There was an error adding products');
          }
        }
      }
}
