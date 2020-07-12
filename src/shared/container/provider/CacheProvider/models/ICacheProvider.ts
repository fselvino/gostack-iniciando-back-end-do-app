import { strict } from 'assert';
import { string } from '@hapi/joi';

export default interface ICacheProvider {
  save(key: string, value: string): Promise<void>;
  recover(key: string): Promise<string | null>;
  invalidate(Key: string): Promise<void>;
}
