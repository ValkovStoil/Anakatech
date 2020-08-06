{
  const container = document.getElementsByClassName("container")[0];
  let rates = document.getElementsByClassName("exchange");

  fetch("./currencies.json")
    .then((data) => data.json())
    .then((response) => getDataFromJSON(response));

  function getDataFromJSON(data) {
    let currencyDataRates = data.rates;

    let index = 0;
    for (const key in currencyDataRates) {
      let value = currencyDataRates[key];
      rates[index].innerHTML = value.toFixed(4);
      index++;
    }
    startUpdating(currencyDataRates);
  }

  function startUpdating(currentRates) {
    let arrRates = currentRates;
    let updateRate = 0.0001;
    let start = Date.now();
    let changeRate = 1;

    let theInterval = setInterval(function () {
      //5 minutes run time
      if (Date.now() - start > 300000) {
        clearInterval(theInterval);
        return;
      }

      let index = 0;
      for (let key in arrRates) {
        //change updateRate evry 1 minute +/-
        if (changeRate <= 12) {
          arrRates[key] += updateRate;
        } else {
          arrRates[key] -= updateRate;
        }

        let value = arrRates[key];
        let previousValue = parseFloat(rates[index].innerHTML);

        //Check if previous value ist greater or not and change the color
        if (previousValue > value) {
          rates[index].style.backgroundColor = "#AA0000";
        } else if (previousValue < value) {
          rates[index].style.backgroundColor = "#028538";
        }

        //if rate less than 1.0001 don't change it
        if (value >= 1.0001) {
          rates[index].innerHTML = value.toFixed(4);
        }

        index++;
      }

      //reset the change rate evry 2 minutes
      if (changeRate === 24) {
        changeRate = 1;
      }
      changeRate++;
    }, 5000);
  }
}
