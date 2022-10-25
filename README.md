# **Desenvolvimento da FinAPI**

Api desenvolvida para auxiliar no controle financeiro pessoal.

### :point_right: Funcionalidades relativas ao usuário:

- [x] Criar um usuário
- [x] Autenticar um usuário
- [x] Mostrar perfil de um usuário

### :point_right: Funcionalidades relativas as Operações:

- [x] Criar uma operação
- [x] Mostrar o balanço
- [x] Mostrar uma operação específica


### :point_right: Mapa mental:

   ```mermaid
   graph TD;
    A(Create User)-->B(User);
    B(User)-->D(Authenticate User);
    D(Authenticate User)-->E(Create statement);
    D(Authenticate User)-->C(Show user Profile);
    E{Create statement}-->F(Statement);
    F(Statement)-->G(Get Balance);
    F(Statement)-->H(Get Statement Operation);
  ```

:point_right: Rotas da aplicação

| Routes   | Request |Authenticated | Body| Headers |Route params | Response
|---------|-------------|-------------|-------------|-------------|-------------|-------------|
| /users       | post | :x:      | {name,email,password}        | XXXXX | XXXXX| 201
| /profile       | get  | :heavy_check_mark:     | XXXXX       | Token-JWT | XXXXX| User profile
| /statements/balance       | get  | :heavy_check_mark:     | XXXXX       | Token-JWT | XXXXX| All Statements and total balance
| /statements/deposit       | post  | :heavy_check_mark:     | {amount,description}       | Token-JWT | XXXXX| Deposit informations and 201
| /statements/withdraw       | post  | :heavy_check_mark:     | {amount,description}       | Token-JWT | XXXXX| Withdraw informations and 201
| /statements/:statement_id       | get  | :heavy_check_mark:     | XXXXX       | Token-JWT | statement_id | Statement information






