// Variável que guarda a chave da API do OMDb
const apikey = '3ded9604';
// Essa é a chave da API que preciso para acessar os dados do OMDb. Vou usar ela sempre que fizer uma requisição.
// Pegando o input onde vou digitar o nome do filme
const inputFilme = document.getElementById('filme') 
// Aqui, estou pegando o elemento input do HTML que tem o id 'filme'. É onde o usuário vai digitar o nome do filme.

// Pegando o botão que vai ser clicado para buscar o filme
const botaoBuscarFilme = document.getElementById('buscarFilme')
// Agora, eu pego o botão com o id 'buscarFilme' do HTML, que o usuário vai clicar para buscar o filme.

// Adicionando evento de clique ao botão
botaoBuscarFilme.addEventListener('click', () => {  
    // Estou dizendo que quando o botão for clicado, ele vai fazer algo.
    const nomeDoFilme = inputFilme.value  
    // Pego o valor que o usuário digitou no input e guardo na variável 'nomeDoFilme'.
    buscarFilme(nomeDoFilme) 
    // Agora chamo a função 'buscarFilme' passando o nome do filme que o usuário digitou para buscar os dados na API.
});


// Função para buscar o filme
async function buscarFilme(titulo) {  
    // A função 'buscarFilme' vai receber o nome do filme (o que foi digitado no input).
    const URL_API = `http://www.omdbapi.com/?t=${titulo}&apikey=${apikey}&language=pt-BR`
    // Aqui monto a URL que vou usar para buscar os dados da API. Ela tem a chave da API e o título do filme.

    try {  
        // Uso o bloco "try" para tentar pegar os dados da API. Se der algum erro, ele vai ser tratado no "catch".
        const resposta = await fetch(URL_API) 
        // O 'fetch' faz a requisição para a API. O 'await' espera a resposta antes de continuar o código.
        
        if (!resposta.ok) {  
            // Aqui verifico se a resposta foi bem-sucedida. Se a resposta não for ok (por exemplo, um erro 404), lança um erro.
            throw new Error('Filme não encontrado')
            // Se der erro, mostra essa mensagem.
        }

        const movieData = await resposta.json()
        // Converto a resposta da API para um objeto JSON, que é mais fácil de manipular no JavaScript.
        exibirFilme(movieData) 
        // Chamo a função 'exibirFilme' para mostrar os dados do filme na tela, passando o objeto JSON 'movieData'.
    } catch (error) {  
        // Se der algum erro em qualquer parte da requisição, ele vai cair aqui.
        tratarErro(error) 
        // Chamo a função 'tratarErro' que vai lidar com a mensagem de erro.
    }
}


// Função para exibir os dados do filme na página
function exibirFilme(data) {  
    // Essa função vai pegar os dados do filme e mostrar no HTML.
    const resultadoDiv = document.getElementById('resultado')  
    // Pego a div com o id 'resultado', onde vou exibir as informações do filme.

    if (data.Response === "False") {  
        // Se a resposta da API indicar que o filme não foi encontrado ('Response': 'False').
        resultadoDiv.innerHTML = `<p>Filme não encontrado</p>`  
        // Coloco uma mensagem na tela dizendo que o filme não foi encontrado.
    } else {  
        // Se o filme for encontrado:
        resultadoDiv.innerHTML = `           
        <h2>${data.Title}</h2>
        <p>Ano: ${data.Year}</p>
        <p>Diretor: ${data.Director}</p>
        <p>Gênero: ${data.Genre}</p>
        <p>Sinopse: ${data.Plot}</p>
        <p>Nota imdb: ${data.imdbRating}</p>
        <img src="${data.Poster}" alt="Poster do filme">
        `;  
        // Aqui estou colocando os dados do filme (título, ano, diretor, gênero, sinopse, poster) dentro da div 'resultado'.
    }
}


// Função para tratar erro
function tratarErro(erro) {  
    // Essa função trata os erros que ocorreram durante a busca do filme.
    alert('Erro: ' + erro.message)  
    // Mostra um alerta com a mensagem de erro.
}
