# Recuperação de senha

 //RF - requesitos funcionais define quais funcionalidade teremos na recuperaçao de senha;
  **RF**

  - O usuário deve poder recuper sua senha informando o seu e-mail;
  - O usuário deve receber um e-mail com instruçoes de recuperação de senha;
  - O usuário deve pode resetar sua senha;

 //Requesitos não funcionais
  **RNF**

  - Utilizar Mailtrap para testar envios em ambientes de dev;
  - Utilizar Amazon SES para envios em produçao;
  - O envio de e-mail deve acontecer em segundo plano (background job);


 //Regras de negócio;
  **RN**

  - O link enviado por email para resetar senha, deve expirar em 2h;
  - O usuário precisa confirmar a nova senha ao resetar  sua senha;

# Atualização de perfil

  **RF**

  - O usuário deve poder atualizar seu nome, email e senha;

  **RNF**

  **RN**
  - O usuário não pode alterar seu email para um email já utilizado;
  - Para atualizar sua senha, o usuário deve informar sua senha antiga;
  - Para atualizar susa senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

 **RF**

  - O usuario deve poder listar os agendamentos de um dia expecifico
  - O prestador deve receber uma notificação sempre que houver um novo agendamento
  - O prestador deve poder visualizar as notificações não lidas

 **RNF**

  - Os agendamentos do prestador no dia devem ser armazenados em cache
  - As notificaçoes do prestador devem ser armazenadas no MongoDB
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io


 **RN**

  - A notificaçao de ter um status de lida ou não lida para que o prestador possa controlar


# Agendamento de serviços

  **RF**
  - O usuário deve poder listar todos os prestadores de serviço cadastrados;
  - O Usuário deve poder listar os dias de um mês com pelo mesnos um horário disponivel de um prestador
  - O Usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
  - O Usuário deve poder realizar um novo agendamento com um prestador;

  **RNF**
  - A listagem de prestadores deve ser armazenada em cache

  **RN**
  - Cada agendamento deve durar 1h exatamente
  - Os agendamentos devem estar disponiveis entre 8h às 18h (Primeiro às 8h, útimo às 17h)
  - Usuário não pode agendar um horário que ja passou
  - O prestador de serviço não pode agendar serviço com sigo mesmo





