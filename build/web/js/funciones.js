function getAllAsistencias() {
    console.log("Hola soy el getAll")
    fetch("http://localhost:8082/RFID_Project/api/asistencia/getall",
            ).then(response => response.json())
            .then(response => {
                console.log('Hola Alumno', response[0].fechIngreso)
                localStorage.setItem("cantidad", response.length);
                let datosTabla = "";
                for (let i = 0; i < response.length; i++) {
                    let matricula = response[i].alumno.matricula;
                    let nombre = response[i].alumno.nombre + " " + response[i].alumno.aPaterno + " " + response[i].alumno.aMaterno;
                    let nombreConferencista = response[i].conferencia.conferencista.nombre + " " + response[i].conferencia.conferencista.aPaterno + " " + response[i].conferencia.conferencista.aMaterno;
                    let conferencia = response[i].conferencia.nombre;
                    let horaInicio = response[i].fechIngreso;
                    datosTabla += "<tr>";
                    datosTabla += "<td>" + matricula + "</td>";
                    datosTabla += "<td>" + nombre + "</td>";
                    datosTabla += "<td>" + conferencia + "</td>"
                    datosTabla += "<td>" + nombreConferencista + "</td>"
                    datosTabla += "<td>" + horaInicio + "</td>"
                    datosTabla += "</tr>";

                }
                document.getElementById("tableAsistencias").innerHTML = datosTabla;
                document.getElementById("conteo").innerHTML = localStorage.getItem("cantidad");
            });
}

function insertarAsistencias() {
    let ruta = "http://localhost:8082/RFID_Project/api/asistencia/asistencia";
    fetch(ruta,
            {method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            })
            .then(response => response.text())
            .then(response => {
                console.log(response);
                getAllAsistencias();
                
            });
            

}
setInterval(insertarAsistencias, 3000)
setInterval(getAllAsistencias, 5000)


function tiempoInicio() {
    let ruta = "http://localhost:8082/RFID_Project/api/asistencia/tiempoinicio";

    fetch(ruta, {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    })
    .then(response => response.text())
    .then(response => {
        // Llamar a la función para comenzar la cuenta regresiva con la hora de inicio recibida
        actualizarCuentaRegresiva(response.trim()); // La respuesta se limpia de espacios adicionales
    });
}

setInterval(tiempoInicio,1000)

// JavaScript para actualizar el reloj y la cuenta regresiva
function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    clockElement.textContent = now.toLocaleTimeString('es-ES');
}

// Llamar a las funciones para actualizar el reloj y la cuenta regresiva cada segundo
setInterval(updateClock, 1000);


// Función para obtener la hora actual en el formato HH:mm:ss
function obtenerHoraActual() {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    // Asegurarse de que las horas, minutos y segundos tengan dos dígitos
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    return `${horas}:${minutos}:${segundos}`;
}

// Función para calcular la diferencia de tiempo entre dos horas en formato HH:mm:ss
function calcularDiferenciaTiempo(horaInicio, horaActual) {
    const inicio = horaInicio.split(':');
    const actual = horaActual.split(':');

    const inicioSegundos = parseInt(inicio[0]) * 3600 + parseInt(inicio[1]) * 60 + parseInt(inicio[2]);
    const actualSegundos = parseInt(actual[0]) * 3600 + parseInt(actual[1]) * 60 + parseInt(actual[2]);

    return inicioSegundos - actualSegundos;
}

// Función para actualizar el contador de cuenta regresiva cada segundo
function actualizarCuentaRegresiva(horaInicio) {
    setInterval(function() {
        const horaActual = obtenerHoraActual();
        const diferencia = calcularDiferenciaTiempo(horaInicio, horaActual);

        // Convertir la diferencia de segundos a horas, minutos y segundos
        const horas = Math.floor(diferencia / 3600);
        const minutos = Math.floor((diferencia % 3600) / 60);
        const segundos = diferencia % 60;

        // Actualizar el elemento HTML con la cuenta regresiva
        document.getElementById('cuenta-regresiva').innerText = `${horas}:${minutos}:${segundos}`;
    }, 1000); // Actualizar cada segundo
}

// Función para obtener el tiempo de inicio y actualizar la cuenta regresiva







