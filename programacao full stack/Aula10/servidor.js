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

var usuarios = dbo.collection("usuarios");
var carros = dbo.collection("carros");


app.get('/', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, '..', 'aula_2', 'projetos.html'));
});

app.get('/carros', function(requisicao, resposta) {
    carros.find().toArray(function(err, items) {
        console.log(items);
        resposta.render('carros',{carros:items})
    });
});

app.get('/cadastrar', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'public', 'cadastrar.html'));
});

app.get('/gerenciar_carros', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'public', 'gerencia_carros.html'));
});

app.get('/login', function(requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/cadastrar', function(requisicao, resposta) {
  var nome = requisicao.body.nome;
  var usuario = requisicao.body.usuario;
  var senha = requisicao.body.senha;
  var data = {nome,usuario,senha}
  usuarios.insertOne(data, function (err) {
    if (err) {
      console.log(err);
      resposta.render('resposta_carro', {resposta: "Erro ao cadastrar usuario!"})
    }else {
      resposta.render('resposta_carro', {resposta: "Usuario cadastrado com sucesso!"})        
    };
  });
});

app.post('/login', function(requisicao, resposta) {
  var usuario = requisicao.body.usuario;
  var senha = requisicao.body.senha;
  var filtro = {usuario}
  usuarios.find(filtro).toArray(function (err,items){
    console.log(items);
    if(items.length == 0){
      resposta.render('resposta_carro',{resposta:"usuario não encontrado"});
    } else if(items[0].senha != senha){
      resposta.render('resposta_carro',{resposta:"senha errada"})
    } else {
      if(err) {
        console.log(err);
        resposta.render('reposta_carro', {resposta: "Erro ao realizar login!"})
      }else {
        resposta.render('resposta_carro', {resposta: "login feito com sucesso!"})        
      };
    }
  });
});

app.post('/carro_cadastro', function(requisicao, resposta) {
  var marca = requisicao.body.marca;
  var modelo = requisicao.body.modelo;
  var ano = requisicao.body.ano;
  var disponivel = requisicao.body.disponivel;
  var data = {marca,modelo,ano,disponivel}
  carros.insertOne(data, function (err) {
    if (err) {
      console.log(err);
      resposta.render('resposta_carro', {resposta: "Erro ao cadastrar carro!"})
    }else {
      resposta.render('resposta_carro', {resposta: "carro cadastrado com sucesso!"})        
    };
  });
});


app.post('/carro_remover', function(requisicao, resposta) {
  var marca = requisicao.body.marca;
  var modelo = requisicao.body.modelo;
  var ano = requisicao.body.ano;
  var data = {marca,modelo,ano}
  carros.deleteOne(data, function (err) {
    if (err) {
      console.log(err);
      resposta.render('resposta_carro', {resposta: "Erro ao remover carro!"})
    }else {
      resposta.render('resposta_carro', {resposta: "carro removido com sucesso!"})        
    };
  });
});


app.post('/carro_atualizar', function(requisicao, resposta) {
  var marca = requisicao.body.marca;
  var modelo = requisicao.body.modelo;
  var ano = requisicao.body.ano;
  var disponivel = requisicao.body.disponivel;
  var filtro = {marca,modelo,ano};
  carros.updateOne(filtro, 
    {$set:{ disponivel }},
    function (err) {
    if(err) {
      console.log(err);
      resposta.render('resposta_carro', {resposta: "Erro ao atualizar carro!"})
    }else {
      resposta.render('resposta_carro', {resposta: "carro atualizado com sucesso!"})        
    };
  });
});

app.post('/carro_vender', function(requisicao, resposta) {
  var marca = requisicao.body.marca;
  var modelo = requisicao.body.modelo;
  var ano = requisicao.body.ano;
  var filtro = {marca,modelo,ano};
  carros.find(filtro).toArray(function (err,carro){
    // carro:
    //                          0                             1 
    // [{marca,modelo,ano,disponivel},{marca,modelo,ano,disponivel}]

    if(carro.length == 0){
      resposta.render('resposta_carro',{resposta:"Carro não encontrado"});
    }else if(carro[0].disponivel <= 0){
      resposta.render('resposta_carro',{resposta:"Carro esgotado"});
    } else{
      carros.updateOne(filtro,
        {$set:{disponivel: carro[0].disponivel-1}},
        function (err) {
        if(err) {
          console.log(err);
          resposta.render('resposta_carro', {resposta: "Erro ao vender carro!"})
        }else {
          resposta.render('resposta_carro', {resposta: "carro vendido com sucesso!"})        
        };
      });
    }
  });
});

var server = http.createServer(app);

server.listen(80);

console.log("servidor rodando...");


