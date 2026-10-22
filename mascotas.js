
// Gestión de Mascotas - Tercera entrega
const CLAVE_MASCOTAS = "mascotas";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formMascota").addEventListener("submit", guardarMascota);
  document.getElementById("btnCancelarEdicion").addEventListener("click", () => limpiarFormulario());
  mostrarMascotas();
});

function obtenerMascotas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_MASCOTAS)) || [];
  } catch {
    return [];
  }
}

function guardarMascotas(lista) {
  localStorage.setItem(CLAVE_MASCOTAS, JSON.stringify(lista));
}

function generarIdMascota() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `mas-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function guardarMascota(evento) {
  evento.preventDefault();

  const id = document.getElementById("idMascota").value;
  const nombreMascota = document.getElementById("nombreMascota").value.trim();
  const nombreDuenio = document.getElementById("nombreDuenio").value.trim();
  const color = document.getElementById("colorMascota").value.trim();
  const edad = Number(document.getElementById("edadMascota").value);
  const peso = Number(document.getElementById("pesoMascota").value);

  if (!nombreMascota || !nombreDuenio || !color ||
      !Number.isInteger(edad) || edad < 0 ||
      !Number.isFinite(peso) || peso <= 0) {
    mostrarMensaje("Revisá los datos ingresados.", "danger");
    return;
  }

  const lista = obtenerMascotas();
  const mascota = {
    idMascota: id || generarIdMascota(),
    nombreMascota,
    nombreDuenio,
    color,
    edad,
    peso
  };

  if (id) {
    const indice = lista.findIndex(m => m.idMascota === id);
    if (indice === -1) return;
    lista[indice] = mascota;
  } else {
    lista.push(mascota);
  }

  guardarMascotas(lista);
  mostrarMascotas();
  mostrarMensaje(id ? "Mascota modificada." : "Mascota registrada.", "success");
  limpiarFormulario(false);
}

function mostrarMascotas() {
  const lista = obtenerMascotas();
  const tabla = document.getElementById("tablaMascotas");

  document.getElementById("totalMascotas").textContent = lista.length;

  if (lista.length === 0) {
    tabla.innerHTML = '<tr><td colspan="6" class="text-center">No hay mascotas registradas.</td></tr>';
    return;
  }

  tabla.innerHTML = lista.map(m => `
    <tr>
      <td>${escapar(m.nombreMascota)}</td>
      <td>${escapar(m.nombreDuenio)}</td>
      <td>${escapar(m.color)}</td>
      <td>${m.edad}</td>
      <td>${Number(m.peso).toLocaleString("es-AR")} kg</td>
      <td class="text-nowrap">
        <button class="btn btn-warning btn-sm" data-editar="${escapar(m.idMascota)}">Editar</button>
        <button class="btn btn-danger btn-sm" data-eliminar="${escapar(m.idMascota)}">Eliminar</button>
      </td>
    </tr>
  `).join("");

  tabla.querySelectorAll("[data-editar]").forEach(b =>
    b.addEventListener("click", () => editarMascota(b.dataset.editar))
  );
  tabla.querySelectorAll("[data-eliminar]").forEach(b =>
    b.addEventListener("click", () => eliminarMascota(b.dataset.eliminar))
  );
}

function editarMascota(id) {
  const m = obtenerMascotas().find(x => x.idMascota === id);
  if (!m) return;

  document.getElementById("idMascota").value = m.idMascota;
  document.getElementById("nombreMascota").value = m.nombreMascota;
  document.getElementById("nombreDuenio").value = m.nombreDuenio;
  document.getElementById("colorMascota").value = m.color;
  document.getElementById("edadMascota").value = m.edad;
  document.getElementById("pesoMascota").value = m.peso;

  document.getElementById("tituloFormulario").textContent = "Modificar mascota";
  document.getElementById("btnGuardarMascota").textContent = "Guardar cambios";
  document.getElementById("btnCancelarEdicion").classList.remove("d-none");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminarMascota(id) {
  const lista = obtenerMascotas();
  const mascota = lista.find(m => m.idMascota === id);
  if (!mascota) return;

  if (!confirm(`¿Querés eliminar a ${mascota.nombreMascota}?`)) return;

  guardarMascotas(lista.filter(m => m.idMascota !== id));
  mostrarMascotas();
  mostrarMensaje("Mascota eliminada.", "success");

  if (document.getElementById("idMascota").value === id) {
    limpiarFormulario(false);
  }
}

function limpiarFormulario(limpiarMensaje = true) {
  document.getElementById("formMascota").reset();
  document.getElementById("idMascota").value = "";
  document.getElementById("tituloFormulario").textContent = "Nueva mascota";
  document.getElementById("btnGuardarMascota").textContent = "Guardar mascota";
  document.getElementById("btnCancelarEdicion").classList.add("d-none");
  if (limpiarMensaje) document.getElementById("mensajeMascota").textContent = "";
}

function mostrarMensaje(texto, tipo) {
  const el = document.getElementById("mensajeMascota");
  el.className = `alert alert-${tipo} mt-3`;
  el.textContent = texto;
}

function escapar(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}
