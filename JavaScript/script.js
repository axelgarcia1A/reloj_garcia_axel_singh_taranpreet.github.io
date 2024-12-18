let alarmTime = null;
let countdownInterval = null;
let sound = null; // Variable global para almacenar el objeto de sonido

// Reproduce un sonido aleatorio
function playAlarmSound() {
    // Si ya hay un sonido reproduciéndose, lo detenemos y lo reiniciamos
    if (sound) {
        sound.pause(); // Detener el sonido
        sound.currentTime = 0; // Reiniciar el sonido
    }

    // Elige un índice aleatorio del array
    const randomIndex = Math.floor(Math.random() * alarmSounds.length);
    const randomSound = alarmSounds[randomIndex];

    // Crea un nuevo elemento de audio y lo reproduce
    sound = new Audio(randomSound);
    sound.play().catch(error => {
        console.error("Error al reproducir el sonido:", error);
    });

    // Detecta cuando el sonido ha terminado y lo vuelve a reproducir
    sound.addEventListener('ended', () => {
        playAlarmSound(); // Reproducir el sonido de nuevo
    });
}

// Muestra la notificación de la alarma
function showAlarmNotification() {
    const alarmNotification = document.getElementById('alarmNotification');
    alarmNotification.style.display = 'block'; // Mostrar la notificación
}

// Muestra la notificación del contador
function showCountdownNotification() {
    const countdownNotification = document.getElementById('countdownNotification');
    countdownNotification.style.display = 'block'; // Mostrar la notificación
}

// Detiene el sonido
function stopSound() {
    if (sound) {
        sound.pause(); // Detener el sonido
        sound.currentTime = 0; // Resetear el tiempo del audio
    }
    // Ocultar las notificaciones
    document.getElementById('alarmNotification').style.display = 'none';
    document.getElementById('countdownNotification').style.display = 'none';
}

// Muestra la hora actual
function displayCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('currentTime').innerText = `${hours}:${minutes}:${seconds}`;
}
setInterval(displayCurrentTime, 1000);

// Establece la alarma
function setAlarm() {
    const alarmInput = document.getElementById('alarmTime').value;
    if (alarmInput) {
        alarmTime = new Date();
        const [hours, minutes] = alarmInput.split(':');
        alarmTime.setHours(parseInt(hours), parseInt(minutes), 0);
        alert(`Alarma establecida para las ${alarmInput}`);
        checkAlarm();
    } else {
        alert("Introduce una hora válida.");
    }
}

// Comprueba si es hora de la alarma
function checkAlarm() {
    const checkInterval = setInterval(() => {
        const now = new Date();
        if (alarmTime && now >= alarmTime) {
            clearInterval(checkInterval);
            playAlarmSound();  // Reproducir sonido
            showAlarmNotification(); // Mostrar notificación de alarma
        }
    }, 1000);
}

// Inicia el contador regresivo
function setCountdown() {
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
        const endTime = Date.now() + totalSeconds * 1000;

        countdownInterval = setInterval(() => {
            const timeLeft = endTime - Date.now();

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                document.getElementById('countdown').innerText = "¡Tiempo finalizado!";
                playAlarmSound();  // Reproducir sonido
                showCountdownNotification(); // Mostrar notificación de cuenta atrás
            } else {
                const h = Math.floor(timeLeft / 3600000).toString().padStart(2, '0');
                const m = Math.floor((timeLeft % 3600000) / 60000).toString().padStart(2, '0');
                const s = Math.floor((timeLeft % 60000) / 1000).toString().padStart(2, '0');
                document.getElementById('countdown').innerText = `Tiempo restante: ${h}:${m}:${s}`;
            }
        }, 1000);
    } else {
        alert("Introduce un tiempo válido.");
    }
}

// Array de sonidos de alarma
const alarmSounds = [
    "sounds/alarma1.mp3",
    "sounds/alarma2.mp3",
    "sounds/alarma3.mp3",
    "sounds/alarma4.mp3",
    "sounds/alarma5.mp3",
    "sounds/alarma6.mp3",
    "sounds/alarma7.mp3",
    "sounds/alarma8.mp3",
    "sounds/alarma9.mp3",
    "sounds/alarma10.mp3",
    "sounds/alarma11.mp3",
    "sounds/alarma12.mp3"
];
