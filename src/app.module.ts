import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { NewsModule } from './modules/news/news.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [UserModule, NewsModule, AuthModule]
})
export class AppModule {}