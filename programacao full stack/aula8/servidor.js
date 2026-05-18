var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

var usuario_cadastrado = "";
var senha_cadastrada = "";

app.get('/', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, '..', 'LAB2', 'project.html'));
});

app.get('/cadastra', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'public', 'Cadastro.html'));
});

app.get('/login', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

app.post('/cadastrar', function(requisicao, resposta) {
    usuario_cadastrado = requisicao.body.usuario;
    senha_cadastrada = requisicao.body.senha;

    resposta.render('resposta', {
        mensagem: 'Cadastro realizado com sucesso!'
    });
});

app.post('/entrar', function(requisicao, resposta) {
    var usuario = requisicao.body.usuario;
    var senha = requisicao.body.senha;

    if (usuario == usuario_cadastrado && senha == senha_cadastrada) {
        resposta.render('resposta_cadastro', {
            mensagem: 'Login realizado com sucesso!'
        });
    } else {
        resposta.render('resposta_cadastro', {
            mensagem: 'Usuário ou senha incorretos!'
        });
    }
});

var server = http.createServer(app);

server.listen(80);

console.log("servidor rodando...");
