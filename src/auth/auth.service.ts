import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private config: ConfigService,
    ) {}
    async signup(dto: AuthDto) {
      console.log(dto)
      console.log(dto.userName)
        // generate password hash
        const hash = await argon.hash(dto.password);
        console.log(hash)
        try {
          // add user to the database
          const user = await this.prisma.user.create({
            data: {
              email: dto.email,
              hash,
              userName:dto.userName
            },
          });
          console.log(user)
          if(!user){
            throw new BadRequestException();
            console.log("user cannot be created")
          }
          else if(user){
            console.log("user")

          }
          //return the saved user
        return this.signToken(user.id, user.email);
        } catch (e: unknown) {
          console.log(e);
          console.log("error invoked");
          if (e instanceof BadRequestException) {
            throw new BadRequestException('Role field is Required');
          }
          if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2002') { // Unique constraint violation
              console.log('Forbidden exception caught:', e.message);
              throw new ForbiddenException('Email already taken');
            }
            console.log('Prisma error:', e.message);  // Add a more generic log for other Prisma errors
            throw new ForbiddenException('Database error occurred');
          }
        
          // Handle case when 'e' is of unknown type
          if (e instanceof Error) {
            return {
              msg: "error occurred",
              details: e.message, // Safe to access e.message now
            };
          }
        
          // If e is not an instance of Error or known exceptions
          return {
            msg: "error occurred",
            details: 'Unknown error occurred', // Fallback for unknown types
          };
        }
      }

      async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });
        if (!user) {
          throw new ForbiddenException('Credentials incorrect');
        }
    
        const pwMatcehs = await argon.verify(user.hash, dto.password);
        if (!pwMatcehs) {
          throw new ForbiddenException('Credentials incorrect');
        }
    
        return this.signToken(user.id, user.email);
    
      }
      async signToken(userId: Number, email: String) {
        const payload = {
          sub: userId,
          email,
        };
        const token =  await this.jwt.signAsync(payload, {
          expiresIn: '15m',
          secret: this.config.get('JWT_SECRET'),
        });
        console.log(token)
        return {
          data:{
            statusCode:201,
            status:"Created",
            access_token:token
          }
        }
      }
}
