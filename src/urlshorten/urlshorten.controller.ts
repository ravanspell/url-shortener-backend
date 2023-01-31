import {
  Body,
  Controller,
  Post,
  Version,
  Res,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { UrlShortenService } from './urlshorten.service';
import { Response } from 'express';
import { UrlShortenerDto } from './dto/urlShortener.dto';
import { ApiOperation } from '@nestjs/swagger';

/**
 * Handles the short URL
 */
@Controller({ path: '/', version: ['1'] })
export class UrlShortenController {
  constructor(private readonly urlShortenService: UrlShortenService) {}

  @ApiOperation({
    description: "Create the hash url. Insert original URL as 'url'",
    tags: ['services'],
  })
  @Version('1')
  @Post('/short')
  async shortenUrl(@Body() body: UrlShortenerDto, @Res() response: Response) {
    try {
      console.log('create short url input: ', body);
      const { url } = body;
      const data = {
        original_url: url,
        short_url: '',
      };
      let shortURLHash = '';
      let isHashAvailable = {};
      do {
        shortURLHash = this.urlShortenService.generateURLHash();
        data.short_url = shortURLHash;
        isHashAvailable = await this.urlShortenService.getByShortHash(
          shortURLHash,
        );
      } while (isHashAvailable);
      console.log('saved input: ', data);
      await this.urlShortenService.create(data);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          url,
          shortUrl: `${process.env.BASE_FRONTEND_URL}${shortURLHash}`,
        },
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong!',
      });
    }
  }

  @ApiOperation({
    description: 'Get the original URL',
    tags: ['services'],
  })
  @Version('1')
  @Get('/url/:short_url')
  async openOriginalUrl(
    @Param('short_url') shortenUrl: string,
    @Res() response: Response,
  ) {
    try {
      console.log('short url hex', shortenUrl);
      const url = await this.urlShortenService.getByShortHash(shortenUrl);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          url: url?.original_url || '',
        },
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong!',
      });
    }
  }
}
