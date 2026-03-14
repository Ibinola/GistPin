import { Module } from '@nestjs/common';
import { GistsService } from './gists.service';
import { GistsController } from './gists.controller';
import { IpfsModule } from '../ipfs/ipfs.module';
import { SorobanModule } from '../soroban/soroban.module';
import { GeoService } from '../geo/geo.service';

@Module({
  imports: [IpfsModule, SorobanModule],
  controllers: [GistsController],
  providers: [GistsService, GeoService],
  exports: [GistsService],
})
export class GistsModule {}
