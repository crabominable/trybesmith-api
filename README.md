## Trybesmith-api

<img alt="Project stage: Development" src="https://img.shields.io/badge/Project%20Stage-Development-yellowgreen.svg" />

Olá, meu nome é Lucas Pinheiro e este é o repositório do Trybesmith API! Projeto desenvolvido individualmente no módulo de Back End da TRYBE, o qual utiliza TYPESCRIPT, NODE.JS, EXPRESS, autenticação e validação em JWT e MySQL!

### Mais sobre

Usando o EXPRESS como framework para o tratamento das requisições, foi feito um index.ts para a definição das rotas, a qual chamará seu respectivo controller e assim gerando o ciclo do MSC, mas não antes de passar por todas as validações básicas necessárias para tal rota, como validação de token e de mais dados enviados. Usando o mysql2 para fazer a pool de conexões, o model é composto funções cujo o nome é igual a das outras camadas, que possuem queries diretas ao utilizar o execute da pool de conexões. O service segue o mesmo modelo proposto no controller e no model, dividindo o nome da função conforme o que segue a das outras, e fazer todas as validações das regras de negócio, gerando erros de domínio que posteriormente serão tratados em um middleware de erro.

### Quais habilidades foram necessárias para o desenvolvimento?

Foi utilizado conhecimentos e habilidades no padrão de arquitetura MSC, assim como o conceito de middlewares no EXPRESS, validar e autenticar com o JWT, utilizar o MySQL e SQL para a camada de model, tratamento de erros com middlewares de erro e tipagem utilizando dos conceitos sobre interface do POO.

### In english
Hello, my name is Lucas Pinheiro and this is the Trybesmith API repository! Project developed individually in the Back End module of TRYBE, which uses TYPESCRIPT, NODE.JS, EXPRESS, authentication and validation in JWT and MySQL!

### More about

Using EXPRESS as a framework for handling requests, an index.ts was created for defining the routes, which will call its respective controller and thus generating the MSC cycle, but not before going through all the basic validations necessary for that route, such as token validation and further data sent. Using mysql2 to pool connections, the model is composed of functions whose name is the same as the other layers, which have direct queries when using the execute connection pool. The service follows the same model proposed in the controller and in the model, dividing the function name according to what follows the others, and performing all the validations of the business rules, generating domain errors that will later be treated in an error middleware.

### What skills were needed for development?

Knowledge and skills in the MSC architecture pattern were used, as well as the concept of middlewares in EXPRESS, validating and authenticating with JWT, using MySQL and SQL for the model layer, error handling with error middleware and typing using the concepts about OOP interface.
