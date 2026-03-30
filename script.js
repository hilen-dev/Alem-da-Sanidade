document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".aba-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const alvo = btn.dataset.aba;

      document.querySelectorAll(".aba").forEach(sec => {
        sec.classList.add("hidden");
      });

      document.getElementById(alvo)?.classList.remove("hidden");
    });
  });

  function atualizarPericia(id) {
    const input = document.getElementById(id);
    if (!input) return;

    const valor = parseInt(input.value) || 0;

    document.getElementById(id + "_half").textContent = Math.floor(valor / 2);
    document.getElementById(id + "_fifth").textContent = Math.floor(valor / 5);
  }

  function criarPericia(p, container, prefixo = "") {
    const id = (prefixo + p.nome)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "_");

    const div = document.createElement("div");
    div.classList.add("skill");

    div.innerHTML = `
      <span>${p.nome} ${p.base !== 0 ? `<small>(${p.base}%)</small>` : ""}</span>
      <input type="number" id="${id}" ${p.auto ? "readonly" : ""} value="${p.base}">
      <span id="${id}_half">—</span>
      <span id="${id}_fifth">—</span>
    `;

    container.appendChild(div);

    const input = div.querySelector("input");

    if (!p.auto) {
      input.addEventListener("input", () => atualizarPericia(id));
    }

    if (p.auto === "des") {
      const desInput = document.getElementById("destreza");

      const atualizar = () => {
        input.value = Math.floor((parseInt(desInput?.value) || 0) / 2);
        atualizarPericia(id);
      };

      atualizar();
      desInput?.addEventListener("input", atualizar);
    }

    if (p.auto === "edu") {
      const eduInput = document.getElementById("educacao");

      const atualizar = () => {
        input.value = parseInt(eduInput?.value) || 0;
        atualizarPericia(id);
      };

      atualizar();
      eduInput?.addEventListener("input", atualizar);
    }

    atualizarPericia(id);
  }

  const pericias = [ { nome: "Antropologia", base: 1 }, { nome: "Arqueologia", base: 1 } ];
  const lutar = [ { nome: "Briga", base: 25 } ];
  const armas = [ { nome: "Pistolas", base: 20 } ];
  const ciencia = [ { nome: "Biologia", base: 1 } ];
  const pilotar = [ { nome: "Pilotar Aeronaves", base: 1 } ];

  const lista = document.getElementById("lista-de-pericias");
  const grupoLutar = document.getElementById("grupo-lutar");
  const grupoArmas = document.getElementById("grupo-armas-de-fogo");
  const grupoCiencia = document.getElementById("grupo-ciencia");
  const grupoPilotar = document.getElementById("grupo-pilotar");

  if (lista) pericias.forEach(p => criarPericia(p, lista));
  if (grupoLutar) lutar.forEach(p => criarPericia(p, grupoLutar, "lutar_"));
  if (grupoArmas) armas.forEach(p => criarPericia(p, grupoArmas, "arma_"));
  if (grupoCiencia) ciencia.forEach(p => criarPericia(p, grupoCiencia, "ciencia_"));
  if (grupoPilotar) pilotar.forEach(p => criarPericia(p, grupoPilotar, "pilotar_"));
  document.querySelectorAll(".toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggle.nextElementSibling.classList.toggle("hidden");
    });
  });

  function d6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function rolarAtributo(id) {
    let valor;

    if (["tamanho", "inteligencia", "educacao"].includes(id)) {
      valor = (d6() + d6() + 6) * 5;
    } else {
      valor = (d6() + d6() + d6()) * 5;
    }

    const input = document.getElementById(id);
    if (input) input.value = valor;

    atualizarSecundarios();
  }

  function rolarDado(tipo){
    let resultado;

    switch (tipo){
      case "D4":
        resultado = Math.floor(Math.random()*4) + 1;
        break;
        case "D6":
        resultado = Math.floor(Math.random()*6) + 1;
        break;
        case "D8":
        resultado = Math.floor(Math.random()*8) + 1;
        break;
        case "D10":
        resultado = Math.floor(Math.random()*10) + 1;
        break;
        case "D12":
        resultado = Math.floor(Math.random()*12) + 1;
        break;
        case "D20":
        resultado = Math.floor(Math.random()*20) + 1;
        break;
        case "D100":
        resultado = Math.floor(Math.random()*100) + 1;
        break;
    }

    document.getElementById("resultadosdoDado").textContent = `Resultado:${resultado}`;
  }

  function rolarNDados(ptd, lados){
    let total = 0;
    for (let i = 0, i < qtd; i++){
      total+=Math.floor(Math.random() * lados) + 1;
    }
    return total;
  }
  
  window.rolarAtributo = rolarAtributo;

  function atualizarSecundarios() {
    const forca = +document.getElementById("forca")?.value || 0;
    const con = +document.getElementById("constituicao")?.value || 0;
    const tam = +document.getElementById("tamanho")?.value || 0;
    const des = +document.getElementById("destreza")?.value || 0;
    const idade = +document.getElementById("idade")?.value || 0;

    const hp = Math.floor((con + tam) / 10);
    if (document.getElementById("vida")) {
      document.getElementById("vida").value = hp;
    }

    const soma = forca + tam;
    let dano = "0", corpo = 0;

    if (soma <= 64) { dano = "-2"; corpo = -2; }
    else if (soma <= 84) { dano = "-1"; corpo = -1; }
    else if (soma <= 124) { dano = "0"; corpo = 0; }
    else if (soma <= 164) { dano = "+1d4"; corpo = 1; }
    else if (soma <= 204) { dano = "+1d6"; corpo = 2; }
    else { dano = "+2d6"; corpo = 3; }

    document.getElementById("dano_extra")?.value = dano;
    document.getElementById("corpo")?.value = corpo;

    let mov = 8;
    if (forca < tam && des < tam) mov = 7;
    if (forca > tam && des > tam) mov = 9;

    if (idade >= 80) mov -= 5;
    else if (idade >= 70) mov -= 4;
    else if (idade >= 60) mov -= 3;
    else if (idade >= 50) mov -= 2;
    else if (idade >= 40) mov -= 1;

    document.getElementById("movimento")?.value = mov;
  }

  ["forca", "constituicao", "tamanho", "destreza", "idade"]
    .forEach(id => {
      document.getElementById(id)?.addEventListener("input", atualizarSecundarios);
    });

  const btnJSON = document.getElementById("exportarJSON");

  if (btnJSON) {
    btnJSON.addEventListener("click", () => {
      const dados = {};

      document.querySelectorAll("input").forEach(input => {
        dados[input.id] = input.value;
      });

      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "ficha.json";
      a.click();

      URL.revokeObjectURL(url);
    });
  }

  const btnPDF = document.getElementById("exportarPDF");

  if (btnPDF) {
    btnPDF.addEventListener("click", () => {
      window.print();
    });
  }
});
