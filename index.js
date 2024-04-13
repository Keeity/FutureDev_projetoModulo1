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

//POST (CREATE)
     
app.post("/produtos", (req,res) => {
const { nome, preco, descricao } = req.body;
const produto = { id: produtos.length + 1, nome, preco, descricao };

if (!nome || !preco || !descricao || !validarProduto(produto)) {
    res.status(400).send('Dados do produto inválidos!');
    return;
}
produtos.push(produto);
res.status(201).json({ message: `O produto ${nome}, que custa ${preco}, que é ${descricao}, foi adicionado com sucesso`});
 });

 //GET (READ)
      
app.get("/produtos/", (req,res) => {

    res.json(produtos);
});


//PUT (UPDATE)
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
});

//DELETE (DELETE)
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
