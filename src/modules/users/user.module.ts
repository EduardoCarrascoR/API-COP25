import { Module, RequestMethod } from "@nestjs/common";
import { databaseModule } from "../database/database.module";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { usersProvider } from "./user.provider";
import { AuthMiddleware } from '../../shared/index';

@Module({
    imports: [databaseModule],
    controllers: [UserController],
    providers: [UserService, usersProvider]
})
export class UserModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: '/users', method: RequestMethod.GET},
                {path: '/users/:id', method: RequestMethod.GET},
                {path: '/users/:id', method: RequestMethod.PUT},
                {path: '/users/:id', method: RequestMethod.DELETE}
            )

    }
}
