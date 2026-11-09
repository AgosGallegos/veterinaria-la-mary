// ======================================================
// CONTROL DE AUTENTICACIÓN - VETERINARIA LA MARY
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const token = sessionStorage.getItem("token");

    const paginaActual = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    // Páginas que requieren una sesión iniciada.
    const paginasProtegidas = [
        "admin.html",
        "mascotas.html",
        "veterinarios.html"
    ];

    if (paginasProtegidas.includes(paginaActual) && !token) {
        window.location.replace("login.html");
        return;
    }

    configurarNavegacion(Boolean(token));

});


// ======================================================
// CONFIGURAR BARRA DE NAVEGACIÓN
// ======================================================

function configurarNavegacion(sesionIniciada) {

    // Busca la barra de navegación principal.
    const navegacion = document.querySelector(
        ".navbar-nav, nav.navbar, header nav"
    );

    if (!navegacion) return;

    // Mostrar u ocultar los enlaces administrativos.
    const enlacesAdministrativos = navegacion.querySelectorAll(
        'a[href="admin.html"], a[href="mascotas.html"], a[href="veterinarios.html"], a[data-admin-link]'
    );

    enlacesAdministrativos.forEach(enlace => {
        enlace.classList.toggle("d-none", !sesionIniciada);
        enlace.setAttribute("aria-hidden", String(!sesionIniciada));
    });

    // Eliminar enlaces agregados anteriormente para evitar duplicados.
    navegacion.querySelectorAll("[data-auth-link]").forEach(enlace => {
        const contenedor = enlace.closest("li");

        if (contenedor && navegacion.tagName === "UL") {
            contenedor.remove();
        } else {
            enlace.remove();
        }
    });

    if (sesionIniciada) {

        // Agregar opción para cerrar sesión.
        agregarEnlace(navegacion, "#", "Cerrar sesión", cerrarSesion);

    } else {

        // Agregar opción para iniciar sesión.
        agregarEnlace(navegacion, "login.html", "Iniciar sesión");

    }

}


// ======================================================
// AGREGAR ENLACES A LA NAVEGACIÓN
// ======================================================

function agregarEnlace(navegacion, destino, texto, accion = null) {

    const elemento = document.createElement("a");

    elemento.className = "nav-link";
    elemento.href = destino;
    elemento.textContent = texto;
    elemento.setAttribute("data-auth-link", "true");

    if (accion) {
        elemento.addEventListener("click", evento => {
            evento.preventDefault();
            accion();
        });
    }

    // Si la navegación utiliza listas, conserva la estructura Bootstrap.
    if (navegacion.tagName === "UL") {

        const item = document.createElement("li");
        item.className = "nav-item";
        item.appendChild(elemento);
        navegacion.appendChild(item);

    } else {

        navegacion.appendChild(elemento);

    }

}


// ======================================================
// CERRAR SESIÓN
// ======================================================

function cerrarSesion() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("administrador");

    window.location.href = "index.html";

}
