document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pericias-container");

  function criarPericia(nome, valor) {
    const div = document.createElement("div");
    div.classList.add("pericia");

    div.innerHTML = `
      <span>${nome}</span>
      <span>${valor}%</span>
    `;

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
      const item = document.createElement("div");
      item.classList.add("pericia");

      item.innerHTML = `
        <span>${p.nome}</span>
        <span>${p.base}%</span>
      `;

      grupo.appendChild(item);
    });

    container.appendChild(wrapper);
  }

  // PERÍCIAS SIMPLES
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
    { nome: "Furtividade", base: 20 },
    { nome: "História", base: 5 },
    { nome: "Intimidação", base: 15 },
    { nome: "Lábia", base: 5 },
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

  pericias.forEach(p => criarPericia(p.nome, p.base));

  // GRUPOS
  criarGrupo("Lutar", [
    { nome: "Briga", base: 25 },
    { nome: "Chicotes", base: 5 },
    { nome: "Espadas", base: 20 },
    { nome: "Garrote", base: 15 },
    { nome: "Lanças", base: 20 },
    { nome: "Machados", base: 15 },
    { nome: "Manguais", base: 10 },
    { nome: "Motosserras", base: 10 }
  ]);

  criarGrupo("Armas", [
    { nome: "Pistolas", base: 20 },
    { nome: "Rifles/Espingardas", base: 25 },
    { nome: "Submetralhadoras", base: 15 },
    { nome: "Metralhadoras", base: 10 },
    { nome: "Lança-Chamas", base: 10 },
    { nome: "Arcos", base: 15 }
  ]);

  criarGrupo("Ciencia", [
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
  ]);

  criarGrupo("Pilotar", [
    { nome: "Pilotar Aeronaves", base: 1 },
    { nome: "Pilotar Navios", base: 1 }
  ]);

  criarGrupo("Arte & Oficio", [
    { nome: "Atuação", base: 5 },
    { nome: "Belas Artes", base: 5 },
    { nome: "Falsificação", base: 5 },
    { nome: "Fotografia", base: 5 }
  ]);

  criarGrupo("Linguas", [
    { nome: "Língua (Outra)", base: 1 }
  ]);

  criarGrupo("Sobrevivencia", [
    { nome: "Sobrevivência", base: 10 }
  ]);

  // TOGGLE
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle")) {
      e.target.nextElementSibling.classList.toggle("hidden");
    }
  });

  // STATUS
  function atualizar() {
    const forca = +document.getElementById("forca").value || 0;
    const con = +document.getElementById("constituicao").value || 0;
    const tam = +document.getElementById("tamanho").value || 0;

    document.getElementById("vida").textContent = Math.floor((con + tam) / 10);

    const soma = forca + tam;

    let dano = "0";
    let corpo = 0;

    if (soma <= 64){ dano = "-2"; corpo = -2; }
    else if (soma <= 84){ dano = "-1"; corpo = -1; }
    else if (soma <= 124){ dano = "0"; corpo = 0; }
    else if (soma <= 164){ dano = "+1d4"; corpo = 1; }
    else if (soma <= 204){ dano = "+1d6"; corpo = 2; }
    else {
      const extra = Math.ceil((soma - 204) / 80);
      dano = `+${1 + extra}d6`;
      corpo = 2 + extra;
    }

    document.getElementById("dano_extra").textContent = dano;
    document.getElementById("corpo").textContent = corpo;
  }

  ["forca", "constituicao", "tamanho"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", atualizar);
  });

});
