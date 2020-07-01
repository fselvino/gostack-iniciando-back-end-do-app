import IParseMailTemplateDTO from '@shared/container/provider/mailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
