document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pericias-container");

  function criarPericia(nome, base) {
    const div = document.createElement("div");
    div.classList.add("skill");

    div.innerHTML = `
      <span>${nome}</span>
      <input type="number" value="${base}" class="valor">
      <span class="half">--</span>
      <span class="fifth">--</span>
    `;

    const input = div.querySelector(".valor");
    const half = div.querySelector(".half");
    const fifth = div.querySelector(".fifth");

    function atualizar() {
      const val = parseInt(input.value) || 0;
      half.textContent = Math.floor(val / 2);
      fifth.textContent = Math.floor(val / 5);
    }

    input.addEventListener("input", atualizar);
    atualizar();

    container.appendChild(div);
  }

  function criarGrupo(nome, lista) {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <h3 class="toggle">${nome} ▼</h3>
      <div class="hidden grupo"></div>
    `;

    const grupo = wrapper.querySelector(".grupo");

    lista.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("skill");

      div.innerHTML = `
        <span>${p.nome}</span>
        <input type="number" value="${p.base}" class="valor">
        <span class="half">--</span>
        <span class="fifth">--</span>
      `;

      const input = div.querySelector(".valor");
      const half = div.querySelector(".half");
      const fifth = div.querySelector(".fifth");

      function atualizar() {
        const val = parseInt(input.value) || 0;
        half.textContent = Math.floor(val / 2);
        fifth.textContent = Math.floor(val / 5);
      }

      input.addEventListener("input", atualizar);
      atualizar();

      grupo.appendChild(div);
    });

    container.appendChild(wrapper);
  }

  const pericias = [
    ["Antropologia",1],["Arqueologia",1],["Arremessar",20],
    ["Avaliação",5],["Cavalgar",5],["Charme",15],
    ["Chaveiro",1],["Consertos Elétricos",10],
    ["Consertos Mecânicos",10],["Contabilidade",5],
    ["Direito",5],["Dirigir Automóveis",20],
    ["Disfarce",5],["Eletrônica",1],["Encontrar",25],
    ["Escalar",20],["Escutar",20],["Furtividade",20],
    ["História",5],["Intimidação",15],["Lábia",5],
    ["Medicina",1],["Mergulho",1],["Mundo Natural",10],
    ["Mythos de Cthulhu",0],["Natação",20],
    ["Navegação",10],["Nível de Crédito",0],
    ["Ocultismo",5],["Operar Maquinário Pesado",1],
    ["Persuasão",10],["Prestidigitação",10],
    ["Primeiros Socorros",30],["Psicanálise",1],
    ["Psicologia",10],["Rastrear",10],
    ["Saltar",20],["Usar Bibliotecas",20],
    ["Usar Computadores",5],["Treinar Animais",5]
  ];

  pericias.forEach(p => criarPericia(p[0], p[1]));

  criarGrupo("Lutar", [
    { nome:"Briga",base:25},{ nome:"Chicotes",base:5},
    { nome:"Espadas",base:20},{ nome:"Garrote",base:15},
    { nome:"Lanças",base:20},{ nome:"Machados",base:15},
    { nome:"Manguais",base:10},{ nome:"Motosserras",base:10}
  ]);

  criarGrupo("Armas", [
    { nome:"Pistolas",base:20},{ nome:"Rifles/Espingardas",base:25},
    { nome:"Submetralhadoras",base:15},{ nome:"Metralhadoras",base:10},
    { nome:"Lança-Chamas",base:10},{ nome:"Arcos",base:15}
  ]);

  criarGrupo("Ciência", [
    { nome:"Biologia",base:1},{ nome:"Botânica",base:1},
    { nome:"Ciência Forense",base:1},{ nome:"Criptografia",base:1},
    { nome:"Engenharia",base:1},{ nome:"Farmácia",base:1},
    { nome:"Física",base:1},{ nome:"Geologia",base:1},
    { nome:"Matemática",base:1},{ nome:"Meteorologia",base:1},
    { nome:"Química",base:1},{ nome:"Zoologia",base:1}
  ]);

  criarGrupo("Pilotar", [
    { nome:"Aeronaves",base:1},{ nome:"Navios",base:1}
  ]);

  criarGrupo("Arte & Ofício", [
    { nome:"Atuação",base:5},{ nome:"Belas Artes",base:5},
    { nome:"Falsificação",base:5},{ nome:"Fotografia",base:5}
  ]);

  criarGrupo("Línguas", [
    { nome:"Outra Língua",base:1}
  ]);

  criarGrupo("Sobrevivência", [
    { nome:"Sobrevivência",base:10}
  ]);

  document.addEventListener("click", e => {
    if (e.target.classList.contains("toggle")) {
      e.target.nextElementSibling.classList.toggle("hidden");
    }
  });

  function d6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  window.rolarAtributo = function(id) {
    let valor;

    if (["tamanho","inteligencia","educacao"].includes(id)) {
      valor = (d6() + d6() + 6) * 5;
    } else {
      valor = (d6() + d6() + d6()) * 5;
    }

    document.getElementById(id).value = valor;
    atualizarStatus();
  };

  function atualizarStatus() {
    const forca = +document.getElementById("forca").value || 0;
    const con = +document.getElementById("constituicao").value || 0;
    const tam = +document.getElementById("tamanho").value || 0;

    document.getElementById("vida").textContent = Math.floor((con + tam)/10);

    const soma = forca + tam;

    let dano = "0";
    let corpo = 0;

    if (soma <= 64){ dano = "-2"; corpo = -2; }
    else if (soma <= 84){ dano = "-1"; corpo = -1; }
    else if (soma <= 124){ dano = "0"; corpo = 0; }
    else if (soma <= 164){ dano = "+1d4"; corpo = 1; }
    else if (soma <= 204){ dano = "+1d6"; corpo = 2; }
    else {
      const extra = Math.ceil((soma - 204)/80);
      dano = `+${1+extra}d6`;
      corpo = 2 + extra;
    }

    document.getElementById("dano_extra").textContent = dano;
    document.getElementById("corpo").textContent = corpo;
  }

  ["forca","constituicao","tamanho"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", atualizarStatus);
  });

});
