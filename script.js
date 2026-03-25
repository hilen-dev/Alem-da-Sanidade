document.addEventListener("DOMContentLoaded", () => {

  const pericias = [
    { nome: "Antropologia", base: 1 },
    { nome: "Arqueologia", base: 1 },
    { nome: "Arremesar", base: 20 },
    { nome: "Arte & Ofício", base: 5 },
    { nome: "Artilharia", base: 1 },
    { nome: "Astronomia", base: 1 },
    { nome: "Atruação", base: 5 },
    { nome: "Avaliação", base: 5 },
    { nome: "Belas Artes", base: 5 },
    { nome: "Cavalgar", base: 5 },
    { nome: "Charme", base: 15 },
    { nome: "Chaveiro", base: 1 },
    { nome: "
    { nome: "Furtividade", base: 20 },
    { nome: "Psicologia", base: 10 },
    { nome: "Primeiros Socorros", base: 30 },
    { nome: "Persuasão", base: 10 },
    { nome: "Usar Bibliotecas", base: 20 }
  ];

  const lutar = [
    { nome: "Briga", base: 25 },
    { nome: "Chicotes", base: 5 },
    { nome: "Espadas", base: 20 },
    { nome: "Garrote", base: 15 },
    { nome:"Lanças", base: 20 },
    { nome: "Machados", base: 15 },
    { nome: "Manguais", base: 10 },
    { nome: "Motosserras", base: 10
  ];

  const armas = [
    { nome: "Arco", base: 15 },
    { nome: "Pistolas", base: 20 },
    { nome: "Rifles/Espingardas", base: 25 },
    { nome: "Lança-Chamas", base: 10 },
    { nome: "Metralhadoras", base: 10},
    { nome: "Submetralhadoras", base: 15 }
  ];

  const lista = document.getElementById("lista-de-pericias");
  const grupoLutar = document.getElementById("grupo-lutar");
  const grupoArmas = document.getElementById("grupo_armas");

  function criarPericia(p, container, prefixo = "") {
    const id = (prefixo + p.nome)
      .toLowerCase()
      .replace(/\s+/g, "_");

    const div = document.createElement("div");
    div.classList.add("skill");

    div.innerHTML = `
      <span>${p.nome} <small>(${p.base}%)</small></span>
      <input type="number" id="${id}" value="${p.base}">
      <span id="${id}_half">—</span>
      <span id="${id}_fifth">—</span>
    `;

    container.appendChild(div);

    const input = div.querySelector("input");

    input.addEventListener("input", () => {
      atualizarPericia(id);
    });

    atualizarPericia(id);
  }

  function atualizarPericia(id) {
    const valor = parseInt(document.getElementById(id).value) || 0;

    document.getElementById(id + "_half").textContent = Math.floor(valor / 2);
    document.getElementById(id + "_fifth").textContent = Math.floor(valor / 5);
  }

  pericias.forEach(p => criarPericia(p, lista));

  lutar.forEach(p => criarPericia(p, grupoLutar, "lutar_"));

  armas.forEach(p => criarPericia(p, grupoArmas, "arma_"));
 document.querySelectorAll(".toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      content.classList.toggle("hidden");
    });
  });

});
