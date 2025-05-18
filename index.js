import express from 'express';

const app = express();
let listaFornecedores = [];

app.use(express.urlencoded({ extended: true }));

//Página inicial
app.get('/', (req, res) => {
    res.send(`
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Sistema de Cadastro de Fornecedores</title>
  </head>
  <body>
    <ul class="nav justify-content-center bg-dark text-white">
      <li class="nav-item">
        <a class="nav-link text-white" href="/">Menu principal</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white active" href="/cadastroFornecedores">Cadastro de Fornecedor</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="/fornecedores">Fornecedores Cadastrados</a>
      </li>
    </ul>
  </body>
</html>
  `);
});

// Formulário de cadastro de fornecedores
app.get('/cadastroFornecedores', (req, res) => {
    res.send(`
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Cadastro de Fornecedores</title>
  </head>
  <body>
    <div class="container w-80 mb-4 mt-4">
      <form method="POST" action="/cadastroFornecedores" class="border p-2">
        <fieldset>
          <legend class="text-center">Cadastro de Fornecedor</legend>
        </fieldset>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="empresa">Nome da Empresa</label>
            <input type="text" name="empresa" class="form-control" placeholder="Nome da Empresa">
          </div>
          <div class="form-group col-md-6">
            <label for="cnpj">CNPJ</label>
            <input type="text" name="cnpj" class="form-control" placeholder="00.000.000/0001-00">
          </div>
        </div>
        <div class="form-group">
          <label for="responsavel">Nome do Responsável</label>
          <input type="text" name="responsavel" class="form-control" placeholder="Responsável">
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" placeholder="email@exemplo.com">
          </div>
          <div class="form-group col-md-6">
            <label for="telefone">Telefone</label>
            <input type="text" name="telefone" class="form-control" placeholder="(99) 99999-9999">
          </div>
        </div>
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input type="text" name="endereco" class="form-control" placeholder="Rua, número, bairro">
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="cidade">Cidade</label>
            <input type="text" name="cidade" class="form-control">
          </div>
          <div class="form-group col-md-4">
            <label for="estado">Estado</label>
            <select name="estado" class="form-control">
              <option value="">Escolher...</option>
              option>AC</option>
                  <option>AL</option>
                  <option>AP</option>
                  <option>AM</option>
                  <option>BA</option>
                  <option>CE</option>
                  <option>DF</option>
                  <option>ES</option>
                  <option>GO</option>
                  <option>MA</option>
                  <option>MT</option>
                  <option>MS</option>
                  <option>MG</option>
                  <option>PA</option>
                  <option>PB</option>
                  <option>PR</option>
                  <option>PE</option>
                  <option>PI</option>
                  <option>RJ</option>
                  <option>RN</option>
                  <option>RS</option>
                  <option>RO</option>
                  <option>RR</option>
                  <option>SC</option>
                  <option>SP</option>
                  <option>SE</option>
                  <option>TO</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="cep">CEP</label>
            <input type="text" name="cep" class="form-control" placeholder="00000-000">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <a href="/" class="btn btn-secondary">Início</a>
      </form>
    </div>
  </body>
</html>
  `);
});


app.post('/cadastroFornecedores', (req, res) => {
    const { empresa, cnpj, responsavel, email, telefone, endereco, cidade, estado, cep } = req.body;

    if (!empresa || !cnpj || !responsavel || !email || !telefone || !endereco || !cidade || !estado || !cep) {
        return res.send(`<h1 style="color:red; text-align:center;">Erro: Todos os campos devem ser preenchidos.</h1>
            <p style="text-align:center;"><a href="/cadastroFornecedores">Voltar ao formulário</a></p>`);
    }

    listaFornecedores.push({ empresa, cnpj, responsavel, email, telefone, endereco, cidade, estado, cep });
    res.redirect('/fornecedores');
});


app.get('/fornecedores', (req, res) => {
    let html = `
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Fornecedores Cadastrados</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    </head>
    <body>
      <div class="container mt-5">
        <h2 class="mb-4 text-center">Fornecedores Cadastrados</h2>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Empresa</th>
              <th>CNPJ</th>
              <th>Responsável</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>`;

    if (listaFornecedores.length === 0) {
        html += `
      <tr>
        <td colspan="9" class="text-center">Nenhum fornecedor cadastrado.</td>
      </tr>`;
    } else {
        for (let fornecedor of listaFornecedores) {
            html += `
        <tr>
          <td>${fornecedor.empresa}</td>
          <td>${fornecedor.cnpj}</td>
          <td>${fornecedor.responsavel}</td>
          <td>${fornecedor.email}</td>
          <td>${fornecedor.telefone}</td>
          <td>${fornecedor.endereco}</td>
          <td>${fornecedor.cidade}</td>
          <td>${fornecedor.estado}</td>
          <td>${fornecedor.cep}</td>
        </tr>`;
        }
    }

    html += `
          </tbody>
        </table>
        <a href="/" class="btn btn-secondary">Voltar ao Início</a>
      </div>
    </body>
  </html>`;

    res.send(html);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
