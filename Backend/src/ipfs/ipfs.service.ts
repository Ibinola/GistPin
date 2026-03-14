import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IpfsService {
  private readonly logger = new Logger(IpfsService.name);

  constructor(private readonly config: ConfigService) {}

  /**
   * Pin a JSON payload to IPFS via the Pinata API.
   * Returns the resulting CID string.
   */
  async pinJson(payload: Record<string, unknown>): Promise<string> {
    const apiKey = this.config.get<string>('ipfs.pinataApiKey');
    const secretKey = this.config.get<string>('ipfs.pinataSecretKey');

    if (!apiKey || !secretKey) {
      this.logger.warn('Pinata credentials not set — returning mock CID');
      return `bafymock${Date.now()}`;
    }

    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: apiKey,
        pinata_secret_api_key: secretKey,
      },
      body: JSON.stringify({ pinataContent: payload }),
    });

    if (!res.ok) {
      throw new Error(`Pinata error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as { IpfsHash: string };
    return data.IpfsHash;
  }
}
