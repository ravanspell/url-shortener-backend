import { Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { URL_SHORTENER_REPOSITORY } from 'src/constants';
import { ShortLinks } from './urlshorten.entity';

@Injectable()
export class UrlShortenService {
  constructor(
    @Inject(URL_SHORTENER_REPOSITORY)
    private readonly urlShortenerRepository: typeof ShortLinks,
  ) {}

  async create(url: any): Promise<any> {
    return this.urlShortenerRepository.create<any>(url);
  }

  generateURLHash(): string {
    return this.trimHash(randomBytes(7).toString('hex'));
  }

  trimHash(hash: string): string {
    return hash.split('').splice(0, 7).join('');
  }

  async getByShortHash(hash: string): Promise<ShortLinks> {
    return this.urlShortenerRepository.findOne({
      where: {
        short_url: hash,
      },
    });
  }
}
