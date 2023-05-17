import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";



interface Payload {
    sub: number;
    email: string;
    iat: number;
    exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(
        Strategy,
        "jwt"  //? "jwt" here is the name of the strategy that we will use in the other files (here we use it in user.controller.ts), it is by default "jwt" so we don't have to write it but we did it for more readable and clean code
    ) {
    constructor(
        config: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET"),
        })
    }

    //? this method is for validating functionality
    //? when we return something in this function it automatically add it into the request object in attribute called "user"
    //? so here this method will add "user" object to the request object in attribute called "user"
    //? and if we returned "null" value in this method then this will throw an error of "Unauthorized" with status code of 401
    async validate(payload: Payload) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        delete user.hashedPassword;

        return user
    }
}