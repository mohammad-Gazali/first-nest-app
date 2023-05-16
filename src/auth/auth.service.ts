import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signup() {
        return { message: "Hello From Sing up Service" }
    }

    signin() {
        return { message: "Hello From Sing in Service" }
    }
}
