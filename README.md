MINI PROJETO – MÓDULO 1 – FUTUREDEV

Opção 1 – CRUD PRODUTOS

Aluna – Keeity Braga Collodel 		Turma TRIP

Instruções do Exercício:
1.	Funcionalidades do CRUD:
o	Criar Produto:
	Crie uma rota POST para adicionar um novo produto.
	A rota deve receber um JSON com os dados do produto (por exemplo, nome, preço, descrição) para esta rota.
	O servidor deve validar os dados recebidos e adicionar o produto a uma lista temporária.
o	Listar Produtos:
	Crie uma rota GET para obter todos os produtos.
	O servidor deve retornar a lista de produtos em formato JSON.
o	Atualizar Produto:
	Crie uma rota PUT para atualizar um produto existente.
	A rota deve receber um JSON com os dados atualizados do produto, incluindo o ID do produto a ser atualizado.
	O servidor deve encontrar o produto na lista pelo ID e atualizar seus dados.
o	Excluir Produto:
	Crie uma rota DELETE para excluir um produto existente.
	A rota deve receber o ID do produto a ser excluído.
	O servidor deve encontrar o produto na lista pelo ID e removê-lo.
2.	Testando com o Postman:
o	Monte uma coleção no Postman para realizar as operações CRUD.
o	As rotas devem enviar requisições para as rotas criadas usando os métodos HTTP corretos (POST, GET, PUT, DELETE).
3.	Aplicando Middlewares:
o	Adicione Middlewares nas rotas para logar as informações de cada chamada realizada
4.	Recursos Adicionais (opcional):
o	Você pode adicionar validação de entrada para garantir que os dados enviados para o servidor sejam válidos.
o	Também pode implementar um mecanismo de persistência simples usando um array em memória para armazenar os produtos.
o	Os alunos podem experimentar com outros tipos de requisições, como PATCH para atualizações parciais ou OPTIONS para obter informações sobre as rotas disponíveis.

