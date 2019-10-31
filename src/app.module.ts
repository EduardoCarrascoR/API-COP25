import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { NewsModule } from './modules/news/news.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/Images/image.module';

@Module({
    imports: [UserModule, NewsModule, ImageModule, AuthModule]
})
export class AppModule {}