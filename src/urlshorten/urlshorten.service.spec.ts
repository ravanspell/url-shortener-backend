import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortenService } from './urlshorten.service';

describe('UrlshortenService', () => {
  let service: UrlshortenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlshortenService],
    }).compile();

    service = module.get<UrlshortenService>(UrlshortenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
