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
            const products = await this.prisma.product.findMany();
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

    async getProductById(id:number){
      const product = await this.prisma.product.findFirst({
        where:{
          id
        }
      })
      return product;
    }

    async createProduct(dto: productsDto) {
      try {
        const product = await this.prisma.product.create({
          data: {
            name: dto.name,
            description: dto.description,
            image: dto.image,
            price: dto.price,
            category: dto.category,
            manufacturer: dto.manufacturer, // Manufacturer field
            availability: dto.availability, // Availability field
            specifications: dto.specifications ? {
              create: dto.specifications.map(spec => ({
                key: spec.key,
                value: spec.value,
              })),
            } : undefined, // Create specifications only if provided
            reviews: dto.reviews ? {
              create: dto.reviews.map(review => ({
                user: review.user,
                rating: review.rating,
                comment: review.comment,
              })),
            } : undefined, // Create reviews only if provided
          },
        });
        return product;
      } catch (e) {
        console.log(e.message);
        if (e instanceof PrismaClientKnownRequestError) {
          console.log('Prisma exception caught:', e.message);
          throw new ForbiddenException('Error while creating the product.');
        }
        throw new Error('An unexpected error occurred while creating the product.');
      }
    }
    
    
    
    async createManyProducts(dtos: productsDto[]) {
      try {
        const products = await this.prisma.product.createMany({
          data: dtos.map(dto => ({
            name: dto.name,
            description: dto.description,
            image: dto.image,
            price: dto.price,
            category: dto.category,
            manufacturer: dto.manufacturer,  // Add manufacturer
            availability: dto.availability, 
            specifications: dto.specifications ? {
              create: dto.specifications.map(spec => ({
                key: spec.key,
                value: spec.value,
              })),
            } : undefined,
            reviews: dto.reviews ? {
              create: dto.reviews.map(review => ({
                user: review.user,
                rating: review.rating,
                comment: review.comment,
              }))
            } : undefined,
          })),
        });
        return {
          count: products.count,
          message: `${products.count} products added successfully.`,
        };
      } catch (e) {
        console.log(e.message);
        if (e instanceof PrismaClientKnownRequestError) {
          console.log('Forbidden exception caught:', e.message);
          throw new ForbiddenException('There was an error adding products.');
        }
      }
    }
    
}
