import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateGistDto } from './dto/create-gist.dto';
import { QueryGistsDto } from './dto/query-gists.dto';
import { Gist } from './entities/gist.entity';
import { IpfsService } from '../ipfs/ipfs.service';
import { SorobanService } from '../soroban/soroban.service';
import { GeoService } from '../geo/geo.service';

@Injectable()
export class GistsService {
  // In-memory store — replace with TypeORM + PostGIS repository
  private gists: Gist[] = [];

  constructor(
    private readonly ipfs: IpfsService,
    private readonly soroban: SorobanService,
    private readonly geo: GeoService,
  ) {}

  async create(dto: CreateGistDto): Promise<Gist> {
    // 1. Pin content to IPFS
    const contentCid = await this.ipfs.pinJson({ text: dto.text });

    // 2. Derive location cell from coordinates
    const locationCell = this.geo.encode(dto.lat, dto.lon);

    // 3. Submit to Soroban GistRegistry contract
    const { gistId, txHash } = await this.soroban.postGist(
      dto.authorAddress ?? null,
      locationCell,
      contentCid,
    );

    // 4. Persist locally
    const gist: Gist = {
      id: randomUUID(),
      gistId,
      locationCell,
      lat: dto.lat,
      lon: dto.lon,
      contentCid,
      text: dto.text,
      authorAddress: dto.authorAddress ?? null,
      txHash,
      createdAt: new Date(),
    };

    this.gists.push(gist);
    return gist;
  }

  findNearby(query: QueryGistsDto): {
    data: Gist[];
    nextCursor: string | null;
    total: number;
  } {
    const { lat, lon, radius = 500, limit = 20 } = query;

    // Simple in-memory distance filter — replace with PostGIS ST_DWithin query
    const nearby = this.gists.filter(
      (g) => this.haversineMeters(lat, lon, g.lat, g.lon) <= radius,
    );

    const total = nearby.length;
    const data = nearby.slice(0, limit);
    const nextCursor =
      data.length === limit && total > limit
        ? Buffer.from(
            JSON.stringify({ id: data[data.length - 1].id }),
          ).toString('base64')
        : null;

    return { data, nextCursor, total };
  }

  private haversineMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6_371_000;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}
