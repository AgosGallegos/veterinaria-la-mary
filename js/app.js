// ======================================================
// VETERINARIA LA MARY
// PANEL DE ADMINISTRACIÓN
// JavaScript + LocalStorage + Fetch API
// ======================================================


// ======================================================
// VARIABLE PARA GUARDAR IMAGEN OBTENIDA DESDE LA API
// ======================================================

let imagenAPIBase64 = "";


// ======================================================
// DATOS INICIALES
// ======================================================

const veterinariosIniciales = [
    {
        idVeterinario: "vet001",
        matricula: "12345",
        nombre: "Dra. María González",
        especializacion: "Clínica de pequeños animales",
        valorConsulta: 15000
    },
    {
        idVeterinario: "vet002",
        matricula: "12346",
        nombre: "Dr. Juan Pérez",
        especializacion: "Dermatología veterinaria",
        valorConsulta: 18000
    },
    {
        idVeterinario: "vet003",
        matricula: "12347",
        nombre: "Dra. Laura Martínez",
        especializacion: "Cirugía veterinaria",
        valorConsulta: 20000
    }
];


const mascotasIniciales = [
    {
        idMascota: "mas001",
        nombreMascota: "Milo",
        nombreDuenio: "Juan Pérez",
        color: "Marrón",
        edad: 3,
        peso: 12.5,
        imagenMascota: ""
    },
    {
        idMascota: "mas002",
        nombreMascota: "Luna",
        nombreDuenio: "María González",
        color: "Blanco",
        edad: 2,
        peso: 8.3,
        imagenMascota: ""
    }
];


// ======================================================
// INICIO
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    inicializarDatos();

    mostrarVeterinarios();
    mostrarMascotas();
    mostrarTurnos();
    mostrarHistoriasClinicas();

    cargarMascotasEnSelect();
    cargarVeterinariosEnSelect();

    cargarMascotasHistoria();
    cargarVeterinariosHistoria();

    configurarEventos();

});


// ======================================================
// LOCAL STORAGE
// ======================================================

function inicializarDatos() {

    if (!localStorage.getItem("veterinarios")) {
        localStorage.setItem(
            "veterinarios",
            JSON.stringify(veterinariosIniciales)
        );
    }

    if (!localStorage.getItem("mascotas")) {
        localStorage.setItem(
            "mascotas",
            JSON.stringify(mascotasIniciales)
        );
    }

    if (!localStorage.getItem("turnos")) {
        localStorage.setItem(
            "turnos",
            JSON.stringify([])
        );
    }

    if (!localStorage.getItem("historiasClinicas")) {
        localStorage.setItem(
            "historiasClinicas",
            JSON.stringify([])
        );
    }
}


function obtenerVeterinarios() {

    return JSON.parse(
        localStorage.getItem("veterinarios")
    ) || [];

}


function obtenerMascotas() {

    return JSON.parse(
        localStorage.getItem("mascotas")
    ) || [];

}


function obtenerTurnos() {

    return JSON.parse(
        localStorage.getItem("turnos")
    ) || [];

}


function obtenerHistoriasClinicas() {

    return JSON.parse(
        localStorage.getItem("historiasClinicas")
    ) || [];

}


// ======================================================
// UTILIDADES
// ======================================================

function formatearPrecio(valor) {

    return "$" + Number(valor || 0).toLocaleString("es-AR");

}


function obtenerValorPorId(...ids) {

    for (const id of ids) {

        const elemento = document.getElementById(id);

        if (elemento) {
            return elemento.value;
        }

    }

    return "";

}


// ======================================================
// EVENTOS
// ======================================================

function configurarEventos() {

    const formVeterinario =
        document.getElementById("formVeterinario");

    if (formVeterinario) {

        formVeterinario.addEventListener(
            "submit",
            guardarVeterinario
        );

    }


    const formMascota =
        document.getElementById("formMascota");

    if (formMascota) {

        formMascota.addEventListener(
            "submit",
            guardarMascota
        );

    }


    const formTurno =
        document.getElementById("formTurno");

    if (formTurno) {

        formTurno.addEventListener(
            "submit",
            guardarTurno
        );

    }


    const formHistoria =
        document.getElementById("formHistoria");

    if (formHistoria) {

        formHistoria.addEventListener(
            "submit",
            guardarHistoria
        );

    }


    const veterinarioTurno =
        document.getElementById("veterinarioTurno");

    if (veterinarioTurno) {

        veterinarioTurno.addEventListener(
            "change",
            actualizarValorConsultaTurno
        );

    }


    const filtroVeterinario =
        document.getElementById("filtroVeterinario");

    if (filtroVeterinario) {

        filtroVeterinario.addEventListener(
            "input",
            mostrarVeterinarios
        );

    }


    const filtroTurno =
        document.getElementById("filtroTurno");

    if (filtroTurno) {

        filtroTurno.addEventListener(
            "input",
            mostrarTurnos
        );

    }


    const filtroHistoria =
        document.getElementById("filtroHistoriaMascota");

    if (filtroHistoria) {

        filtroHistoria.addEventListener(
            "change",
            mostrarHistoriasClinicas
        );

    }

}


// ======================================================
// VETERINARIOS
// ======================================================

function mostrarVeterinarios() {

    const tabla =
        document.getElementById("tablaVeterinarios");

    if (!tabla) {
        return;
    }


    const veterinarios =
        obtenerVeterinarios();


    const filtro =
        (
            document.getElementById("filtroVeterinario")?.value || ""
        )
        .trim()
        .toLowerCase();


    const filtrados =
        veterinarios.filter(function (veterinario) {

            return (
                veterinario.nombre
                    .toLowerCase()
                    .includes(filtro)

                ||

                veterinario.especializacion
                    .toLowerCase()
                    .includes(filtro)

                ||

                String(veterinario.matricula)
                    .toLowerCase()
                    .includes(filtro)
            );

        });


    if (filtrados.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    No se encontraron veterinarios.
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML =
        filtrados.map(function (veterinario) {

            return `
                <tr>

                    <td>
                        ${veterinario.nombre}
                    </td>

                    <td>
                        ${veterinario.matricula}
                    </td>

                    <td>
                        ${veterinario.especializacion}
                    </td>

                    <td>
                        ${formatearPrecio(veterinario.valorConsulta)}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm me-1"
                            onclick="editarVeterinario('${veterinario.idVeterinario}')">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarVeterinario('${veterinario.idVeterinario}')">

                            Eliminar

                        </button>

                    </td>

                </tr>
            `;

        }).join("");

}


// ======================================================
// NUEVO VETERINARIO
// ======================================================

function prepararNuevoVeterinario() {

    document
        .getElementById("formVeterinario")
        .reset();


    document
        .getElementById("idVeterinario")
        .value = "";


    document
        .getElementById("tituloModalVeterinario")
        .textContent = "Nuevo veterinario";


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalVeterinario")
        );


    modal.show();

}


// ======================================================
// GUARDAR VETERINARIO
// ======================================================

function guardarVeterinario(evento) {

    evento.preventDefault();


    const veterinarios =
        obtenerVeterinarios();


    const id =
        document.getElementById("idVeterinario").value;


    const veterinario = {

        idVeterinario:
            id || "vet" + Date.now(),

        matricula:
            obtenerValorPorId(
                "matriculaVeterinario",
                "matricula"
            ),

        nombre:
            document.getElementById(
                "nombreVeterinario"
            ).value,

        especializacion:
            obtenerValorPorId(
                "especializacionVeterinario",
                "especializacion"
            ),

        valorConsulta:
            Number(
                obtenerValorPorId(
                    "valorConsultaVeterinario",
                    "valorConsulta"
                )
            )

    };


    if (id) {

        const indice =
            veterinarios.findIndex(function (v) {

                return v.idVeterinario === id;

            });


        if (indice !== -1) {

            veterinarios[indice] =
                veterinario;

        }

    } else {

        veterinarios.push(veterinario);

    }


    localStorage.setItem(
        "veterinarios",
        JSON.stringify(veterinarios)
    );


    mostrarVeterinarios();

    cargarVeterinariosEnSelect();

    cargarVeterinariosHistoria();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalVeterinario")
        );


    modal.hide();

}


// ======================================================
// EDITAR VETERINARIO
// ======================================================

function editarVeterinario(id) {

    const veterinarios =
        obtenerVeterinarios();


    const veterinario =
        veterinarios.find(function (v) {

            return v.idVeterinario === id;

        });


    if (!veterinario) {
        return;
    }


    document.getElementById("idVeterinario").value =
        veterinario.idVeterinario;


    document.getElementById("nombreVeterinario").value =
        veterinario.nombre;


    const matricula =
        document.getElementById("matriculaVeterinario");

    if (matricula) {
        matricula.value = veterinario.matricula;
    }


    const especializacion =
        document.getElementById("especializacionVeterinario");

    if (especializacion) {
        especializacion.value =
            veterinario.especializacion;
    }


    const valor =
        document.getElementById("valorConsultaVeterinario");

    if (valor) {
        valor.value =
            veterinario.valorConsulta;
    }


    document.getElementById(
        "tituloModalVeterinario"
    ).textContent = "Editar veterinario";


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalVeterinario")
        );


    modal.show();

}


// ======================================================
// ELIMINAR VETERINARIO
// ======================================================

function eliminarVeterinario(id) {

    if (
        !confirm(
            "¿Seguro que querés eliminar este veterinario?"
        )
    ) {
        return;
    }


    let veterinarios =
        obtenerVeterinarios();


    veterinarios =
        veterinarios.filter(function (veterinario) {

            return veterinario.idVeterinario !== id;

        });


    localStorage.setItem(
        "veterinarios",
        JSON.stringify(veterinarios)
    );


    mostrarVeterinarios();

    cargarVeterinariosEnSelect();

    cargarVeterinariosHistoria();

}


// ======================================================
// MASCOTAS
// ======================================================

function mostrarMascotas() {

    const tabla =
        document.getElementById("tablaMascotas");


    if (!tabla) {
        return;
    }


    const mascotas =
        obtenerMascotas();


    if (mascotas.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    No hay mascotas registradas.
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML =
        mascotas.map(function (mascota) {

            let imagen = "Sin imagen";


            if (mascota.imagenMascota) {

                imagen = `
                    <img
                        src="${mascota.imagenMascota}"
                        alt="Imagen de ${mascota.nombreMascota}"
                        width="70"
                        height="70"
                        style="
                            object-fit:cover;
                            border-radius:10px;
                        "
                    >
                `;

            }


            return `
                <tr>

                    <td>
                        ${mascota.nombreMascota}
                    </td>

                    <td>
                        ${mascota.nombreDuenio}
                    </td>

                    <td>
                        ${mascota.color}
                    </td>

                    <td>
                        ${mascota.edad}
                    </td>

                    <td>
                        ${mascota.peso} kg
                    </td>

                    <td>
                        ${imagen}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm me-1 mb-1"
                            onclick="editarMascota('${mascota.idMascota}')">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm me-1 mb-1"
                            onclick="eliminarMascota('${mascota.idMascota}')">

                            Eliminar

                        </button>

                        <button
                            class="btn btn-info btn-sm mb-1"
                            onclick="verHistorialMascota('${mascota.idMascota}')">

                            Historial

                        </button>

                    </td>

                </tr>
            `;

        }).join("");

}


// ======================================================
// NUEVA MASCOTA
// ======================================================

function prepararNuevaMascota() {

    document
        .getElementById("formMascota")
        .reset();


    document
        .getElementById("idMascota")
        .value = "";


    imagenAPIBase64 = "";


    document.getElementById(
        "vistaPreviaImagenAPI"
    ).innerHTML = "";


    document.getElementById(
        "tituloModalMascota"
    ).textContent = "Nueva mascota";


    const eliminar =
        document.getElementById("eliminarImagen");

    if (eliminar) {
        eliminar.checked = false;
    }


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalMascota")
        );


    modal.show();

}


// ======================================================
// GUARDAR MASCOTA
// ======================================================

function guardarMascota(evento) {

    evento.preventDefault();


    const mascotas =
        obtenerMascotas();


    const id =
        document.getElementById("idMascota").value;


    let imagen = "";


    const mascotaExistente =
        mascotas.find(function (m) {

            return m.idMascota === id;

        });


    if (
        mascotaExistente &&
        mascotaExistente.imagenMascota
    ) {

        imagen =
            mascotaExistente.imagenMascota;

    }


    const archivo =
        document.getElementById("imagenMascota").files[0];


    if (archivo) {

        const lector =
            new FileReader();


        lector.onload = function () {

            guardarMascotaConImagen(
                lector.result,
                id,
                mascotas
            );

        };


        lector.readAsDataURL(archivo);

        return;
    }


    if (imagenAPIBase64) {

        imagen = imagenAPIBase64;

    }


    const eliminarImagen =
        document.getElementById("eliminarImagen");


    if (
        eliminarImagen &&
        eliminarImagen.checked
    ) {

        imagen = "";

    }


    guardarMascotaConImagen(
        imagen,
        id,
        mascotas
    );

}


// ======================================================
// GUARDAR MASCOTA CON IMAGEN
// ======================================================

function guardarMascotaConImagen(
    imagen,
    id,
    mascotas
) {

    const mascota = {

        idMascota:
            id || "mas" + Date.now(),

        nombreMascota:
            document.getElementById(
                "nombreMascota"
            ).value,

        nombreDuenio:
            document.getElementById(
                "nombreDuenio"
            ).value,

        color:
            document.getElementById(
                "colorMascota"
            ).value,

        edad:
            Number(
                document.getElementById(
                    "edadMascota"
                ).value
            ),

        peso:
            Number(
                document.getElementById(
                    "pesoMascota"
                ).value
            ),

        imagenMascota:
            imagen

    };


    if (id) {

        const indice =
            mascotas.findIndex(function (m) {

                return m.idMascota === id;

            });


        if (indice !== -1) {

            mascotas[indice] =
                mascota;

        }

    } else {

        mascotas.push(mascota);

    }


    localStorage.setItem(
        "mascotas",
        JSON.stringify(mascotas)
    );


    imagenAPIBase64 = "";


    mostrarMascotas();

    cargarMascotasEnSelect();

    cargarMascotasHistoria();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalMascota")
        );


    modal.hide();

}


// ======================================================
// EDITAR MASCOTA
// ======================================================

function editarMascota(id) {

    const mascotas =
        obtenerMascotas();


    const mascota =
        mascotas.find(function (m) {

            return m.idMascota === id;

        });


    if (!mascota) {
        return;
    }


    document.getElementById("idMascota").value =
        mascota.idMascota;


    document.getElementById("nombreMascota").value =
        mascota.nombreMascota;


    document.getElementById("nombreDuenio").value =
        mascota.nombreDuenio;


    document.getElementById("colorMascota").value =
        mascota.color;


    document.getElementById("edadMascota").value =
        mascota.edad;


    document.getElementById("pesoMascota").value =
        mascota.peso;


    document.getElementById("imagenMascota").value =
        "";


    imagenAPIBase64 = "";


    const eliminar =
        document.getElementById("eliminarImagen");

    if (eliminar) {
        eliminar.checked = false;
    }


    const vista =
        document.getElementById(
            "vistaPreviaImagenAPI"
        );


    if (
        vista &&
        mascota.imagenMascota
    ) {

        vista.innerHTML = `
            <p class="mb-2">
                Imagen actual:
            </p>

            <img
                src="${mascota.imagenMascota}"
                alt="Imagen actual"
                style="
                    width:150px;
                    height:150px;
                    object-fit:cover;
                    border-radius:15px;
                "
            >
        `;

    } else if (vista) {

        vista.innerHTML = "";

    }


    document.getElementById(
        "tituloModalMascota"
    ).textContent = "Editar mascota";


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalMascota")
        );


    modal.show();

}


// ======================================================
// ELIMINAR MASCOTA
// ======================================================

function eliminarMascota(id) {

    if (
        !confirm(
            "¿Seguro que querés eliminar esta mascota?"
        )
    ) {
        return;
    }


    let mascotas =
        obtenerMascotas();


    mascotas =
        mascotas.filter(function (mascota) {

            return mascota.idMascota !== id;

        });


    localStorage.setItem(
        "mascotas",
        JSON.stringify(mascotas)
    );


    mostrarMascotas();

    cargarMascotasEnSelect();

    cargarMascotasHistoria();

}


// ======================================================
// SELECT DE MASCOTAS PARA TURNOS
// ======================================================

function cargarMascotasEnSelect() {

    const select =
        document.getElementById("mascotaTurno");


    if (!select) {
        return;
    }


    const mascotas =
        obtenerMascotas();


    select.innerHTML = `
        <option value="">
            Seleccionar mascota
        </option>
    `;


    mascotas.forEach(function (mascota) {

        select.innerHTML += `
            <option value="${mascota.idMascota}">
                ${mascota.nombreMascota}
                - Dueño: ${mascota.nombreDuenio}
            </option>
        `;

    });

}


// ======================================================
// SELECT DE VETERINARIOS PARA TURNOS
// ======================================================

function cargarVeterinariosEnSelect() {

    const select =
        document.getElementById(
            "veterinarioTurno"
        );


    if (!select) {
        return;
    }


    const veterinarios =
        obtenerVeterinarios();


    select.innerHTML = `
        <option value="">
            Seleccionar veterinario
        </option>
    `;


    veterinarios.forEach(function (veterinario) {

        select.innerHTML += `
            <option value="${veterinario.idVeterinario}">
                ${veterinario.nombre}
                - ${veterinario.especializacion}
            </option>
        `;

    });

}


// ======================================================
// TURNOS
// ======================================================

function mostrarTurnos() {

    const tabla =
        document.getElementById("tablaTurnos");


    if (!tabla) {
        return;
    }


    const turnos =
        obtenerTurnos();


    const mascotas =
        obtenerMascotas();


    const veterinarios =
        obtenerVeterinarios();


    const filtro =
        (
            document.getElementById(
                "filtroTurno"
            )?.value || ""
        )
        .trim()
        .toLowerCase();


    const filtrados =
        turnos.filter(function (turno) {

            const mascota =
                mascotas.find(function (m) {

                    return m.idMascota === turno.mascota;

                });


            const veterinario =
                veterinarios.find(function (v) {

                    return v.idVeterinario === turno.veterinario;

                });


            const texto = [

                mascota?.nombreMascota || "",

                veterinario?.nombre || "",

                veterinario?.especializacion || "",

                turno.fechaHora || ""

            ]
                .join(" ")
                .toLowerCase();


            return texto.includes(filtro);

        });


    if (filtrados.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    No hay turnos registrados.
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML =
        filtrados.map(function (turno) {

            const mascota =
                mascotas.find(function (m) {

                    return m.idMascota === turno.mascota;

                });


            const veterinario =
                veterinarios.find(function (v) {

                    return v.idVeterinario === turno.veterinario;

                });


            const fecha =
                new Date(turno.fechaHora);


            const valor =
                turno.valorConsulta ??
                veterinario?.valorConsulta ??
                0;


            return `
                <tr>

                    <td>
                        ${fecha.toLocaleString("es-AR")}
                    </td>

                    <td>
                        ${mascota
                            ? mascota.nombreMascota
                            : "Mascota no encontrada"}
                    </td>

                    <td>
                        ${veterinario
                            ? veterinario.nombre
                            : "Veterinario no encontrado"}
                    </td>

                    <td>
                        ${formatearPrecio(valor)}
                    </td>

                    <td>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarTurno('${turno.idTurno}')">

                            Eliminar

                        </button>

                    </td>

                </tr>
            `;

        }).join("");

}


// ======================================================
// NUEVO TURNO
// ======================================================

function prepararNuevoTurno() {

    document
        .getElementById("formTurno")
        .reset();


    document
        .getElementById("idTurno")
        .value = "";


    document.getElementById(
        "valorConsultaTurno"
    ).value = "Seleccioná un veterinario";


    cargarMascotasEnSelect();

    cargarVeterinariosEnSelect();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalTurno")
        );


    modal.show();

}


// ======================================================
// ACTUALIZAR PRECIO DEL TURNO
// ======================================================

function actualizarValorConsultaTurno() {

    const idVeterinario =
        document.getElementById(
            "veterinarioTurno"
        ).value;


    const campo =
        document.getElementById(
            "valorConsultaTurno"
        );


    if (!campo) {
        return;
    }


    if (!idVeterinario) {

        campo.value =
            "Seleccioná un veterinario";

        return;
    }


    const veterinarios =
        obtenerVeterinarios();


    const veterinario =
        veterinarios.find(function (v) {

            return v.idVeterinario === idVeterinario;

        });


    if (veterinario) {

        campo.value =
            formatearPrecio(
                veterinario.valorConsulta
            );

    }

}


// ======================================================
// GUARDAR TURNO
// ======================================================

function guardarTurno(evento) {

    evento.preventDefault();


    const turnos =
        obtenerTurnos();


    const idVeterinario =
        document.getElementById(
            "veterinarioTurno"
        ).value;


    const veterinarios =
        obtenerVeterinarios();


    const veterinario =
        veterinarios.find(function (v) {

            return v.idVeterinario === idVeterinario;

        });


    if (!veterinario) {

        alert(
            "Seleccioná un veterinario."
        );

        return;

    }


    const nuevoTurno = {

        idTurno:
            "turno" + Date.now(),

        fechaHora:
            document.getElementById(
                "fechaHoraTurno"
            ).value,

        mascota:
            document.getElementById(
                "mascotaTurno"
            ).value,

        veterinario:
            idVeterinario,

        valorConsulta:
            Number(
                veterinario.valorConsulta
            )

    };


    turnos.push(nuevoTurno);


    localStorage.setItem(
        "turnos",
        JSON.stringify(turnos)
    );


    mostrarTurnos();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalTurno")
        );


    modal.hide();

}


// ======================================================
// ELIMINAR TURNO
// ======================================================

function eliminarTurno(id) {

    if (
        !confirm(
            "¿Seguro que querés eliminar este turno?"
        )
    ) {
        return;
    }


    let turnos =
        obtenerTurnos();


    turnos =
        turnos.filter(function (turno) {

            return turno.idTurno !== id;

        });


    localStorage.setItem(
        "turnos",
        JSON.stringify(turnos)
    );


    mostrarTurnos();

}


// ======================================================
// HISTORIA CLÍNICA
// ======================================================

function cargarMascotasHistoria() {

    const select =
        document.getElementById(
            "mascotaHistoria"
        );


    if (select) {

        const mascotas =
            obtenerMascotas();


        select.innerHTML = `
            <option value="">
                Seleccioná una mascota
            </option>
        `;


        mascotas.forEach(function (mascota) {

            select.innerHTML += `
                <option value="${mascota.idMascota}">
                    ${mascota.nombreMascota}
                    - Dueño: ${mascota.nombreDuenio}
                </option>
            `;

        });

    }


    const filtro =
        document.getElementById(
            "filtroHistoriaMascota"
        );


    if (filtro) {

        const valorAnterior =
            filtro.value;


        filtro.innerHTML = `
            <option value="">
                Todas las mascotas
            </option>
        `;


        obtenerMascotas().forEach(function (mascota) {

            filtro.innerHTML += `
                <option value="${mascota.idMascota}">
                    ${mascota.nombreMascota}
                    - ${mascota.nombreDuenio}
                </option>
            `;

        });


        if (
            obtenerMascotas().some(function (m) {

                return m.idMascota === valorAnterior;

            })
        ) {

            filtro.value =
                valorAnterior;

        }

    }

}


// ======================================================
// VETERINARIOS PARA HISTORIA
// ======================================================

function cargarVeterinariosHistoria() {

    const select =
        document.getElementById(
            "veterinarioHistoria"
        );


    if (!select) {
        return;
    }


    select.innerHTML = `
        <option value="">
            Seleccioná un veterinario
        </option>
    `;


    obtenerVeterinarios().forEach(function (veterinario) {

        select.innerHTML += `
            <option value="${veterinario.idVeterinario}">
                ${veterinario.nombre}
                - ${veterinario.especializacion}
            </option>
        `;

    });

}


// ======================================================
// MOSTRAR HISTORIAS
// ======================================================

function mostrarHistoriasClinicas() {

    const tabla =
        document.getElementById(
            "tablaHistoriasClinicas"
        );


    if (!tabla) {
        return;
    }


    const historias =
        obtenerHistoriasClinicas();


    const mascotas =
        obtenerMascotas();


    const veterinarios =
        obtenerVeterinarios();


    const filtro =
        document.getElementById(
            "filtroHistoriaMascota"
        )?.value || "";


    const filtradas =
        filtro
            ? historias.filter(function (historia) {

                return historia.mascota === filtro;

            })
            : historias;


    if (filtradas.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    ${
                        filtro
                            ? "Esta mascota no tiene historias clínicas registradas."
                            : "No hay historias clínicas registradas."
                    }
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML =
        filtradas.map(function (historia) {

            const mascota =
                mascotas.find(function (m) {

                    return m.idMascota === historia.mascota;

                });


            const veterinario =
                veterinarios.find(function (v) {

                    return v.idVeterinario === historia.veterinario;

                });


            const fecha =
                new Date(historia.fechaHora);


            return `
                <tr>

                    <td>
                        ${fecha.toLocaleString("es-AR")}
                    </td>

                    <td>
                        ${
                            mascota
                                ? mascota.nombreMascota
                                : "Mascota no encontrada"
                        }
                    </td>

                    <td>
                        ${
                            veterinario
                                ? veterinario.nombre
                                : "Veterinario no encontrado"
                        }
                    </td>

                    <td>
                        ${historia.observaciones}
                    </td>

                    <td>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarHistoria('${historia.idHistoriaClinica}')">

                            Eliminar

                        </button>

                    </td>

                </tr>
            `;

        }).join("");

}


// ======================================================
// VER HISTORIAL COMPLETO DE UNA MASCOTA
// ======================================================

function verHistorialMascota(idMascota) {

    const filtro =
        document.getElementById(
            "filtroHistoriaMascota"
        );


    if (!filtro) {
        return;
    }


    filtro.value =
        idMascota;


    mostrarHistoriasClinicas();


    const seccion =
        document.getElementById(
            "seccionHistoriaClinica"
        );


    if (seccion) {

        seccion.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ======================================================
// LIMPIAR FILTRO HISTORIA
// ======================================================

function limpiarFiltroHistoria() {

    const filtro =
        document.getElementById(
            "filtroHistoriaMascota"
        );


    if (filtro) {

        filtro.value = "";

    }


    mostrarHistoriasClinicas();

}


// ======================================================
// NUEVA HISTORIA
// ======================================================

function prepararNuevaHistoria() {

    document
        .getElementById("formHistoria")
        .reset();


    document
        .getElementById("idHistoriaClinica")
        .value = "";


    cargarMascotasHistoria();

    cargarVeterinariosHistoria();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalHistoria")
        );


    modal.show();

}


// ======================================================
// GUARDAR HISTORIA
// ======================================================

function guardarHistoria(evento) {

    evento.preventDefault();


    const historias =
        obtenerHistoriasClinicas();


    const nuevaHistoria = {

        idHistoriaClinica:
            "hist" + Date.now(),

        mascota:
            document.getElementById(
                "mascotaHistoria"
            ).value,

        veterinario:
            document.getElementById(
                "veterinarioHistoria"
            ).value,

        fechaHora:
            document.getElementById(
                "fechaHoraHistoria"
            ).value,

        observaciones:
            document.getElementById(
                "observacionesHistoria"
            ).value

    };


    historias.push(
        nuevaHistoria
    );


    localStorage.setItem(
        "historiasClinicas",
        JSON.stringify(historias)
    );


    mostrarHistoriasClinicas();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalHistoria")
        );


    modal.hide();

}


// ======================================================
// ELIMINAR HISTORIA
// ======================================================

function eliminarHistoria(id) {

    if (
        !confirm(
            "¿Seguro que querés eliminar esta historia clínica?"
        )
    ) {
        return;
    }


    let historias =
        obtenerHistoriasClinicas();


    historias =
        historias.filter(function (historia) {

            return (
                historia.idHistoriaClinica !== id
            );

        });


    localStorage.setItem(
        "historiasClinicas",
        JSON.stringify(historias)
    );


    mostrarHistoriasClinicas();

}


// ======================================================
// API REST EXTERNA
// FETCH
// ======================================================

async function probarAPI() {

    try {

        const respuesta =
            await fetch(
                "https://dog.ceo/api/breeds/image/random"
            );


        const datos =
            await respuesta.json();


        console.log(
            "Respuesta de la API:",
            datos
        );


        return datos;

    } catch (error) {

        console.error(
            "Error al consumir la API:",
            error
        );

    }

}


// ======================================================
// OBTENER IMAGEN DESDE API
// ======================================================

async function obtenerImagenMascotaAPI() {

    try {

        const respuesta =
            await fetch(
                "https://dog.ceo/api/breeds/image/random"
            );


        const datos =
            await respuesta.json();


        if (
            datos.status !== "success"
        ) {

            alert(
                "No se pudo obtener la imagen."
            );

            return;

        }


        const imagenURL =
            datos.message;


        const respuestaImagen =
            await fetch(imagenURL);


        if (!respuestaImagen.ok) {

            throw new Error(
                "No se pudo descargar la imagen."
            );

        }


        const blob =
            await respuestaImagen.blob();


        const lector =
            new FileReader();


        lector.onloadend = function () {

            imagenAPIBase64 =
                lector.result;


            const vistaPrevia =
                document.getElementById(
                    "vistaPreviaImagenAPI"
                );


            if (vistaPrevia) {

                vistaPrevia.innerHTML = `

                    <p class="mb-2">
                        Imagen obtenida desde la API:
                    </p>

                    <img
                        src="${imagenAPIBase64}"
                        alt="Imagen de mascota obtenida desde la API"
                        style="
                            width:150px;
                            height:150px;
                            object-fit:cover;
                            border-radius:15px;
                        "
                    >

                    <p class="text-success mt-2 mb-0">
                        ✓ Imagen lista para guardar
                    </p>

                `;

            }


            console.log(
                "Imagen de la API convertida a Base64."
            );

        };


        lector.readAsDataURL(blob);

    } catch (error) {

        console.error(
            "Error al obtener la imagen:",
            error
        );


        alert(
            "Ocurrió un error al obtener la imagen desde la API."
        );

    }

}
