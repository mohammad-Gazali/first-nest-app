import { AuthGuard } from "@nestjs/passport";


//? here we used the same name that we make in the strategy of jwt in the file "auth/startegy/jwt.startegy.ts"
export class JwtGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }
}