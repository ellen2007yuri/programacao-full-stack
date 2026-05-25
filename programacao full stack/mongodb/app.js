/*
============================================================
COMO RODAR O PROJETO

1) Abra a pasta no VS Code.

2) No terminal, rode:
   npm install

3) Depois rode:
   node app.js

4) Abra no navegador:
   http://localhost/

OBS:
- O projeto usa porta 80 porque o enunciado pediu.
- Se a porta 80 der erro no seu PC, teste com 3000.
- Como seu MongoDB funcionou SEM SRV, use a string que começa com:
  mongodb://
  e NÃO a que começa com:
  mongodb+srv://
============================================================
*/

const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

// ============================================================
// CONFIGURAÇÃO DO BANCO
// ============================================================

// COLE AQUI A STRING SEM SRV QUE FUNCIONOU NO SEU PC.
// Tem que começar com mongodb://
// Exemplo:
// const uri = "mongodb://usuario:senha@servidor1:27017,servidor2:27017,servidor3:27017/bd?ssl=true&replicaSet=...&authSource=admin&retryWrites=true&w=majority";

const uri = "mongodb+srv://ellenyurisuzuki2007:ellenyurisuzuki@mongodb.gsm2rpt.mongodb.net/?appName=mongodb";
const nomeBanco = "mongodb";

let client;
let db;

// conecta no MongoDB Atlas
async function conectarBanco() {
    try {
        client = new MongoClient(uri);
        await client.connect();

        db = client.db(nomeBanco);

        console.log("Banco online conectado com sucesso");
    } catch (erro) {
        console.log("Erro ao conectar no banco:", erro);
        process.exit(1);
    }
}

// ============================================================
// CONFIGURAÇÕES DO EXPRESS / EJS / CSS
// ============================================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ============================================================
// ROTAS PRINCIPAIS
// ============================================================

app.get("/", (req, res) => {
    res.redirect("/projetos");
});

app.get("/projetos", (req, res) => {
    res.render("projetos");
});

// ============================================================
// USUÁRIOS
// ============================================================

// abre página de cadastro
app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

// cadastra usuário no banco
app.post("/cadastro", async (req, res) => {
    try {
        const { nome, login, senha } = req.body;

        await db.collection("Usuarios").insertOne({
            nome: nome,
            login: login,
            senha: senha
        });

        res.redirect("/login");
    } catch (erro) {
        console.log("Erro ao cadastrar usuário:", erro);
        res.send("Erro ao cadastrar usuário");
    }
});

// abre página de login
app.get("/login", (req, res) => {
    res.render("login", { erro: null });
});

// verifica login no banco
app.post("/login", async (req, res) => {
    try {
        const { login, senha } = req.body;

        const usuario = await db.collection("Usuarios").findOne({
            login: login,
            senha: senha
        });

        if (usuario) {
            res.redirect("/carros");
        } else {
            res.render("login", { erro: "Login ou senha inválidos" });
        }
    } catch (erro) {
        console.log("Erro ao fazer login:", erro);
        res.send("Erro ao fazer login");
    }
});

// ============================================================
// CARROS
// ============================================================

// lista carros disponíveis
app.get("/carros", async (req, res) => {
    try {
        const carros = await db.collection("Carros").find().toArray();

        res.render("carros", { carros: carros });
    } catch (erro) {
        console.log("Erro ao listar carros:", erro);
        res.send("Erro ao listar carros");
    }
});

// página de gerência dos carros
app.get("/gerenciar-carros", async (req, res) => {
    try {
        const carros = await db.collection("Carros").find().toArray();

        res.render("gerenciar-carros", { carros: carros });
    } catch (erro) {
        console.log("Erro ao carregar gerência:", erro);
        res.send("Erro ao carregar gerência dos carros");
    }
});

// abre formulário de cadastro de carro
app.get("/cadastrar-carro", (req, res) => {
    res.render("cadastrar-carro");
});

// cadastra carro no banco
app.post("/cadastrar-carro", async (req, res) => {
    try {
        const { marca, modelo, ano, qtde_disponivel } = req.body;

        await db.collection("Carros").insertOne({
            marca: marca,
            modelo: modelo,
            ano: Number(ano),
            qtde_disponivel: Number(qtde_disponivel)
        });

        res.redirect("/gerenciar-carros");
    } catch (erro) {
        console.log("Erro ao cadastrar carro:", erro);
        res.send("Erro ao cadastrar carro");
    }
});

// abre formulário de edição do carro
app.get("/editar-carro/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const carro = await db.collection("Carros").findOne({
            _id: new ObjectId(id)
        });

        res.render("editar-carro", { carro: carro });
    } catch (erro) {
        console.log("Erro ao abrir edição:", erro);
        res.send("Erro ao abrir edição do carro");
    }
});

// atualiza carro
app.post("/editar-carro/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { marca, modelo, ano, qtde_disponivel } = req.body;

        await db.collection("Carros").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    marca: marca,
                    modelo: modelo,
                    ano: Number(ano),
                    qtde_disponivel: Number(qtde_disponivel)
                }
            }
        );

        res.redirect("/gerenciar-carros");
    } catch (erro) {
        console.log("Erro ao atualizar carro:", erro);
        res.send("Erro ao atualizar carro");
    }
});

// remove carro
app.post("/remover-carro/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await db.collection("Carros").deleteOne({
            _id: new ObjectId(id)
        });

        res.redirect("/gerenciar-carros");
    } catch (erro) {
        console.log("Erro ao remover carro:", erro);
        res.send("Erro ao remover carro");
    }
});

// vende carro diminuindo a quantidade em 1
app.post("/vender-carro/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const carro = await db.collection("Carros").findOne({
            _id: new ObjectId(id)
        });

        if (carro && carro.qtde_disponivel > 0) {
            await db.collection("Carros").updateOne(
                { _id: new ObjectId(id) },
                { $inc: { qtde_disponivel: -1 } }
            );
        }

        res.redirect("/carros");
    } catch (erro) {
        console.log("Erro ao vender carro:", erro);
        res.send("Erro ao vender carro");
    }
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

async function iniciarServidor() {
    await conectarBanco();

    app.listen(80, () => {
        console.log("Servidor rodando na porta 80");
    });

    /*
    Se a porta 80 der erro só para testar, comente o app.listen acima
    e use esse aqui:

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });

    Aí acessa:
    http://localhost:3000/
    */
}

iniciarServidor();