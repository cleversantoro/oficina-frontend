# Oficina

Este projeto foi gerado utilizando o [Angular CLI](https://github.com/angular/angular-cli) versão 20.0.5.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Servidor de Desenvolvimento](#servidor-de-desenvolvimento)
- [Geração de Código](#geração-de-código)
- [Build](#build)
- [Testes](#testes)
  - [Testes Unitários](#testes-unitários)
  - [Testes End-to-End](#testes-end-to-end)
- [Recursos Adicionais](#recursos-adicionais)
- [Endpoints da API](#endpoints-da-api)

## Sobre o Projeto

O projeto Oficina é uma aplicação frontend desenvolvida em Angular para gerenciar oficinas mecânicas. Ele inclui funcionalidades como cadastro de clientes, mecânicos, fornecedores, gestão de ordens de serviço, controle de estoque e financeiro.

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local, execute:

```bash
ng serve
```

Acesse a aplicação no navegador em `http://localhost:4200/`. O aplicativo será recarregado automaticamente ao modificar os arquivos fonte.

## Geração de Código

O Angular CLI inclui ferramentas poderosas para geração de código. Para criar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para uma lista completa de esquemas disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Build

Para compilar o projeto, execute:

```bash
ng build
```

Os artefatos de build serão armazenados no diretório `dist/`. O build de produção otimiza a aplicação para desempenho e velocidade.

## Testes

### Testes Unitários

Para executar os testes unitários com o [Karma](https://karma-runner.github.io), use o comando:

```bash
ng test
```

### Testes End-to-End

Para testes end-to-end (e2e), execute:

```bash
ng e2e
```

O Angular CLI não inclui um framework de testes e2e por padrão. Escolha um que atenda às suas necessidades.

## Recursos Adicionais

Para mais informações sobre o Angular CLI, incluindo referências detalhadas de comandos, visite a [documentação oficial](https://angular.dev/tools/cli).

## Endpoints da API

### Geral

| Método | Rota      | Descrição                          |
|--------|-----------|------------------------------------|
| GET    | /health   | Retorna status da aplicação        |
| GET    | /swagger  | Interface de exploração da API     |

### Cadastro

#### Clientes

| Método | Rota                        | Descrição                                           |
|--------|-----------------------------|---------------------------------------------------|
| GET    | /cadastro/clientes          | Lista clientes com filtros por nome, status, tipo, origem e VIP |
| GET    | /cadastro/clientes/{codigo} | Retorna detalhes completos do cliente (endereços, contatos, veículos etc) |
| POST   | /cadastro/clientes          | Cria cliente PF ou PJ com validações completas    |
| PUT    | /cadastro/clientes/{codigo} | Atualiza dados do cliente, substituindo coleções relacionadas |
| DELETE | /cadastro/clientes/{codigo} | Remove cliente e relacionamentos dependentes      |

#### Mecânicos

| Método | Rota                | Descrição                                           |
|--------|---------------------|---------------------------------------------------|
| GET    | /cadastro/mecanicos | Lista mecânicos com especialidades, contatos e disponibilidade |
| POST   | /cadastro/mecanicos | Cria mecânico validando código, documento principal e especialidades |

#### Fornecedores

| Método | Rota                   | Descrição                                           |
|--------|------------------------|---------------------------------------------------|
| GET    | /cadastro/fornecedores | Lista fornecedores ativos                          |
| POST   | /cadastro/fornecedores | Cadastra fornecedor com informações financeiras e contatos |

### Ordem de Serviço

| Método | Rota                   | Descrição                                           |
|--------|------------------------|---------------------------------------------------|
| GET    | /ordens/               | Lista ordens com itens associados                  |
| POST   | /ordens/               | Abre nova ordem de serviço para cliente/mecânico   |
| POST   | /ordens/{id}/itens     | Inclui item de serviço/peça na ordem               |
| PUT    | /ordens/{id}/status    | Atualiza status e data de conclusão                |

### Estoque

| Método | Rota                   | Descrição                                           |
|--------|------------------------|---------------------------------------------------|
| GET    | /estoque/pecas         | Lista peças com saldo atual                        |
| POST   | /estoque/pecas         | Cadastra nova peça vinculada a fornecedor          |
| POST   | /estoque/movimentacoes | Lança movimentação de entrada/saída ajustando o saldo |

### Financeiro

| Método | Rota                       | Descrição                                           |
|--------|----------------------------|---------------------------------------------------|
| POST   | /financeiro/pagamentos     | Processa pagamento (mock) e grava status inicial  |
| PUT    | /financeiro/pagamentos/{id}/status | Ajusta status manualmente (ex.: PAGO, FALHA) |
| POST   | /financeiro/nfe           | Emite NF-e (mock) com base em pagamentos aprovados da OS |
