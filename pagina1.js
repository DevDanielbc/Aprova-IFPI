let totalQuestoes = 4;
let acertos = 0;
let respondidas = new Set();

function atualizarResultadoFinal() {
  if (respondidas.size === totalQuestoes) {
    const resultadoFinal = document.getElementById("resultadoFinal");
    const pontuacao = document.getElementById("pontuacao");

    const porcentagem = ((acertos / totalQuestoes) * 100).toFixed(1);
    pontuacao.textContent = `Você acertou ${acertos} de ${totalQuestoes} questões (${porcentagem}%).`;
    resultadoFinal.style.display = "block";
    resultadoFinal.scrollIntoView({ behavior: "smooth" });
  }
}

// --- QUESTÃO 1 e 2 ---
function verificarResposta(numero) {
  const questaoId = `questao${numero}`;
  const alternativas = document.querySelectorAll(`#${questaoId} .list-group-item`);
  const selecionada = document.querySelector(`#${questaoId} input[type="radio"]:checked`);
  const resultado = document.getElementById(`resultado${numero}`);

  if (!selecionada) {
    resultado.textContent = "Por favor, selecione uma alternativa.";
    resultado.style.color = "#6c757d";
    resultado.style.opacity = 1;
    return;
  }

  const correta = document.querySelector(`#${questaoId} input[data-correta="true"]`).closest('.list-group-item');
  const explicacao = selecionada.dataset.explicacao;

  alternativas.forEach(alt => {
    alt.classList.add('disabled');
    alt.style.transition = "background-color 0.6s ease, border 0.6s ease";
  });

  const verdeClaro = 'rgba(40, 167, 69, 0.2)';
  const vermelhoClaro = 'rgba(220, 53, 69, 0.2)';

  if (selecionada.dataset.correta === "true") {
    correta.style.backgroundColor = verdeClaro;
    resultado.textContent = explicacao;
    resultado.style.color = "#28a745";
    acertos++;
  } else {
    selecionada.closest('.list-group-item').style.backgroundColor = vermelhoClaro;
    correta.style.backgroundColor = verdeClaro;
    resultado.textContent = explicacao;
    resultado.style.color = "#dc3545";
  }

  respondidas.add(numero);
  atualizarResultadoFinal();

  resultado.style.opacity = 0;
  setTimeout(() => (resultado.style.opacity = 1), 100);
}

// --- QUESTÃO 3 ---
function verificarQuestao3() {
  const questao = document.getElementById("questao3");
  const selecionada = questao.querySelector("input[type='radio']:checked");
  const feedback = document.getElementById("feedback3");

  if (!selecionada) {
    alert("Selecione uma alternativa antes de responder!");
    return;
  }

  const alternativas = questao.querySelectorAll(".list-group-item");
  alternativas.forEach(a => a.classList.add("disabled"));

  const correta = questao.querySelector("[data-correta='true']").closest(".list-group-item");
  const selecionadaItem = selecionada.closest(".list-group-item");

  const verdeClaro = "rgba(40, 167, 69, 0.2)";
  const vermelhoClaro = "rgba(220, 53, 69, 0.2)";

  if (selecionada.dataset.correta === "true") {
    selecionadaItem.style.backgroundColor = verdeClaro;
    feedback.style.color = "#28a745";
    feedback.textContent = "Correto! O cálculo é: 45 - 15 = 30 copos faltando, e 30 ÷ 5 = 6 pacotes.";
    acertos++;
  } else {
    selecionadaItem.style.backgroundColor = vermelhoClaro;
    correta.style.backgroundColor = verdeClaro;
    feedback.style.color = "#dc3545";
    feedback.textContent = "Incorreto. O cálculo é: 45 - 15 = 30 copos faltando, e 30 ÷ 5 = 6 pacotes.";
  }

  respondidas.add(3);
  atualizarResultadoFinal();

  feedback.style.opacity = 0;
  setTimeout(() => (feedback.style.opacity = 1), 100);
}

// --- QUESTÃO 4 ---
function verificarQuestao4() {
  const correta = "c"; // alternativa correta
  const questao = document.getElementById("questao4");
  const feedback = document.getElementById("feedback4");

  // Seleciona todas as alternativas
  const alternativas = questao.querySelectorAll(".list-group-item");
  const selecionada = questao.querySelector("input[type='radio']:checked");

  if (!selecionada) {
    feedback.textContent = "Selecione uma alternativa.";
    feedback.style.color = "gray";
    feedback.style.opacity = 1;
    return;
  }

  // Desativa os radios depois da resposta
  alternativas.forEach(alt => {
    const input = alt.querySelector("input");
    if (input) input.disabled = true;
    alt.style.transition = "background-color 0.5s ease";
  });

  const verdeClaro = "rgba(40, 167, 69, 0.2)";
  const vermelhoClaro = "rgba(220, 53, 69, 0.2)";

  const selecionadaItem = selecionada.closest(".list-group-item");
  const corretaItem = questao.querySelector(`input[value="${correta}"]`).closest(".list-group-item");

  if (selecionada.value === correta) {
    selecionadaItem.style.backgroundColor = verdeClaro;
    feedback.textContent = "Correto! Houve 32 cestas de 3 pontos e 50 de 2 pontos (32×3 + 50×2 = 190).";
    feedback.style.color = "#28a745";
    acertos++;
  } else {
    selecionadaItem.style.backgroundColor = vermelhoClaro;
    corretaItem.style.backgroundColor = verdeClaro;
    feedback.textContent = "Incorreto. Resolvendo: se x = cestas de 3 pontos e y = de 2 pontos, então x + y = 82 e 3x + 2y = 190 → x = 32, y = 50.";
    feedback.style.color = "#dc3545";
  }

  respondidas.add(4);
  atualizarResultadoFinal();

  feedback.style.opacity = 0;
  setTimeout(() => (feedback.style.opacity = 1), 100);
}

function ajustarEspacamentoTopo() {
  const nav = document.querySelector('nav.navbar');
  const faixa = document.querySelector('.faixa');
  const main = document.querySelector('main');

  if (!nav || !main) return;
  const navAltura = nav.getBoundingClientRect().height;

  let faixaAltura = 0;
  if (faixa) {
    faixa.style.top = '';
    faixa.style.display = '';
    faixaAltura = faixa.getBoundingClientRect().height || 0;
    faixa.style.top = navAltura + 'px';
  }

  const espacamentoExtra = 12;
  main.style.paddingTop = (navAltura + faixaAltura + espacamentoExtra) + 'px';
}

window.addEventListener('DOMContentLoaded', ajustarEspacamentoTopo);
window.addEventListener('load', ajustarEspacamentoTopo);
window.addEventListener('resize', ajustarEspacamentoTopo);

