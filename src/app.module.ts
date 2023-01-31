import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlShortenModule } from './urlshorten/urlshorten.module';
import { databaseProviders } from './config/database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // init in memory cache
    // this can be configured to cashes like Redis as well.
    CacheModule.register({
      ttl: 1000, // seconds
      max: 10, // maximum number of items in cache
    }),
    UrlShortenModule,
  ],
  controllers: [],
  providers: [...databaseProviders],
})
export class AppModule {}
