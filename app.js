// Variables del dom
const prestamoInput = document.getElementById("prestamo");
const tasaInteresInput = document.getElementById("tasaInteres");
const plazoInput = document.getElementById("plazo");
const calcularBtn = document.getElementById("calcular");
const nuevaBtn = document.getElementById("nueva");
const resultadoDiv = document.getElementById("resultado");

// Función para guardar la información del préstamo en el LocalStorage
function guardarInfoPrestamo() {
const infoPrestamo = {
monto: prestamoInput.value,
tasaInteres: tasaInteresInput.value,
plazo: plazoInput.value
};
const infoPrestamoJSON = JSON.stringify(infoPrestamo);
localStorage.setItem("prestamo", infoPrestamoJSON);
}

// Función para recuperar la información del préstamo del LocalStorage
function recuperarInfoPrestamo() {
const prestamoJSON = localStorage.getItem("prestamo");
if (prestamoJSON) {
const prestamo = JSON.parse(prestamoJSON);
prestamoInput.value = prestamo.monto;
tasaInteresInput.value = prestamo.tasaInteres;
plazoInput.value = prestamo.plazo;
}
}

// Calculando cuotas para el prestamo
function calcularCuotaMensual(prestamo, tasaInteres, plazo) {
let tasaMensual = tasaInteres / 12;
let cuotaMensual =
(prestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
return cuotaMensual;
}

// Mostramos resultado y guardamos la información del préstamo en el LocalStorage
function mostrarResultado(cuotaMensual) {
resultadoDiv.innerText = "La cuota mensual es de: " + cuotaMensual.toFixed(2);
guardarInfoPrestamo();
}

// Validamos los campos completos
function validarCampos() {
if (prestamoInput.value === "" || tasaInteresInput.value === "" || plazoInput.value === "") {
alert("Por favor, complete todos los campos.");
return false;
}
return true;
}

// Event listener para el botón de calcular
calcularBtn.addEventListener("click", () => {
if (validarCampos()) {
const prestamo = parseFloat(prestamoInput.value);
const tasaInteres = parseFloat(tasaInteresInput.value);
const plazo = parseInt(plazoInput.value);
const cuotaMensual = calcularCuotaMensual(prestamo, tasaInteres / 100, plazo);
mostrarResultado(cuotaMensual);
}
});

// Event listener para el botón de calcular una nueva cuota mensual
nuevaBtn.addEventListener("click", () => {
prestamoInput.value = "";
tasaInteresInput.value = "";
plazoInput.value = "";
resultadoDiv.innerText = "";
localStorage.removeItem("prestamo");
});

// Recuperamos la información del préstamo del LocalStorage al cargar la página
recuperarInfoPrestamo();