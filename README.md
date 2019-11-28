# Singular Project
Startup base e rápido para projetos da Net On com Singular framework.

## 1. Criação de um novo projeto

```terminal
composer create-project singular/singular-project nomedoprojeto --stability=dev
```

## 2. Configurações iniciais

Após o projeto ser criado, é necessário realizar as configurações iniciais.

### 2.1 Inicialização do Phinx

Para gerenciar as migrações de banco de dados da aplicação, o projeto baseado no Singular utiliza o
[Phinx](https://phinx.org).

O Phinx já está iniciado no projeto, mas é necessário configurá-lo
para o acesso ao banco de dados na máquina onde a aplicação está sendo desenvolvida.

Acesse o arquivo __phinx.yml__ no diretório raiz, em seguida:

+ Duplique o bloco de configuração __base__ e altere o nome do novo bloco para __dev-__ seguido pelo seu nome.
Por exemplo: __dev-otavio__;
+ No novo bloco, altere as configurações de acesso ao banco de acordo com as configurações da instalação do
mysql em sua máquina. Exemplo de configuração

```yml
    ...

    dev-otavio:
        adapter: mysql
        host: localhost
        name: singular
        user: root
        pass: 'root'
        port: 3306
        charset: utf8

```
+ Em seguida, teste suas configurações:

```shell
vendor/bin/phinx test
..
Phinx by Rob Morgan - https://phinx.org. 0.8.1
..
using config file ./phinx.yml
using config parser yaml
success!
```
Se ocorrer algum erro, realize a alteração no arquivo e teste novamente até obter sucesso.

+ Para finalizar, é necessário criar uma variável de ambiente em sua máquina. Se estiver utilizando
Linux ou MacOS, basta digitar o seguinte comando, substituíndo o __seunome__ pelo nome que você colocou no
arquivo de configuração:

```shell
export PHINX_ENVIRONMENT=dev-seunome
```
