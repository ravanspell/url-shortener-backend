import { ApiProperty } from '@nestjs/swagger';
import {
  IsUrl,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class UrlShortenerDto {
  @ApiProperty()
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  url: string;
}
