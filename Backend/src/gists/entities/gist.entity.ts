export class Gist {
  id: string;
  gistId: string;
  locationCell: string;
  lat: number;
  lon: number;
  contentCid: string;
  text: string;
  authorAddress: string | null;
  txHash: string;
  createdAt: Date;
}
