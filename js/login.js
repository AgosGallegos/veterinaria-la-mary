
// ======================================================
// INICIO DE SESIÓN - VETERINARIA LA MARY
// API DummyJSON + Fetch + SessionStorage
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formLogin");

    formulario.addEventListener("submit", iniciarSesion);

});


async function iniciarSesion(evento) {

    evento.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasenia = document.getElementById("contrasenia").value;

    const mensaje = document.getElementById("mensajeLogin");
    const boton = document.getElementById("btnLogin");

    mensaje.classList.add("d-none");

    boton.disabled = true;
    boton.textContent = "Ingresando...";

    try {

        const respuesta = await fetch("https://dummyjson.com/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: usuario,
                password: contrasenia
            })

        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                datos.message || "Usuario o contraseña incorrectos."
            );

        }

        // Guardar el token de autenticación
        const token = datos.accessToken || datos.token;

        if (!token) {
            throw new Error("No se recibió el token de acceso.");
        }

        sessionStorage.setItem("token", token);

        // Guardar información básica del administrador
        sessionStorage.setItem(
            "administrador",
            JSON.stringify({
                nombre: datos.firstName,
                apellido: datos.lastName,
                usuario: datos.username
            })
        );

        mensaje.className = "alert alert-success";
        mensaje.textContent = "Inicio de sesión correcto.";

        // Redirigir al panel administrativo
        window.location.href = "admin.html";

    } catch (error) {

        mensaje.className = "alert alert-danger";
        mensaje.textContent = error.message;

    } finally {

        boton.disabled = false;
        boton.textContent = "Iniciar sesión";

    }

}
