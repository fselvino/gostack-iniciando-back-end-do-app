import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/provider/storageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/provider/storageProvider/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
