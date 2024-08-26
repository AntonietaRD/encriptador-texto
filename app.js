//Elaborado por Antonieta Rodríguez Dolores
//25 de agosto 2024

// Función para validar el texto
function validarTexto(texto) {
    const invalidChars = /[A-ZÁÉÍÓÚÑÜ]/;
    return invalidChars.test(texto);
}

// Función de encriptación
function encriptarTexto(texto) {
    return texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
}

// Función de desencriptación
function desencriptarTexto(texto) {
    return texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

// Función para copiar al portapapeles
function copiarAlPortapapeles(texto) {
    const input = document.createElement('input');
    input.setAttribute('value', texto);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

// Obtener referencias a los elementos
const textarea = document.querySelector('textarea');
const encriptarBtn = document.getElementById('myButtonEncriptar');
const desencriptarBtn = document.getElementById('myButtonDesencriptar');
const copiarBtn = document.getElementById('myButtonCopiar');
const salidaTexto = document.querySelector('.salida__texto p');
const salidaImagen = document.querySelector('.salida__texto img');
const errorMensaje = document.getElementById('errorMensaje');

// Ocultar la imagen y el texto de placeholder por defecto
function ocultarContenido() {
    salidaImagen.style.display = 'none';
}

// Mostrar la imagen y el texto de placeholder si no hay texto en la salida
function mostrarContenido() {
    salidaImagen.style.display = 'block';
}

// Mostrar mensaje de error
function mostrarError() {
    errorMensaje.style.display = 'block';
}

// Ocultar mensaje de error
function ocultarError() {
    errorMensaje.style.display = 'none';
}

// Función para manejar la visualización
function actualizarSalida(texto) {
    if (texto) {
        salidaTexto.textContent = texto;
        copiarBtn.style.display = 'block'; // Mostrar botón copiar
        ocultarContenido(); // Ocultar la imagen y texto de placeholder
    } else {
        salidaTexto.textContent = 'Ningún mensaje fue encontrado'; // Texto por defecto
        copiarBtn.style.display = 'none'; // Ocultar botón copiar
        mostrarContenido(); // Mostrar la imagen y texto de placeholder
    }
}

// Función para procesar el texto
function procesarTexto() {
    const texto = textarea.value.trim();
    if (validarTexto(texto)) {
        mostrarError(); // Muestra el mensaje de error
        actualizarSalida(''); // Limpia la salida si hay caracteres inválidos
    } else {
        ocultarError(); // Oculta el mensaje de error
        return texto;
    }
}

// Evento para encriptar texto
encriptarBtn.addEventListener('click', () => {
    const texto = procesarTexto();
    if (texto) {
        const textoEncriptado = encriptarTexto(texto);
        actualizarSalida(textoEncriptado);
    } else {
        alert('Por favor, ingresa un texto válido para encriptar.'); // Alertar si el campo contiene caracteres inválidos
    }
});

// Evento para desencriptar texto
desencriptarBtn.addEventListener('click', () => {
    const texto = procesarTexto();
    if (texto) {
        const textoDesencriptado = desencriptarTexto(texto);
        actualizarSalida(textoDesencriptado);
    } else {
        alert('Por favor, ingresa un texto válido para desencriptar.'); // Alertar si el campo contiene caracteres inválidos
    }
});

// Evento para copiar texto
copiarBtn.addEventListener('click', () => {
    copiarAlPortapapeles(salidaTexto.textContent);
});

// Agregar evento de entrada para validar el texto mientras se escribe
textarea.addEventListener('input', () => {
    procesarTexto(); // Validar el texto en tiempo real
});
