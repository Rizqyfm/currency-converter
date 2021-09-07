const dropList = document.querySelectorAll('.drop-list select');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(currencyCode in countryCode){
        // select USD to IDR as a default
        let selected;
        if(i == 0) {
            selected = currencyCode == "USD" ? "selected" : "";
        }else if (i == 1) {
            selected = currencyCode == "IDR" ? "selected" : "";
        }
        // create option tag with passing currency code as a text and value
        let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
        // insert option tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        // calling loadFlag with passing target element
        loadFlag(e.target); 
    });
}

function loadFlag(element) {
    for (code in countryCode) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://www.countryflags.io/${countryCode[code]}/flat/64.png`
        }
    }
}

window.addEventListener('load', () => {
    getExchangeRate();  
})

getButton.addEventListener('click', e => {
    // preventing form from submitting
    e.preventDefault();
    getExchangeRate();  
})

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate()
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateText = document.querySelector(".exchange-rate")
    let amountVal = amount.value;
    // If user don't input any value or enter 0, then we proceed to put 1 as a default
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/f64f16e338576b16735f35e8/latest/${fromCurrency.value}`;
    // Fetching api response 
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (exchangeRate * amountVal).toFixed(2)
        exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    }).catch( () => {
        exchangeRateText.innerText = "Something wrong here..."
    })
}