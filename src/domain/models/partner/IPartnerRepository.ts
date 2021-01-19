import { Partner } from './partner';

export interface IPartnerRepository {
  save(item: Partner): Promise<Partner>;
  findOne(id: string): Promise<Partner>;
  findWithin(coordinates: number[]): Promise<Partner[]>;
}
