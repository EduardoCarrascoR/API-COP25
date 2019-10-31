import { Module, RequestMethod } from "@nestjs/common";
import { databaseModule } from "../database/database.module";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware";
import { NewsController } from "./new.controller";
import { NewService } from "./news.service";
import { newsProvider, imageProvider } from "./news.provider";
import { AuthMiddleware } from '../../shared/index';

@Module({
    imports: [databaseModule],
    controllers: [NewsController],
    providers: [NewService, newsProvider, imageProvider]
})
export class NewsModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: '/news', method: RequestMethod.GET},
                {path: '/news/:id', method: RequestMethod.GET},
                {path: '/news/:id', method: RequestMethod.POST},
                {path: '/news/:id', method: RequestMethod.PUT},
                {path: '/news/:id', method: RequestMethod.DELETE}
            )
    }
}
