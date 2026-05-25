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
let usuarios;
let carros;

// conecta no MongoDB Atlas
async function conectarBanco() {
    try {
        client = new MongoClient(uri);
        await client.connect();

        db = client.db(nomeBanco);
        usuarios = db.collection("Usuarios");
        carros = db.collection("Carros");
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
app.post("/cadastro", (req, res) => {
    const { nome, login, senha } = req.body;

    usuarios.insertOne({
        nome: nome,
        login: login,
        senha: senha
    }, function(err){
        if(err){
            console.log("Erro ao cadastrar usuário:", erro);
            res.send("Erro ao cadastrar usuário");
        } else{
            res.redirect("/login");
        }    
    });

});

// abre página de login
app.get("/login", (req, res) => {
    res.render("login", { erro: null });
});

// verifica login no banco
app.post("/login", (req, res) => {
    const { login, senha } = req.body;

    usuarios.findOne({
        login: login,
        senha: senha
    }, function(err, usuario){
        if(err){
            console.log("Erro ao fazer login:", err);
            res.send("Erro ao fazer login");
        } else{
            if (usuario) {
                res.redirect("/carros");
            } else {
                res.render("login", { erro: "Login ou senha inválidos" });
            }
        }
    });
});

// ============================================================
// CARROS
// ============================================================

// lista carros disponíveis
app.get("/carros", (req, res) => {
    carros.find().toArray(function(err,lista){
        if(err){
            console.log("Erro ao listar carros:", err);
            res.send("Erro ao listar carros");
        }else {
            res.render("carros", { carros: lista });
        }
    });
});

// página de gerência dos carros
app.get("/gerenciar-carros", (req, res) => {
    carros.find().toArray(function(err,lista){
        if(err){
            console.log("Erro ao carregar gerência:", err);
            res.send("Erro ao carregar gerência dos carros");
        }else{
            res.render("gerenciar-carros", { carros: lista });        
        }
    });
});

// abre formulário de cadastro de carro
app.get("/cadastrar-carro", (req, res) => {
    res.render("cadastrar-carro");
});

// cadastra carro no banco
app.post("/cadastrar-carro", (req, res) => {
    const { marca, modelo, ano, qtde_disponivel } = req.body;

    carros.insertOne({
        marca: marca,
        modelo: modelo,
        ano: Number(ano),
        qtde_disponivel: Number(qtde_disponivel)
    },function(err){
        if(err){
            console.log("Erro ao cadastrar carro:", err);
            res.send("Erro ao cadastrar carro");

        } else{
            res.redirect("/gerenciar-carros");
        }
    });
});

// abre formulário de edição do carro
app.get("/editar-carro/:id", (req, res) => {
    const id = req.params.id;

    carros.findOne({
        _id: new ObjectId(id)
    }, function(err,carro){
        if(err){
            console.log("Erro ao abrir edição:", err);
            res.send("Erro ao abrir edição do carro");
        } else{
            res.render("editar-carro", { carro: carro });
        }
    });
});

// atualiza carro
app.post("/editar-carro/:id", (req, res) => {
    const id = req.params.id;
    const { marca, modelo, ano, qtde_disponivel } = req.body;

    carros.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                marca: marca,
                modelo: modelo,
                ano: Number(ano),
                qtde_disponivel: Number(qtde_disponivel)
            }
        },function(err){
            if(err){
                console.log("Erro ao atualizar carro:", err);
                res.send("Erro ao atualizar carro");
            } else{
                res.redirect("/gerenciar-carros");
            }
        }
    );

});

// remove carro
app.post("/remover-carro/:id", (req, res) => {
    const id = req.params.id;

    carros.deleteOne({
        _id: new ObjectId(id)
    }, function(err){
        if(err){
            console.log("Erro ao remover carro:", err);
            res.send("Erro ao remover carro");
        } else{
            res.redirect("/gerenciar-carros");
        }
    });
});

// vende carro diminuindo a quantidade em 1
app.post("/vender-carro/:id", (req, res) => {
    const id = req.params.id;

    carros.findOne({
        _id: new ObjectId(id)
    }, function(err,carro){
        console.log("alou");
        if(err){
            console.log("erro")
            console.log("Erro ao vender carro:", err);
            res.send("Erro ao vender carro");
        }else{
            console.log("nao erro", carro);
            if (carro && carro.qtde_disponivel > 0) {
                carros.updateOne(
                    { _id: new ObjectId(id) },
                    { $inc: { qtde_disponivel: -1 } },
                    function(err){
                        if(err){
                            console.log("Erro ao vender carro:", err);
                            res.send("Erro ao vender carro");
                        } else{
                            res.redirect("/carros");
                        }
                    }
                );
            }else res.redirect("/carros");
        }
    });
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
