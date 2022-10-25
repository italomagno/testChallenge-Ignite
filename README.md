# **Desenvolvimento da FinAPI**

Api desenvolvida para auxiliar no controle financeiro pessoal.

### :point_right: Funcionalidades relativas ao usuário:

- [x] Criar um usuário
- [x] Autenticar um usuário
- [x] Mostrar perfil de um usuário

### :point_right: Funcionalidades relativas as transações:

- [x] Criar uma transação
- [x] Mostrar o balanço
- [x] Mostrar uma transação específica


### :point_right: Mapa mental:

   ```mermaid
   graph TD;
    A(Create User)-->B(User);
    B(User)-->C(Show user Profile);
    B(User)-->E{Create statement}
    B(User)-->D(Authenticate User);
    E{Create statement}-->F(Get Balance);
    E{Create statement}-->G(Get Statement Operation);
  ```
router.use('/', authenticationRouter);
router.use('/users', usersRouter);
router.use('/profile', userProfileRouter);
router.use('/statements', statementRouter);

statementRouter.get('/balance', getBalanceController.execute);
statementRouter.post('/deposit', createStatementController.execute);
statementRouter.post('/withdraw', createStatementController.execute);
statementRouter.get('/:statement_id', getStatementOperationController.


:point_right: Rotas da aplicação

| Routes   | Request |Authenticated | Body| Headers |Route params | Response
|---------|-------------|-------------|-------------|-------------|-------------|-------------|
| /users       | post | - []       | {name,email,password}        | XXXXX | XXXXX| 201
| /profile       | get  | - [x]     | XXXXX       | JWT | XXXXX| User profile
| /statements/balance       | get  | - [x]     | XXXXX       | JWT | XXXXX| All Statements and total balance
| /statements/deposit       | post  | - [x]     | {amount,description}       | JWT | XXXXX| Deposit informations and 201
| /statements/withdraw       | post  | - [x]     | {amount,description}       | JWT | XXXXX| Withdraw informations and 201
| /statements/:statement_id       | get  | - [x]     | {amount,description}       | JWT | statement_id | Withdraw informations and 201






