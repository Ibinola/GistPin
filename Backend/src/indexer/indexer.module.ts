import { Module } from '@nestjs/common';
import { IndexerService } from './indexer.service';
import { SorobanModule } from '../soroban/soroban.module';

@Module({
  imports: [SorobanModule],
  providers: [IndexerService],
})
export class IndexerModule {}
