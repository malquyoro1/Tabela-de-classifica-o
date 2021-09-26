function calculaPontos(jogador) {
  var pontos = (pontos = jogador.vitorias * 3 + jogador.empates);
  return pontos;
}

var jogadores = [];

const jogadorInicial = {
  nome: "",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0
};
exibeJogadoresNaTela(jogadores);

function adicionarJogador() {
  var novoJogador = {
    ...jogadorInicial,
    nome: document.getElementById("jogador").value
  };
  jogadores.push(novoJogador);
  exibeJogadoresNaTela(jogadores);
  document.getElementById("jogador").value = "";
}

function exibeJogadoresNaTela(jogadores) {
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  var elemento = "";

  jogadores.forEach((jogador, i) => {
    elemento += `<tr><td>${jogador.nome} </td><td>${jogador.vitorias}</td><td>${jogador.empates}</td>
    <td>${jogador.derrotas}</td><td>${jogador.pontos}</td>
    <td><button onClick='adicionaEventoJogador("vitorias",${i})'>🏆 Vitória 🏆</button></td>
    <td><button onClick='adicionaEventoJogador("empates",${i})'>😅 Empate 😅</button></td>
    <td><button onClick='adicionaEventoJogador("derrotas",${i})'>😭 Derrota 😭</button></td>
    <td>
    </tr>`;
  });

  tabelaJogadores.innerHTML = elemento;
  vencedor();
}

function adicionaEventoJogador(evento, posicaoJogador) {
  jogadores.forEach((jogador, indice) => {
    if (indice == posicaoJogador || evento === "empates") {
      eventoAdicionar = evento;
    } else if (evento === "vitorias") {
      eventoAdicionar = "derrotas";
    }
    jogador[eventoAdicionar]++;
    jogador.pontos = calculaPontos(jogador);
  });

  exibeJogadoresNaTela(jogadores);
}

function removeJogador() {
  jogadores.pop();
  exibeJogadoresNaTela(jogadores);
}

function zerarJogo() {
  jogadores = jogadores.map(({ nome }) => ({ ...jogadorInicial, nome }));

  exibeJogadoresNaTela(jogadores);
}

function vencedor() {
  var resultado = document.getElementById("vencedor");

  var max = jogadores
    .map(({ pontos }) => pontos)
    .reduce((a, b) => Math.max(a, b), 0);
  vencedores = jogadores.filter((jogador) => jogador.pontos == max);

  htmlresultado =
    (max && `<h2>Vencedor(a)${vencedores.length > 1 ? "es" : ""}: </h2>`) || "";
  if (max > 0) {
    for (var i = 0; i < vencedores.length; i++) {
      htmlresultado += `<p> ${vencedores[i].nome} com ${vencedores[i].pontos} pontos </p>`;
    }
  }

  resultado.innerHTML = htmlresultado;
}