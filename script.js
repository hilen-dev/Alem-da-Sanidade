import { pericias } from "./data/pericias.js";

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("pericias-container");

  const pegar = id => +document.getElementById(id)?.value || 0;

  function d6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // CRIAR SKILL

  function criarSkill({ nome, base = 0, especial }, somarBase = false) {
    const div = document.createElement("div");
    div.classList.add("skill");

    div.innerHTML = `
      <span>${nome}</span>
      <input type="number" value="${somarBase ? 0 : base}" class="valor">
      <span class="half"></span>
      <span class="fifth"></span>
    `;

    const input = div.querySelector(".valor");
    const half = div.querySelector(".half");
    const fifth = div.querySelector(".fifth");

    function pegarBaseEspecial() {
      if (!especial) return base;

      if (especial === "EDU") return pegar("educacao");
      if (especial === "DES") return Math.floor(pegar("destreza") / 2);

      return 0;
    }

    function atualizar() {
      const extra = parseInt(input.value) || 0;
      const baseFinal = pegarBaseEspecial();

      const total = somarBase
        ? baseFinal + extra
        : extra;

      half.textContent = Math.floor(total / 2);
      fifth.textContent = Math.floor(total / 5);
    }

    input.addEventListener("input", atualizar);

    // Atualiza se atributo mudar
    ["educacao", "destreza"].forEach(id => {
      document.getElementById(id)
        ?.addEventListener("input", atualizar);
    });

    atualizar();

    return div;
  }

  // GRUPOS

  function criarGrupo(nome, lista) {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <h3 class="toggle">${nome} ▼</h3>
      <div class="grupo hidden"></div>
    `;

    const grupo = wrapper.querySelector(".grupo");

    lista.forEach(p => {
      grupo.appendChild(criarSkill(p, true));
    });

    container.appendChild(wrapper);
  }

  // PERÍCIAS

  pericias.forEach(p => {
    container.appendChild(criarSkill(p));
  });

  // GRUPOS FIXOS

  criarGrupo("Lutar", [
    { nome:"Briga", base:25},
    { nome:"Chicotes", base:5},
    { nome:"Espadas", base:20},
    { nome:"Garrote", base:15},
    { nome:"Lanças", base:20},
    { nome:"Machados", base:15},
    { nome:"Manguais", base:10},
    { nome:"Motosserras", base:10}
  ]);

  criarGrupo("Armas", [
    { nome:"Pistolas", base:20},
    { nome:"Rifles/Espingardas", base:25},
    { nome:"Submetralhadoras", base:15},
    { nome:"Metralhadoras", base:10},
    { nome:"Lança-Chamas", base:10},
    { nome:"Arcos", base:15}
  ]);

  criarGrupo("Ciência", [
    { nome:"Biologia", base:1},
    { nome:"Botânica", base:1},
    { nome:"Ciência Forense", base:1},
    { nome:"Criptografia", base:1},
    { nome:"Engenharia", base:1},
    { nome:"Farmácia", base:1},
    { nome:"Física", base:1},
    { nome:"Geologia", base:1},
    { nome:"Matemática", base:1},
    { nome:"Meteorologia", base:1},
    { nome:"Química", base:1},
    { nome:"Zoologia", base:1}
  ]);

  criarGrupo("Pilotar", [
    { nome:"Aeronaves", base:1},
    { nome:"Navios", base:1}
  ]);

  criarGrupo("Arte & Ofício", [
    { nome:"Atuação", base:5},
    { nome:"Belas Artes", base:5},
    { nome:"Falsificação", base:5},
    { nome:"Fotografia", base:5}
  ]);

  criarGrupo("Línguas", [
    { nome:"Língua Nativa", especial:"EDU" },
    { nome:"Outra Língua", base:1}
  ]);

  criarGrupo("Sobrevivência", [
    { nome:"Sobrevivência", base:10}
  ]);

  // TOGGLE
 document.addEventListener("click", e => {
    if (e.target.classList.contains("toggle")) {
      e.target.nextElementSibling.classList.toggle("hidden");
    }
  });

  // ROLAR ATRIBUTOS

  window.rolarAtributo = function(id) {
    let valor;

    if (["tamanho", "inteligencia", "educacao"].includes(id)) {
      valor = (d6() + d6() + 6) * 5;
    } else {
      valor = (d6() + d6() + d6()) * 5;
    }

    document.getElementById(id).value = valor;
    atualizarStatus();
  };

  // STATUS

  function atualizarStatus() {
    const forca = pegar("forca");
    const con = pegar("constituicao");
    const tam = pegar("tamanho");
    const pod = pegar("poder");

    document.getElementById("vida").textContent =
      Math.floor((con + tam) / 10);

    document.getElementById("sanidade").textContent = pod;

    document.getElementById("pm").textContent =
      Math.floor(pod / 5);

    const soma = forca + tam;

    let dano = "0";
    let corpo = 0;

    if (soma <= 64) [dano, corpo] = ["-2", -2];
    else if (soma <= 84) [dano, corpo] = ["-1", -1];
    else if (soma <= 124) [dano, corpo] = ["0", 0];
    else if (soma <= 164) [dano, corpo] = ["+1d4", 1];
    else if (soma <= 204) [dano, corpo] = ["+1d6", 2];
    else {
      const extra = Math.ceil((soma - 204) / 80);
      dano = `+${1 + extra}d6`;
      corpo = 2 + extra;
    }

    document.getElementById("dano_extra").textContent = dano;
    document.getElementById("corpo").textContent = corpo;
  }

  ["forca", "constituicao", "tamanho", "destreza", "educacao"]
    .forEach(id => {
      document.getElementById(id)
        ?.addEventListener("input", atualizarStatus);
    });

});
