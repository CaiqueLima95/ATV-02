import express from 'express';

const app = express();
let listaFornecedores = [];

app.use(express.urlencoded({ extended: true }));

//pagina de login
app.get('/login',(req,res)=>{
  res.send(`
    <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Sistema de Cadastro de Fornecedores</title>
      <style>
            .gradient-custom {
            background: #6a11cb;
            background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
            background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
            }
      </style>
  </head>
  <body>
          <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">

                  <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Bem-vindo</h2>
                    <p class="text-white-50 mb-5">Por favor entre com seu email e senha!</p>

                    <div data-mdb-input-init class="form-outline form-white mb-4">
                      <input type="email" id="email" class="form-control form-control-lg" />
                      <label class="form-label" for="typeEmailX">Email</label>
                    </div>

                    <div data-mdb-input-init class="form-outline form-white mb-4">
                      <input type="password" id="senha" class="form-control form-control-lg" />
                      <label class="form-label" for="typePasswordX">Senha</label>
                    </div>

                    <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Esqueceu a senha?</a></p>
                    <a href="/" class="btn btn-outline-light btn-lg px-5">Login</a>

                    <div class="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                      <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                      <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                    </div>

                  </div>

                  <div>
                    <p class="mb-0">Não tem uma conta? <a href="#!" class="text-white-50 fw-bold">Insvreva-se</a>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </body>
</html>
  `);
});

//Página inicial
app.get('/', (req, res) => {
    res.send(`
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Sistema de Cadastro de Fornecedores</title>
      <style>
      a{
        color: white;
        text-decoration: none;
        }
        a:hover {
        background-color: white;
        color: black;
        }
      </style>
  </head>
  <body>
    <ul class="nav justify-content-center bg-dark text-white">
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="/cadastroFornecedores">Cadastro de Fornecedor</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/fornecedores">Fornecedores Cadastrados</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login"  onclick="alert('Logout efetuado com sucesso')">Sair</a>
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
      <style>
      a{
        color: white;
        text-decoration: none;
        }
        a:hover {
        background-color: white;
        color: black;
        }
      </style>
  </head>
  <body>
    <ul class="nav justify-content-center bg-dark text-white">
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="/cadastroFornecedores">Cadastro de Fornecedor</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/fornecedores">Fornecedores Cadastrados</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login"  onclick="alert('Logout efetuado com sucesso')">Sair</a>
      </li>
    </ul>
    <div class="container w-80 mb-4 mt-4">
      <form method="POST" action="/cadastroFornecedores" class="border p-2">
        <fieldset>
          <legend class="text-center">Cadastro de Fornecedor</legend>
        </fieldset>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="empresa">Nome da Empresa</label>
            <input type="text" id="empresa" name="empresa" class="form-control" placeholder="Nome da Empresa">
          </div>
          <div class="form-group col-md-6">
            <label for="cnpj">CNPJ</label>
            <input type="text" id="cnpj" name="cnpj" class="form-control" placeholder="00.000.000/0001-00">
          </div>
        </div>
        <div class="form-group">
          <label for="nomeFantasia">Nome fantasia</label>
          <input type="text" id="nomeFantasia" name="nomeFantasia" class="form-control" placeholder="nomeFantasia">
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="form-control" placeholder="email@exemplo.com">
          </div>
          <div class="form-group col-md-6">
            <label for="telefone">Telefone</label>
            <input type="text" id="telefone" name="telefone" class="form-control" placeholder="(99) 99999-9999">
          </div>
        </div>
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input type="text" id="endereco" name="endereco" class="form-control" placeholder="Rua, número, bairro">
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" class="form-control">
          </div>
          <div class="form-group col-md-4">
            <label for="estado">Estado</label>
            <select id="estado" name="estado" class="form-control">
              <option value="">Escolher...</option>
              <option>AC</option>
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
            <input type="text" id="cep" name="cep" class="form-control" placeholder="00000-000">
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
  const { empresa, cnpj, nomeFantasia, email, telefone, endereco, cidade, estado, cep } = req.body;

  let temErro = false;
  let msgEmpresa = '', msgCnpj = '', msgFantasia = '', msgEmail = '', msgTelefone = '', msgEndereco = '', msgCidade = '', msgEstado = '', msgCep = '';

  if (!empresa) {
    msgEmpresa = 'O nome da empresa é obrigatório.';
    temErro = true;
  }

  if (!cnpj) {
    msgCnpj = 'O CNPJ é obrigatório.';
    temErro = true;
  }

  if (!nomeFantasia) {
    msgFantasia = 'O nome fantasia é obrigatório.';
    temErro = true;
  }

  if (!email) {
    msgEmail = 'O email é obrigatório.';
    temErro = true;
  }

  if (!telefone) {
    msgTelefone = 'O telefone é obrigatório.';
    temErro = true;
  }

  if (!endereco) {
    msgEndereco = 'O endereço é obrigatório.';
    temErro = true;
  }

  if (!cidade) {
    msgCidade = 'A cidade é obrigatória.';
    temErro = true;
  }

  if (!estado) {
    msgEstado = 'O estado é obrigatório.';
    temErro = true;
  }

  if (!cep) {
    msgCep = 'O CEP é obrigatório.';
    temErro = true;
  }

  if (temErro) {
    res.send(`
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
  <title>Cadastro de Fornecedores</title>
      <style>
      a{
        color: white;
        text-decoration: none;
        }
        a:hover {
        background-color: white;
        color: black;
        }
      </style>
</head>
<body>
      <ul class="nav justify-content-center bg-dark text-white">
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="/cadastroFornecedores">Cadastro de Fornecedor</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/fornecedores">Fornecedores Cadastrados</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login"  onclick="alert('Logout efetuado com sucesso')">Sair</a>
      </li>
    </ul>
  <div class="container w-80 mb-4 mt-4">
    <form method="POST" action="/cadastroFornecedores" class="border p-2">
      <fieldset>
        <legend class="text-center">Cadastro de Fornecedor</legend>
      </fieldset>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="empresa">Nome da Empresa</label>
          <input type="text" id="empresa" name="empresa" class="form-control ${msgEmpresa ? 'is-invalid' : ''}" value="${empresa || ''}">
          ${msgEmpresa ? `<span class="invalid-feedback d-block">${msgEmpresa}</span>` : ''}
        </div>
        <div class="form-group col-md-6">
          <label for="cnpj">CNPJ</label>
          <input type="text" id="cnpj" name="cnpj" class="form-control ${msgCnpj ? 'is-invalid' : ''}" value="${cnpj || ''}">
          ${msgCnpj ? `<span class="invalid-feedback d-block">${msgCnpj}</span>` : ''}
        </div>
      </div>
      <div class="form-group">
        <label for="nomeFantasia">Nome fantasia</label>
        <input type="text" id="nomeFantasia" name="nomeFantasia" class="form-control ${msgFantasia ? 'is-invalid' : ''}" value="${nomeFantasia || ''}">
        ${msgFantasia ? `<span class="invalid-feedback d-block">${msgFantasia}</span>` : ''}
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="form-control ${msgEmail ? 'is-invalid' : ''}" value="${email || ''}">
          ${msgEmail ? `<span class="invalid-feedback d-block">${msgEmail}</span>` : ''}
        </div>
        <div class="form-group col-md-6">
          <label for="telefone">Telefone</label>
          <input type="text" id="telefone" name="telefone" class="form-control ${msgTelefone ? 'is-invalid' : ''}" value="${telefone || ''}">
          ${msgTelefone ? `<span class="invalid-feedback d-block">${msgTelefone}</span>` : ''}
        </div>
      </div>
      <div class="form-group">
        <label for="endereco">Endereço</label>
        <input type="text" id="endereco" name="endereco" class="form-control ${msgEndereco ? 'is-invalid' : ''}" value="${endereco || ''}">
        ${msgEndereco ? `<span class="invalid-feedback d-block">${msgEndereco}</span>` : ''}
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="cidade">Cidade</label>
          <input type="text" id="cidade" name="cidade" class="form-control ${msgCidade ? 'is-invalid' : ''}" value="${cidade || ''}">
          ${msgCidade ? `<span class="invalid-feedback d-block">${msgCidade}</span>` : ''}
        </div>
        <div class="form-group col-md-4">
          <label for="estado">Estado</label>
          <select id="estado" name="estado" class="form-control ${msgEstado ? 'is-invalid' : ''}">
            <option value="">Escolher...</option>
            ${['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
              .map(uf => `<option ${estado === uf ? 'selected' : ''}>${uf}</option>`).join('')}
          </select>
          ${msgEstado ? `<span class="invalid-feedback d-block">${msgEstado}</span>` : ''}
        </div>
        <div class="form-group col-md-2">
          <label for="cep">CEP</label>
          <input type="text" id="cep" name="cep" class="form-control ${msgCep ? 'is-invalid' : ''}" value="${cep || ''}">
          ${msgCep ? `<span class="invalid-feedback d-block">${msgCep}</span>` : ''}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar</button>
      <a href="/" class="btn btn-secondary">Início</a>
    </form>
  </div>
</body>
</html>
    `);
  } else {
    listaFornecedores.push({ empresa, cnpj, nomeFantasia, email, telefone, endereco, cidade, estado, cep });
    res.redirect('/fornecedores');
  }
});


app.get('/fornecedores', (req, res) => {
    let html = `
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Fornecedores Cadastrados</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
        <style>
          a{
            color: white;
            text-decoration: none;
            }
            a:hover {
            background-color: white;
            color: black;
            }
        </style>
    </head>
    <body>
        <ul class="nav justify-content-center bg-dark text-white">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/cadastroFornecedores">Cadastro de Fornecedor</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/fornecedores">Fornecedores Cadastrados</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login"  onclick="alert('Logout efetuado com sucesso')">Sair</a>
          </li>
    </ul>
      <div class="container mt-5">
        <h2 class="mb-4 text-center">Fornecedores Cadastrados</h2>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Empresa</th>
              <th>CNPJ</th>
              <th>Nome fantasia</th>
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
          <td>${fornecedor.nomeFantasia}</td>
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
    console.log(`Servidor rodando em http://localhost:${PORT}/login`);
});
