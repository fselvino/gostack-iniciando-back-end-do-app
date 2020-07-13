import { strict } from 'assert';
import { string } from '@hapi/joi';

export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(Key: string): Promise<void>;
}
