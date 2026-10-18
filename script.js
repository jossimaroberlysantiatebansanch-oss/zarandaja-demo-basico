
const URL_HOJA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOsu39jexz_WYSan0Il25wj6vt2n-TFEUTayxiN5_bCTJrqQm8RYfgh2UOcHmng052Nf8ifHbsXPE6/pub?gid=1887266492&single=true&output=csv";

// true  = los platos agotados salen tachados con la etiqueta "Agotado"
// false = los platos agotados desaparecen de la carta
const MOSTRAR_AGOTADOS = true;
// =========================

const contenedor = document.getElementById("carta");
const barra = document.getElementById("pestanas");
const soles = n => "S/ " + Number(n).toFixed(2);
const normalizar = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
const disponible = d => !normalizar(d.disponible || "si").startsWith("n");

// Convierte el texto CSV en filas y columnas
function leerCSV(texto) {
  const filas = []; let fila = [], celda = "", comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"') { if (texto[i + 1] === '"') { celda += '"'; i++; } else comillas = false; }
      else celda += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") { fila.push(celda); celda = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(celda); celda = ""; filas.push(fila); fila = [];
    } else celda += c;
  }
  if (celda !== "" || fila.length) { fila.push(celda); filas.push(fila); }
  return filas;
}

function pintarMenuDelDia(filas) {
  const precio = (filas.find(d => d.precio) || {}).precio;
  const porSeccion = new Map();
  filas.forEach(d => {
    if (!porSeccion.has(d.seccion)) porSeccion.set(d.seccion, []);
    porSeccion.get(d.seccion).push(d);
  });
  let html = `<h2>Menú del día</h2><div class="menu-dia">`;
  if (precio) html += `<div class="precio-grande">${soles(precio.replace(",", "."))}</div>`;
  porSeccion.forEach((items, seccion) => {
    html += `<h3>${seccion}</h3><ul>` + items.map(d =>
      `<li class="${disponible(d) ? "" : "agotado"}">${d.plato}${disponible(d) ? "" : " <small>(agotado)</small>"}</li>`
    ).join("") + `</ul>`;
  });
  contenedor.innerHTML = html + `</div>`;
}

function pintarCategoria(nombre, filas) {
  contenedor.innerHTML = `<h2>${nombre}</h2>` + filas.map(d => `
    <article class="plato ${disponible(d) ? "" : "agotado"}">
      <div>
        <h3>${d.plato}</h3>
        ${d.descripcion ? `<p>${d.descripcion}</p>` : ""}
      </div>
      <span class="precio">${disponible(d) ? soles(d.precio.replace(",", ".")) : "Agotado"}</span>
    </article>`).join("");
}

function iniciar(datos) {
  const grupos = new Map();
  datos.filter(d => d.categoria && (MOSTRAR_AGOTADOS || disponible(d))).forEach(d => {
    if (!grupos.has(d.categoria)) grupos.set(d.categoria, []);
    grupos.get(d.categoria).push(d);
  });
  const nombres = [...grupos.keys()];

  function mostrar(i) {
    [...barra.children].forEach((b, j) => b.classList.toggle("activa", i === j));
    const nombre = nombres[i], filas = grupos.get(nombre);
    if (normalizar(nombre) === "menu del dia") pintarMenuDelDia(filas);
    else pintarCategoria(nombre, filas);
    window.scrollTo({ top: 0 });
  }

  barra.innerHTML = "";
  nombres.forEach((n, i) => {
    const b = document.createElement("button");
    b.textContent = n;
    b.addEventListener("click", () => mostrar(i));
    barra.appendChild(b);
  });
  if (nombres.length) mostrar(0);
  else contenedor.innerHTML = '<p class="aviso">La carta está vacía por ahora.</p>';
}

async function cargar() {
  try {
    const url = URL_HOJA + (URL_HOJA.includes("?") ? "&" : "?") + "t=" + Date.now();
    const r = await fetch(url, { cache: "no-store"});
    if (!r.ok) throw new Error("Error " + r.status);
    const filas = leerCSV(await r.text());
    const cab = filas[0].map(normalizar);
    const datos = filas.slice(1).filter(f => f.some(x => x.trim())).map(f => {
      const o = {};
      cab.forEach((h, i) => o[h] = (f[i] || "").trim());
      return o;
    });
    iniciar(datos);
  } catch (e) {
    console.error(e);
    contenedor.innerHTML = '<p class="aviso">No se pudo cargar la carta. Intenta de nuevo en unos minutos.</p>';
  }
}

cargar();
