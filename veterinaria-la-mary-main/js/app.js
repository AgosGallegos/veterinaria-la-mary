// ==========================================
// VETERINARIA LA MARY - JAVASCRIPT
// ==========================================


// ==========================================
// 1. VETERINARIOS INICIALES
// ==========================================

const veterinariosIniciales = [
    {
        idVeterinario: "vet001",
        matricula: 12345,
        nombre: "Dra. María González",
        especializacion: "Clínica de pequeños animales",
        valorConsulta: 15000
    },
    {
        idVeterinario: "vet002",
        matricula: 12346,
        nombre: "Dr. Juan Pérez",
        especializacion: "Dermatología veterinaria",
        valorConsulta: 18000
    },
    {
        idVeterinario: "vet003",
        matricula: 12347,
        nombre: "Dra. Laura Martínez",
        especializacion: "Cirugía veterinaria",
        valorConsulta: 20000
    }
];


// ==========================================
// 2. GUARDAR VETERINARIOS INICIALES
// ==========================================

if (!localStorage.getItem("veterinarios")) {

    localStorage.setItem(
        "veterinarios",
        JSON.stringify(veterinariosIniciales)
    );

}


// ==========================================
// 3. OBTENER VETERINARIOS
// ==========================================

function obtenerVeterinarios() {

    const datos =
        localStorage.getItem("veterinarios");

    if (datos) {
        return JSON.parse(datos);
    }

    return [];
}


// ==========================================
// 4. MOSTRAR VETERINARIOS
// ==========================================

function mostrarVeterinarios() {

    const tabla =
        document.getElementById(
            "tablaVeterinarios"
        );

    if (!tabla) {
        return;
    }

    const veterinarios =
        obtenerVeterinarios();

    tabla.innerHTML = "";


    veterinarios.forEach(function (veterinario) {

        const fila =
            document.createElement("tr");


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
                $${veterinario.valorConsulta}
            </td>

            <td>

                <button
                    type="button"
                    class="btn btn-sm btn-warning me-1"
                    onclick="editarVeterinario('${veterinario.idVeterinario}')"
                >
                    Editar
                </button>

                <button
                    type="button"
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


// ==========================================
// 5. PREPARAR NUEVO VETERINARIO
// ==========================================

function prepararNuevoVeterinario() {

    document.getElementById(
        "tituloModalVeterinario"
    ).textContent =
        "Nuevo veterinario";


    document.getElementById(
        "botonGuardarVeterinario"
    ).textContent =
        "Guardar veterinario";


    document.getElementById(
        "formVeterinario"
    ).reset();


    document.getElementById(
        "idVeterinario"
    ).value = "";

}


// ==========================================
// 6. EDITAR VETERINARIO
// ==========================================

function editarVeterinario(idVeterinario) {

    const veterinarios =
        obtenerVeterinarios();


    const veterinario =
        veterinarios.find(
            function (veterinario) {

                return (
                    veterinario.idVeterinario ===
                    idVeterinario
                );

            }
        );


    if (!veterinario) {

        alert(
            "No se encontró el veterinario."
        );

        return;
    }


    document.getElementById(
        "tituloModalVeterinario"
    ).textContent =
        "Editar veterinario";


    document.getElementById(
        "botonGuardarVeterinario"
    ).textContent =
        "Guardar cambios";


    document.getElementById(
        "idVeterinario"
    ).value =
        veterinario.idVeterinario;


    document.getElementById(
        "matricula"
    ).value =
        veterinario.matricula;


    document.getElementById(
        "nombreVeterinario"
    ).value =
        veterinario.nombre;


    document.getElementById(
        "especializacion"
    ).value =
        veterinario.especializacion;


    document.getElementById(
        "valorConsulta"
    ).value =
        veterinario.valorConsulta;


    const modalElemento =
        document.getElementById(
            "modalVeterinario"
        );


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElemento
        );


    modal.show();

}


// ==========================================
// 7. GUARDAR VETERINARIO
// ==========================================

function guardarVeterinario(evento) {

    evento.preventDefault();


    const id =
        document.getElementById(
            "idVeterinario"
        ).value;


    const matricula =
        Number(
            document.getElementById(
                "matricula"
            ).value
        );


    const nombre =
        document.getElementById(
            "nombreVeterinario"
        ).value;


    const especializacion =
        document.getElementById(
            "especializacion"
        ).value;


    const valorConsulta =
        Number(
            document.getElementById(
                "valorConsulta"
            ).value
        );


    const veterinarios =
        obtenerVeterinarios();


    if (id) {

        const indice =
            veterinarios.findIndex(
                function (veterinario) {

                    return (
                        veterinario.idVeterinario ===
                        id
                    );

                }
            );


        if (indice !== -1) {

            veterinarios[indice].matricula =
                matricula;

            veterinarios[indice].nombre =
                nombre;

            veterinarios[indice].especializacion =
                especializacion;

            veterinarios[indice].valorConsulta =
                valorConsulta;

        }

    }


    else {

        const nuevoVeterinario = {

            idVeterinario:
                "vet" + Date.now(),

            matricula:
                matricula,

            nombre:
                nombre,

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


    document
        .getElementById(
            "formVeterinario"
        )
        .reset();


    const modalElemento =
        document.getElementById(
            "modalVeterinario"
        );


    const modal =
        bootstrap.Modal.getInstance(
            modalElemento
        );


    if (modal) {
        modal.hide();
    }

}


// ==========================================
// 8. ELIMINAR VETERINARIO
// ==========================================

function eliminarVeterinario(idVeterinario) {

    const confirmar =
        confirm(
            "¿Estás seguro de que querés eliminar este veterinario?"
        );


    if (!confirmar) {
        return;
    }


    const veterinarios =
        obtenerVeterinarios();


    const veterinariosActualizados =
        veterinarios.filter(
            function (veterinario) {

                return (
                    veterinario.idVeterinario !==
                    idVeterinario
                );

            }
        );


    localStorage.setItem(
        "veterinarios",
        JSON.stringify(
            veterinariosActualizados
        )
    );


    mostrarVeterinarios();

}


// ==========================================
// 9. MASCOTAS INICIALES
// ==========================================

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


// ==========================================
// 10. GUARDAR MASCOTAS INICIALES
// ==========================================

if (!localStorage.getItem("mascotas")) {

    localStorage.setItem(
        "mascotas",
        JSON.stringify(mascotasIniciales)
    );

}


// ==========================================
// 11. OBTENER MASCOTAS
// ==========================================

function obtenerMascotas() {

    const datos =
        localStorage.getItem("mascotas");

    if (datos) {
        return JSON.parse(datos);
    }

    return [];
}


// ==========================================
// 12. MOSTRAR MASCOTAS
// ==========================================

function mostrarMascotas() {

    const tabla =
        document.getElementById(
            "tablaMascotas"
        );


    if (!tabla) {
        return;
    }


    const mascotas =
        obtenerMascotas();


    tabla.innerHTML = "";


    mascotas.forEach(function (mascota) {

        const fila =
            document.createElement("tr");


        let imagen =
            "Sin imagen";


        if (mascota.imagenMascota) {

            imagen = `

                <img
                    src="${mascota.imagenMascota}"
                    alt="${mascota.nombreMascota}"
                    width="60"
                    height="60"
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
                ${mascota.edad} años
            </td>

            <td>
                ${mascota.peso} kg
            </td>

            <td>
                ${imagen}
            </td>

            <td>

                <button
                    type="button"
                    class="btn btn-sm btn-warning me-1"
                    onclick="editarMascota('${mascota.idMascota}')"
                >
                    Editar
                </button>


                <button
                    type="button"
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


// ==========================================
// 13. PREPARAR NUEVA MASCOTA
// ==========================================

function prepararNuevaMascota() {

    document.getElementById(
        "tituloModalMascota"
    ).textContent =
        "Nueva mascota";


    document.getElementById(
        "botonGuardarMascota"
    ).textContent =
        "Guardar mascota";


    document.getElementById(
        "formMascota"
    ).reset();


    document.getElementById(
        "idMascota"
    ).value = "";


    document.getElementById(
        "eliminarImagen"
    ).checked = false;

}


// ==========================================
// 14. GUARDAR MASCOTA
// ==========================================

function guardarMascota(evento) {

    evento.preventDefault();


    const id =
        document.getElementById(
            "idMascota"
        ).value;


    const nombreMascota =
        document.getElementById(
            "nombreMascota"
        ).value;


    const nombreDuenio =
        document.getElementById(
            "nombreDuenio"
        ).value;


    const color =
        document.getElementById(
            "colorMascota"
        ).value;


    const edad =
        Number(
            document.getElementById(
                "edadMascota"
            ).value
        );


    const peso =
        Number(
            document.getElementById(
                "pesoMascota"
            ).value
        );


    const archivo =
        document.getElementById(
            "imagenMascota"
        ).files[0];


    const eliminarImagen =
        document.getElementById(
            "eliminarImagen"
        ).checked;


    const mascotas =
        obtenerMascotas();


    function guardarDatos(imagenBase64) {


        // CREAR

        if (!id) {

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
                    imagenBase64

            };


            mascotas.push(
                nuevaMascota
            );

        }


        // EDITAR

        else {

            const indice =
                mascotas.findIndex(
                    function (mascota) {

                        return (
                            mascota.idMascota ===
                            id
                        );

                    }
                );


            if (indice !== -1) {

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


                if (eliminarImagen) {

                    mascotas[indice].imagenMascota =
                        "";

                }


                else if (imagenBase64) {

                    mascotas[indice].imagenMascota =
                        imagenBase64;

                }

            }

        }


        localStorage.setItem(
            "mascotas",
            JSON.stringify(mascotas)
        );


        mostrarMascotas();


        document
            .getElementById(
                "formMascota"
            )
            .reset();


        document.getElementById(
            "eliminarImagen"
        ).checked = false;


        const modalElemento =
            document.getElementById(
                "modalMascota"
            );


        const modal =
            bootstrap.Modal.getInstance(
                modalElemento
            );


        if (modal) {
            modal.hide();
        }

    }


    // CONVERTIR IMAGEN A BASE64

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

    }


    else {

        guardarDatos("");

    }

}


// ==========================================
// 15. EDITAR MASCOTA
// ==========================================

function editarMascota(idMascota) {

    const mascotas =
        obtenerMascotas();


    const mascota =
        mascotas.find(
            function (mascota) {

                return (
                    mascota.idMascota ===
                    idMascota
                );

            }
        );


    if (!mascota) {

        alert(
            "No se encontró la mascota."
        );

        return;
    }


    document.getElementById(
        "tituloModalMascota"
    ).textContent =
        "Editar mascota";


    document.getElementById(
        "botonGuardarMascota"
    ).textContent =
        "Guardar cambios";


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
        "eliminarImagen"
    ).checked = false;


    const modalElemento =
        document.getElementById(
            "modalMascota"
        );


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElemento
        );


    modal.show();

}


// ==========================================
// 16. ELIMINAR MASCOTA
// ==========================================

function eliminarMascota(idMascota) {

    const confirmar =
        confirm(
            "¿Estás seguro de que querés eliminar esta mascota?"
        );


    if (!confirmar) {
        return;
    }


    const mascotas =
        obtenerMascotas();


    const mascotasActualizadas =
        mascotas.filter(
            function (mascota) {

                return (
                    mascota.idMascota !==
                    idMascota
                );

            }
        );


    localStorage.setItem(
        "mascotas",
        JSON.stringify(
            mascotasActualizadas
        )
    );


    mostrarMascotas();

}


// ==========================================
// 17. TURNOS INICIALES
// ==========================================

const turnosIniciales = [];


// ==========================================
// 18. GUARDAR TURNOS INICIALES
// ==========================================

if (!localStorage.getItem("turnos")) {

    localStorage.setItem(
        "turnos",
        JSON.stringify(turnosIniciales)
    );

}


// ==========================================
// 19. OBTENER TURNOS
// ==========================================

function obtenerTurnos() {

    const datos =
        localStorage.getItem("turnos");


    if (datos) {
        return JSON.parse(datos);
    }


    return [];
}


// ==========================================
// 20. CARGAR MASCOTAS EN SELECT
// ==========================================

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

        const opcion =
            document.createElement("option");


        opcion.value =
            mascota.idMascota;


        opcion.textContent =
            mascota.nombreMascota +
            " - Dueño: " +
            mascota.nombreDuenio;


        select.appendChild(opcion);

    });

}


// ==========================================
// 21. CARGAR VETERINARIOS EN SELECT
// ==========================================

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


    veterinarios.forEach(
        function (veterinario) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                veterinario.idVeterinario;


            opcion.textContent =
                veterinario.nombre +
                " - " +
                veterinario.especializacion;


            select.appendChild(
                opcion
            );

        }
    );

}


// ==========================================
// 22. MOSTRAR TURNOS
// ==========================================

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


    tabla.innerHTML = "";


    turnos.forEach(function (turno) {


        const mascota =
            mascotas.find(
                function (mascota) {

                    return (
                        mascota.idMascota ===
                        turno.mascota
                    );

                }
            );


        const veterinario =
            veterinarios.find(
                function (veterinario) {

                    return (
                        veterinario.idVeterinario ===
                        turno.veterinario
                    );

                }
            );


        const fila =
            document.createElement("tr");


        let fechaMostrar =
            turno.fechaHora;


        if (turno.fechaHora) {

            const fecha =
                new Date(
                    turno.fechaHora
                );


            fechaMostrar =
                fecha.toLocaleString(
                    "es-AR"
                );

        }


        fila.innerHTML = `

            <td>
                ${fechaMostrar}
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
                    type="button"
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


// ==========================================
// 23. PREPARAR NUEVO TURNO
// ==========================================

function prepararNuevoTurno() {

    document.getElementById(
        "tituloModalTurno"
    ).textContent =
        "Nuevo turno";


    document.getElementById(
        "botonGuardarTurno"
    ).textContent =
        "Guardar turno";


    document.getElementById(
        "formTurno"
    ).reset();


    document.getElementById(
        "idTurno"
    ).value = "";


    cargarMascotasEnSelect();

    cargarVeterinariosEnSelect();

}


// ==========================================
// 24. GUARDAR TURNO
// ==========================================

function guardarTurno(evento) {

    evento.preventDefault();


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


    const turnos =
        obtenerTurnos();


    const nuevoTurno = {

        idTurno:
            "turno" + Date.now(),

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


    document
        .getElementById(
            "formTurno"
        )
        .reset();


    const modalElemento =
        document.getElementById(
            "modalTurno"
        );


    const modal =
        bootstrap.Modal.getInstance(
            modalElemento
        );


    if (modal) {
        modal.hide();
    }

}


// ==========================================
// 25. ELIMINAR TURNO
// ==========================================

function eliminarTurno(idTurno) {

    const confirmar =
        confirm(
            "¿Estás seguro de que querés eliminar este turno?"
        );


    if (!confirmar) {
        return;
    }


    const turnos =
        obtenerTurnos();


    const turnosActualizados =
        turnos.filter(
            function (turno) {

                return (
                    turno.idTurno !==
                    idTurno
                );

            }
        );


    localStorage.setItem(
        "turnos",
        JSON.stringify(
            turnosActualizados
        )
    );


    mostrarTurnos();

}


// ==========================================
// 26. CONECTAR FORMULARIO VETERINARIO
// ==========================================

const formularioVeterinario =
    document.getElementById(
        "formVeterinario"
    );


if (formularioVeterinario) {

    formularioVeterinario.addEventListener(
        "submit",
        guardarVeterinario
    );

}


// ==========================================
// 27. CONECTAR FORMULARIO MASCOTA
// ==========================================

const formularioMascota =
    document.getElementById(
        "formMascota"
    );


if (formularioMascota) {

    formularioMascota.addEventListener(
        "submit",
        guardarMascota
    );

}


// ==========================================
// 28. CONECTAR FORMULARIO TURNO
// ==========================================

const formularioTurno =
    document.getElementById(
        "formTurno"
    );


if (formularioTurno) {

    formularioTurno.addEventListener(
        "submit",
        guardarTurno
    );

}


// ==========================================
// 29. MOSTRAR DATOS AL CARGAR
// ==========================================

mostrarVeterinarios();

mostrarMascotas();

mostrarTurnos();