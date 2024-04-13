const express = require ("express");
const app = express();
const PORT = 3000
  app.use(express.json());

  //banco provisório
let produtos = []

// Middleware para logar as informações de cada chamada realizada
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

// Validar produto
function validarProduto(produto) {
    return produto && typeof produto.nome === 'string' && typeof produto.preco === 'number' && typeof produto.descricao === 'string';
  }

  //rota inicial para dar boas vindas
  app.get("/", (req,res) => {
    res.send("<h1> Bem vindo ao CRUD Produtos! </h1>")
});

//POST (CREATE)
      //Crie uma rota POST para adicionar um novo produto.
      //A rota deve receber um JSON com os dados do produto (por exemplo, nome, preço, descrição) para esta rota.
      //O servidor deve validar os dados recebidos e adicionar o produto a uma lista temporária.

app.post("/produtos", (req,res) => {
const { nome, preco, descricao } = req.body;
const produto = { id: produtos.length + 1, nome, preco, descricao };

if (!nome || !preco || !descricao || !validarProduto(produto)) {
    res.status(400).send('Dados do produto inválidos!');
    return;
}
produtos.push(produto);
res.status(201).json({ message: `O produto ${nome}, que custa ${preco} e é ${descricao} foi adicionado com sucesso`});
 });

 //GET (READ)
        //Crie uma rota GET para obter todos os produtos.
        //O servidor deve retornar a lista de produtos em formato JSON.

app.get("/produtos/", (req,res) => {

    res.json(produtos);
});


//PUT (UPDATE)
      //Crie uma rota PUT para atualizar um produto existente.
      //A rota deve receber um JSON com os dados atualizados do produto, incluindo o ID do produto a ser atualizado.
      //O servidor deve encontrar o produto na lista pelo ID e atualizar seus dados.

app.put("/produtos/:id", (req,res) => {
const { id } = req.params;
const { nome , preco , descricao } = req.body;
const index = produtos.findIndex(p => p.id === parseInt(id));
  if (index < 0) {
  res.status(404).json({ error: 'Produto não encontrado' });
return; 
}
  const produto = { id: Number(id), nome, preco, descricao };
  produtos[index] = produto;
  res.status(200).json({ message: `Produto ${nome}, id ${id}, alterado com sucesso.`});
//Nome- ${nome}, Preço-${preco} e Descrição- ${descricao}
});

//DELETE (DELETE)
      //Crie uma rota DELETE para excluir um produto existente.
      //A rota deve receber o ID do produto a ser excluído.
      //O servidor deve encontrar o produto na lista pelo ID e removê-lo

app.delete("/produtos/:id", (req,res) => {
    const { id } = req.params;
 
    const index = produtos.findIndex(p => p.id === parseInt(id));
      if (index < 0) {
      res.status(404).json({ error: 'Produto não encontrado' });
    return; 
    }
      produtos.splice(index,1);
      res.status(204).json({ message: `O produto id ${id} foi excluído!`});
});

// Atualização parcial de um produto - preço
app.patch('/produtos/:id', (req, res) => {
    const { id } = req.params;
 //   const { nome , preco , descricao } = req.body;
 const { preco } = req.body;
    const index = produtos.findIndex(p => p.id === parseInt(id));
    if (index < 0) {
      res.status(404).json({ error: 'Produto não encontrado.'});
      return;
    }
  produtos[index].preco = preco;
    res.status(200).json({ message: `Produto id ${id} teve seu preço alterado para ${preco} com sucesso!`});
});

//verificar se o produto existe - sem corpo de resposta
app.head('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(p => p.id === parseInt(id));

    if (index < 0) {
        res.status(404).end();
    } else {
        res.status(200).end();
    }
});

//options  para obter informações sobre as rotas disponíveis/permitidas nesta aplicação
app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
