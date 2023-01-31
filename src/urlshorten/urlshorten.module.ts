import { Module } from '@nestjs/common';
import { UrlShortenController } from './urlshorten.controller';
import { urlShortenProviders } from './urlshorten.providers';
import { UrlShortenService } from './urlshorten.service';

@Module({
  providers: [...urlShortenProviders, UrlShortenService],
  controllers: [UrlShortenController],
  exports: [],
})
export class UrlShortenModule {}
