document.addEventListener("DOMContentLoaded", () => {

  const botoes = document.querySelectorAll(".aba-btn");
  const abas = document.querySelectorAll(".aba");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      abas.forEach(a => a.classList.add("hidden"));

      const id = btn.id.replace("aba-", "");
      document.getElementById(id)?.classList.remove("hidden");
    });
  });

  function criar(p, container) {
    const div = document.createElement("div");

    div.innerHTML = `
      ${p.nome} (${p.base}%)
      <input value="${p.base}">
    `;

    container.appendChild(div);
  }

 const pericias = [
  { nome: "Antropologia", base: 1 },
  { nome: "Arqueologia", base: 1 },
  { nome: "Arremessar", base: 20 },
  { nome: "Avaliação", base: 5 },
  { nome: "Cavalgar", base: 5 },
  { nome: "Charme", base: 15 },
  { nome: "Chaveiro", base: 1 },
  { nome: "Consertos Elétricos", base: 10 },
  { nome: "Consertos Mecânicos", base: 10 },
  { nome: "Contabilidade", base: 5 },
  { nome: "Direito", base: 5 },
  { nome: "Dirigir Automóveis", base: 20 },
  { nome: "Disfarce", base: 5 },
  { nome: "Eletrônica", base: 1 },
  { nome: "Encontrar", base: 25 },
  { nome: "Escalar", base: 20 },
  { nome: "Escutar", base: 20 },
  { nome: "Esquiva", base: 0, auto: "des" },
  { nome: "Furtividade", base: 20 },
  { nome: "História", base: 5 },
  { nome: "Intimidação", base: 15 },
  { nome: "Lábia", base: 5 },
  { nome: "Língua Nativa", base: 0, auto: "edu" },
  { nome: "Medicina", base: 1 },
  { nome: "Mergulho", base: 1 },
  { nome: "Mundo Natural", base: 10 },
  { nome: "Mythos de Cthulhu", base: 0 },
  { nome: "Natação", base: 20 },
  { nome: "Navegação", base: 10 },
  { nome: "Nível de Crédito", base: 0 },
  { nome: "Ocultismo", base: 5 },
  { nome: "Operar Maquinário Pesado", base: 1 },
  { nome: "Persuasão", base: 10 },
  { nome: "Prestidigitação", base: 10 },
  { nome: "Primeiros Socorros", base: 30 },
  { nome: "Psicanálise", base: 1 },
  { nome: "Psicologia", base: 10 },
  { nome: "Rastrear", base: 10 },
  { nome: "Saltar", base: 20 },
  { nome: "Usar Bibliotecas", base: 20 },
  { nome: "Usar Computadores", base: 5 },
  { nome: "Treinar Animais", base: 5 }
];

  const lutar = [
  { nome: "Briga", base: 25 },
  { nome: "Chicotes", base: 5 },
  { nome: "Espadas", base: 20 },
  { nome: "Garrote", base: 15 },
  { nome: "Lanças", base: 20 },
  { nome: "Machados", base: 15 },
  { nome: "Manguais", base: 10 },
  { nome: "Motosserras", base: 10 }
];
  
 const armas = [
  { nome: "Pistolas", base: 20 },
  { nome: "Rifles/Espingardas", base: 25 },
  { nome: "Submetralhadoras", base: 15 },
  { nome: "Metralhadoras", base: 10 },
  { nome: "Lança-Chamas", base: 10 },
  { nome: "Arcos", base: 15 }
];
  
  const ciencia = [
  { nome: "Biologia", base: 1 },
  { nome: "Botânica", base: 1 },
  { nome: "Ciência Forense", base: 1 },
  { nome: "Criptografia", base: 1 },
  { nome: "Engenharia", base: 1 },
  { nome: "Farmácia", base: 1 },
  { nome: "Física", base: 1 },
  { nome: "Geologia", base: 1 },
  { nome: "Matemática", base: 1 },
  { nome: "Meteorologia", base: 1 },
  { nome: "Química", base: 1 },
  { nome: "Zoologia", base: 1 }
];

  const pilotar = [
  { nome: "Pilotar Aeronaves", base: 1 },
  { nome: "Pilotar Navios", base: 1 }
];

  const arte = [
  { nome: "Atuação", base: 5 },
  { nome: "Belas Artes", base: 5 },
  { nome: "Falsificação", base: 5 },
  { nome: "Fotografia", base: 5 }
];

  const linguas = [
  { nome: "Língua (Outra)", base: 1 }
];

  const sobrevivencia = [
  { nome: "Sobrevivência", base: 10 }
];
  
  pericias.forEach(p => criar(p, document.getElementById("lista-de-pericias")));
  lutar.forEach(p => criar(p, document.getElementById("grupo-lutar")));
  armas.forEach(p => criar(p, document.getElementById("grupo-armas")));
  ciencia.forEach(p => criar(p, document.getElementById("grupo-ciencia")));
  pilotar.forEach(p => criar(p, document.getElementById("grupo-pilotar")));
  arte.forEach(p => criar(p, document.getElementById("grupo-arte")));
  linguas.forEach(p => criar(p, document.getElementById("grupo-linguas")));
  sobrevivencia.forEach(p => criar(p, document.getElementById("grupo-sobrevivencia")));

  document.querySelectorAll(".toggle").forEach(t => {
    t.addEventListener("click", () => {
      t.nextElementSibling.classList.toggle("hidden");
    });
  });

  function rolarDado(tipo) {
    const lados = parseInt(tipo.replace("D", ""));
    const resultado = Math.floor(Math.random() * lados) + 1;

    document.getElementById("resultado").textContent = resultado;
  }

  window.rolarDado = rolarDado;

  function d6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function rolarAtributo(id) {
    let valor;

    if (["tamanho", "inteligencia", "educacao"].includes(id)){
      valor = (d6() + d6() + 6) * 5;
    }
    else {
      valor = (d6() + d6() + d6()) * 5;
  }

    document.getElementById(id).value = valor;
    atualizar();
  }
    
  window.rolarAtributo = rolarAtributo;

  function atualizar() {
    const forca = +document.getElementById("forca").value || 0;
    const tam = +document.getElementById("tamanho").value || 0;
    const con = +document.getElementById("constituicao").value || 0;

    document.getElementById("vida").value = Math.floor((con + tam)/10);

    let dano = "0";
    let corpo = 0;

    const soma = forca + tamanho;

    if (soma <= 64){
      dano = "-2";
      corpo = -2;
    } else if (soma <= 84){
      dano = "-1";
      corpo = -1;
    } else if (soma <= 124){
      dano = "0";
      corpo = 0;
    } else if (soma <= 164){
      dano = "1d4";
      corpo = 1;
    } else if (soma <= 204){
      dano = "1d6";
      corpo = 2;
    } else {
      const extra = Math.celi((soma - 524) / 80);

      dano = `+${1 + extra}d6`;
      corpo = 2 + extra;
    }
    
    document.getElementById("dano_extra").value = dano;
  }

});
