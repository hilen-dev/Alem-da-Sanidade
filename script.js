document.addEventListener("DOMContentLoaded", () => {

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

  atualizarPericia(id);

  if (p.auto === "des") {
  const des = parseInt(document.getElementById("destreza").value) || 0;
  input.value = Math.floor(des / 2);
  atualizarPericia(id);
  
  document.getElementById("destreza").addEventListener("input", () => {
    const des = parseInt(document.getElementById("destreza").value) || 0;
    input.value = Math.floor(des / 2);
    atualizarPericia(id);
  });
}

  if (p.auto === "edu") {
  const edu = parseInt(document.getElementById("educacao").value) || 0;
  input.value = edu;
  atualizarPericia(id);
  
  document.getElementById("educacao").addEventListener("input", () => {
    const edu = parseInt(document.getElementById("educacao").value) || 0;
    input.value = edu;
    atualizarPericia(id);
  });
}
}
      

  const pericias = [
    { nome: "Antropologia", base: 1 },
    { nome: "Arqueologia", base: 1 },
    { nome: "Arremesar", base: 20 },
    { nome: "Arte & Ofício", base: 5 },
    { nome: "Artilharia", base: 1 },
    { nome: "Astronomia", base: 1 },
    { nome: "Atuação", base: 5 },
    { nome: "Avaliação", base: 5 },
    { nome: "Belas Artes", base: 5 },
    { nome: "Cavalgar", base: 5 },
    { nome: "Charme", base: 15 },
    { nome: "Chaveiro", base: 1 },
    { nome: "Conhecimento", base: 1 },
    { nome: "Consertos Elétricos", base: 1 },
    { nome: "Consertos Mecânicos", base: 1 },
    { nome: "Contabilidade", base: 5 },
    { nome: "Demolição", base: 1},
    { nome: "Direito", base: 5},
    { nome: "Dirigir Automóveis", base: 20 },
    { nome: "Disfarce", base: 5 },
    { nome: "Eletrônica", base: 1 },
    { nome: "Encontrar", base: 25 },
    { nome: "Escalar", base: 20 },
    { nome: "Escutar", base: 20 },
    { nome: "Esquiva", base: 0, auto: "des" },
    { nome: "Falsificação", base: 5 },
    { nome: "Fotografia", base: 5 },
    { nome: "Furtividade", base: 20 },
    { nome: "Hipnose", base: 1 },
    { nome: "Historia", base: 5 },
    { nome: "Intimidação", base: 15 },
    { nome: "Lábia", base: 5 },
    { nome: "Leitura Lábial", base: 1 },
    { nome: "Língua Nativa", base: 0, auto: "edu" },
    { nome: "Lingua outra", base: 1 },
    { nome: "Medicina", base: 1 },
    { nome: "Mergulho", base: 1 },
    { nome: "Meteorologia", base: 1 },
    { nome: "Mundo Natural", base: 10 },
    { nome: "Mythos de Cthulhu", base: 0 },
    { nome: "Natação", base: 20 },
    { nome: "Navegação", base: 10 },
    { nome: "Prestigitação", base: 10 },
    { nome: "Primeiros Socorros", base: 30 },
    { nome: "Psicologia", base: 10 },
    { nome: "Rastrear", base: 10},
    { nome: "Saltar", base: 20 },
    { nome: "Sobrevivência", base: 10 },
    { nome: "Treinar Animais", base: 5 },
    { nome: "Usar Bibliotecas", base: 5 },
    { nome: "Usar Computadores", base: 20 },
  ];

  const lutar = [
    { nome: "Briga", base: 25 },
    { nome: "Chicotes", base: 5 },
    { nome: "Espadas", base: 20 },
    { nome: "Garrote", base: 15 },
    { nome:"Lanças", base: 20 },
    { nome: "Machados", base: 15 },
    { nome: "Manguais", base: 10 },
    { nome: "Motosserras", base: 10}
  ];

  const armas = [
    { nome: "Arco", base: 15 },
    { nome: "Pistolas", base: 20 },
    { nome: "Rifles/Espingardas", base: 25 },
    { nome: "Lança-Chamas", base: 10 },
    { nome: "Metralhadoras", base: 10},
    { nome: "Submetralhadoras", base: 15 }
  ];

  const ciencia = [
    { nome: "Biologia", base: 1 },
    { nome: "Botânica", base: 1 },
    { nome: "Ciência Forense", base: 1 },
    { nome: "Criptografia", base: 1 },
    { nome: "Engenharia", base: 1 },
    { nome: "Farmacia", base: 1 },
    { nome: "Física", base: 1 },
    { nome: "Geologia", base: 1 },
    { nome: "Matemática", base: 1 },
    { nome: "Meteorologia", base: 1 },
    { nome: "Química", base: 1},
    { nome: "Zoologia", base: 1}
  ];

  const pilotar = [
    { nome: "Pilotar Aeronaves", base: 1 },
    { nome: "Pilotar Navios", base: 1 }
]
    
  const lista = document.getElementById("lista-de-pericias");
  const grupoLutar = document.getElementById("grupo-lutar");
  const grupoArmas = document.getElementById("grupo-armas-de-fogo");
  const grupoCiencia = document.getElementById("grupo-ciencia");
  const grupoPilotar = document.getElementById("grupo-pilotar");
                                               

  function atualizarPericia(id) {
    const valor = parseInt(document.getElementById(id).value) || 0;

    document.getElementById(id + "_half").textContent = Math.floor(valor / 2);
    document.getElementById(id + "_fifth").textContent = Math.floor(valor / 5);
  }

 if(lista){
  pericias.forEach(p => criarPericia(p, lista));
}

if(grupoLutar){
  lutar.forEach(p => criarPericia(p, grupoLutar, "lutar_"));
}

if(grupoArmas){
  armas.forEach(p => criarPericia(p, grupoArmas, "arma_"));
}

if (grupoCiencia){
  ciencia.forEach(p => criarPericia(p, grupoCiencia, "ciencia_"));
}
if (grupoPilotar){
  pilotar.forEach(p => criarPericia(p, grupoPilotar, "pilotar_"));
  }
 document.querySelectorAll(".toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      content.classList.toggle("hidden");
    });
  });
});
