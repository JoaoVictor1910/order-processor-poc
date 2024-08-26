<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

```
const { postInAnalytics } = require('./caminho/para/seu/arquivo');
const Logit = require('../helpers/logger.helper');
const { invokeEvent } = require('../helpers/lambda.helper');

jest.mock('../helpers/logger.helper');
jest.mock('../helpers/lambda.helper');

describe('Analytics Service', () => {
  const mockSession = {
    humanSession: {
      contexto: {
        id_sessao: '12345',
        message: {
          conteudo_interacao: {
            contexto: 'context_data',
            text: 'message_text'
          },
          dados_sessao: 'dados_sessao_data',
          id_correlacao: 'correlation_id',
        },
        central: 'central_data'
      }
    },
    contexto: {
      id_sessao: '54321',
      message: {
        conteudo_interacao: {
          contexto: 'context_data'
        },
        dados_sessao: 'dados_sessao_data',
        id_correlacao: 'correlation_id',
      }
    }
  };

  const mockMessage = {
    id_cliente: 'cliente_123',
    id_tenant: 'tenant_123',
    id_contato: 'contato_123',
    tenant_name: 'Tenant Name',
    contact_name: 'Contact Name',
    id_mensagem: 'message_id',
    whatsappStatus: 'status',
    destinatario: 'customer',
    nome_remetente: 'Assistente Virtual Itaú',
    texto: 'mensagem de texto',
    data_mensagem: '2024-08-25T12:00:00Z',
  };

  const safeData = { /* Dados seguros que podem ser passados para o teste */ };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should prepare analytics payload and invoke event', async () => {
    invokeEvent.mockResolvedValue('Lambda invoked');

    const result = await postInAnalytics(mockMessage, mockSession, safeData);

    expect(result).toBe('Message sent');
    expect(invokeEvent).toHaveBeenCalledWith('whatsapp-analytics', expect.any(Object));
    expect(Logit.debug).toHaveBeenCalledTimes(2);
    expect(Logit.debug).toHaveBeenCalledWith(
      'calling analytics lambda function...',
      expect.any(Object)
    );
  });

  it('should handle errors when invoking analytics event', async () => {
    const errorMessage = 'Something went wrong';
    invokeEvent.mockRejectedValue(new Error(errorMessage));

    await expect(postInAnalytics(mockMessage, mockSession, safeData)).rejects.toThrow(
      `Could not post message to analytics: ${JSON.stringify(new Error(errorMessage))}`
    );

    expect(Logit.error).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should handle human session correctly', async () => {
    const humanSession = {
      humanSession: {
        contexto: {
          id_sessao: '12345',
          message: {
            conteudo_interacao: {
              contexto: 'context_data',
              text: 'message_text',
            },
            id_correlacao: 'correlation_id',
          },
        },
      },
    };

    invokeEvent.mockResolvedValue('Lambda invoked');

    const result = await postInAnalytics(mockMessage, humanSession, safeData);

    expect(result).toBe('Message sent');
    expect(invokeEvent).toHaveBeenCalledWith('whatsapp-analytics', expect.any(Object));
  });
});
```

