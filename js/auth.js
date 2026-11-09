
// ======================================================
// CONTROL DE AUTENTICACIÓN
// VETERINARIA LA MARY
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const token = sessionStorage.getItem("token");

    const paginaActual = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    // Páginas que requieren una sesión iniciada
    const paginasProtegidas = [
        "admin.html",
        "mascotas.html",
        "veterinarios.html"
    ];

    // Verificar si la página requiere autenticación
    if (paginasProtegidas.includes(paginaActual) && !token) {

        window.location.href = "login.html";
        return;

    }

    // Configurar la navegación
    configurarNavegacion(token);

});


// ======================================================
// CONFIGURAR BARRA DE NAVEGACIÓN
// ======================================================

function configurarNavegacion(token) {

    const navegacion = document.querySelector(
        "nav .navbar-nav"
    );

    if (!navegacion) {
        return;
    }

    // Enlaces de administración
    const enlacesAdministrativos = [
        "admin.html",
        "mascotas.html",
        "veterinarios.html",
        "turnos.html",
        "historia-clinica.html"
    ];

    const enlaces = navegacion.querySelectorAll("a");

    enlaces.forEach(enlace => {

        const destino = enlace.getAttribute("href");

        if (enlacesAdministrativos.includes(destino)) {

            enlace.parentElement.classList.toggle(
                "d-none",
                !token
            );

        }

    });

    // Si hay sesión iniciada
    if (token) {

        agregarEnlace(
            navegacion,
            "admin.html",
            "Panel de Administración"
        );

        agregarEnlace(
            navegacion,
            "#",
            "Cerrar sesión",
            cerrarSesion
        );

    } else {

        // Si no hay sesión, mostrar acceso al login
        agregarEnlace(
            navegacion,
            "login.html",
            "Iniciar sesión"
        );

    }

}


// ======================================================
// AGREGAR ENLACES A LA NAVEGACIÓN
// ======================================================

function agregarEnlace(navegacion, destino, texto, accion = null) {

    // Evitar enlaces duplicados
    const existe = Array.from(
        navegacion.querySelectorAll("a")
    ).some(enlace => enlace.textContent.trim() === texto);

    if (existe) {
        return;
    }

    const elemento = document.createElement("li");
    elemento.className = "nav-item";

    const enlace = document.createElement("a");

    enlace.className = "nav-link";
    enlace.href = destino;
    enlace.textContent = texto;

    if (accion) {

        enlace.addEventListener("click", evento => {

            evento.preventDefault();
            accion();

        });

    }

    elemento.appendChild(enlace);
    navegacion.appendChild(elemento);

}


// ======================================================
// CERRAR SESIÓN
// ======================================================

function cerrarSesion() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("administrador");

    window.location.href = "index.html";

}
