
// Gestión de Veterinarios - Tercera entrega
const CLAVE_VETERINARIOS = "veterinarios";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formVeterinario").addEventListener("submit", guardarVeterinario);
  document.getElementById("btnCancelarEdicion").addEventListener("click", () => limpiarFormulario());
  document.getElementById("filtroVeterinario").addEventListener("input", mostrarVeterinarios);
  mostrarVeterinarios();
});

function obtenerVeterinarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_VETERINARIOS)) || [];
  } catch {
    return [];
  }
}

function guardarVeterinarios(lista) {
  localStorage.setItem(CLAVE_VETERINARIOS, JSON.stringify(lista));
}

function generarIdVeterinario() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `vet-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function guardarVeterinario(evento) {
  evento.preventDefault();

  const id = document.getElementById("idVeterinario").value;
  const matricula = Number(document.getElementById("matriculaVeterinario").value);
  const nombre = document.getElementById("nombreVeterinario").value.trim();
  const especializacion = document.getElementById("especializacionVeterinario").value.trim();
  const valorConsulta = Number(document.getElementById("valorConsultaVeterinario").value);

  if (!Number.isInteger(matricula) || matricula <= 0 || !nombre ||
      !especializacion || !Number.isFinite(valorConsulta) || valorConsulta < 0) {
    mostrarMensaje("Revisá los datos ingresados.", "danger");
    return;
  }

  const lista = obtenerVeterinarios();

  if (!id && lista.some(v => Number(v.matricula) === matricula)) {
    mostrarMensaje("Ya existe un veterinario con esa matrícula.", "danger");
    return;
  }

  const veterinario = {
    idVeterinario: id || generarIdVeterinario(),
    matricula,
    nombre,
    especializacion,
    valorConsulta
  };

  if (id) {
    const indice = lista.findIndex(v => v.idVeterinario === id);
    if (indice === -1) return;
    lista[indice] = veterinario;
  } else {
    lista.push(veterinario);
  }

  guardarVeterinarios(lista);
  mostrarVeterinarios();
  mostrarMensaje(id ? "Veterinario modificado." : "Veterinario registrado.", "success");
  limpiarFormulario(false);
}

function mostrarVeterinarios() {
  const busqueda = document.getElementById("filtroVeterinario")
    .value.trim().toLocaleLowerCase("es");

  const lista = obtenerVeterinarios().filter(v =>
    `${v.nombre} ${v.matricula} ${v.especializacion}`
      .toLocaleLowerCase("es").includes(busqueda)
  );

  const tabla = document.getElementById("tablaVeterinarios");

  if (lista.length === 0) {
    tabla.innerHTML = '<tr><td colspan="5" class="text-center">No hay veterinarios para mostrar.</td></tr>';
    return;
  }

  tabla.innerHTML = lista.map(v => `
    <tr>
      <td>${escapar(v.nombre)}</td>
      <td>${v.matricula}</td>
      <td>${escapar(v.especializacion)}</td>
      <td>${Number(v.valorConsulta).toLocaleString("es-AR", {
        style: "currency", currency: "ARS", maximumFractionDigits: 2
      })}</td>
      <td class="text-nowrap">
        <button class="btn btn-warning btn-sm" data-editar="${escapar(v.idVeterinario)}">Editar</button>
        <button class="btn btn-danger btn-sm" data-eliminar="${escapar(v.idVeterinario)}">Eliminar</button>
      </td>
    </tr>
  `).join("");

  tabla.querySelectorAll("[data-editar]").forEach(b =>
    b.addEventListener("click", () => editarVeterinario(b.dataset.editar))
  );
  tabla.querySelectorAll("[data-eliminar]").forEach(b =>
    b.addEventListener("click", () => eliminarVeterinario(b.dataset.eliminar))
  );
}

function editarVeterinario(id) {
  const v = obtenerVeterinarios().find(x => x.idVeterinario === id);
  if (!v) return;

  document.getElementById("idVeterinario").value = v.idVeterinario;
  document.getElementById("matriculaVeterinario").value = v.matricula;
  document.getElementById("nombreVeterinario").value = v.nombre;
  document.getElementById("especializacionVeterinario").value = v.especializacion;
  document.getElementById("valorConsultaVeterinario").value = v.valorConsulta;

  document.getElementById("tituloFormulario").textContent = "Modificar veterinario";
  document.getElementById("btnGuardarVeterinario").textContent = "Guardar cambios";
  document.getElementById("btnCancelarEdicion").classList.remove("d-none");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminarVeterinario(id) {
  const lista = obtenerVeterinarios();
  const veterinario = lista.find(v => v.idVeterinario === id);
  if (!veterinario) return;

  if (!confirm(`¿Querés eliminar a ${veterinario.nombre}?`)) return;

  guardarVeterinarios(lista.filter(v => v.idVeterinario !== id));
  mostrarVeterinarios();
  mostrarMensaje("Veterinario eliminado.", "success");

  if (document.getElementById("idVeterinario").value === id) {
    limpiarFormulario(false);
  }
}

function limpiarFormulario(limpiarMensaje = true) {
  document.getElementById("formVeterinario").reset();
  document.getElementById("idVeterinario").value = "";
  document.getElementById("tituloFormulario").textContent = "Nuevo veterinario";
  document.getElementById("btnGuardarVeterinario").textContent = "Guardar veterinario";
  document.getElementById("btnCancelarEdicion").classList.add("d-none");
  if (limpiarMensaje) document.getElementById("mensajeVeterinario").textContent = "";
}

function mostrarMensaje(texto, tipo) {
  const el = document.getElementById("mensajeVeterinario");
  el.className = `alert alert-${tipo} mt-3`;
  el.textContent = texto;
}

function escapar(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}
