const API_KEY = "ea18769c21f5fac2023714fc";

const selectsMoeda = document.querySelectorAll("[data-select]");
const selectMoedaCota = document.querySelector("[data-cotacao]");
const boxCotacao = document.querySelector("[data-box-cotacao]");
const tagMoedas = document.querySelectorAll("[data-value]");
const convertNumber = document.querySelector("[data-convert-number]");
const result = document.querySelector("[data-result]");

fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/BRLa`)
  .then((res) => res.json())
  .then((data) => {
    let taxas = data.conversion_rates;

    selectsMoeda.forEach((selectMoeda) => {
      for (let moeda in taxas) {
        let option = document.createElement("option");
        option.value = moeda;
        option.textContent = moeda;
        selectMoeda.appendChild(option);
      }
    });

    for (let moeda in taxas) {
      let option = document.createElement("option");

      option.value = moeda;
      option.textContent = moeda;
      selectMoedaCota.appendChild(option);

      let valueCotacao = document.createElement("div");
      valueCotacao.classList.add(
        "py-1",
        "px-2",
        "basis-1/3",
        "bg-white",
        "border-2",
        "border-gray-02",
        "rounded-md",
        "text-center"
      );
      valueCotacao.textContent = `${moeda} ${taxas[moeda].toFixed(2)}`;
      boxCotacao.appendChild(valueCotacao);
    }

    tagMoedas.forEach((tagMoeda, index) => {
      tagMoeda.textContent = selectsMoeda[index].value;
    });

    convertNumber.addEventListener("input", () => {
      const valorMoeda = parseFloat(convertNumber.value);
      const taxa = taxas[selectsMoeda[1].value];
      const finalValue = (valorMoeda * taxa).toFixed(2);
      const none = 0;
      if (!convertNumber.value) {
        result.textContent = none.toFixed(2);
      } else {
        result.textContent = finalValue;
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });

function loadCotacao(valor) {
  fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${valor}`)
    .then((newRes) => newRes.json())
    .then((newData) => {
      let newTaxas = newData.conversion_rates;
      for (let newMoeda in newTaxas) {
        let valueCotacao = document.createElement("div");
        valueCotacao.classList.add(
          "py-1",
          "px-2",
          "basis-1/3",
          "bg-white",
          "border-2",
          "border-gray-02",
          "rounded-md",
          "text-center"
        );
        valueCotacao.textContent = `${newMoeda} ${newTaxas[newMoeda].toFixed(
          2
        )}`;
        boxCotacao.appendChild(valueCotacao);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

selectMoedaCota.addEventListener("change", () => {
  boxCotacao.innerHTML = "";
  loadCotacao(selectMoedaCota.value);
});

selectsMoeda[0].addEventListener("change", () => {
  fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${selectsMoeda[0].value}`
  )
    .then((valueRes) => valueRes.json())
    .then((valueData) => {
      let valueTaxas = valueData.conversion_rates;
      convertNumber.addEventListener("input", () => {
        const valorMoeda = parseFloat(convertNumber.value);
        const taxa = valueTaxas[selectsMoeda[1].value];
        const finalValue = (valorMoeda * taxa).toFixed(2);
        const none = 0;
        if (!convertNumber.value) {
          result.textContent = none.toFixed(2);
        } else {
          result.textContent = finalValue;
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

selectsMoeda.forEach((selectMoeda) => {
  selectMoeda.addEventListener("change", () => {
    tagMoedas.forEach((tagMoeda, index) => {
      tagMoeda.textContent = selectsMoeda[index].value;
    });
  });
});
