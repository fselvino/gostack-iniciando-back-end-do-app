import { container } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/provider/mailTemplateProvider/models/IMailTemplateProvider';

import HandlebarsMailTemplateProvider from '@shared/container/provider/mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
