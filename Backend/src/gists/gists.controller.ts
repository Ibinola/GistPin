import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGistDto } from './dto/create-gist.dto';
import { QueryGistsDto } from './dto/query-gists.dto';
import { GistsService } from './gists.service';

@Controller('gists')
export class GistsController {
  constructor(private readonly gistsService: GistsService) {}

  /**
   * GET /gists?lat=&lon=&radius=&limit=&cursor=
   * Returns gists within `radius` metres of the given coordinates.
   */
  @Get()
  findNearby(@Query(new ValidationPipe({ transform: true })) query: QueryGistsDto) {
    return this.gistsService.findNearby(query);
  }

  /**
   * POST /gists
   * Pins content to IPFS, submits to Soroban, and persists the record.
   */
  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) dto: CreateGistDto) {
    return this.gistsService.create(dto);
  }
}
