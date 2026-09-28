/* =========================================================
   VETERINARIA LA MARY
   SISTEMA DE ADMINISTRACIÓN
   Veterinarios - Mascotas - Turnos
========================================================= */


/* =========================================================
   VETERINARIOS
========================================================= */

function obtenerVeterinarios() {

    let veterinarios = JSON.parse(
        localStorage.getItem("veterinarios")
    );

    if (!veterinarios) {

        veterinarios = [

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

        localStorage.setItem(
            "veterinarios",
            JSON.stringify(veterinarios)
        );
    }

    return veterinarios;
}


/* Mostrar veterinarios */

function mostrarVeterinarios() {

    const tabla = document.getElementById(
        "tablaVeterinarios"
    );

    if (!tabla) {
        return;
    }

    const veterinarios = obtenerVeterinarios();

    tabla.innerHTML = "";

    veterinarios.forEach(function (veterinario) {

        const fila = document.createElement("tr");

        fila.innerHTML = `

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
                    class="btn btn-sm btn-warning me-1"
                    onclick="editarVeterinario('${veterinario.idVeterinario}')"
                >
                    Editar
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="eliminarVeterinario('${veterinario.idVeterinario}')"
                >
                    Eliminar
                </button>

            </td>

        `;

        tabla.appendChild(fila);
    });
}


/* Preparar nuevo veterinario */

function prepararNuevoVeterinario() {

    document.getElementById("formVeterinario").reset();

    document.getElementById("idVeterinario").value = "";

    document.getElementById(
        "tituloModalVeterinario"
    ).textContent = "Nuevo veterinario";

    document.getElementById(
        "botonGuardarVeterinario"
    ).textContent = "Guardar";
}


/* Guardar veterinario */

function guardarVeterinario() {

    const id = document.getElementById(
        "idVeterinario"
    ).value;

    const matricula = document.getElementById(
        "matricula"
    ).value.trim();

    const nombre = document.getElementById(
        "nombreVeterinario"
    ).value.trim();

    const especializacion = document.getElementById(
        "especializacion"
    ).value.trim();

    const valorConsulta = Number(
        document.getElementById(
            "valorConsulta"
        ).value
    );


    let veterinarios = obtenerVeterinarios();


    if (id) {

        const indice = veterinarios.findIndex(
            function (veterinario) {
                return veterinario.idVeterinario === id;
            }
        );

        if (indice !== -1) {

            veterinarios[indice] = {

                idVeterinario: id,
                matricula: matricula,
                nombre: nombre,
                especializacion: especializacion,
                valorConsulta: valorConsulta

            };

        }

    } else {

        const nuevoVeterinario = {

            idVeterinario:
                "vet" + Date.now(),

            matricula: matricula,

            nombre: nombre,

            especializacion:
                especializacion,

            valorConsulta:
                valorConsulta
        };

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


    const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalVeterinario")
    );

    modal.hide();
}


/* Editar veterinario */

function editarVeterinario(id) {

    const veterinarios = obtenerVeterinarios();

    const veterinario = veterinarios.find(
        function (v) {
            return v.idVeterinario === id;
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


    const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalVeterinario")
    );

    modal.show();
}


/* Eliminar veterinario */

function eliminarVeterinario(id) {

    const confirmar = confirm(
        "¿Seguro que querés eliminar este veterinario?"
    );

    if (!confirmar) {
        return;
    }


    let veterinarios = obtenerVeterinarios();

    veterinarios = veterinarios.filter(
        function (veterinario) {
            return veterinario.idVeterinario !== id;
        }
    );


    localStorage.setItem(
        "veterinarios",
        JSON.stringify(veterinarios)
    );


    mostrarVeterinarios();

    cargarVeterinariosEnSelect();
}


/* =========================================================
   MASCOTAS
========================================================= */

function obtenerMascotas() {

    let mascotas = JSON.parse(
        localStorage.getItem("mascotas")
    );


    if (!mascotas) {

        mascotas = [

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


        localStorage.setItem(
            "mascotas",
            JSON.stringify(mascotas)
        );
    }


    return mascotas;
}


/* Mostrar mascotas */

function mostrarMascotas() {

    const tabla = document.getElementById(
        "tablaMascotas"
    );

    if (!tabla) {
        return;
    }


    const mascotas = obtenerMascotas();

    tabla.innerHTML = "";


    mascotas.forEach(function (mascota) {

        const fila = document.createElement("tr");


        let imagen = "Sin imagen";


        if (mascota.imagenMascota) {

            imagen = `

                <img
                    src="${mascota.imagenMascota}"
                    alt="${mascota.nombreMascota}"
                    width="70"
                    height="70"
                    style="
                        object-fit: cover;
                        border-radius: 10px;
                    "
                >

            `;
        }


        fila.innerHTML = `

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
                    class="btn btn-sm btn-warning me-1"
                    onclick="editarMascota('${mascota.idMascota}')"
                >
                    Editar
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="eliminarMascota('${mascota.idMascota}')"
                >
                    Eliminar
                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });
}


/* Preparar nueva mascota */

function prepararNuevaMascota() {

    document.getElementById(
        "formMascota"
    ).reset();


    document.getElementById(
        "idMascota"
    ).value = "";


    document.getElementById(
        "eliminarImagen"
    ).checked = false;


    document.getElementById(
        "tituloModalMascota"
    ).textContent = "Nueva mascota";


    document.getElementById(
        "botonGuardarMascota"
    ).textContent = "Guardar";
}


/* Guardar mascota */

function guardarMascota() {

    const id = document.getElementById(
        "idMascota"
    ).value;


    const nombreMascota = document.getElementById(
        "nombreMascota"
    ).value.trim();


    const nombreDuenio = document.getElementById(
        "nombreDuenio"
    ).value.trim();


    const color = document.getElementById(
        "colorMascota"
    ).value.trim();


    const edad = Number(
        document.getElementById(
            "edadMascota"
        ).value
    );


    const peso = Number(
        document.getElementById(
            "pesoMascota"
        ).value
    );


    const archivoImagen = document.getElementById(
        "imagenMascota"
    ).files[0];


    const eliminarImagen = document.getElementById(
        "eliminarImagen"
    ).checked;


    let mascotas = obtenerMascotas();


    /* ---------------------------------
       NUEVA MASCOTA
    --------------------------------- */

    if (!id) {

        if (archivoImagen) {

            const lector = new FileReader();


            lector.onload = function () {

                const nuevaMascota = {

                    idMascota:
                        "mas" + Date.now(),

                    nombreMascota:
                        nombreMascota,

                    nombreDuenio:
                        nombreDuenio,

                    color:
                        color,

                    edad:
                        edad,

                    peso:
                        peso,

                    imagenMascota:
                        lector.result

                };


                mascotas.push(
                    nuevaMascota
                );


                localStorage.setItem(
                    "mascotas",
                    JSON.stringify(mascotas)
                );


                mostrarMascotas();

                cargarMascotasEnSelect();


                const modal =
                    bootstrap.Modal.getOrCreateInstance(
                        document.getElementById(
                            "modalMascota"
                        )
                    );

                modal.hide();

            };


            lector.readAsDataURL(
                archivoImagen
            );


        } else {

            const nuevaMascota = {

                idMascota:
                    "mas" + Date.now(),

                nombreMascota:
                    nombreMascota,

                nombreDuenio:
                    nombreDuenio,

                color:
                    color,

                edad:
                    edad,

                peso:
                    peso,

                imagenMascota:
                    ""

            };


            mascotas.push(
                nuevaMascota
            );


            localStorage.setItem(
                "mascotas",
                JSON.stringify(mascotas)
            );


            mostrarMascotas();

            cargarMascotasEnSelect();


            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    document.getElementById(
                        "modalMascota"
                    )
                );

            modal.hide();
        }


        return;
    }


    /* ---------------------------------
       EDITAR MASCOTA
    --------------------------------- */

    const indice = mascotas.findIndex(
        function (mascota) {
            return mascota.idMascota === id;
        }
    );


    if (indice === -1) {
        return;
    }


    mascotas[indice].nombreMascota =
        nombreMascota;

    mascotas[indice].nombreDuenio =
        nombreDuenio;

    mascotas[indice].color =
        color;

    mascotas[indice].edad =
        edad;

    mascotas[indice].peso =
        peso;


    /* Eliminar imagen */

    if (eliminarImagen) {

        mascotas[indice].imagenMascota = "";
    }


    /* Reemplazar imagen */

    if (archivoImagen) {

        const lector = new FileReader();


        lector.onload = function () {

            mascotas[indice].imagenMascota =
                lector.result;


            localStorage.setItem(
                "mascotas",
                JSON.stringify(mascotas)
            );


            mostrarMascotas();

            cargarMascotasEnSelect();


            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    document.getElementById(
                        "modalMascota"
                    )
                );

            modal.hide();

        };


        lector.readAsDataURL(
            archivoImagen
        );


    } else {

        localStorage.setItem(
            "mascotas",
            JSON.stringify(mascotas)
        );


        mostrarMascotas();

        cargarMascotasEnSelect();


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                document.getElementById(
                    "modalMascota"
                )
            );

        modal.hide();
    }

}


/* Editar mascota */

function editarMascota(id) {

    const mascotas = obtenerMascotas();


    const mascota = mascotas.find(
        function (m) {
            return m.idMascota === id;
        }
    );


    if (!mascota) {
        return;
    }


    document.getElementById(
        "idMascota"
    ).value =
        mascota.idMascota;


    document.getElementById(
        "nombreMascota"
    ).value =
        mascota.nombreMascota;


    document.getElementById(
        "nombreDuenio"
    ).value =
        mascota.nombreDuenio;


    document.getElementById(
        "colorMascota"
    ).value =
        mascota.color;


    document.getElementById(
        "edadMascota"
    ).value =
        mascota.edad;


    document.getElementById(
        "pesoMascota"
    ).value =
        mascota.peso;


    document.getElementById(
        "imagenMascota"
    ).value = "";


    document.getElementById(
        "eliminarImagen"
    ).checked = false;


    document.getElementById(
        "tituloModalMascota"
    ).textContent =
        "Editar mascota";


    document.getElementById(
        "botonGuardarMascota"
    ).textContent =
        "Guardar cambios";


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById(
                "modalMascota"
            )
        );


    modal.show();
}


/* Eliminar mascota */

function eliminarMascota(id) {

    const confirmar = confirm(
        "¿Seguro que querés eliminar esta mascota?"
    );


    if (!confirmar) {
        return;
    }


    let mascotas = obtenerMascotas();


    mascotas = mascotas.filter(
        function (mascota) {
            return mascota.idMascota !== id;
        }
    );


    localStorage.setItem(
        "mascotas",
        JSON.stringify(mascotas)
    );


    mostrarMascotas();

    cargarMascotasEnSelect();
}


/* =========================================================
   TURNOS
========================================================= */

function obtenerTurnos() {

    let turnos = JSON.parse(
        localStorage.getItem("turnos")
    );


    if (!turnos) {

        turnos = [];


        localStorage.setItem(
            "turnos",
            JSON.stringify(turnos)
        );
    }


    return turnos;
}


/* Cargar mascotas en el select */

function cargarMascotasEnSelect() {

    const select = document.getElementById(
        "mascotaTurno"
    );


    if (!select) {
        return;
    }


    const mascotas = obtenerMascotas();


    select.innerHTML = `

        <option value="">
            Seleccioná una mascota
        </option>

    `;


    mascotas.forEach(function (mascota) {

        const opcion =
            document.createElement("option");


        opcion.value =
            mascota.idMascota;


        opcion.textContent =
            `${mascota.nombreMascota} - Dueño: ${mascota.nombreDuenio}`;


        select.appendChild(opcion);

    });
}


/* Cargar veterinarios en el select */

function cargarVeterinariosEnSelect() {

    const select = document.getElementById(
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


    veterinarios.forEach(
        function (veterinario) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                veterinario.idVeterinario;


            opcion.textContent =
                `${veterinario.nombre} - ${veterinario.especializacion}`;


            select.appendChild(
                opcion
            );

        }
    );
}


/* Mostrar turnos */

function mostrarTurnos() {

    const tabla = document.getElementById(
        "tablaTurnos"
    );


    if (!tabla) {
        return;
    }


    const turnos = obtenerTurnos();

    const mascotas = obtenerMascotas();

    const veterinarios =
        obtenerVeterinarios();


    tabla.innerHTML = "";


    if (turnos.length === 0) {

        tabla.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="text-center text-muted"
                >
                    No hay turnos registrados.
                </td>

            </tr>

        `;

        return;
    }


    turnos.forEach(function (turno) {

        const mascota =
            mascotas.find(
                function (m) {
                    return (
                        m.idMascota ===
                        turno.mascota
                    );
                }
            );


        const veterinario =
            veterinarios.find(
                function (v) {
                    return (
                        v.idVeterinario ===
                        turno.veterinario
                    );
                }
            );


        let fechaFormateada =
            "Fecha no disponible";


        if (turno.fechaHora) {

            const fecha =
                new Date(
                    turno.fechaHora
                );


            if (!isNaN(fecha.getTime())) {

                fechaFormateada =
                    fecha.toLocaleString(
                        "es-AR",
                        {
                            dateStyle:
                                "short",

                            timeStyle:
                                "short"
                        }
                    );
            }
        }


        const fila =
            document.createElement(
                "tr"
            );


        fila.innerHTML = `

            <td>
                ${fechaFormateada}
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
                    class="btn btn-sm btn-danger"
                    onclick="eliminarTurno('${turno.idTurno}')"
                >
                    Eliminar
                </button>

            </td>

        `;


        tabla.appendChild(
            fila
        );

    });
}


/* Preparar nuevo turno */

function prepararNuevoTurno() {

    const formulario =
        document.getElementById(
            "formTurno"
        );


    if (!formulario) {
        return;
    }


    formulario.reset();


    document.getElementById(
        "idTurno"
    ).value = "";


    document.getElementById(
        "tituloModalTurno"
    ).textContent =
        "Nuevo turno";


    document.getElementById(
        "botonGuardarTurno"
    ).textContent =
        "Guardar turno";


    cargarMascotasEnSelect();

    cargarVeterinariosEnSelect();
}


/* Guardar turno */

function guardarTurno() {

    const fechaHora =
        document.getElementById(
            "fechaHoraTurno"
        ).value;


    const mascota =
        document.getElementById(
            "mascotaTurno"
        ).value;


    const veterinario =
        document.getElementById(
            "veterinarioTurno"
        ).value;


    if (
        !fechaHora ||
        !mascota ||
        !veterinario
    ) {

        alert(
            "Completá todos los campos del turno."
        );

        return;
    }


    let turnos =
        obtenerTurnos();


    const nuevoTurno = {

        idTurno:
            "tur" + Date.now(),

        fechaHora:
            fechaHora,

        mascota:
            mascota,

        veterinario:
            veterinario

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
            document.getElementById(
                "modalTurno"
            )
        );


    modal.hide();
}


/* Eliminar turno */

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


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* -------------------------
           VETERINARIOS
        -------------------------- */

        mostrarVeterinarios();


        const formularioVeterinario =
            document.getElementById(
                "formVeterinario"
            );


        if (formularioVeterinario) {

            formularioVeterinario.addEventListener(
                "submit",
                function (evento) {

                    evento.preventDefault();

                    guardarVeterinario();

                }
            );
        }


        /* -------------------------
           MASCOTAS
        -------------------------- */

        mostrarMascotas();


        const formularioMascota =
            document.getElementById(
                "formMascota"
            );


        if (formularioMascota) {

            formularioMascota.addEventListener(
                "submit",
                function (evento) {

                    evento.preventDefault();

                    guardarMascota();

                }
            );
        }


        /* -------------------------
           TURNOS
        -------------------------- */

        mostrarTurnos();

        cargarMascotasEnSelect();

        cargarVeterinariosEnSelect();


        const formularioTurno =
            document.getElementById(
                "formTurno"
            );


        if (formularioTurno) {

            formularioTurno.addEventListener(
                "submit",
                function (evento) {

                    evento.preventDefault();

                    guardarTurno();

                }
            );
        }

    }
);