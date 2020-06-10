# Testes automatizados

  Que a nossa aplicação continue funcionando independente do número de novas funcionalidades e do número de devs no time.

  1. Testes unitários (TDD)

  Testam funcionalidades especificas da nossa aplicaçao (precisam ser funçoes puras)

  Jamis: realiza chamada à uma API e efeito colateral

  2. Testes de integração

  Testam uma funcionalidade completa, passando por varias camadas da aplicação;

  Router -> Controller -> Serviço -> Repositório ...

  3. Testes E2E

  Teste que simulam a ação do usuario dentro da nossa aplicação

  1. Clique no input de email
  2. Preencha fernandoselvino@gmail.com
  3. Clique no input de senha
  4. Preecha 123456
  5. Clique no botão "logar"
  6. Espero que a página tenha enviado o usuário para o dashboard

# TDD (Test Driven Development)

- Quando o usuário se cadastrar na aplicação, ele deve receber um email de boas-vindas
