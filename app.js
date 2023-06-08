var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const DBPATH = (require = "db_EasyEats.db");
var db = new sqlite3.Database(DBPATH); //Abre o banco


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("CHEGUEI!!");
});
// Inicio Cadastro
app.post("/cadastroUser", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  console.log("Recebi um dado");

  let nome = req.body.nome;
  let senha = req.body.senha;
  let email = req.body.email;
  let telefone = parseInt(req.body.telefone);

  let sql = `SELECT * FROM Usuarios WHERE email="${email}"`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("Erro" + err);
      res.send(err);
    } else if (rows.length > 0) {
      console.log("Email já existe!");
      res.send("Email já existe");
    } else {
      sql = `INSERT INTO Usuarios (nome, senha, email, telefone) VALUES ("${nome}", "${senha}", "${email}", "${telefone}")`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("Usuário adicionado!");
          res.send("Usuário adicionado");
        }
      });
    }
  });
});
// Fim Cadastro

// Inicio Login
app.get("/login", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  console.log("Realizando login");

  let email = req.query.email;
  let senha = req.query.senha;

  let sql = `SELECT * FROM Usuarios WHERE email = "${email}"`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.send(err);
    }
    if (rows.length === 0) {
      console.log("Usuário não encontrado.");
      res.send("Usuário não encontrado.");
    } else {
      console.log("Usuário encontrado.");
      if (senha === rows[0].senha) {
        console.log("Senha correta.");
        res.send(rows);
        telefone = rows[0].telefone;
        nome = rows[0].nome;
      } else {
        console.log("Senha incorreta.");
        res.send("Senha incorreta.");
      }
    }
  });
});
// Fim Login

app.post("/dados_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Estou pegando os dados do usuário.");
  console.log(req.body);
  let emailCheck = req.body.email;
  console.log(emailCheck);

  db.all(`SELECT * FROM Usuarios WHERE email="${emailCheck}"`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    }
    console.log("Acesse-os em: /dados_usuario");
    console.log(rows);
    res.send(rows);
  });
});

// Inicio Json
app.get("/todosUsers", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Atualizei os Usuários");
  db.all(`SELECT * FROM Usuarios`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    }
    console.log("Acesse-os em: /todosUsers");
    res.send(rows);
  });
});
// Fim Json

// Inicio adiciona o Item
app.post("/adicionaItem", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  console.log("Recebi um dado");

  let item = req.body.item;
  let preco = req.body.preco;
  let nomeReq = req.body.nome;
  let emailReq = req.body.email;

  sql = `INSERT INTO Item (item, preco, nome, email) VALUES ("${item}", "${preco}", "${nomeReq}", "${emailReq}")`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Item adicionado!");
      res.send("Item Atualizado");
    }
  });
});
// Fim adiciona o Item

// Inicio Json Carrinho
app.post("/carrinhoUser", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um email");
  let emailCheck = req.body.email;
  console.log(req.body.email);
  db.all(`SELECT * FROM Item WHERE email="${emailCheck}"`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho para puxar esses Itens.");
      res.send(err);
    }
    console.log("Peguei os Itens de um usuário.");
    console.log(rows);
    res.send(rows);
  });
});
// Fim Json Carrinho

app.post("/cozinhaUser", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um email");
  let emailCheck = req.body.email;
  console.log(req.body.email);
  db.all(`SELECT * FROM Cozinha WHERE email="${emailCheck}"`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho para puxar esses Itens.");
      res.send(err);
    }
    console.log("Peguei os Itens de um usuário.");
    console.log(rows);
    res.send(rows);
  });
});

app.get("/todosItens", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Atualizei os Itens");
  db.all(`SELECT * FROM Item`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    }
    console.log("Acesse-os em: /todosItens");
    res.send(rows);
  });
});

app.get("/cozinha", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Atualizei os Itens");
  db.all(`SELECT * FROM Cozinha`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    }
    console.log("Acesse-os em: /cozinha");
    res.send(rows);
  });
});

app.post("/cadastroCozinha", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um dado");
  console.log(req.body);

  let item = req.body.item;
  let preco = req.body.preco;
  let nomeReq = req.body.nome;
  let emailReq = req.body.email;

  sql = `INSERT INTO Cozinha(item, preco, nome, email) VALUES ("${item}", "${preco}", "${nomeReq}", "${emailReq}")`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Item adicionado!");
      res.send(rows);
    }
  });
});

// Inicio Delete
app.post("/deleteItem", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi alguma coisa");

  let itemId = parseInt(req.body.itemId)

  db.all(`DELETE FROM Item WHERE itemId = ${itemId}`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    }
    else{
    console.log(`O post a seguir foi deletado: "${rows}"`);
    res.send(rows);
    }
  });
});
// Fim Delete 

// Inicio Delete
app.post("/deleteItemCozinha", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi alguma coisa");

  let itemId = parseInt(req.body.itemId)

  db.all(`DELETE FROM Cozinha WHERE itemId = ${itemId}`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    }
    else{
    console.log(`O post a seguir foi deletado: "${rows}"`);
    res.send(rows);
    }
  });
});
// Fim Delete 

// inicio Altera usuário

app.post("/alterar_dados_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um dado");
  console.log(req.body);

  let emailNovo = req.body.email;
  let nomeNovo = req.body.nome;
  let senhaNova = req.body.senha;
  let telefoneNovo = parseInt(req.body.telefone);
  let usuarioId = req.body.id;

  console.log("Usuario acionado com id: " + usuarioId);
  sql = `UPDATE Usuarios SET nome="${nomeNovo}", senha="${senhaNova}", email="${emailNovo}", telefone="${telefoneNovo}" WHERE id="${usuarioId}"`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Usuário atualizado!");
      sql = `SELECT * FROM Usuarios WHERE ID="${usuarioId}"`;
      console.log("Puxando os dados com o id: "+ usuarioId);
      db.all(sql, [], (err, rows) => {
        console.log(rows);
        res.send(rows);
      });
    }
  });
});

// Fim Altera usuário

// Inicio delete Usuário

app.post("/delete_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um dado");
  console.log(req.body);
  let usuarioId = req.body.id; // Assume que o ID do usuário está na coluna "id"
  sql = `DELETE FROM Usuarios WHERE id="${usuarioId}"`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Usuário deletado PARA SEMPRE");
      res.send("Usuário deletado PARA SEMPRE!");
    }
  });
});

// Fim delete Usuário

app.listen(port, () => {
  console.log(`EasyEats na portinha: ${port}`);
});


