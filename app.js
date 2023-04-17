// Variables del dom
const prestamoInput = document.getElementById("prestamo");
const tasaInteresInput = document.getElementById("tasaInteres");
const plazoInput = document.getElementById("plazo");
const calcularBtn = document.getElementById("calcular");
const nuevaBtn = document.getElementById("nueva");
const resultadoDiv = document.getElementById("resultado");

// Calculando cuotas para el prestamo
function calcularCuotaMensual(prestamo, tasaInteres, plazo) {
  let tasaMensual = tasaInteres / 12;
  let cuotaMensual =
    (prestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
  return cuotaMensual;
}

// Mostramos resultado
function mostrarResultado(cuotaMensual) {
  resultadoDiv.innerText = "La cuota mensual es de: " + cuotaMensual.toFixed(2);
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
});
