var mongodb = require("mongodb");
var http = require('http');
var express = require('express');
var path = require('path');


var app = express();

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://yumisuzuki3123_db_user:V8ZpA2Pb3Ok5A0tL@banco-de-dados.vjellw1.mongodb.net/?appName=Banco-de-dados`;

const client = new MongoClient(uri, { useNewUrlParser: true });


var dbo = client.db("Banco-de-dados");
var posts = dbo.collection("posts");


app.get('/', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, '..', 'aula_2', 'projetos.html'));
});

app.get('/blog', function(requisicao, resposta) {
    posts.find().toArray(function(err, items) {
        console.log(items);
        resposta.render('blog',{posts:items})
    });
});

app.get('/cadastrar_post', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'public', 'cadastrar_post.html'));
});

app.post('/cadastrar_post', function(requisicao, resposta) {
    var titulo = requisicao.body.titulo;
    var resumo = requisicao.body.resumo;
    var conteudo = requisicao.body.conteudo;

    var data = {titulo,resumo,conteudo}
    posts.insertOne(data, function (err) {
      if (err) {
        console.log(err);
        resposta.render('resposta_blog', {resposta: "Erro ao cadastrar post!"})
      }else {
        resposta.render('resposta_blog', {resposta: "Post cadastrado com sucesso!"})        
      };
    });
});

var server = http.createServer(app);

server.listen(80);

console.log("servidor rodando...");


