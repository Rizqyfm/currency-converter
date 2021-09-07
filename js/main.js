const dropList = document.querySelectorAll('.drop-list select');

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
    };   
}