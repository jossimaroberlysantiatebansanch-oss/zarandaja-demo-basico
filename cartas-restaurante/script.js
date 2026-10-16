const soles = n => "S/ " + n.toFixed(2);
const contenedor = document.getElementById("carta");
const barra = document.getElementById("pestanas");

// Se arma la lista de pestañas: primero el menú, luego las categorías
const secciones = ["Menú del día", ...categorias.map(c => c.nombre)];

function pintarMenuDelDia() {
  const m = menuDelDia;
  const lista = items => "<ul>" + items.map(i => `<li>${i}</li>`).join("") + "</ul>";
  contenedor.innerHTML = `
    <h2>Menú del día</h2>
    <div class="menu-dia">
      <div class="precio-grande">${soles(m.precio)}</div>
      <h3>Entrada</h3>${lista(m.entradas)}
      <h3>Segundo a elegir</h3>${lista(m.segundos)}
      ${m.postre ? `<h3>Postre</h3><p>${m.postre}</p>` : ""}
      <h3>Refresco</h3><p>${m.refresco}</p>
    </div>`;
}

function pintarCategoria(cat) {
  contenedor.innerHTML = `<h2>${cat.nombre}</h2>` + cat.platos.map(p => `
    <article class="plato">
      <div>
        <h3>${p.nombre}</h3>
        ${p.descripcion ? `<p>${p.descripcion}</p>` : ""}
      </div>
      <span class="precio">${soles(p.precio)}</span>
    </article>`).join("");
}

function mostrar(indice) {
  [...barra.children].forEach((b, i) => b.classList.toggle("activa", i === indice));
  if (indice === 0) pintarMenuDelDia();
  else pintarCategoria(categorias[indice - 1]);
  window.scrollTo({ top: 0 });
}

secciones.forEach((nombre, i) => {
  const boton = document.createElement("button");
  boton.textContent = nombre;
  boton.addEventListener("click", () => mostrar(i));
  barra.appendChild(boton);
});

mostrar(0);