import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';



//? we can use guards in nest.js in the route scope by adding @UseGuard(OurGaurd) at the top of the route method in the controller, or we can use it in the controller scope by adding it in at the top of controller class then the guard will be applied to all routes in this controller

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get("me")
    getMe(
        @GetUser() user: Omit<User, "hashedPassword">  // "Omit" type is a built-in type in typescript that makes us able to remove some attribute from type (or interface)
    ) {
        //? here we can access "user" attribute in the "req" (which we can get with @Req()) object we because we make it equeal to the payload of in the "validate()" method in the "JwtStrategy" which is in the "auth/startegy/jwt.startegy.ts"
        //? but we moved the functionality of getting the user to a specific decorator because we don't know if we will use Express all the time, so if we changed to fastify for example the type "Express" will not make any problem
        return user
    }

}
