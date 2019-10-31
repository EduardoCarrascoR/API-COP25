import { Module, RequestMethod } from "@nestjs/common";
import { databaseModule } from "../database/database.module";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { imageProvider } from "./image.provider";
import { AuthMiddleware } from '../../shared/index';

@Module({
    imports: [databaseModule],
    controllers: [ImageController],
    providers: [ImageService, imageProvider]
})
export class ImageModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: '/images', method: RequestMethod.GET},
                {path: '/images/:id', method: RequestMethod.GET},
                {path: '/images', method: RequestMethod.POST},
            )

    }
}