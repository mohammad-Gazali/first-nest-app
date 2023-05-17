import { createParamDecorator, ExecutionContext } from "@nestjs/common";



export const GetUser = createParamDecorator(
    //? data param in this callback below is the params we passed to the decorator when we use it
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        //? if we passed a string param to @GetUser("email") like email in this example then this decorator will return only the value of this attribute (which is here "email")
        if (data) {
            return request.user[data]
        }

        return request.user;
    }
)