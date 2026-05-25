# Modelo LAB 10 - Node.js + EJS + MongoDB Online

Este projeto é um modelo para o lab usando:

- Node.js
- Express
- EJS
- MongoDB Atlas online
- Pacote `mongodb@4.12.1`, igual ao estilo da aula

## Como rodar

### 1. Abrir a pasta no VS Code

Abra a pasta do projeto.

No terminal, confira se aparecem os arquivos:

```bash
dir
```

Tem que aparecer:

```txt
app.js
package.json
views
public
```

### 2. Instalar dependências

```bash
npm install
```

Se o PowerShell bloquear:

```bash
npm.cmd install
```

### 3. Configurar MongoDB Atlas

No MongoDB Atlas:

1. Crie uma conta.
2. Crie um cluster FREE.
3. Crie usuário e senha do banco.
4. Libere o IP `0.0.0.0/0`.
5. Vá em Connect > Drivers.
6. Copie a string de conexão.

No arquivo `app.js`, troque esta linha:

```js
const uri = "mongodb+srv://USUARIO:SENHA@SEUCLUSTER.mongodb.net/?retryWrites=true&w=majority";
```

Pela sua string do MongoDB Atlas.

### 4. Rodar o servidor

```bash
node app.js
```

Se funcionar, deve aparecer:

```txt
Banco online conectado com sucesso
Servidor rodando na porta 80
```

### 5. Abrir no navegador

```txt
http://localhost/
```

A rota `/` redireciona para `/projetos`.

## Se a porta 80 der erro

A porta 80 às vezes precisa de administrador.

Para testar, no `app.js`, comente:

```js
app.listen(80, () => {
    console.log("Servidor rodando na porta 80");
});
```

E use o trecho comentado da porta 3000.

Depois acesse:

```txt
http://localhost:3000/
```

Mas se o professor pediu porta 80, deixe 80 para entregar.

## CRUD usado no projeto

### Create

- Cadastro de usuário com `insertOne()`
- Cadastro de carro com `insertOne()`

### Read

- Login com `findOne()`
- Listagem de carros com `find().toArray()`

### Update

- Atualizar carro com `updateOne()` e `$set`
- Vender carro com `updateOne()` e `$inc`

### Delete

- Remover carro com `deleteOne()`

## Coleções do banco

O projeto usa duas coleções:

### Usuarios

- nome
- login
- senha

### Carros

- marca
- modelo
- ano
- qtde_disponivel

## Páginas dinâmicas com EJS

As páginas que mostram dados do banco são:

- `/carros`
- `/gerenciar-carros`
- `/editar-carro/:id`

O login também consulta o banco.
