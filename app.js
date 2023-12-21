const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropDowns = document.querySelectorAll('select');
const amount = document.querySelector('.amount')
const fromCurr = document.querySelector('#from')
const toCurr = document.querySelector('#to')
const btn = document.querySelector('.btn')



for (const select of dropDowns) {
    for (const code in countryList) {
        let option = document.createElement("option");
        if (select.name === 'to' && code === 'PKR') {
            option.setAttribute('selected', true);
        }
        option.value = code;
        option.innerHTML = `${code}(${countryList[code].fullForm})`;

        select.append(option);
        select.append(option);

    }

    select.addEventListener('change', (change) => {
        const fromImg = document.querySelector('.from-img');
        const toImg = document.querySelector('.to-img')

        changeFlag(fromImg, 'from', change)
        changeFlag(toImg, 'to', change)
    })

    function changeFlag(img, section, change) {
        if (select.name === section) {
            if (change.target.value != 'EUR') {
                img.src = `https://flagsapi.com/${change.target.value.slice(0, 2)}/shiny/64.png`
            }
            else {
                img.src = `https://flagsapi.com/DE/shiny/64.png`
            }
        }
    }


}



btn.addEventListener('click', async () => {
    if (amount.value === '' || amount.value < 1) {
        amount.value = "1"
    }
    const url = `${base_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    const respose = await fetch(url)
    const data = await respose.json()



    let exchangeRate = data[toCurr.value.toLowerCase()] * amount.value

    document.querySelector('.from-amount').innerHTML = amount.value
    document.querySelector('.from-code').innerHTML = fromCurr.value
    document.querySelector('.to-amount').innerHTML = exchangeRate.toFixed(2)
    document.querySelector('.to-code').innerHTML = toCurr.value
})