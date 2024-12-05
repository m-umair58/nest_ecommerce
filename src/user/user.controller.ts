import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    @Get('me')
    getme(@GetUser() user:User ){
        return user;
    }

    @Patch()
    editUser(@GetUser('id')userId:number,@Body() dto:EditUserDto){
        return this.userService.editUser(userId,dto);
    }

    @Get()
    getUserById(@GetUser('id')userId:number){
        return this.userService.getUserById(userId);
    }
}

