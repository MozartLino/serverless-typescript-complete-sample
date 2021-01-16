import { Partner } from './partner';

export interface IPartnerRepository {
  save(item: Partner): Promise<void>;
}
