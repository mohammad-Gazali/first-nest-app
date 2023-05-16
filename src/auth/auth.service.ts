import { 
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, AuthDtoSignIn } from './dto';
import { hash, verify } from "argon2";
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService
    ) {}


    async signup(dto: AuthDto) {
        try {
        
            const hashedPassword = await hash(dto.password)

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hashedPassword,
                    firstname: dto.firstname,
                    lastname: dto.lastname
                }
            })

            return this.signToken(user.id, user.email);

        } catch (error) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                //? this is the error of duplicated field (make new object with repeated unique field)
                //? you can see prisma documentation for more details
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken.")
                } else {

                    console.log(error)

                    throw new BadRequestException("Invalid Payload.")
                }
            }

            console.log(error)

            throw new InternalServerErrorException("Something went wrong, please try again.")

        }
        
    }


    async signin(dto: AuthDtoSignIn) {
            
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) {
            throw new NotFoundException()
        }

        const passwordMatches = await verify(user.hashedPassword, dto.password)

        if (!passwordMatches) {
            throw new ForbiddenException("Invalid credentials")
        }

        return this.signToken(user.id, user.email)

    }


    async signToken(userId: number, email: string) {
        const payload = {
            sub: userId,  //? sub here is only a naming convention for jwt
            email,
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: this.config.get("JWT_SECRET")
        })

        return {
            access_token: token
        }
    }

}
