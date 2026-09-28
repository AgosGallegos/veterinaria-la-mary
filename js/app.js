// ======================================================
// VETERINARIA LA MARY
// ADMINISTRACIÓN
// LocalStorage + CRUD
// ======================================================


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
// INICIALIZACIÓN
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
// INICIALIZAR LOCALSTORAGE
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


// ======================================================
// OBTENER DATOS
// ======================================================

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
// CONFIGURAR EVENTOS
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


    if (veterinarios.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    No hay veterinarios registrados.
                </td>
            </tr>
        `;

        return;

    }


    tabla.innerHTML = veterinarios.map(function (veterinario) {

        return `
            <tr>

                <td>
                    ${veterinario.matricula}
                </td>

                <td>
                    ${veterinario.nombre}
                </td>

                <td>
                    ${veterinario.especializacion}
                </td>

                <td>
                    $${Number(veterinario.valorConsulta).toLocaleString("es-AR")}
                </td>

                <td>

                    <button
                        class="btn btn-warning btn-sm me-1"
                        onclick="editarVeterinario('${veterinario.idVeterinario}')"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarVeterinario('${veterinario.idVeterinario}')"
                    >
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

    const formulario =
        document.getElementById("formVeterinario");

    formulario.reset();


    document.getElementById(
        "idVeterinario"
    ).value = "";


    document.getElementById(
        "tituloModalVeterinario"
    ).textContent = "Nuevo veterinario";


    document.getElementById(
        "botonGuardarVeterinario"
    ).textContent = "Guardar veterinario";


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


    const nuevoVeterinario = {

        idVeterinario:
            id || "vet" + Date.now(),

        matricula:
            document.getElementById("matricula").value,

        nombre:
            document.getElementById("nombreVeterinario").value,

        especializacion:
            document.getElementById("especializacion").value,

        valorConsulta:
            Number(
                document.getElementById("valorConsulta").value
            )

    };


    if (id) {

        const indice =
            veterinarios.findIndex(
                function (veterinario) {

                    return (
                        veterinario.idVeterinario === id
                    );

                }
            );


        if (indice !== -1) {

            veterinarios[indice] =
                nuevoVeterinario;

        }

    } else {

        veterinarios.push(
            nuevoVeterinario
        );

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
        veterinarios.find(
            function (v) {

                return (
                    v.idVeterinario === id
                );

            }
        );


    if (!veterinario) {
        return;
    }


    document.getElementById(
        "idVeterinario"
    ).value = veterinario.idVeterinario;


    document.getElementById(
        "matricula"
    ).value = veterinario.matricula;


    document.getElementById(
        "nombreVeterinario"
    ).value = veterinario.nombre;


    document.getElementById(
        "especializacion"
    ).value = veterinario.especializacion;


    document.getElementById(
        "valorConsulta"
    ).value = veterinario.valorConsulta;


    document.getElementById(
        "tituloModalVeterinario"
    ).textContent = "Editar veterinario";


    document.getElementById(
        "botonGuardarVeterinario"
    ).textContent = "Guardar cambios";


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

    const confirmar =
        confirm(
            "¿Seguro que querés eliminar este veterinario?"
        );


    if (!confirmar) {
        return;
    }


    let veterinarios =
        obtenerVeterinarios();


    veterinarios =
        veterinarios.filter(
            function (veterinario) {

                return (
                    veterinario.idVeterinario !== id
                );

            }
        );


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


    tabla.innerHTML = mascotas.map(function (mascota) {

        const imagen =
            mascota.imagenMascota
                ? `
                    <img
                        src="${mascota.imagenMascota}"
                        alt="${mascota.nombreMascota}"
                        style="
                            width:60px;
                            height:60px;
                            object-fit:cover;
                            border-radius:10px;
                        "
                    >
                `
                : "Sin imagen";


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
                        class="btn btn-warning btn-sm me-1"
                        onclick="editarMascota('${mascota.idMascota}')"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarMascota('${mascota.idMascota}')"
                    >
                        Eliminar
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

    document.getElementById(
        "formMascota"
    ).reset();


    document.getElementById(
        "idMascota"
    ).value = "";


    document.getElementById(
        "tituloModalMascota"
    ).textContent = "Nueva mascota";


    document.getElementById(
        "botonGuardarMascota"
    ).textContent = "Guardar mascota";


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


    const nombre =
        document.getElementById("nombreMascota").value;


    const duenio =
        document.getElementById("nombreDuenio").value;


    const color =
        document.getElementById("colorMascota").value;


    const edad =
        Number(
            document.getElementById("edadMascota").value
        );


    const peso =
        Number(
            document.getElementById("pesoMascota").value
        );


    const archivo =
        document.getElementById(
            "imagenMascota"
        ).files[0];


    const eliminarImagen =
        document.getElementById(
            "eliminarImagen"
        ).checked;


    let imagenActual = "";


    if (id) {

        const mascotaAnterior =
            mascotas.find(
                function (m) {

                    return (
                        m.idMascota === id
                    );

                }
            );


        if (mascotaAnterior) {

            imagenActual =
                mascotaAnterior.imagenMascota || "";

        }

    }


    function guardarDatos(imagenFinal) {

        const mascota = {

            idMascota:
                id || "mas" + Date.now(),

            nombreMascota:
                nombre,

            nombreDuenio:
                duenio,

            color:
                color,

            edad:
                edad,

            peso:
                peso,

            imagenMascota:
                imagenFinal

        };


        if (id) {

            const indice =
                mascotas.findIndex(
                    function (m) {

                        return (
                            m.idMascota === id
                        );

                    }
                );


            if (indice !== -1) {

                mascotas[indice] =
                    mascota;

            }

        } else {

            mascotas.push(
                mascota
            );

        }


        localStorage.setItem(
            "mascotas",
            JSON.stringify(mascotas)
        );


        mostrarMascotas();

        cargarMascotasEnSelect();
        cargarMascotasHistoria();


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                document.getElementById("modalMascota")
            );

        modal.hide();

    }


    if (eliminarImagen) {

        guardarDatos("");

        return;

    }


    if (archivo) {

        const lector =
            new FileReader();


        lector.onload = function () {

            guardarDatos(
                lector.result
            );

        };


        lector.readAsDataURL(
            archivo
        );

    } else {

        guardarDatos(
            imagenActual
        );

    }

}


// ======================================================
// EDITAR MASCOTA
// ======================================================

function editarMascota(id) {

    const mascotas =
        obtenerMascotas();


    const mascota =
        mascotas.find(
            function (m) {

                return (
                    m.idMascota === id
                );

            }
        );


    if (!mascota) {
        return;
    }


    document.getElementById(
        "idMascota"
    ).value = mascota.idMascota;


    document.getElementById(
        "nombreMascota"
    ).value = mascota.nombreMascota;


    document.getElementById(
        "nombreDuenio"
    ).value = mascota.nombreDuenio;


    document.getElementById(
        "colorMascota"
    ).value = mascota.color;


    document.getElementById(
        "edadMascota"
    ).value = mascota.edad;


    document.getElementById(
        "pesoMascota"
    ).value = mascota.peso;


    document.getElementById(
        "imagenMascota"
    ).value = "";


    document.getElementById(
        "eliminarImagen"
    ).checked = false;


    document.getElementById(
        "tituloModalMascota"
    ).textContent = "Editar mascota";


    document.getElementById(
        "botonGuardarMascota"
    ).textContent = "Guardar cambios";


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

    const confirmar =
        confirm(
            "¿Seguro que querés eliminar esta mascota?"
        );


    if (!confirmar) {
        return;
    }


    let mascotas =
        obtenerMascotas();


    mascotas =
        mascotas.filter(
            function (mascota) {

                return (
                    mascota.idMascota !== id
                );

            }
        );


    localStorage.setItem(
        "mascotas",
        JSON.stringify(mascotas)
    );


    mostrarMascotas();

    cargarMascotasEnSelect();
    cargarMascotasHistoria();

}


// ======================================================
// TURNOS
// ======================================================

function cargarMascotasEnSelect() {

    const select =
        document.getElementById(
            "mascotaTurno"
        );

    if (!select) {
        return;
    }


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
                ${mascota.nombreMascota} - Dueño: ${mascota.nombreDuenio}
            </option>
        `;

    });

}


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
            Seleccioná un veterinario
        </option>
    `;


    veterinarios.forEach(function (veterinario) {

        select.innerHTML += `
            <option value="${veterinario.idVeterinario}">
                ${veterinario.nombre} - ${veterinario.especializacion}
            </option>
        `;

    });

}


// ======================================================
// MOSTRAR TURNOS
// ======================================================

function mostrarTurnos() {

    const tabla =
        document.getElementById(
            "tablaTurnos"
        );

    if (!tabla) {
        return;
    }


    const turnos =
        obtenerTurnos();


    const mascotas =
        obtenerMascotas();


    const veterinarios =
        obtenerVeterinarios();


    if (turnos.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    No hay turnos registrados.
                </td>
            </tr>
        `;

        return;

    }


    tabla.innerHTML = turnos.map(function (turno) {

        const mascota =
            mascotas.find(
                function (m) {

                    return (
                        m.idMascota === turno.mascota
                    );

                }
            );


        const veterinario =
            veterinarios.find(
                function (v) {

                    return (
                        v.idVeterinario === turno.veterinario
                    );

                }
            );


        const fecha =
            new Date(
                turno.fechaHora
            );


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

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarTurno('${turno.idTurno}')"
                    >
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

    document.getElementById(
        "formTurno"
    ).reset();


    document.getElementById(
        "idTurno"
    ).value = "";


    document.getElementById(
        "tituloModalTurno"
    ).textContent = "Nuevo turno";


    document.getElementById(
        "botonGuardarTurno"
    ).textContent = "Guardar turno";


    cargarMascotasEnSelect();
    cargarVeterinariosEnSelect();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalTurno")
        );

    modal.show();

}


// ======================================================
// GUARDAR TURNO
// ======================================================

function guardarTurno(evento) {

    evento.preventDefault();


    const turnos =
        obtenerTurnos();


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
            document.getElementById(
                "veterinarioTurno"
            ).value

    };


    turnos.push(
        nuevoTurno
    );


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

    const confirmar =
        confirm(
            "¿Seguro que querés eliminar este turno?"
        );


    if (!confirmar) {
        return;
    }


    let turnos =
        obtenerTurnos();


    turnos =
        turnos.filter(
            function (turno) {

                return (
                    turno.idTurno !== id
                );

            }
        );


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

    if (!select) {
        return;
    }


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
                ${mascota.nombreMascota} - Dueño: ${mascota.nombreDuenio}
            </option>
        `;

    });

}


function cargarVeterinariosHistoria() {

    const select =
        document.getElementById(
            "veterinarioHistoria"
        );

    if (!select) {
        return;
    }


    const veterinarios =
        obtenerVeterinarios();


    select.innerHTML = `
        <option value="">
            Seleccioná un veterinario
        </option>
    `;


    veterinarios.forEach(function (veterinario) {

        select.innerHTML += `
            <option value="${veterinario.idVeterinario}">
                ${veterinario.nombre} - ${veterinario.especializacion}
            </option>
        `;

    });

}


// ======================================================
// MOSTRAR HISTORIAS CLÍNICAS
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


    if (historias.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    No hay historias clínicas registradas.
                </td>
            </tr>
        `;

        return;

    }


    tabla.innerHTML = historias.map(function (historia) {

        const mascota =
            mascotas.find(
                function (m) {

                    return (
                        m.idMascota === historia.mascota
                    );

                }
            );


        const veterinario =
            veterinarios.find(
                function (v) {

                    return (
                        v.idVeterinario === historia.veterinario
                    );

                }
            );


        const fecha =
            new Date(
                historia.fechaHora
            );


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
                        onclick="eliminarHistoria('${historia.idHistoriaClinica}')"
                    >
                        Eliminar
                    </button>

                </td>

            </tr>
        `;

    }).join("");

}


// ======================================================
// NUEVA HISTORIA CLÍNICA
// ======================================================

function prepararNuevaHistoria() {

    document.getElementById(
        "formHistoria"
    ).reset();


    document.getElementById(
        "idHistoriaClinica"
    ).value = "";


    document.getElementById(
        "tituloModalHistoria"
    ).textContent =
        "Nueva historia clínica";


    document.getElementById(
        "botonGuardarHistoria"
    ).textContent =
        "Guardar historia";


    cargarMascotasHistoria();
    cargarVeterinariosHistoria();


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalHistoria")
        );

    modal.show();

}


// ======================================================
// GUARDAR HISTORIA CLÍNICA
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
// ELIMINAR HISTORIA CLÍNICA
// ======================================================

function eliminarHistoria(id) {

    const confirmar =
        confirm(
            "¿Seguro que querés eliminar esta historia clínica?"
        );


    if (!confirmar) {
        return;
    }


    let historias =
        obtenerHistoriasClinicas();


    historias =
        historias.filter(
            function (historia) {

                return (
                    historia.idHistoriaClinica !== id
                );

            }
        );


    localStorage.setItem(
        "historiasClinicas",
        JSON.stringify(historias)
    );


    mostrarHistoriasClinicas();

}
