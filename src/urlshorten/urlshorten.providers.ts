import { URL_SHORTENER_REPOSITORY } from 'src/constants';
import { ShortLinks } from './urlshorten.entity';

export const urlShortenProviders = [
  {
    provide: URL_SHORTENER_REPOSITORY,
    useValue: ShortLinks,
  },
];
