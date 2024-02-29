

// JavaScript para actualizar el reloj y la cuenta regresiva
function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    clockElement.textContent = now.toLocaleTimeString('es-ES');
}

function updateCountdown() {
    const now = new Date();
    const eventTime = new Date();
    eventTime.setHours(18, 00, 00); // Establecer la hora del evento a las 22:00 horas

    const timeDifference = eventTime.getTime() - now.getTime();

    // Calcular horas, minutos y segundos restantes
    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Mostrar la cuenta regresiva en el formato HH:MM:SS
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}


// Llamar a las funciones para actualizar el reloj y la cuenta regresiva cada segundo
setInterval(updateClock, 1000);
// Ejecutar updateCountdown() cada segundo
setInterval(updateCountdown, 1000);








let participantesRegistrados = 0;

function actualizarContador() {
    participantesRegistrados++;
    document.getElementById('contador').innerHTML = participantesRegistrados;
}



function agregarParticipante(idAlumno, matricula, nombre, aPaterno, aMaterno, cuatrimestre, fotoURL) {
    const tabla = document.getElementById('tabla-participantes');
    const fila = tabla.insertRow();
    const celdaIdAlumno = fila.insertCell(0);
    const celdaMatricula = fila.insertCell(1);
    const celdaNombre = fila.insertCell(2);
    const celdaAPaterno = fila.insertCell(3);
    const celdaAMaterno = fila.insertCell(4);
    const celdaCuatrimestre = fila.insertCell(5);

    const celdaFoto = fila.insertCell(6);
    celdaIdAlumno.innerHTML = idAlumno;
    celdaMatricula.innerHTML = matricula;
    celdaNombre.innerHTML = nombre;
    celdaAPaterno.innerHTML = aPaterno;
    celdaAMaterno.innerHTML = aMaterno;
    celdaCuatrimestre.innerHTML = cuatrimestre;

    celdaFoto.innerHTML = `<img src="${fotoURL}" width="100">`;
}

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const idAlumno = document.getElementById('idAlumno').value;
    const matricula = document.getElementById('matricula').value;
    const nombre = document.getElementById('nombre').value;
    const aPaterno = document.getElementById('aPaterno').value;
    const aMaterno = document.getElementById('aMaterno').value;
    const cuatrimestre = document.getElementById('cuatrimestre').value;

    const foto = document.getElementById('foto').files[0];
    const fotoURL = URL.createObjectURL(foto);
    agregarParticipante(idAlumno, matricula, nombre, aPaterno, aMaterno, cuatrimestre, fotoURL);
    actualizarContador();
});