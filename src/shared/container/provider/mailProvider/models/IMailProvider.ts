import ISendMailDTO from '@shared/container/provider/mailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
