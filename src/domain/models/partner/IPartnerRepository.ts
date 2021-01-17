import { Partner } from './partner';

export interface IPartnerRepository {
  save(item: Partner): Promise<Partner>;
  findOne(id: string): Promise<Partner>;
  findNearestBy(coordinates: number[]): Promise<Partner>;
}
