import { container } from 'tsyringe';
import EtherealMailProvider from '@shared/container/provider/mailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/container/provider/mailProvider/implementations/SESMailProvider';
import IMailProvider from '@shared/container/provider/mailProvider/models/IMailProvider';
import mailConfig from '@config/mail';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
