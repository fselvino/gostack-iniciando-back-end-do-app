import { container } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/provider/mailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/provider/mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import IMailProvider from './mailProvider/models/IMailProvider';
import EtherealMailProvider from './mailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
