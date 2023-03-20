const apiURL = "https://mindicador.cl/api/";

const button = document.querySelector("#button");
const select = document.querySelector("#select");
const ctx = document.getElementById("myChart");

let chart;

button.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const info = await fetch(apiURL + select.value);
    const valores = await info.json();
    console.log(valores);
    mostrarInfo(valores);
  } catch (error) {
    console.log("Existen un Error en el código, por favor revísalo" + error);
    alert("Servicio no Disponible por ahora, inténtelo más tarde");
  }

  function convertir() {
    const input = parseFloat(document.querySelector("#number").value);
    let resultado = 0;
    if (isNaN(input) || input <= 0) {
      alert("Debes ingresar un valor minímo para convertir");
      return;
    }
    const select = document.querySelector("#select").value;
    const datos = chart.data.datasets[0].data;
    if (select === "dolar") {
      resultado = input / datos[0];
    } else if (select === "euro") {
      resultado = input / datos[datos.length - 1];
    }else if (select === "uf") {
      resultado = input / datos[datos.length - 1];
    }
    document.querySelector("#valor").innerHTML = resultado.toFixed(2);
  }

  convertir();

  function mostrarInfo(data) {
    let arrayInfo = [];

    for (let i = 0; i < 5; i++) {
      arrayInfo.push(data.serie[i]);
    }

    console.log(arrayInfo);

    renderCanvas(arrayInfo);
  }

  function renderCanvas(data) {
    if (chart) {
      chart.destroy();
    }

    const labels = data.map((element) => {
      return element.fecha.slice(0, 10);
    });

    labels.reverse();

    const datos = data.map((element) => {
      return element.valor;
    });

    datos.reverse();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `${select.value}`,
            data: datos,
            borderWidth: 3,
          },
        ]
        ,
      },
    });
  }
});
