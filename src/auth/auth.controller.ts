import { Body, Controller, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoSignIn } from './dto';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signup(
        @Body() dto: AuthDto
    ) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signin(
        @Body() dto: AuthDtoSignIn
    ) {
        return this.authService.signin(dto)
    }
}
