**Desenvolvimento da FinAPI**

:point_right: Api desenvolvida para auxiliar no controle financeiro pessoal.

:point_right: Funcionalidades relativas ao usuário:

- [x] Criar um usuário
- [x] Autenticar um usuário
- [x] Mostrar perfil de um usuário

:point_right: Funcionalidades relativas as transações:

- [x] Criar uma transação
- [x] Mostrar o balanço
- [x] Mostrar uma transação específica


:point_right: Mapa mental:

   ```mermaid
   graph TD;
    A(Create User)-->B(User);
    B(User)-->C(Show user Profile);
    B(User)-->E{Create statement}
    B(User)-->D(Authenticate User);
    E{Create statement}-->F(Get Balance);
    E{Create statement}-->G(Get Statement Operation);
  ```




